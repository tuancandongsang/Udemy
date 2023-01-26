import React, { Component, Fragment } from "react";
import { Row, Col, Table, Input } from "reactstrap";
import { resultServiceEnt } from "../../share/Util"
import EntService from "../../share/EntService";
class EntResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conclusion: "",
      description: "",
      nameFromService: "",
      codeFromService: "",
      name_files: {
        rightear: "",
        leftear: "",
        nose: "",
        throat: "",
      },
      rightearImg: "",
      leftearImg: "",
      noseImg: "",
      throatImg: "",
      files: "",
      formData: new FormData()
    };
  }
  componentDidUpdate = (preProps) => {
    let results = this.props.results ? this.props.results[0] : {}
    let name_files = this.props.name_files ? this.props.name_files : {}
    let photos = this.props.photos ? this.props.photos : null
    if (preProps.results !== this.props.results) {
      this.setState({
        conclusion: results.conclusion || "",
        description: results.description || "",
        codeFromService: this.props.codeFromService,
        rightear: name_files.rightear || "",
        leftear: name_files.leftear || "",
        nose: name_files.nose || "",
        throat: name_files.throat || "",
        files: "",
      })
      let formData = this.state.formData;
      formData.delete("img");
      this.setState({
        formData: formData
      })
      let urls = this.props.upload;
      if (this.props.selectedJobStepRunning !== preProps.selectedJobStepRunning) {
        if (this.props.upload.length > 0) {
          let promise = [];
          let urls = this.props.upload;
          urls.map(url => {
            promise.push(EntService.downloadPhoto(url.name))
          })
          let metaDataImg = []
          Promise.all(promise).then(arr => {
            arr.map(el => {
              urls.map(e => {
                if (el.config.url.split("download/")[1] == e.name) {
                  metaDataImg.push({ url: el.config.url, metaData: e.metadata })
                }
              })
            })
            let { rightearImg, leftearImg, noseImg, throatImg } = this.state
            metaDataImg.map(el => {
              if (el.metaData == "rightear") {
                rightearImg = el.url
              }
              if (el.metaData == "leftear") {
                leftearImg = el.url
              }
              if (el.metaData == "nose") {
                noseImg = el.url
              }
              if (el.metaData == "throat") {
                throatImg = el.url
              }
            })
            this.setState({
              rightearImg,
              leftearImg,
              noseImg,
              throatImg,
            })
          })
        }
        else {
          this.setState({
            rightearImg: "",
            leftearImg: "",
            noseImg: "",
            throatImg: "",
          })

        }
      }
      else {
        this.setState({
          rightearImg: "",
          leftearImg: "",
          noseImg: "",
          throatImg: "",
        })

      }

    }
  }
  onChangeResult = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onChangeFile = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + "Img"]: URL.createObjectURL(e.target.files[0]),
    })
    this.state.formData.append("img", e.target.name)
    this.state.formData.append("img", e.target.files[0]);
  }

  onBlurChangeResult = () => {
    let entReSult = {
      conclusion: this.state.conclusion,
      description: this.state.description
    };
    let urlFileImg = {
      rightearImg: this.state.rightearImg,
      leftearImg: this.state.leftearImg,
      noseImg: this.state.noseImg,
      throatImg: this.state.throatImg,
    }
    let files = this.state.formData;
    this.props.onChangeResult(entReSult, files, urlFileImg)
  }
  setOnchangeCode = async (ev) => {
    await this.setState({
      codeFromService: ev.target.value,
    })
    await this.setResultFrom()
  }
  setResultFrom = () => {
    let { codeFromService } = this.state
    resultServiceEnt.map(el => {
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

    let { activeTab } = this.props
    // console.log(activeTab,1);
    // let  items  = this.props.selectedJobStepRunning ? this.props.selectedJobStepRunning.order.items : [] ;
    let { conclusion, description, codeFromService, rightear, leftear, nose, throat } = this.state
    return (
      <div className="EndoscopicResult customCard df-h-63">
        {/* {
          // items.map(el => {
            // return ( */}
        <div>
          {/* {
                   el.name
                } */}
          <div className="ml-3 d-flex justify-content-between">
            <div>
              <p className="title-card"><span className="material-icons">create</span>Mô tả chi tiết</p>
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
                {resultServiceEnt.map(el => {
                  return (
                    <option key={el.code} value={el.code}>{el.name}</option>
                  )
                })}
              </Input>
            </div>
          </div>
          <div className="text-center">
            <textarea
              className="result-Ent-Description "
              placeholder=" Nhập Kết quả nội soi"
              name="description"
              value={description}
              onChange={e => this.onChangeResult(e)}
              onBlur={this.onBlurChangeResult}
            ></textarea>
          </div>
          <div className="title-card ml-3">
            <p><span className="material-icons">create</span>Kết luận</p>
          </div>
          <div className="text-center">
            <textarea
              className="result-Ent"
              placeholder=" Nhập Kết luận nội soi"
              name="conclusion"
              value={conclusion}
              onChange={e => this.onChangeResult(e)}
              onBlur={this.onBlurChangeResult}
            ></textarea>
          </div>
          <div className="title-card ml-3">
            <p style={{margin: "0 0 5px 0"}}><span className="material-icons">create</span>Chọn ảnh</p>
          </div>
          <div className="d-flex justify-content-between">
            <div className="inputSelectImg">
              <b>Tai phải</b><br></br>
              <input
                type="file"
                name="rightear"
                value={rightear}
                accept="image/*"
                onBlur={this.onBlurChangeResult}
                onChange={e => this.onChangeFile(e)}
              // multiple
              />
              {
                this.state.rightearImg ?  
                  <div className="p-2 text-center">
                    <img className="resultFile" alt="" src={this.state.rightearImg} />
                  </div>
                  : null
              }
             

            </div>
            <div className="inputSelectImg">
              <b>Tai trái</b><br></br>
              <input type="file"
                name="leftear"
                value={leftear}
                accept="image/*"
                onBlur={this.onBlurChangeResult}
                onChange={e => this.onChangeFile(e)}
              // multiple
              />
              {
                this.state.leftearImg ?  
                  <div className="p-2 text-center">
                    <img className="resultFile" alt="" src={this.state.leftearImg} />
                  </div>
              : null
              }
            </div>
            <div className="inputSelectImg">
              <b>Mũi</b><br></br>
              <input type="file"
                name="nose"
                value={nose}
                accept="image/*"
                onBlur={this.onBlurChangeResult}
                onChange={e => this.onChangeFile(e)}
              // multiple
              />
              {
                this.state.noseImg ?
                  <div className="p-2 text-center">
                    <img className="resultFile" alt="" src={this.state.noseImg} />
                  </div>
                : null
              }
              

            </div>
            <div className="inputSelectImg">
              <b>Họng</b><br></br>
              <input type="file"
                name="throat"
                value={throat}
                accept="image/*"
                onBlur={this.onBlurChangeResult}
                onChange={e => this.onChangeFile(e)}
              // multiple
              />
              {
                this.state.throatImg ?
                  <div className="p-2 text-center">
                    <img className="resultFile" alt="" src={this.state.throatImg} />
                  </div>
                : null
              }
              
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

export default EntResult;
