import { Button, message, Popconfirm } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../app/todoReducer.ts";

function Popcon(props) {
  const { id, firstName } = props;
  const dispatch = useDispatch();

  const deleteItem = (id) => {
    dispatch(removeItem(id));
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
        <Button danger className="button-item">Delete</Button>
      </Popconfirm>
    </>
  );
}

export default Popcon;
