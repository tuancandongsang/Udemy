import React, { Component } from 'react';
import { DATE, ROLE } from "../../../../../../Constances/const";
import { DataTable } from "../../../../../../Shared/Components/DataTable/DataTable";
import { AuthService } from "../../../../../../Shared";
class TableUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            confirmMessage: '',
            notiMessage: '',
            headers : ["STT", "Tên Đăng Nhập", "Tên Người Dùng", "Vai Trò", "Ngày Bắt Đầu", "Số ĐT", "Ngày Sinh", "Tùy Chỉnh"]
        }
    }

    render() {
        const { userList } = this.props;
        const { headers } = this.state;
        const ConvertRole = (array) => {
            const values = Object.values(ROLE);
            const result = array.map(role => {
                return values.find(v => {
                    if (v.value === role) {
                        return v.name
                    }
                })
            })
            return result.map(r => r.name).join(" - ");
        }
        
        const body = userList.map((u,i) => {
            return {
                id : u.id,
                index : i + 1,
                username : u.username,
                full_name : u.full_name,
                roles : ConvertRole(u.roles),
                start : DATE(u.ctime, "DDMMYYYY"),
                phone : u.phone,
                birthday : DATE(u.birthday, "DDMMYYYY"),
                event : ""
            }
        })

        const parentCallBack = (id) => {
            this.props.onDelete(id)
        }

        const btnCallBack = (id) => {
            window.location.assign(`/app/user/setpassword/${id}`)
        }

        const buttons = {
            name: "Đổi mật khẩu",
            event : (id) => btnCallBack(id),
            options : AuthService.isRole(ROLE.ADMIN.value)
        }

        return (
            <div className="table-responsive min-h-100 df-h-73">
                <DataTable headers={headers} body={body} parentCallBack={parentCallBack} buttons={buttons}/>
            </div>
        )
    }
}
export default TableUser
