import { DeleteOutlined } from "@ant-design/icons";
import { Col, Radio, Result, Row, Table, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLettter";
import {
  checkOut,
  clearCart,
  decreaseCart,
  getTotals,
  increaseCart,
  inputAmountCart,
  removeFromCart,
} from "./cartSlice";
import "./styles.scss";
import emptyCart from "../../assets/img/icons/empty-cart.png";

Cart.prototype = {};
function Cart(props) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleIncreaseCart = (product) => {
    dispatch(increaseCart(product));
  };
  const handleInputAmountCart = (product) => {
    dispatch(inputAmountCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const [isCheckOut, setIsCheckOut] = useState(false);
  const handleCheckOut = async () => {
    await dispatch(checkOut());
    window.scrollTo({ top: 0 });
    setIsCheckOut(true);
    await dispatch(clearCart());
  };
  const dataSource = cart.cartItems;
  const [hover, setHover] = useState(""); /// to check onhover delete icon
  const columns = [
    {
      title: "SẢN PHẨM",
      key: "name",
      width: "35%",
      render: (record) => (
        <>
          <img
            src={record.image}
            alt="product"
            width={168}
            height={180}
            style={{ marginRight: "20px" }}
          />
          {capitalizeFirstLetter(record.name)}
        </>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      key: "price",
      width: "15%",

      render: (price) => <>${price}</>,
    },
    {
      title: "SỐ LƯỢNG",
      key: "cartQuantity",
      width: "25%",

      render: (record) => (
        <div className="cart-quantity">
          <button onClick={() => handleDecreaseCart(record)}>-</button>
          <input
            type="number"
            value={record.cartQuantity}
            onChange={(e) => {
              handleInputAmountCart({
                ...record,
                cartQuantity: e.target.value,
                fromProductPage: true,
              });
            }}
          />
          <button onClick={() => handleIncreaseCart(record)}>+</button>
        </div>
      ),
    },
    {
      title: "TỔNG",
      key: "total",
      width: "25%",

      render: (record) => (
        <>
          ${record.price * record.cartQuantity}
          {record.id === hover ? (
            <Tooltip placement="top" title="Xoá sản phẩm">
              <DeleteOutlined
                onClick={(event) => {
                  event.stopPropagation();
                  handleRemoveFromCart(record);
                }}
                style={{
                  position: "absolute",
                  right: "10%",
                  verticalAlign: "center",
                  fontSize: "130%",
                }}
              />
            </Tooltip>
          ) : null}
        </>
      ),
    },
  ];
  const [delivery, setDelivery] = useState(1);

  const onChange = (e) => {
    setDelivery(e.target.value);
  };
  return (
    <>
      {isCheckOut === true ? (
        <Result
          style={{ paddingTop: "13%" }}
          status="success"
          title="Đặt hàng thành công!"
          subTitle="Cảm ơn bạn đã mua hàng tại The Bad Habits Store"
          extra={[
            <Link to={"/home"} className="primary-btn mt-5 continue-btn">
              Trang chủ
            </Link>,
          ]}
        />
      ) : cart.cartTotalQuantity === 0 ? (
        <Row style={{ padding: "50px" }}>
          <Col offset={8} span={8}>
            <h1 className="text-center mb-50">GIỎ HÀNG CỦA BẠN ĐANG TRỐNG</h1>
            <img
              width={"60% "}
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              src={emptyCart}
              alt="empty-cart"
            />
          </Col>
          <Col span={8}>
            <Link to={"/home"} className="primary-btn continue-btn float-end">
              Tiếp tục mua hàng
            </Link>
          </Col>
        </Row>
      ) : (
        <div className="cart-page">
          <div className="container">
            <Row style={{ padding: "50px 0" }}>
              <Col offset={8} span={8}>
                <h1 className="text-center">Giỏ hàng của bạn</h1>
              </Col>
              <Col span={8}>
                <Link
                  to={"/home"}
                  className="primary-btn continue-btn float-end"
                >
                  Tiếp tục mua hàng
                </Link>
              </Col>
            </Row>
            <Table
              className="cart-table"
              dataSource={dataSource}
              columns={columns}
              pagination={false}
              rowKey="id"
              onRow={(r) => ({
                onMouseEnter: () => {
                  setHover(r.id);
                },
                onMouseLeave: () => {
                  setHover("");
                },
              })}
            />
            <Row>
              <Col offset={12} span={12}>
                <h5 className="text fw-bolder m-5 float-end">
                  Tạm tính: ${cart.cartTotalAmount}
                </h5>
              </Col>
            </Row>
          </div>
          <div className="shopping-method">
            <div className="container">
              <Row>
                <div className="shipping-info">
                  <h5>Dịch vụ vận chuyển:</h5>
                </div>
              </Row>
              <Row className="chose-shipping">
                <Radio.Group
                  onChange={onChange}
                  value={delivery}
                  style={{ width: "100%" }}
                >
                  <Row>
                    <Col span={8}>
                      <Radio value={1}>
                        Chuyển phát thông thường
                        <p>Dự kiến 1 tuần</p>
                      </Radio>
                    </Col>
                    <Col span={8}>
                      <Radio value={2}>Chuyển phát nhanh</Radio>
                    </Col>
                    <Col span={8}>
                      <Radio value={3}>Lấy tại cửa hàng</Radio>
                    </Col>
                  </Row>
                </Radio.Group>
              </Row>

              <div className="total-info">
                <div className="total-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Tạm tính</th>
                        <th>Khuyến mãi</th>
                        <th>Phí vận chuyển</th>
                        <th className="total-cart">Tổng hoá đơn</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="total">${cart.cartTotalAmount}</td>
                        <td className="coupon">$10</td>
                        <td className="shipping">$10</td>
                        <td className="total-cart-p">
                          ${cart.cartTotalAmount}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row">
                  <div className="col-lg-12 text-right">
                    <button
                      onClick={handleCheckOut}
                      className="primary-btn chechout-btn"
                    >
                      Proceed to checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Cart;
