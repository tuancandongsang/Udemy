import React from "react";
import {
  Col,
  Row,
  Table,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import PrintPrescription from "./printPrescriptions";
import { PrintPre } from "./PrintPre";
import { Form, ModalNoti, ShareService } from "../../../../../Shared";
import DoctorServices from "../../../Shared/DoctorService";
import {
  STEP_TYPE,
  ORDER_TYPE,
  SERVICE_TYPE,
  STATUS,
  PRODUCT_UNIT,
} from "../../../../../Constances/const";
import FormSearch from "./FormSearch";
import SharedService from "../../../../../Shared/Services/SharedService";
import { ROUTE } from "../../../../../Constances/const";
import ReactToPrint from "react-to-print";
import HospitalTransfer from "./HospitalTransferForm/HospitalTransferForm";
class Prescriptions extends Form {
  constructor(props) {
    super(props);
    this.state = {
      prodOther: "",
      job: props.job,
      tab: 1,
      messaget: "",
      renderOTCArr: [],
      renderETCArr: [],
      etcArr: [],
      tPriceETC: 0,
      otcArr: [],
      tPriceOTC: 0,
      orderCode: [],
      newOrderCode: [],
      etcCode: "",
      otcCode: "",
      show: false,
      cusSubInfo: {},
      SubMedArr: [],
      subCode: "",
      reExamDate: "",
      showHospitalTransfer: false,
      checkForm:0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.job.id !== prevState.job.id) {
      return { job: nextProps.job };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.job !== this.props.job) {
      let job = this.props.job;
      let etcArr = []
        .concat(
          ...job.steps
            .filter(
              (s) =>
                s.type === STEP_TYPE.BUY && s.order.type === ORDER_TYPE.ETC.code
            )
            .map((s) => s.order.items)
        )
        .map((it) => {
          let med = it.ref_value;
          med.quantity = it.quantity;
          med.total = +it.quantity * +med.price;
          med.old = true;
          med.attrs.instruction = it.attrs?.instruction;
          return med;
        });
      let otcArr = []
        .concat(
          ...job.steps
            .filter(
              (s) =>
                s.type === STEP_TYPE.BUY && s.order.type === ORDER_TYPE.OTC.code
            )
            .map((s) => s.order.items)
        )
        .map((it) => {
          let med = it.ref_value;
          med.quantity = it.quantity;
          med.total = +it.quantity * +med.price;
          med.old = true;
          med.attrs.instruction = it.attrs?.instruction;
          return med;
        });
      this.setState({
        job: this.props.job,
        tab: 1,
        etcArr,
        tPriceETC: this.calTPrice(etcArr),
        otcArr,
        tPriceOTC: this.calTPrice(otcArr),
      });
    }
  }

  onChangeQuantity = (ev, index) => {
    let keyMedArr = this.state.tab == 1 ? "etcArr" : "otcArr";
    let keyTPrice = this.state.tab == 1 ? "tPriceETC" : "tPriceOTC";
    let medArr = this.state[keyMedArr];
    medArr[index].quantity = ev.target.value;
    medArr[index].total = +ev.target.value * +medArr[index].price;
    let tPrice = this.calTPrice(medArr);
    this.setState({
      [keyMedArr]: medArr,
      [keyTPrice]: tPrice,
    });
  };

  onChangeInstruction = (ev, index) => {
    let keyMedArr = this.state.tab == 1 ? "etcArr" : "otcArr";
    let medArr = this.state[keyMedArr];
    medArr[index].attrs.instruction = ev.target.value;
    this.setState({
      [keyMedArr]: medArr,
    });
  };
  addMed = (med) => {
    const { textSymptom, textDiagnosis } = this.state.job?.state || "";
    if (textSymptom && textDiagnosis) {
      let { tab, etcArr, tPriceETC, otcArr, tPriceOTC, job } = this.state;
      const jobSubclinical = job.state?.subclinical;
      med.note = "";
      med.quantity = 1;
      med.total = med.price;
      med.attrs.instruction =
        jobSubclinical && jobSubclinical.weight && jobSubclinical.weight < 30
          ? `Ngày uống: ${med.attrs.default_daily_usage} lần x ${
              med.attrs.unit === "tablet"
                ? (med.attrs.max_dose_per_kg * jobSubclinical.weight) /
                    med.attrs.strength +
                  "viên"
                : med.attrs.max_dose_per_kg * jobSubclinical.weight +
                  med.attrs.unit
            }`
          : `Ngày uống: ${med.attrs.default_daily_usage} lần x ${
              med.attrs.unit === "tablet"
                ? med.attrs.default_quantity / med.attrs.strength + " viên"
                : med.attrs.default_quantity + med.attrs.unit
            }`;

      if (tab == 1) {
        let count = 0;
        etcArr.forEach((e) => {
          if (e.id === med.id) count++;
        });
        if (count > 0) {
          this.setState({ message: "Đã có thuốc này trong đơn!" });
        } else {
          etcArr.push(med);
          tPriceETC = this.calTPrice(etcArr);
        }
      } else {
        let count = 0;
        otcArr.forEach((e) => {
          if (e.id === med.id) count++;
        });
        if (count > 0) {
          this.setState({ message: "Đã có thuốc này trong đơn!" });
        } else {
          otcArr.push(med);
          tPriceOTC = this.calTPrice(otcArr);
        }
      }
      this.setState({
        etcArr,
        tPriceETC,
        otcArr,
        tPriceOTC,
      });
    } else {
      this.setState({
        message: "Triệu chứng và chẩn đoán không được bỏ trống",
      });
    }
  };
  addProdOther = () => {
    let { prodOther, etcArr, otcArr, tab } = this.state;
    let med = {
      name: prodOther,
      attrs: {
        instruction: "Có thể thay thế bằng loại thuốc tương tự.",
      },
      dontHave: true,
      parts: [],
    };
    if (tab == 1) {
      etcArr.push(med);
      this.setState({
        etcArr,
        prodOther: "",
      });
    } else {
      otcArr.push(med);
      this.setState({
        otcArr,
        prodOther: "",
      });
    }
  };
  onRemoveMed = (index) => {
    let keySource = this.state.tab == 1 ? "etcArr" : "otcArr";
    let source = this.state[keySource];
    let keyPrice = this.state.tab == 1 ? "tPriceETC" : "tPriceOTC";
    source.splice(index, 1);
    this.setState({
      [keySource]: source,
      [keyPrice]: this.calTPrice(source),
    });
  };

  calTPrice(medArr) {
    return medArr.reduce((a, b) => +a + +b.total, 0);
  }

  submitListProduct = () => {
    const { textSymptom, textDiagnosis } = this.state.job.state;
    if (textSymptom && textDiagnosis) {
      let promises = [];
      let arr = [
        { key: "etcArr", order_type: ORDER_TYPE.ETC.code },
        { key: "otcArr", order_type: ORDER_TYPE.OTC.code },
      ];
      arr.forEach((el) => {
        let newAssignment = this.state[el.key].filter(
          (med) => !med.old && !med.dontHave
        );
        if (newAssignment.length) {
          promises.push(
            DoctorServices.addJobStep({
              job_id: this.props.job.id,
              type: STEP_TYPE.BUY,
              order_type: el.order_type,
              items: newAssignment.map((it) => ({
                ref: "product",
                ref_id: it.id,
                quantity: it.quantity,
                attrs: {
                  instruction: it.attrs.instruction,
                },
              })),
            })
          );
        }
      });
      Promise.all(promises)
        .then((res) => {
          let newOrderCode = [];
          let { orderCode } = this.state;
          res.forEach((el) => {
            orderCode.push(el.data);
            newOrderCode.push(el.data);
          });
          this.setState({
            orderCode,
            message: "Yêu cầu thuốc thành công!",
          });

          if (newOrderCode.length == 2) {
            this.setState({
              etcCode: newOrderCode[0].code,
              otcCode: newOrderCode[1].code,
            });
          } else if (newOrderCode.length == 1) {
            this.setState({
              etcCode: newOrderCode[0].code,
              otcCode: newOrderCode[0].code,
            });
          }
        })
        .catch((err) => {
          this.setState({ message: "Có lỗi xảy ra, xin vui lòng thử lại" });
          console.log(err);
        });
    } else {
      this.setState({
        message: "Triệu chứng và chẩn đoán không được bỏ trống",
      });
    }
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };
  onSetDone = () => {
    this.setState({
      show: true,
    });
  };
  onDone = () => {
    const id = this.props.stepId;
    const status = STATUS.DONE;
    DoctorServices.finishDiagnosis({ id: id, results: [status] })
      .then((res) => {
        this.props.onRefresh();
        this.setState({
          message: "Đã hoàn thành",
          show: false,
          // reExamDate: ''
        });
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  closeNotice = () => {
    this.setState((state) => ({
      ...state,
      message: "",
    }));
  };

  print = async () => {
    await SharedService.print("medPrintId");
  };
  reExamination = (el) => {
    this.setState({
      reExamDate: el.target.value,
    });
  };
  subForm1 = () => {
    this.setState({ tab: 2 });
    this.setState({ showHospitalTransfer: true });
    this.setState({checkForm:1})
  };
  subForm2=()=>{
    this.setState({ tab: 2 });
    this.setState({ showHospitalTransfer: true });
    this.setState({checkForm:2})
  }
  handleClose = () => {
    this.setState({ showHospitalTransfer: false });
  };
  render() {
    let { job, etcArr, tPriceETC, otcArr, tPriceOTC, tab } = this.state;
    let renderETCArr = etcArr.map((med, i) => this.renderMed(med, i));
    let renderOTCArr = otcArr.map((med, i) => this.renderMed(med, i));
    return (
      <div className="Prescriptions">
        <Row className="panel-heading mt-0  ">
          <Col sm="6" className="title-card" style={{display: 'flex' }}>
            <Col sm="3">
            <span
              style={{ textDecoration: "none", fontSize:'15px'}}
              onClick={() => this.setState({ tab: 1 })}
              className={tab == 1 ? "active_tab" : ""}
            >Đơn chỉ định
            </span>
            {"  "}
            </Col>
            <Col sm="4">
            {/* <Button
              style={{ textDecoration: "none" }}
              // onClick={() => this.setState({ tab: 2 })}
              onClick={this.subForm1}
              className={tab == 2 ? "active_tab" : ""}
            >
              <span className="txtBtn">Form chuyển viện</span>
            </Button>
            </Col>
           <Col sm="4">
           <Button
              style={{ textDecoration: "none"}}
              // onClick={() => this.setState({ tab: 2 })}
              onClick={this.subForm2}
              className={tab == 2 ? "active_tab" : ""}
            >
             <span className="txtBtn">Tóm tắt bệnh án</span>
            </Button> */}
           </Col>
          </Col>
          <Col sm="3">
            <Input
              placeholder="Nhập thuốc không có tại quầy"
              value={this.state.prodOther}
              onChange={(el) => this.setState({ prodOther: el.target.value })}
            ></Input>
          </Col>
          <Col sm="1">
            <Button onClick={this.addProdOther}>Thêm</Button>
          </Col>
          <Col sm={{ size: "2" }}>
            <Input
              placeholder="nhập số ngày khám lại"
              value={this.state.reExamDate}
              onChange={(el) => this.reExamination(el)}
            ></Input>
          </Col>
        </Row>
        <div className="panel-body">
          <div className="list-choice-prescription">
            <div className="product-table table-responsive min-h-50 df-h-25">
              <table className="table table-head-fixed table-bordered">
                <thead>
                  <tr>
                    <th className="product-index dh-3">#</th>
                    <th className="product-name dh-3">Tên Dược</th>
                    <th className="product-part dh-3">Hoạt chất</th>
                    <th className="product-unit dh-3">Đơn vị</th>
                    <th className="product-quantity dh-3">Số lượng</th>
                    <th className="product-instruction dh-3">Cách dùng</th>
                    <th className="product-price dh-3">Đơn giá</th>
                    <th className="product-total dh-3">Tổng</th>
                    <th className="product-options dh-3"></th>
                  </tr>
                </thead>
                <tbody className="body-half-screen">
                  {tab == 1 ? renderETCArr : renderOTCArr}
                  <tr>
                    <th className="">#</th>
                    <th className="search-product">
                      <FormSearch
                        order_id=""
                        onSelect={this.addMed}
                      ></FormSearch>
                    </th>
                    <th className=""></th>
                    <th className=""></th>
                    <th className=""></th>
                    <th className=""></th>
                    <th className=""></th>
                    <th className=""></th>
                    <th className=""></th>
                  </tr>
                </tbody>
              </table>
            </div>
            <Row>
              <Col sm={3} className="pl-0">
                <p className="title-card">
                  <span className="material-icons">monetization_on</span> Tổng
                  tiền:{" "}
                  <span>
                    {tab == 1
                      ? new Intl.NumberFormat("de-DE").format(tPriceETC)
                      : new Intl.NumberFormat("de-DE").format(tPriceOTC)}
                    đ
                  </span>
                </p>
              </Col>
              <Col className="btn-count-print end pr-0">
                <Button
                  color="primary"
                  hidden={!job || !job.id}
                  onClick={this.submitListProduct}
                >
                  Yêu cầu thuốc
                </Button>{" "}
                <ReactToPrint
                  trigger={() => (
                    <Button hidden={!job || !job.id} color="primary">
                      In đơn thuốc
                    </Button>
                  )}
                  content={() => this.componentRef}
                />{" "}
                {/* <Button color='primary'
                                    hidden={!job || !job.id}
                                    onClick={this.print}
                                >In Đơn Thuốc</Button>{' '} */}
                <Button
                  color="primary"
                  hidden={!job || !job.id}
                  onClick={() => this.onSetDone()}
                >
                  Hoàn thành
                </Button>
              </Col>
            </Row>
          </div>
        </div>
        <Modal isOpen={this.state.show}>
          <ModalHeader>Xác nhận hoàn thành bệnh nhân</ModalHeader>
          <ModalBody className="text-center">
            Bạn hãy xác nhận hoàn thành bệnh nhân
          </ModalBody>
          <ModalFooter>
            <Row>
              <Col sm="12" className="end">
                <Button onClick={this.onDone}>Xác nhận</Button>{" "}
                <Button color="danger" onClick={this.handleClose}>
                  Hủy
                </Button>
              </Col>
            </Row>
          </ModalFooter>
        </Modal>
        <div hidden>
          <PrintPre
            ref={(el) => (this.componentRef = el)}
            etcArr={etcArr}
            reExamDate={this.state.reExamDate}
            otcCode={this.state.otcCode}
            tab={this.state.tab}
            cusData={job && job.steps ? job.steps[0]?.order?.customer : {}}
            job={job}
            etcCode={this.state.etcCode}
            otcArr={otcArr}
          />
        </div>
        {/* <PrintPrescription etcArr={etcArr} reExamDate={this.state.reExamDate} otcCode={this.state.otcCode} job={job} etcCode={this.state.etcCode} otcArr={otcArr}
                    cusData={this.props.cusData}
                ></PrintPrescription> */}
        <ModalNoti
          message={this.state.message}
          done={() => this.setState({ message: "" })}
        ></ModalNoti>
        <HospitalTransfer
          showHospitalTransfer={this.state.showHospitalTransfer}
          cusInfo={this.props.cusData}
          handleClose={this.handleClose}
          job={this.props.job}
          checkForm={this.state.checkForm}
          // arrResult={this.state.arrResult}
          // arrMedical={this.state.arrMedical}
        ></HospitalTransfer>
      </div>
    );
  }

  renderMed = (med, index) => {
    let { job } = this.state;
    return (
      <tr className={`pointer${med.old ? " old" : ""}`} key={index}>
        <td className="product-index dh-3 middle ">{index + 1}</td>
        <td className="product-name dh-3">{med.name}</td>

        <td className="product-part dh-3">
          {med.parts
            ?.map((p) => p.name)
            .splice(0, 2)
            .join(", ")}
        </td>
        <td className="product-unit dh-3 middle">
          {PRODUCT_UNIT.map((u) => {
            if (u.code === med?.unit) return <span>{u.label}</span>;
          })}
        </td>
        <td className="product-quantity product-item-quantity dh-3 middle">
          <Input
            type="number"
            value={med.quantity}
            disabled={med.old}
            onChange={(ev) => this.onChangeQuantity(ev, index)}
          />
        </td>
        <td className="product-item-instruction no-padding dh-3">
          <Input
            type="textarea"
            value={med.attrs.instruction}
            disabled={med.old}
            onChange={(ev) => this.onChangeInstruction(ev, index)}
          ></Input>
        </td>

        <td className="product-price dh-3 middle">
          {med.price
            ? new Intl.NumberFormat("de-DE").format(med.price) + "đ"
            : null}
        </td>
        <td className="product-total dh-3 middle">
          {med.price
            ? new Intl.NumberFormat("de-DE").format(med.total) + "đ"
            : null}
        </td>

        {med.old ? (
          <td className="product-options dh-3 middle"></td>
        ) : (
          <td
            className="dh-3 choice-prescription-delete"
            onClick={() => this.onRemoveMed(index)}
          >
            Xóa
          </td>
        )}
      </tr>
    );
  };
}

export default Prescriptions;
