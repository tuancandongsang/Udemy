import React, { Component, Fragment } from "react";
import { Table, Input, Row, Col } from "reactstrap";
import { resultServiceUltra } from "../../Shared/Util";
import UltrasoundService from "../../Shared/UltrasoundService";
class ResultUltrasound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conclusion: "",
      description: "",
      file: "",
      fileImg: "",
      nameFromService: "",
      codeFromService: "",
      stt: "",
      formData: new FormData()
    };
  }
  componentDidUpdate = (preProps) => {
    let results = this.props.results ? this.props.results[0] : {};
    if (preProps.results !== this.props.results) {
      this.setState({
        conclusion: results.conclusion || "",
        description: results.description || "",
        codeFromService: this.props.codeFromService,
        file: this.props.file
      })
      let formData = this.state.formData;
      formData.delete("img");
      this.setState({
        formData: formData
      })
      if (this.props.jobStep !== preProps.jobStep) {
        if (this.props.upload.length > 0) {
          let promise = [];
          let urls = this.props.upload;
          urls.map(url => {
            promise.push(UltrasoundService.downloadPhoto(url.name))
          })
          Promise.all(promise).then(arr => {
            this.setState({
              fileImg: arr[0].config.url
            })
          })
        }
        else {
          this.setState({
            fileImg: ""
          })

        }
      }
      else {
        this.setState({
          fileImg: ""
        })

      }
    }
  }
  onChangeResult = (e, index) => {
    this.setState({
      [e.target.name]: e.target.value,
      stt: index
    })
  }
  onChangeResultFile = (e) => {
    this.setState({
      [e.target.name + "Img"]: URL.createObjectURL(e.target.files[0]),
    })
    this.state.formData.append("img", e.target.name);
    this.state.formData.append("img", e.target.files[0]);
  }
  onBlurChangeResult = () => {
    let ultraReSult = {
      conclusion: this.state.conclusion,
      description: this.state.description,
    };
    let UltralResultImg = {
      fileImg: this.state.fileImg,
    }
    let files = this.state.formData;
    this.props.onChangeResult(ultraReSult, files, UltralResultImg)
  }
  setOnchangeCode = async (ev) => {
    await this.setState({
      codeFromService: ev.target.value,
    })
    await this.setResultFrom()
  }
  setResultFrom = () => {
    let { codeFromService } = this.state
    resultServiceUltra.map(el => {
      if (el.code == codeFromService) {
        this.setState({
          conclusion: el.results.conclusion,
          description: el.results.description,
          nameFromService: el.name
        })
      }
    })
    this.onBlurChangeResult()
  }
  render() {
    let { activeTab, jobStep } = this.props
    let { conclusion, description, file, codeFromService } = this.state;
    return (
      <div className="UltralResult customCard max-h-67 df-h-63">
        <div className="ml-3 d-flex justify-content-between">
          <div>
            <p className="title-card"><span className="material-icons">create</span>Mô tả chi tiết kết quả siêu âm</p>
          </div>
          <div className="input-fromService">
            <Input
              type="select"
              name="codeFromService"
              value={codeFromService}
              onChange={ev => this.setOnchangeCode(ev)}
              required
              disabled={activeTab == "2"}
            >
              <option value="">Chọn loại</option>
              {resultServiceUltra.map(el => {
                return (
                  <option key={el.code} value={el.code}>{el.name}</option>
                )
              })}
            </Input>
          </div>
        </div>
        <div className="text-center">
          <textarea
            className="result-Ultra-Description "
            placeholder=" Nhập Kết quả siêu âm"
            name="description"
            value={description}
            onChange={e => this.onChangeResult(e)}
            onBlur={this.onBlurChangeResult}
          ></textarea>
        </div>

        <Row className = "mt-10">
          <Col sm={8}>
            <div className="title-card ml-3">
              <p><span className="material-icons">create</span>Kết luận</p>
            </div>
            <textarea
              className="result-Ultra"
              placeholder=" Nhập Kết luận siêu âm"
              name="conclusion"
              value={conclusion}
              onChange={e => this.onChangeResult(e)}
              onBlur={this.onBlurChangeResult}
            ></textarea>
          </Col>
          <Col sm={4}>
            <b className="end title-card">Ảnh siêu âm</b><br></br>
            <div className="inputSelectImg  text-center mt-10">
              <input type="file"
                name="file"
                value={file}
                accept="image/*"
                onBlur={this.onBlurChangeResult}
                onChange={e => this.onChangeResultFile(e)}
              // multiple
              />
              {
                this.state.fileImg ? 
                  <div className="p-2">
                    <img className="resultFile" alt="" src={this.state.fileImg} />
                  </div>
                :null
              }
              
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ResultUltrasound;
