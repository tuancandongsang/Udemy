import React, { useState } from 'react';
import { Input, Table } from 'reactstrap';
import PharmacyService from '../../../../Pharmacy/Components/Shared/PharmacyService';
import ModalNoti from '../../../../../Shared/Components/ModalNoti/ModalNoti'
import { ONE_DAY, PRODUCT_UNIT } from '../../../../../Constances/const';

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
                let arr = res.data.filter (i => {
                    if(i.item.oldestLot){
                        let result = remainDate(i.item.oldestLot.exp_date);
                        if (result < 31) {
                            i.item.oldestLot.color = '#e09491';
                        } else if (result < 91) {
                            i.item.oldestLot.color = '#80d1a6';
                        } else {
                            i.item.oldestLot.color = 'black';
                        }                
                        const ALMOST_OUT =100;
                        const NORMAL = 300;
                        i.item.color = i.item.totalRemain<ALMOST_OUT ? '#d26d69' : i.item.totalRemain < NORMAL ? '#28b76b' : 'black';
                        return i;
                    }
                })
                console.log(arr, "test")
                setList(arr);
            }).catch(err => {
                console.log(err);      
            });
        }
    } 
    const onKeyDown = (e) => {
        if(e.keyCode === 13 && list.length > 0 && pattern){
            setPattern('');
            setFocusSearch(false)
            props.onSelect(list[0].item);
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
    const remainDate = (exp_date) => {
        let now = Date.now();
        let time = new Date(exp_date).getTime();
        let result = (time - now) / ONE_DAY;
        return Math.ceil(result);
    }
    const doneAlert = () => {
        setNotiMessage('');
    }
    let itemSearch = list.map((data, i) => {
        console.log(`data`, data)
        return (
            <tr className="pointer" key={i}  onClick={(ev) => addMed(ev, data.item)} >
                <td> {data.item.name} </td>
                <td>{data.item.parts.map((p,index) => {
                        return <span key={index}> {p.name}({p.quantity}), </span>
                    })} 
                </td>   
                <td> {PRODUCT_UNIT.map(p => {
                    return p.code === data?.item.unit ? <span>{ p.label }</span> : <span></span>
                })} </td>
                <td> {new Intl.NumberFormat('de-DE').format(data.item.price)}đ </td>
                <td> <span style={{ 'color' : data.item.oldestLot.color }}>{ data.item.oldestLot?  data.item.oldestLot.code : 'Null'}</span> </td>
                <td> { data.item.oldestLot?  data.item.oldestLot.remain : 'Null'} </td>
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
                    onKeyDown={onKeyDown}
                />
            </div>
        {pattern !== '' ?
            <div>
                <Table size="sm" hover striped bordered className="list-prescription">
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Hoạt chất</th>
                            <th>Đơn vị</th>
                            <th>Giá</th>
                            <th>Lô cũ nhất</th>
                            <th>Tồn kho</th>
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