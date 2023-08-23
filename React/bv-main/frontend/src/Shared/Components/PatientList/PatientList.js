import React, { Component } from "react";
import SharedService from "../../Services/SharedService";
import { STATUS, STEP_TYPE, WS_URL, ONE_DAY, JOB_STEP_STATUS_VN, removeVietnameseTones } from "../../../Constances/const";
import { Util } from "../../../Helper/Util";
import ExamService from "../../../Modules/Exam/Shared/ExamService";
import Fuse from "fuse.js";
import { convertToStrDate, getAge } from "../../../Modules/Reception/Shared/Util";
import { Nav, NavItem, NavLink, TabContent, TabPane, Button, Col, Row, Input, Progress } from "reactstrap";
import  SearchPrevious3Days  from "./SearchPrevious3Days";
class PatientList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedJob: -1,
			patientList: [],
			searchPatientList: [],
			textFilter: "",
			tabs: "1",
			comboTest: [],
			customerSearch: {},
			queryCustomer: "",
			showComboTest: false,
			currentPatient: {},
			searchCus: [],
			open: 0,
			arrOpen: [],
			listDone: [],
			arrCount: [],
			isUpdate: false,
			activeTab: '1',
			count: +0,
			isOpenModalSearch: false,
			valueSearchPre: ''
		};
	}
	interval = null;
	setShowComboTest = (showComboTest) => {
		this.setState({ showComboTest: true });
	};

	fetchPatientList = () => {
		let { type, location_id, resultList, hasNoti, mode } = this.props;
		const status = [STATUS.READY, STATUS.RUNNING, STATUS.DONE].join(",")
		const payload = { location_id, status };
		SharedService.getListJobStep(payload)
			.then((res) => {
				let cusList = res.data.filter(d => {
					if (mode === "emergency") {
						return d.order.items[0].ref_value.type === "other"
					}
					return d.type === type
				})
				
				for (let i = 0; i < cusList.length; i++) {
					let cusList2 = cusList[i].order.items.filter(
						(eb) => {
							return eb.quantity != 0;
						}
					);
					if (cusList2.length == 0) {
						cusList.splice(i, 1);
						i--;
					}
				}
				let queryCustomer = "";
				if (hasNoti) {
					cusList.map((c) => {
						if (c.status === STATUS.RUNNING) {
							if (queryCustomer.length > 0)
								queryCustomer += "," + c.order.customer_id;
							else queryCustomer += c.order.customer_id;
						}
						resultList.forEach((r) => {
							if (r.customerId === c.job_ref_id) {
								if (c.seen && !r.seen) c.seen = false;
								else c.seen = r.seen;
							}
						});
						return c;
					});
				}
	
				this.setState({
					patientList: cusList,
					searchCus: cusList,
					queryCustomer,
				});
				if (hasNoti) this.getResult();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getResult = () => {
		const customer_id = this.state.queryCustomer;
		const date = new Date().toISOString().slice(0, 10);
		const data = {
			customer_id,
			date,
		};
		if (customer_id.length > 0) {
			SharedService.getResult(data).then((res) => {
				let data = res.data;
				let resultList = this.props.resultList;
				data.forEach((d) => {
					if (resultList.length === 0) {
						d.steps.forEach((s) => {
							if (
								s.type !== STEP_TYPE.EXAM &&
								s.type !== STEP_TYPE.BUY &&
								s.status === STATUS.DONE
							) {
								let obj = {
									jobId: s.job_id,
									customerId: s.job_ref_id,
									orderId: s.order_id,
									seen: false,
								};
								resultList.push(obj);
							}
						});
					} else {
						if (d.steps[0]?.type === STEP_TYPE.EXAM) {
							d.steps.forEach((s) => {
								if (
									s.type !== STEP_TYPE.EXAM &&
									s.type !== STEP_TYPE.BUY &&
									s.status === STATUS.DONE
								) {
									let count = 0;
									resultList.forEach((r) => {
										if (s.order_id === r.orderId) count++;
									});
									if (count === 0) {
										let obj = {
											jobId: s.job_id,
											customerId: s.job_ref_id,
											orderId: s.order_id,
											seen: false,
										};
										resultList.push(obj);
									}
								}
							});
						}
					}
				});
				this.countResult();
			});
		}
	};

	countResult = () => {
		let { patientList } = this.state;
		let resultList = this.props.resultList;
		let uniqueJobId = [];
		resultList.map((r) => {
			patientList.map((p) => {
				if (r.customerId === p.job_ref_id) {
					if (p.seen && !r.seen) p.seen = false;
					else p.seen = r.seen;
				}
				return p;
			});
		});

		this.setState({ patientList });
		uniqueJobId = resultList.filter((r) => {
			return uniqueJobId.includes(r.jobId)
				? null
				: uniqueJobId.push(r.jobId);
		});
		this.props.setNotiQuantity(uniqueJobId.length);
	};

	onSelectJobStep = (jobStep, index) => {
		// console.log('jopStep', jobStep)
		if (this.props.mode === "exam" && !this.props.inWaitingData) {
			return
		}
		if (index) this.setOpen('', index)
		if (
			Object.entries(this.state.currentPatient).length >
			0 &&
			jobStep.id == this.state.currentPatient.id
		) {
			this.setState({
				currentPatient: {},
			});
			this.props.onSelectJobStep({});
		} else {
			this.setState({ currentPatient: jobStep });
			this.props.onSelectJobStep(jobStep);
		}
		if (jobStep) {
			let comboTest = jobStep.order.items
				.map((e) => {
					if (e.quantity == 0) {
						return undefined;
					} else {
						return e.ref_value.name;
					}
				})
				.filter((e) => e != undefined);
			this.setState({ comboTest: comboTest });
		}
		this.setState({
			selectedJob: jobStep?.id,
			textFilter: "",
			tabs: "1",
		});
		if (this.props.hiddenPatientList)
			this.props.hiddenPatientList();
	};

	componentDidMount() {
		const ws = new WebSocket(WS_URL);
		ws.onopen = () => {
			ws.send("connect server ");
		}
		ws.onmessage = (e) => {
			this.setState({ isUpdate: true })
		}
		this.props.action.refresh = this.fetchPatientList;
		this.fetchPatientList();
	}

	componentDidUpdate = () => {
		if (this.state.isUpdate) {
			this.fetchPatientList();
			this.setState({ isUpdate: false });
		}
	}

	makeNewTestId = () => {
		if (this.props.ref_id) {
			ExamService.getIdByRef(this.props.ref_id).then(
				(res) => {
					let TestId = res.data.id;
					this.setState({ TestId: TestId });
				}
			);
		}
	};

	onFilterChange = (ev) => {
		const { value } = ev.target;
		let { patientList } = this.state;
		this.setState({
			textFilter: ev.target.value,
		});
		if (value.length != 0) {
			const options = {
				includeScore: true,
				keys: [
					"order.customer.full_name",
					"order.customer.code",
					"order.customer.contacts.phone",
				],
			};
			const fuse = new Fuse(patientList, options);
			const result = fuse.search(value);
			const searchResult = result
				.map((el) => el.item)
				.reverse();
			this.setState({
				searchCus: searchResult,
			});
		} else {
			this.setState({
				searchCus: patientList,
			});
		}
	};

	onSearchJobStep = (e) => {
		const text = e.target.value;
		this.setState({valueSearchPre: text})
	}
	onClickSearch = () => {
		let { valueSearchPre } = this.state
		const payload = {
			location_id: JSON.parse(sessionStorage.getItem("location")).id
		};
		if (Number.isFinite(+valueSearchPre[0])) {
			if(valueSearchPre.length >=12) {
				payload.customer_code = valueSearchPre;
			}
			
		} else {
			if(valueSearchPre.trim().length >= 6) {
				payload.full_name = valueSearchPre;
			}
		}
		console.log('payload', payload)
		if (Object.values(payload).length > 0) {
			SharedService.searchListJobStep(payload).then(
				res => {
						this.setState({ 
							searchPatientList: res.data,
							isOpenModalSearch: true
						})
					}
				).catch(err => console.log(err))
		}
	}
	outModalSearch = (check) => {
		this.setState({
			isOpenModalSearch: check
		})
	}
	sortByName = (a, b) => {
		let nameA = a.toUpperCase();
		let nameB = b.toUpperCase();
		if (nameA > nameB) return -1;
		if (nameA < nameB) return 1;
		return 0;
	};

	onSelectBarcode(e) {
		const { examEditState, examEditSetState } = this.props;
		let { TestId, resultsExam, nameDevice } = examEditState;
		let { sample_id, device } = resultsExam[e.target.value];
		if (examEditState.activeTab === "3") {
			if (e.target.checked) {
				TestId.push(sample_id);
				nameDevice.push(device);
			} else {
				TestId.splice(TestId.indexOf(sample_id), 1);
				nameDevice.splice(nameDevice.indexOf(device));
			}
			examEditSetState({
				TestId: TestId,
				nameDevice: nameDevice,
			});
		}
	}
	setOpen = (el, index) => {
		this.setState({
			open: index,
		});
	};
	selectTab = (tab) => {
		if (tab + "" === "1") {
			this.setState({ activeTab: tab })
		}
		if (tab + "" === "2") {
			this.setState({
				activeTab: tab,
			})
		}
		if (tab + "" === "3") {
			this.setState({
				activeTab: tab,
			})
		}
		if(this.props.mode === "exam") {
			this.props.selectTypeStatusTest(tab)
		}
		
	}
	render() {
		let { patientList, textFilter, comboTest, searchCus, activeTab, searchPatientList, valueSearchPre } = this.state;
		let { mode, examEditState } = this.props;
			let modeEmergency = searchCus ? ( 
				searchCus
				.filter((p) => {
					if (activeTab === '1') return p.status === STATUS.READY || p.status === STATUS.RUNNING
					if (activeTab === '3') return p.status === STATUS.RUNNING
				})
				.filter((p) => {
					if (+textFilter[0] > -1) {
						if (p.order.customer.code.includes(textFilter)) return p;
					}
					if (removeVietnameseTones(p.order.customer.full_name).includes(removeVietnameseTones(textFilter.toLocaleUpperCase()))) {
						return p;
					}
				})
				// .filter(p => p.order.customer.code.search(textFilter) >= 0)
				.map((p, index) => {
					return (
						<tr
							onClick={(e) => this.onSelectJobStep(p)}
							className={`pointer ${this.state.selectedJob == p.id &&
								examEditState &&
								examEditState.resultsExam.length
								? " active "
								: ""
								}
						${p.seen === false ? "notiResult" : ""}`} // không sửa
							key={p.id}
						>
							<td className="dw-10">{index + 1}</td>
							<td>{p.order.customer.code}</td>
							<td className="dw-60">
								<div>{p.order.customer.full_name}</div>
							</td>
							<td>
								{p.order.customer.gender == "male"
									? "nam"
									: "nữ"}
							</td>
							<td>
								{getAge(
									new Date(p.order.customer.birthday)
										.toLocaleString("en-GB")
										.slice(0, 10)
								)}
							</td>
							<td>{p.order.customer.contacts[0].phone}</td>
							<td>
								{
									p.order.customer.contacts[0].address
										.province
								}
							</td>
							<td>
								{p.status === STATUS.RUNNING
									? p.seen === false || p.seen
										? "ĐÃ CÓ KẾT QUẢ"
										: "ĐANG XÉT NGHIỆM"
									: "CHỜ KHÁM"}
							</td>
						</tr>
					);
				})) : null;
			let modeListTestDone = searchCus
			.filter(p => {
				return p.status === STATUS.DONE
			})
			.filter((p) => {
				if (+textFilter[0] > -1) {
					if (p.order.customer.code.includes(textFilter)) return p;
				}
				if (removeVietnameseTones(p.order.customer.full_name).includes(removeVietnameseTones(textFilter.toLocaleUpperCase()))) {
					return p;
				}
			})
			// .filter(p => p.order.customer.code.search(textFilter) >= 0)
			.map((p, index) => {
				return (
						<tr
							onClick={(e) => this.onSelectJobStep(p)}
							className={`pointer ${this.state.selectedJob == p.id &&
								examEditState &&
								examEditState.resultsExam.length
								? " active "
								: ""
								}
          						${p.seen === false ? "notiResult" : ""}`} // không sửa
							key={p.id}
						>
							<td className="dw-10">{index + 1}</td>
							<td>{p.order.customer.code}</td>
							<td className="dw-60">
								<div>{p.order.customer.full_name}</div>
							</td>
							<td>
								{p.order.customer.gender == "male"
									? "nam"
									: "nữ"}
							</td>
							<td>
								{getAge(
									new Date(p.order.customer.birthday)
										.toLocaleString("en-GB")
										.slice(0, 10)
								)}
							</td>
							<td>{p.order.customer.contacts[0].phone}</td>
							<td>
								{
									p.order.customer.contacts[0].address
										.province
								}
							</td>
							<td>{"HOÀN THÀNH"}</td>
						</tr>
				);
			});
		let modeExamDone = searchCus ? (
			searchCus
				.filter((p) => {
					if (activeTab === '1') {
						return p.status === STATUS.READY
					}
					if (activeTab === '3') {
						return p.status === STATUS.RUNNING
					}
					if (activeTab === '2') {
						return p.status === STATUS.DONE
					}
				})
				.filter((p) => {
					if (+textFilter[0] > -1) {
						if (p.order.customer.code.search(textFilter) >= 0) return p;
					}
					if (p.order.customer.full_name.search(textFilter.toLocaleUpperCase()) >= 0) return p;
				})
				.map((p, index) => {
					return (
						<>
							<tr
								onClick={(e) => this.onSelectJobStep(p, index)}
								className={`pointer ${this.state.selectedJob == p.id &&
									examEditState &&
									examEditState?.resultsExam.length
									? " actived "
									: ""
									}
					  ${p.seen === false ? "notiResult" : ""}`} // không sửa
								key={p.id}
							>
								<td className="dw-3">
									{index + 1}
								</td>
								<td>
									{p.order.customer.code}
								</td>
								<td className="dw-40">
									<div>
										{
											p.order.customer
												.full_name
										}
									</div>
								</td>
								<td className="status-cus">
									<p title={comboTest}>
										ComBo xét nghiệm
									</p>
								</td>
							</tr>
							{examEditState?.resultsExam.length ? examEditState?.resultsExam.map((item, index1) => {
								return (
									<tr className={p.id == this.state.currentPatient.id ? "actived" : "inactive"}>
										<td colSpan='1'>{index + 1}.{index1 + 1}</td>
										{activeTab === "3" ? <td colSpan="2">{item.device}</td> : <td colSpan="3">{item.device}</td>}
										{activeTab === "3" ? <td colSpan='1'><input onChange={(e) => this.onSelectBarcode(e)} name={item.device} value={index1} type="checkbox" /></td> : ''}
									</tr>
								)
							}) : ''}
						</>
					);
				})
		) : (
			<span></span>
		)
		let resultSearchModeExam = searchPatientList ? (
			searchPatientList
			.filter(el => {
				if(activeTab === '1') return el.status === STATUS.READY
				if(activeTab === '3') return el.status === STATUS.RUNNING
			})
			.map((p, i) => {
				return (
					<>
						<div className="table-responsive min-h-60 df-h-85">
								<table
									className="table table-head-fixed table-bordered"
									onKeyDown={(e) => Util.onKeyDown(e)}
									data-index="1"
								>
									<thead>
										<tr>
											<th className="dw-5">STT</th>
											<th className="dw-15">Mã BN</th>
											<th className="dw-60">Bệnh nhân</th>
											<th>Trạng thái</th>
											<th>Tên xét nghiệm</th>
										</tr>
									</thead>
									<tbody className="body-half-screen">
										<tr onClick={(e) => this.onSelectJobStep(p, i)}
											className={`pointer ${this.state.selectedJob == p.id &&
												examEditState &&
												examEditState?.resultsExam.length
												? " actived "
												: ""
												}
											${p.seen === false ? "notiResult" : ""}`} // không sửa
											key={p.id} 
										>
											<td>{i + 1}</td>
											<td>{p.order.customer.code}</td>
											<td className="dw-60">
												<div>{p.order.customer.full_name}</div>
											</td>
											<td>
												{
													JOB_STEP_STATUS_VN[p.status]
												}
											</td>
											<td className="status-cus">
												<p title={comboTest}>
													ComBo xét nghiệm
												</p>
											</td>
										</tr>
										{examEditState?.resultsExam.length ? examEditState?.resultsExam.map((item, index1) => {
											return (
												<tr className={p.id == this.state.currentPatient.id ? "actived" : "inactive"}>
													<td colSpan='1'>{i + 1}.{index1 + 1}</td>
													{activeTab === "3" ? <td colSpan="2">{item.device}</td> : <td colSpan="3">{item.device}</td>}
													{activeTab === "3" ? <td colSpan='1'><input onChange={(e) => this.onSelectBarcode(e)} name={item.device} value={index1} type="checkbox" /></td> : ''}
												</tr>
											)
										}) : ''}
									</tbody>
								</table>
							</div>
					</>
				)
			})
		) : null
		let resultSearchModeOther = searchPatientList.length > 0 ? (
			searchPatientList
			.filter(el => el.status === STATUS.READY || el.status === STATUS.RUNNING)
			.map((p, i) => {
				return (
					<>
						<div className="table-responsive min-h-60 df-h-85">
								<table
									className="table table-head-fixed table-bordered"
									onKeyDown={(e) => Util.onKeyDown(e)}
									data-index="1"
								>
									<thead>
										<tr>
											<th className="dw-5">STT</th>
											<th className="dw-15">Mã BN</th>
											<th className="dw-60">Bệnh nhân</th>
										</tr>
									</thead>
									<tbody className="body-half-screen">
										<tr onClick={(e) => this.onSelectJobStep(p, i)}
											className={`pointer ${this.state.selectedJob == p.id &&
												examEditState &&
												examEditState?.resultsExam.length
												? " actived "
												: ""
												}
											${p.seen === false ? "notiResult" : ""}`} // không sửa
											key={p.id} 
										>
											<td>{i + 1}</td>
											<td>{p.order.customer.code}</td>
											<td className="dw-60">
												<div>{p.order.customer.full_name}</div>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
					</>
				)
			})
		) : null
		let resultSearchModeDoctor = searchPatientList.length > 0 ? (
			searchPatientList
			.filter(el => el.status === STATUS.READY || el.status === STATUS.RUNNING)
			.map((p, i) => {
				return (
					<>
						<div className="table-responsive min-h-60 df-h-85">
								<table
									className="table table-head-fixed table-bordered"
									onKeyDown={(e) => Util.onKeyDown(e)}
									data-index="1"
								>
									<thead>
										<tr>
											<th className="dw-5">STT</th>
											<th className="dw-15">Mã BN</th>
											<th className="dw-60">Bệnh nhân</th>
											<th>Giới</th>
											<th>Tuổi</th>
											<th>SĐT</th>
											<th>Địa chỉ</th>
											<th>Trạng thái</th>
										</tr>
									</thead>
									<tbody className="body-half-screen">
										<tr onClick={(e) => this.onSelectJobStep(p, i)}
											className={`pointer ${this.state.selectedJob == p.id &&
												examEditState &&
												examEditState?.resultsExam.length
												? " actived "
												: ""
												}
											${p.seen === false ? "notiResult" : ""}`} // không sửa
											key={p.id} 
										>
											<td>{i + 1}</td>
											<td>{p.order.customer.code}</td>
											<td className="dw-60">
												<div>{p.order.customer.full_name}</div>
											</td>
											<td>
												{p.order.customer.gender == "male"
													? "nam"
													: "nữ"}
											</td>
											<td>
												{getAge(
													new Date(p.order.customer.birthday)
														.toLocaleString("en-GB")
														.slice(0, 10)
												)}
											</td>
											<td>{p.order.customer.contacts[0].phone}</td>
											<td>
												{
													p.order.customer.contacts[0].address
														.province
												}
											</td>
											<td>Chờ khám</td>
										</tr>
									</tbody>
								</table>
							</div>
					</>
				)
			})
		) : null
		let modeOtherDone = patientList ? (
			patientList
				.filter((p) => {
					if (activeTab === '1') {
						return p.status === STATUS.READY || p.status === STATUS.RUNNING
					}
					if (activeTab === '2') {
						return p.status === STATUS.DONE
					}
				})
				.filter((p) => {
					if (+textFilter[0] > -1) {
						if (p.order.customer.code.search(textFilter) >= 0) return p;
					}
					if (p.order.customer.full_name.search(textFilter.toLocaleUpperCase()) >= 0) return p;
				})
				//.filter(p => p.order.customer.code.search(textFilter) >= 0)
				// .filter(
				// 	(p) =>
				// 		p.order.customer.code.search(
				// 			textFilter
				// 		) >= 0
				// )

				.map((p, index) => {
					return (
						<tr
							onClick={(e) => {
								activeTab === '1' ? this.onSelectJobStep(p)
								: this.props.onSelectJobDone(p)
							}
								
							}
							className={`pointer ${this.state.selectedJob == p.id
								}`}
							key={p.id}
						>
							<td className="dw-10">
								{index + 1}
							</td>
							<td>{p.order.customer.code}</td>
							<td className="dw-40">
								<div>
									{p.order.customer.full_name}
								</div>
							</td>
						</tr>
					);
				})
		) : (
			<span></span>
		)
		return (
			<div className="patientList ">
				<div className="title-card mb-5">
					<span className="material-icons">people</span>{" "}
					{this.props.titleOfList}
				</div>
				<div className="patientList-search mb-3">
					<Input
						autoFocus
						style={{ fontFamily: "Arial, Material Icons" }}
						type="text"
						placeholder="&#xe8b6; Lọc theo mã, họ tên"
						value={textFilter}
						onChange={(ev) => this.onFilterChange(ev)}
					></Input>
				</div>
				<div className="tableFixHead">
					{mode === "emergency" && (
						<>
						<Nav tabs className="selectTabs" style={{position: "relative"}}>
							<NavItem className="titleTabs" style={{backgroundColor: "#fff"}}>
							<NavLink className={{ actived: activeTab === '1' }}
              				onClick={() => this.selectTab("1")}><b className="title-card">Bệnh nhân chờ cấp cứu</b></NavLink>
							</NavItem>
							<NavItem className="titleTabs" style={{backgroundColor: "#fff"}}>
							<NavLink className={{ actived: activeTab === '3' }} onClick={() => { this.selectTab('3'); }}><b className="title-card">Bệnh nhân đang cấp cứu</b></NavLink>
							</NavItem>
							<NavItem className="titleTabs" style={{backgroundColor: "#fff"}}>
							<NavLink className={{ actived: activeTab === '2' }} onClick={() => { this.selectTab('2'); }}><b className="title-card">Bệnh nhân hoàn thành</b></NavLink>
							</NavItem>
						</Nav>
							<TabContent activeTab={activeTab}>
								<TabPane tabId="1" className="customCard">
									<div className="table-responsive min-h-60 df-h-85">
										<table
											className="table table-head-fixed table-bordered"
											onKeyDown={(e) => Util.onKeyDown(e)}
											data-index="1"
										>
											<thead>
												<tr>
													<th className="dw-5">STT</th>
													<th className="dw-15">Mã BN</th>
													<th className="dw-60">Bệnh nhân</th>
													<th>Giới</th>
													<th>Tuổi</th>
													<th>SĐT</th>
													<th>Địa chỉ</th>
													<th>Trạng thái</th>
												</tr>
											</thead>
											<tbody className="body-half-screen">
												{modeEmergency}
											</tbody> 
										</table>
									</div>
								</TabPane>
								<TabPane tabId="2" className="customCard">
									<div className="table-responsive min-h-60 df-h-85">
										<table
											className="table table-head-fixed table-bordered"
											onKeyDown={(e) => Util.onKeyDown(e)}
											data-index="1"
										>
											<thead>
												<tr>
													<th className="dw-5">STT</th>
													<th className="dw-15">Mã BN</th>
													<th className="dw-60">Bệnh nhân</th>
													<th>Giới</th>
													<th>Tuổi</th>
													<th>SĐT</th>
													<th>Địa chỉ</th>
													<th>Trạng thái</th>
												</tr>
											</thead>
											<tbody className="body-half-screen">
												{modeEmergency}
											</tbody>
										</table>
									</div>
								</TabPane>
								<TabPane tabId="3" className="customCard">
									<div className="table-responsive min-h-60 df-h-85">
										<table
											className="table table-head-fixed table-bordered"
											onKeyDown={(e) => Util.onKeyDown(e)}
											data-index="1"
										>
											<thead>
												<tr>
													<th className="dw-5">STT</th>
													<th className="dw-15">Mã BN</th>
													<th className="dw-60">Bệnh nhân</th>
													<th>Giới</th>
													<th>Tuổi</th>
													<th>SĐT</th>
													<th>Địa chỉ</th>
													<th>Trạng thái</th>
												</tr>
											</thead>
											<tbody className="body-half-screen">
												{modeListTestDone}
											</tbody>
										</table>
									</div>
								</TabPane>
							</TabContent>
						</>

					)}
					{mode === "doctorDone" && (
						<>
						<Nav tabs className="selectTabs" style={{position : "relative"}}>
							<NavItem className="titleTabs" style={{backgroundColor: "#fff"}}>
							<NavLink className={{ actived: activeTab === '1' }}
              				onClick={() => this.selectTab("1")}><b className="title-card">Bệnh nhân chờ khám</b></NavLink>
							</NavItem>
							<NavItem className="titleTabs" style={{backgroundColor: "#fff"}}>
							<NavLink className={{ actived: activeTab === '2' }} onClick={() => { this.selectTab('2'); }}><b className="title-card">Bệnh nhân hoàn thành</b></NavLink>
							</NavItem>
						</Nav>
							<TabContent activeTab={activeTab}>
								<TabPane tabId="1" className="customCard">
									<div className="table-responsive min-h-60 df-h-85">
										<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Ngày {new Date().toLocaleDateString("en-gb")} (có {modeEmergency.length} bệnh nhân)
											</span>
										</div>
										<div className="table-responsive min-h-40 df-h-45">
											<table
												className="table table-head-fixed table-bordered"
												onKeyDown={(e) => Util.onKeyDown(e)}
												data-index="1"
											>
												<thead>
													<tr>
														<th className="dw-5">STT</th>
														<th className="dw-15">Mã BN</th>
														<th className="dw-60">Bệnh nhân</th>
														<th>Giới</th>
														<th>Tuổi</th>
														<th>SĐT</th>
														<th>Địa chỉ</th>
														<th>Trạng thái</th>
													</tr>
												</thead>
												<tbody className="body-half-screen">
													{modeEmergency}
												</tbody>
											</table>
										</div>
										<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Tìm kiếm bệnh nhân từ ngày {convertToStrDate((Date.now() - 3 * ONE_DAY -1))} đến ngày {convertToStrDate(Date.now() - ONE_DAY -1)}
											</span>
										</div>
										<div className="patientList-search mb-3">
											<Row>
												<Col sm={9}>
													<Input
														autoFocus
														style={{ fontFamily: "Arial, Material Icons" }}
														type="text"
														value={valueSearchPre}
														placeholder="&#xe8b6; Lọc theo mã, họ tên đầy đủ (không phân biệt hoa thường và dấu)"
														onChange={(ev) => this.onSearchJobStep(ev)}
													></Input>
												</Col>
												<Col sm={3} className="end">
													<Button  onClick={() => this.onClickSearch()}>Tìm kiếm</Button>
												</Col>
											</Row>
											<SearchPrevious3Days mode="doctor" onSelectJobStep={this.onSelectJobStep} patientList = {this.state.searchPatientList} outModalSearch = {this.outModalSearch} isOpenModalSearch = {this.state.isOpenModalSearch} selectTab = {this.selectTab} />
											{resultSearchModeDoctor}
										</div>
									</div>
								</TabPane>
								<TabPane tabId="2" className="customCard">
									<div className="table-responsive min-h-60 df-h-85">
										<table
											className="table table-head-fixed table-bordered"
											onKeyDown={(e) => Util.onKeyDown(e)}
											data-index="1"
										>
											<thead>
												<tr>
													<th className="dw-5">STT</th>
													<th className="dw-15">Mã BN</th>
													<th className="dw-60">Bệnh nhân</th>
													<th>Giới</th>
													<th>Tuổi</th>
													<th>SĐT</th>
													<th>Địa chỉ</th>
													<th>Trạng thái</th>
												</tr>
											</thead>
											<tbody className="body-half-screen">
												{modeListTestDone}
											</tbody>
										</table>
									</div>
								</TabPane>
							</TabContent>
						</>

					)}
					{mode === "exam" && (
						<>
						<Nav tabs className="selectTabs">
							<NavItem className="titleTabs">
							<NavLink className={{ active: activeTab === '1' }}
              				onClick={() => this.selectTab("1")}><b className="title-card">Bệnh nhân chờ lấy mẫu</b></NavLink>
							</NavItem>
							<NavItem className="titleTabs">
							<NavLink className={{ active: activeTab === '3' }} onClick={() => { this.selectTab('3'); }}><b className="title-card">Bệnh nhân đang chờ XN</b></NavLink>
							</NavItem>
							<NavItem className="titleTabs">
							<NavLink className={{ active: activeTab === '2' }} onClick={() => { this.selectTab('2'); }}><b className="title-card">Bệnh nhân có kết quả</b></NavLink>
							</NavItem>
						</Nav>

							<TabContent activeTab={activeTab}>
								<TabPane tabId="1" className="customCard">
									<div
										className="table-responsive min-h-60 df-h-61"
									>
										<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Ngày {new Date().toLocaleDateString("en-gb")} (có {modeExamDone.length} bệnh nhân)
											</span>
										</div>
										<div className="table-responsive min-h-30 df-h-31">
										{!modeExamDone.length > 0 ?
											<>
												<Progress
													style={{height : 40, width : 600}}
													color="success"
													animated
													striped
													value={100}
												>Loading....</Progress>
											</>:
											<table className="table table-head-fixed table-bordered">
												<thead>
													<tr>
														<th className="dw-3">STT</th>
														<th>Mã bệnh nhân</th>
														<th className="dw-40">Bệnh nhân</th>
														<th>Tên Xét nghiêm</th>
													</tr>
												</thead>
													<tbody> {modeExamDone} </tbody>
											</table> }
										</div>
										<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Tìm kiếm bệnh nhân từ ngày {convertToStrDate((Date.now() - 3 * ONE_DAY -1))} đến ngày {convertToStrDate(Date.now() - ONE_DAY -1)}
											</span>
										</div>
										<div className="patientList-search mb-3">
											<Row>
												<Col sm={9}>
													<Input
														autoFocus
														style={{ fontFamily: "Arial, Material Icons" }}
														type="text"
														value={valueSearchPre}
														placeholder="&#xe8b6; Lọc theo mã, họ tên đầy đủ (không phân biệt hoa thường và dấu)"
														onChange={(ev) => this.onSearchJobStep(ev)}
													></Input>
												</Col>
												<Col sm={3} className="end">
													<Button  onClick={() => this.onClickSearch()}>Tìm kiếm</Button>
												</Col>
											</Row>
											<SearchPrevious3Days mode="exam" onSelectJobStep={this.onSelectJobStep} patientList = {this.state.searchPatientList} isOpenModalSearch = {this.state.isOpenModalSearch} outModalSearch = {this.outModalSearch} selectTab = {this.selectTab} />
											{resultSearchModeExam}
										</div>
									</div>
								</TabPane>
								<TabPane tabId="2" className="customCard">
									<div
										className="table-responsive min-h-60 df-h-61"
									>
										<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Ngày {new Date().toLocaleDateString("en-gb")} (có {modeExamDone.length} bệnh nhân)
											</span>
										</div>
											<table className="table table-head-fixed table-bordered">
												<thead>
													<tr>
														<th className="dw-3">STT</th>
														<th>Mã bệnh nhân</th>
														<th className="dw-40">Bệnh nhân</th>
														<th>Tên Xét nghiêm</th>
													</tr>
												</thead>
												<tbody>
													{modeExamDone}
												</tbody>
											</table>
									</div>
								</TabPane>
								<TabPane tabId="3" className="customCard">
									<div
										className="table-responsive min-h-60 df-h-61"
									>
										<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Ngày {new Date().toLocaleDateString("en-gb")} (có {modeExamDone.length} bệnh nhân)
											</span>
										</div>
										<div className="table-responsive min-h-30 df-h-31">
											<table className="table table-head-fixed table-bordered">
												<thead>
													<tr>
														<th className="dw-3">STT</th>
														<th>Mã bệnh nhân</th>
														<th className="dw-40">Bệnh nhân</th>
														<th>Tên Xét nghiêm</th>
													</tr>
												</thead>
												<tbody>
													{modeExamDone}
												</tbody>
											</table>
										</div>
										<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Tìm kiếm bệnh nhân từ ngày {convertToStrDate((Date.now() - 3 * ONE_DAY -1))} đến ngày {convertToStrDate(Date.now() - ONE_DAY -1)}
											</span>
										</div>
										<div className="patientList-search mb-3">
											<Row>
												<Col sm={9}>
													<Input
														autoFocus
														style={{ fontFamily: "Arial, Material Icons" }}
														type="text"
														value={valueSearchPre}
														placeholder="&#xe8b6; Lọc theo mã, họ tên đầy đủ (không phân biệt hoa thường và dấu)"
														onChange={(ev) => this.onSearchJobStep(ev)}
													></Input>
												</Col>
												<Col sm={3} className="end">
													<Button  onClick={() => this.onClickSearch()}>Tìm kiếm</Button>
												</Col>
											</Row>
											<SearchPrevious3Days mode="exam" onSelectJobStep={this.onSelectJobStep} patientList = {this.state.searchPatientList} outModalSearch = {this.outModalSearch} isOpenModalSearch = {this.state.isOpenModalSearch} selectTab = {this.selectTab} />
											{resultSearchModeExam}
										</div>
									</div>
								</TabPane>
							</TabContent>
						</>
					)}
					{/* {mode === "examDone" && (
						<>
							<div className="table-responsive min-h-60 df-h-61">
								<table className="table table-head-fixed table-bordered">
									<thead>
										<tr>
											<th className="dw-3">STT</th>
											<th>Mã bệnh nhân</th>
											<th className="dw-40">Bệnh nhân</th>
											<th>Tên Xét nghiêm</th>
										</tr>
									</thead>
									<tbody className="bodyTable">
										{patientList ? (
											patientList
												.filter(
													(p) =>
														p.order.customer.code.search(
															textFilter
														) >= 0
												)
												.map((p, index) => {
													return (
														<>
															<tr
																onClick={(e) =>
																	this.onSelectJobStep(p)
																}
																className={`pointer${this.state.selectedJob ==
																	p.id &&
																	examEditState.resultsExam
																		.length
																	? " active"
																	: ""
																	}`}
																key={p.id}
															>
																<td className="dw-3">
																	{index + 1}
																</td>
																<td>
																	{p.order.customer.code}
																</td>
																<td className="dw-40">
																	<div>
																		{
																			p.order.customer
																				.full_name
																		}
																	</div>
																</td>
																<td className="status-cus">
																	<p title={comboTest}>
																		ComBo xét nghiệm
																	</p>
																</td>
															</tr>
															{comboTest &&
																comboTest.map(
																	(item, index1) => {
																		return (
																			<tr
																				className={
																					p.id ==
																						this.state
																							.currentPatient.id
																						? "active"
																						: "inactive"
																				}
																			>
																				<td colSpan="1">
																					{index + 1}.
																					{index1 + 1}
																				</td>
																				<td colSpan="3">
																					{item}
																				</td>
																			</tr>
																		);
																	}
																)}
														</>
													);
												})
										) : (
											<span></span>
										)}
									</tbody>
								</table>
							</div>
						</>
					)} */}
					{mode === "other" && (
						<>
						<Nav tabs className="selectTabs">
							<NavItem className="titleTabs">
							<NavLink className={{ active: activeTab === '1' }}
              				onClick={() => this.selectTab("1")}><b className="title-card">Bệnh nhân chờ</b></NavLink>
							</NavItem>
							<NavItem className="titleTabs">
							<NavLink className={{ active: activeTab === '2' }} onClick={() => { this.selectTab('2'); }}><b className="title-card">Bệnh nhân có kết quả</b></NavLink>
							</NavItem>
						</Nav>
						<TabContent activeTab={activeTab}>
							<TabPane tabId="1" className="customCard">
							<div className="table-responsive min-h-60 df-h-60">
								<div className="five-days mb-10 p-20 fontsz-20 mt-10">
									<span>
										Ngày {new Date().toLocaleDateString("en-gb")} (có {modeOtherDone.length} bệnh nhân)
									</span>
								</div>
								<div className="table-responsive min-h-35 df-h-35">
									<table className="table table-head-fixed table-bordered">
										<thead>
											<tr>
												<th className="dw-10">STT</th>
												<th>Mã bệnh nhân</th>
												<th>Bệnh nhân</th>
											</tr>
										</thead>
										<tbody className="bodyTable">
											{modeOtherDone}
										</tbody>
									</table>
								</div>
								<div className="five-days mb-10 p-20 fontsz-20 mt-10">
											<span>
												Tìm kiếm bệnh nhân từ ngày {convertToStrDate((Date.now() - 3 * ONE_DAY -1))} đến ngày {convertToStrDate(Date.now() - ONE_DAY -1)}
											</span>
										</div>
										<div className="patientList-search mb-3">
											<Row>
												<Col sm={9}>
													<Input
														autoFocus
														style={{ fontFamily: "Arial, Material Icons" }}
														type="text"
														value={valueSearchPre}
														placeholder="&#xe8b6; Lọc theo mã, họ tên đầy đủ (không phân biệt hoa thường và dấu)"
														onChange={(ev) => this.onSearchJobStep(ev)}
													></Input>
												</Col>
												<Col sm={3} className="end">
													<Button  onClick={() => this.onClickSearch()}>Tìm Kiếm</Button>
												</Col>
											</Row>
											<SearchPrevious3Days mode="other" onSelectJobStep={this.onSelectJobStep} patientList = {this.state.searchPatientList} outModalSearch = {this.outModalSearch} isOpenModalSearch = {this.state.isOpenModalSearch} selectTab = {this.selectTab} />
											{resultSearchModeOther}
										</div>
								</div>
							</TabPane>
							<TabPane tabId="2" className="customCard">
							<div className="table-responsive min-h-60 df-h-60">
								<div className="table-responsive min-h-35 df-h-35">
									<table className="table table-head-fixed table-bordered">
										<thead>
											<tr>
												<th className="dw-10">STT</th>
												<th>Mã bệnh nhân</th>
												<th>Bệnh nhân</th>
											</tr>
										</thead>
										<tbody className="bodyTable">
											{modeOtherDone}
										</tbody>
									</table>
								</div>
							</div>
							</TabPane>
						</TabContent>
						</>
					)}
				</div>
			</div>
		);
	}
}

export default PatientList;
