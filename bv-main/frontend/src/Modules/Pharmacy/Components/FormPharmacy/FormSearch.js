import React, { useState } from 'react';
import { Input, Table } from 'reactstrap';
import PharmacyService from '../Shared/PharmacyService';
import { ModalNoti } from "../Shared"

const FormSearch = (props) => {
    const [list, setList] = useState([]);

    const [pattern, setPattern] = useState('');

    const [notiMessage, setNotiMessage] = useState('');

    const [focusSearch, setFocusSearch] = useState(false);

    const onFocusSearch = () => {
        setFocusSearch(true);
    }
    const onBlurSearch = () => {
        if(pattern.length === 0){
            setFocusSearch(false);
        }  
    }
    const onChangeSearch = (e) => {    
        setPattern(e.target.value);

        if(pattern.length>0){
            setFocusSearch(true);
            PharmacyService.searchProduct(pattern)
            .then(res => {
                res.data.map(i => {
                    const ALMOST_OUT =100;
                    const NORMAL = 300;
                    i.item.color = i.item.totalRemain<ALMOST_OUT ? '#d26d69' : i.item.totalRemain < NORMAL ? '#28b76b' : 'black';
                    return i;
                })
                setList(res.data);
            }).catch(err => {
                console.log(err);      
            });
        }
    } 

    const addMed = (ev, item) => {
        if(item.oldestLot){
            setPattern('');
            setFocusSearch(false)
            props.onSelect(item);
        }else{
            setNotiMessage('Sản phẩm này hiện đang không bán!');
        }
    }
    
    const doneAlert = () => {
        setNotiMessage('');
    }
    let itemSearch = list.map((data, i) => {
        return (
            <tr className="pointer" key={i}  onClick={(ev) => addMed(ev, data.item)} >
                <td> {data.item.id} </td>
                <td> {data.item.name} </td>
                <td>{data.item.parts.map((p,index) => {
                        return <span key={index}>{p.name}, </span>
                    })} 
                </td>   
                <td> {new Intl.NumberFormat('de-DE').format(data.item.price)}đ </td>
                <td> { data.item.oldestLot?  data.item.oldestLot.code : 'Không có'} </td>
                <td> { data.item.oldestLot?  data.item.oldestLot.remain : 'Không có'} </td>
                <td> <span style={{ 'color' : data.item.color }}>{data.item.totalRemain}</span> </td>
            </tr>
        );
    });
    
    return (
        <div className="filter">
            <div>
                <Input onChange={e => onChangeSearch(e)}
                    className="pattern-product"
                    placeholder='Nhập tên thuốc'
                    value={pattern}
                    disabled={props.order_id !== ''}
                    onFocus={onFocusSearch}
                    onBlur={onBlurSearch}
                />
            </div>
        {pattern !== '' ?
            <div>
                <Table size="sm" hover striped bordered className="list-prescription">
                    <thead>
                        <tr>
                            <th>Mã</th>
                            <th>Tên</th>
                            <th>Thành phần</th>
                            <th>Giá</th>
                            <th>Lô cũ nhất</th>
                            <th>Tồn kho lô</th>
                            <th>Tổng tồn kho</th>   
                        </tr>
                    </thead>
                    <tbody>
                        {itemSearch}
                    </tbody>
                </Table>
            </div>
        : null  }
        {focusSearch ? <div className="pharmacy-opacity pharmacy-opacity-top"></div> : null}
        {/* {focusSearch ? <div className="pharmacy-opacity pharmacy-opacity-bot"></div> : null} */}
        <ModalNoti message={notiMessage} done={doneAlert}></ModalNoti>
        </div>
    )
}

export default FormSearch;