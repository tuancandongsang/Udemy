import React, {
	useState,
	Fragment,
	useEffect,
} from "react";
import {
	Button,
	FormGroup,
	Input,
	Col,
	Row,
	Label,
} from "reactstrap";
import { Multiselect } from "multiselect-react-dropdown";
import ProductService from "../Shared/ProductService";
import { Link } from "react-router-dom";
import { MATERIAL_UNIT } from "../../../../Constances/const";
import ModalConfirm from "../../../../Shared/Components/ModalConfirm/ModalConfirm";
import ModalNoti from "../../../../Shared/Components/ModalNoti/ModalNoti";

const FormMaterial = () => {
	const [material, setMaterial] = useState({
		name: "",
	});
	const [listProducer, setListProducer] = useState([]);
	const [part, setPart] = useState([]);
	const [listParts, setlistParts] = useState([]);
	const [arrSelected, setArrSelected] = useState([]);
    const [notiMessage, setNotiMessage] = useState("");
	const [isBack, setIsBack] = useState(true);
	let str = '/app/product/material/';
	let url = window.location.pathname;
	let id = url.slice(str.length)
	useEffect(() => {
		ProductService.listProducer()
			.then((res) => {
				setListProducer(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [id, ]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setMaterial((material) => ({
			...material,
			[name]: value,
		}));
	};
	const onSubmitMaterial = () => {
		if(material.producer_id === "Chọn nhà sản xuất" || !material.producer_id) {
			setIsBack(false);
			setNotiMessage("Bạn chưa chọn nhà sản xuất")
            return
        }
        if(material.unit === "Chọn đơn vị" || !material.unit) {
            setIsBack(false);
			setNotiMessage("Bạn chưa chọn đơn vị")
            return
        }
		if( id == 0) {
			ProductService.postMaterial(material)
				.then(
					setNotiMessage("Thêm mới vật tư thành công!")
				)
				.catch((err) => {
					console.log("Có lỗi xảy ra!", err)
					setNotiMessage("Có lỗi xảy ra!")
				});
		}else {
			// ProductService.updateMaterial(data)
            // 	.then(
            //         setNotiMessage("Cập nhật thành công!")
            //     ).catch((err) => {
            //         setNotiMessage("Lỗi vui lòng bạn thử lại sau !!");
            //         console.log(err);
            //     });
		}
		
	};
	const listP = listProducer.map((data, i) => {
		return (
			<option value={data.id} key={i}>
				{data.name}
			</option>
		);
	});
	
	const doneAlert = () => {
        if (notiMessage && isBack) {
            window.history.back();
        } else {
			setNotiMessage("");
			setIsBack(true);
        }
    }
	return (
		<Fragment>
			<div className="material-form">
				<ModalNoti message={notiMessage} done={doneAlert}></ModalNoti>
					<h1 className="title-card-lg middle upper">
						{id == 0 ? "Thêm mới vật tư" : "Chỉnh sửa vật tư"}
					</h1>
				<Col xs={{ size: "10", offset: "1" }}>
					<Row>
						<Col xs={2}>
							<Label>Tên</Label>
						</Col>
						<Col xs={8}>
							<Input
								type="name"
								name="name"
								id="name"
								placeholder="Nhập tên vật tư..."
								// value={material.name}
								onChange={(e) => handleChange(e)}
							/>
						</Col>
					</Row>
				</Col>
				<Col xs={{ size: "10", offset: "1" }}>
					<Row>
						<Col xs={2}>
							<Label>Nhà sản xuất</Label>
						</Col>
						<Col xs={8}>
							<Input
								type="select"
								name="producer_id"
								id="producer_id"
								value={material.producer_id}
								onChange={(e) => handleChange(e)}
							>
								<option>Chọn nhà sản xuất</option>
								{listP}
							</Input>
						</Col>
					</Row>
				</Col>
				<Col xs={{ size: "10", offset: "1" }}>
					<Row>
						<Col xs={2}>
							<Label>Đơn vị</Label>
						</Col>
						<Col xs={8}>
							<Input
								type="select"
								name="unit"
								id="unit"
								value={material.unit}
								placeholder="Nhập đơn vị..."
								onChange={(e) => handleChange(e)}
							>
								<option>Chọn đơn vị</option>
								{MATERIAL_UNIT.map((u) => {
									return (
										<option value={u.code}>
											{u.label}
										</option>
									);
								})}
							</Input>
						</Col>
					</Row>
				</Col>
	
				<Col xs={{ size: "10", offset: "1" }}>
					<Row>
						<Col xs={2}>
							<Label>Ghi chú</Label>
						</Col>
						<Col xs={8}>
							<Input
								type="input"
								name="note"
								id="note"
								value={material.description}
								placeholder="Ghi chú ..."
								onChange={(e) => handleChange(e)}
							/>
						</Col>
					</Row>
				</Col>
				<div className="button-action">
					<Button
						className="btn-secondary"
						onClick={()=>onSubmitMaterial()}
					>
						{id == 0 ? 'Thêm mới' : 'Cập nhật'}
					</Button>
					<Link to="/app/product/material">
						<Button className="btn-danger ml-20">
							Huỷ bỏ
						</Button>
					</Link>
				</div>
			</div>
		</Fragment>
	);
};

export default FormMaterial;
