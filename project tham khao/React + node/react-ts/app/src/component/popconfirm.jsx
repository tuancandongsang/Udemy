import { Button, message, Popconfirm } from "antd";
import React from "react";
import { removeItem, cleardataApp } from "../app/todoReducer.ts";
import { useDispatch, useSelector } from "react-redux";

function Popcon(props) {
  const { id, firstName, userid } = props;
  const { paramGet } = useSelector((state) => state.listTodos);
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(cleardataApp());
    dispatch(removeItem({ id, paramGet }));
  };

  const cancel = () => {
    message.error("No Change");
  };
  return (
    <>
      <Popconfirm
        title={`${firstName}`}
        description="Delete it ???"
        onConfirm={() => deleteItem(id)}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger className="button-item">
          Delete
        </Button>
      </Popconfirm>
    </>
  );
}

export default Popcon;
