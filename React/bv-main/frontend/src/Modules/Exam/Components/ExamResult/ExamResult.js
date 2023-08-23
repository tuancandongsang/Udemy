import React, { useEffect, useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import classnames from 'classnames';
import BS200E from '../ExamResult/BS200E'
import BC2800 from '../ExamResult/BC2800'
import UA66 from '../ExamResult/UA66'
import Test from '../ExamResult/Test'
import Other from './Other';
import IMMUNE from './IMMUNE';
const ExamResult = (props) => {
  const { resultsExam, nameDeviceObj, devices = [], setDeviceValue, sampleIdCtime ,  sampleIdMtime, time } = props;
  const [deviceBC2800, setDeviceBC2800] = useState();
  const [deviceIMMUNE, setDeviceIMMUNE] = useState();
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    devices.forEach(element => {
      if (element.name == 'BC-2800') {
        setDeviceBC2800(element)
      } else if (element.name == 'Immune') {
        setDeviceIMMUNE(element)
      }
    });

  }, [devices]);

  const selectExamResultTab = (index)=>{
    setActiveTab(index)
  }
  const examResultsCard = () => {
    return (
      
      <>
        <Nav tabs className="selectTabs">
          {
            resultsExam.map((e, index) => (
              <NavItem className="titleTabs">
                <NavLink className={classnames({ active: activeTab === index })} onClick={() => { selectExamResultTab(index); }}>
                  <b className="title-card">{e.device}</b>
                </NavLink>
              </NavItem>
            ))
          }

        </Nav>
        <TabContent activeTab={activeTab}>
          { 
            resultsExam.map((e, index) => (

              <TabPane tabId={index} className="customCard">
                <div className="text-left">
                  {e.device == "Test" && <Test setValueService={props.setValueService} examEditState={props.examEditState} device={e.device} result={e} sampleIdCtime ={sampleIdCtime} sampleIdMtime={sampleIdMtime} time = {time}/>}
                  {e.device == "BS-200E" && e.device == nameDeviceObj.BS200E && <BS200E examEditState={props.examEditState} device={e.device} result={e} />}
                  {e.device == "BC-2800" && e.device == nameDeviceObj.BC2800 && <BC2800 examEditState={props.examEditState} deviceBC2800={deviceBC2800} setDeviceValue={setDeviceValue} device={e.device} result={e} />}
                  {e.device == "Immune" && e.device == nameDeviceObj.IMMUNE && <IMMUNE examEditState={props.examEditState} deviceIMMUNE={deviceIMMUNE} setDeviceValue={setDeviceValue} device={e.device} result={e} />}
                  {e.device == "UA-66" && e.device == nameDeviceObj.UA66 && <UA66 examEditState={props.examEditState} device={e.device} result={e} />}
                  {e.device == "Other" && e.device == nameDeviceObj.Other && <Other device={e.device} resultIndex={index} examEditSetState={(data) => props.examEditSetState(data)} examEditState={props.examEditState} />}
                </div>
              </TabPane>
            ))
          }
        </TabContent>
      </>
    )
  }

  if (resultsExam.length > 0) {
    return examResultsCard();
  } else {
    return (
      <></>
    )
  }
}
export default ExamResult;