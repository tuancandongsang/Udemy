import { EventNS } from "../ext/ev";
import { OrderNS } from "../order/order";
import { JobNS } from "../job/job";
import { InventoryNS } from "../inventory/inventory";
import * as WebSocket from "ws";
import { RetailNS } from "../retail/retail";

export function RegisterGlobalEventHandlers(
    evBLL: EventNS.BLL,
    orderBLL: OrderNS.BLL,
    jobBLL: JobNS.BLL,
    inventoryBLL: InventoryNS.BLL,
    wss: WebSocket.Server
) {
    evBLL.On(EventNS.Type.OrderPaid, async (ctx, payload) => {
        const { order_id } = payload;
        console.log(`order [${order_id}] paid`);
        const order = await orderBLL.ViewOrder(ctx, order_id);
        if (order.ref === "job_step") {
            const job_step_id = order.ref_id;
            await jobBLL.UpdateStep(ctx, job_step_id, {
                status: JobNS.StepStatus.Ready,
            });
            Promise.all([...wss.clients].map(async client => {
                if (client.readyState === WebSocket.OPEN) {
                    await client.send("update")
                }
            }))
            const job_step = await jobBLL.GetStep(ctx, job_step_id);
            if (job_step.type === JobNS.StepType.Test) {
                let consumables = [];
                order.items.forEach(item => {
                    if (item.ref_value["consumable"]) {
                        const array = item.ref_value["consumable"].map(i => {
                            i.service_id = item.ref_value.id;
                            return i;
                        })
                        consumables.push(array);
                    }
                })
                if (consumables.length > +0) {
                    let params: Array<InventoryNS.CreateTransactionParams>;
                    params = await Promise.all(consumables.flat().map(async c => {
                        const query: InventoryNS.QueryTransaction = {
                            type: InventoryNS.Type.CONSUMABLE,
                            consumable_id: c.id
                        }
                        const lots = await inventoryBLL.ListLot(query);
                        if (lots.length > 0) {
                            const filter_lots = lots.filter(l => l.remain > 0);
                            //sort lot with exp_date and remain
                            InventoryNS.Common.SortLots(filter_lots);
                            const p: InventoryNS.CreateTransactionParams = {
                                type: InventoryNS.TransactionType.LotRemain,
                                ref: "lot",
                                ref_id: filter_lots[0].id,
                                created_by: job_step.created_by,
                                lot_id: filter_lots[0].id,
                                amount: -c.amount
                            }
                            return p;
                        }
                    }))
                    if (params.length > 0) {
                        await inventoryBLL.CreateManyTransaction(ctx, params);
                        console.log(`inventory transaction [${order_id}] create`);
                    }
                }
            }
        }    
    });
    evBLL.On(EventNS.Type.OrderDone, async (ctx, payload) => {
        const { order_id } = payload;
        console.log(`order [${order_id}] done`);
    });
}