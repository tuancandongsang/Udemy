import React, { Component } from "react";
import { Input } from "reactstrap";
import { resultServiceXray } from "../../share/Util";

class XrayResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conclusion: "",
      description: "",
      nameFromService: "",
      codeFromService: ""
    };
  }
  componentDidUpdate = (preProps) => {
    let results = this.props.results?this.props.results[0]:{}
    if (preProps.results !== this.props.results) {
      this.setState({
        conclusion: results.conclusion || "",
        description: results.description || "",
        codeFromService: this.props.codeFromService
      })
    }
  }
  onChangeResult = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onBlurChangeResult = () => {
    let xrayReSult = {
      conclusion: this.state.conclusion,
      description: this.state.description
    };
    this.props.onChangeResult(xrayReSult)
  }
  setOnchangeCode = async  (ev) => {
    await this.setState({
      codeFromService: ev.target.value,
    })
    await this.setResultFrom()
  }
  setResultFrom = () => {
    let { codeFromService } = this.state
    resultServiceXray.map(el => {
      if (el.code == codeFromService) {
        this.setState({
          conclusion: el.results.conclusion,
          description: el.results.description,
        })
      }
    })
    this.onBlurChangeResult()
  }
  render() {
    let {activeTab} = this.props
    let { conclusion, description, codeFromService } = this.state
    return (
      <div className="XrayResult customCard customCard df-h-63">
        <div className="table-responsive">
          <div className="ml-3 d-flex justify-content-between">
            <div className="title-card ml-3">
              <p><span className="material-icons">create</span>Mô tả chi tiết kết quả x-quang</p>
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
                {resultServiceXray.map(el => {
                  return (
                    <option key={el.code} value={el.code}>{el.name}</option>
                  )
                })}
              </Input>
            </div>
          </div>

          <textarea
            className="result-Xray-Description"
            name="description"
            placeholder="Nhập kết quả X-Quang"
            value={description}
            onChange={e => this.onChangeResult(e)}
            onBlur={this.onBlurChangeResult}
          >
          </textarea>
          <br></br>
          <div className="title-card ml-3">
            <p><span className="material-icons">create</span>Kết luận</p>
          </div>
          <textarea
            className="result-Xray"
            name="conclusion"
            placeholder="Nhập kết luận X-Quang"
            value={conclusion}
            onChange={e => this.onChangeResult(e)}
            onBlur={this.onBlurChangeResult}
          >
          </textarea>
        </div>
      </div>
    );
  }
}

export default XrayResult;
