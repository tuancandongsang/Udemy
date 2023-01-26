import * as cluster from "cluster";
import * as os from "os";

export function Worker(main : () => Promise<void>) {
    console.log(`process ${process.pid} active`)
    if (cluster.isMaster) {
        const cores = os.cpus().length;
        for (let i = 0; i < cores; i++) {
            cluster.fork();
        }
    } else {
        main().catch(err => console.log(err));
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.id} died'`);
        console.log(`Staring a new one...`);
        cluster.fork();
    });
}
