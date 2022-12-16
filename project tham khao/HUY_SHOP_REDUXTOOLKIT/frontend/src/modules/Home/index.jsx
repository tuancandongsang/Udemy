import React from "react";
import "./styles.scss";
import { Carousel, Col, Row } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import deliveryIcon from "../../assets/img/icons/delivery.png";
import voucherIcon from "../../assets/img/icons/voucher.png";
import salesIcon from "../../assets/img/icons/sales.png";
import slider1 from "../../assets/img/slider/slider1.jpeg";
import slider2 from "../../assets/img/slider/slider2.webp";
import slider3 from "../../assets/img/slider/slider3.webp";
import f_deliveryIcon from "../../assets/img/icons/f-delivery.png";
import f_coinIcon from "../../assets/img/icons/coin.png";
import f_chatIcon from "../../assets/img/icons/chat.png";

Home.propTypes = {};

function Home(props) {
  return (
    <>
      <div className="header-info">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="header-item">
                <img src={deliveryIcon} alt="delivery" />
                <p>Miễn phí vận chuyển nội thành</p>
              </div>
            </div>
            <div className="col-md-4 text-left text-lg-center">
              <div className="header-item">
                <img src={voucherIcon} alt="voucher" />
                <p>Khuyến mãi 20% cho sinh viên</p>
              </div>
            </div>
            <div className="col-md-4 text-left text-xl-right">
              <div className="header-item">
                <img src={salesIcon} alt="sales" />
                <p>Khuyến mãi 30% ngày cuối năm. Sử dụng code: 30OFF</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Slider  */}
      <Carousel autoplay>
        <div>
          <div
            className="single-slider-item"
            style={{
              backgroundImage: `url(${slider3})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h1>2022</h1>
                  <h2>Collection</h2>
                  <a href="http://localhost:3002/home" className="primary-btn">
                    See More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="single-slider-item "
            style={{
              backgroundImage: `url(${slider2})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h1>2022</h1>
                  <h2>Collection</h2>
                  <a href="http://localhost:3002/home" className="primary-btn">
                    See More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            className="single-slider-item"
            style={{
              backgroundImage: `url(${slider1})`,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h1>2022</h1>
                  <h2>Collection</h2>
                  <a href="http://localhost:3002/home" className="primary-btn">
                    See More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Carousel>
      {/* Hero Slider End */}

      {/* Features Section Begin */}

      <div className="features-ads">
        <Row>
          <Col span={5} offset={2}>
            <div className="single-features-ads first">
              <img src={f_deliveryIcon} alt="" />
              <h4>Miễn phí vận chuyển</h4>
              <p>
                Miễn phí vận chuyển nội thành Hà Nội hoặc với hoá đơn trên 1
                triệu đồng khi mua sản phẩm tại thông qua Website của Bad
                Habits.
              </p>
            </div>
          </Col>
          <Col span={6} offset={2}>
            <div className="single-features-ads second">
              <img src={f_coinIcon} alt="" />
              <h4>Hoàn trả 100%</h4>
              <p>
                Bad Habits store sẽ hoàn trả 100% giá trị của sản phẩm nếu như
                quý khách phát hiện lỗi.
              </p>
            </div>
          </Col>
          <Col span={6} offset={1}>
            <div className="single-features-ads">
              <img src={f_chatIcon} alt="" />
              <h4>Dịch vụ hỗ trợ 24/7</h4>
              <p>Nhân viên chăm sóc khách hàng 24/7 </p>
            </div>
          </Col>
        </Row>
      </div>
      {/* Features Box */}
    </>
  );
}

export default Home;
