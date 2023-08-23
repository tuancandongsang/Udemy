import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { NAMEDEVICE } from "../../../../../Constances/const";
import BC2800 from "./BC2800";
import UA66 from "./UA66";
import BS200E from "./BS200E";
import Test from "./Test";
import Other from "./Other";
import Immune from "./IMMUNE";
import classnames from 'classnames';
const ResultExam = (props) => {
    const { resultsExam,tab } = props;
    const selectExamResultTab = (index)=>{
        setActiveTab(index)
      }
      const [activeTab, setActiveTab] = useState(0);
    return (
        <div>
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
            resultsExam.map((el, index) => (
              <TabPane tabId={index} className="customCard">
                <div className="ResultExam">
                        {el.device == NAMEDEVICE.BC2800 && <BC2800
                            result={el}
                            tab={tab}
                        ></BC2800>}
                        {el.device == NAMEDEVICE.UA66 && <UA66
                            result={el}
                            tab={tab}
                        ></UA66>}
                        {el.device == NAMEDEVICE.TEST && <Test
                            result={el}
                            tab={tab}
                        ></Test>}
                        {el.device == NAMEDEVICE.BS200E && <BS200E
                            result={el}
                            tab={tab}
                        ></BS200E>}
                        {el.device == NAMEDEVICE.OTHER && <Other
                            result={el}
                            tab={tab}
                        ></Other>}
                        {el.device == NAMEDEVICE.IMMUNE && <Immune
                            result={el}
                            tab={tab}
                        ></Immune>}
                    </div>
              </TabPane>
            ))
          }
        </TabContent>
            
        </div>
    )
}
export default ResultExam;