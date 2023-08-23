import {
  FacebookFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Col, Row } from "antd";
import { Footer } from "antd/lib/layout/layout";
import "./styles.scss";

AppFooter.propTypes = {};

function AppFooter(props) {
  return (
    <Footer className="footer-section">
      <div className="container">
        <div className="newslatter-form">
          <div className="row">
            <div className="col-lg-12">
              <form action="http://localhost:3000/">
                <input type="text" placeholder="Your email address" />
                <button type="submit">Subscribe to our newsletter</button>
              </form>
            </div>
          </div>
        </div>
        <div className="footer-widget">
          <Row>
            <Col span={4} offset={2}>
              <div className="single-footer-widget">
                <h4>About us</h4>
                <ul>
                  <li>About Us</li>
                  <li>Community</li>
                  <li>Jobs</li>
                  <li>Shipping</li>
                  <li>Contact Us</li>
                </ul>
              </div>
            </Col>
            <Col span={4} offset={1}>
              <div className="single-footer-widget">
                <h4>Customer Care</h4>
                <ul>
                  <li>Search</li>
                  <li>Privacy Policy</li>
                  <li>2019 Lookbook</li>
                  <li>Shipping & Delivery</li>
                  <li>Gallery</li>
                </ul>
              </div>
            </Col>
            <Col span={4} offset={2}>
              <div className="single-footer-widget">
                <h4>Our Services</h4>
                <ul>
                  <li>Free Shipping</li>
                  <li>Free Returnes</li>
                  <li>Our Franchising</li>
                  <li>Terms and conditions</li>
                  <li>Privacy Policy</li>
                </ul>
              </div>
            </Col>
            <Col span={4} offset={2}>
              <div className="single-footer-widget">
                <h4>Information</h4>
                <ul>
                  <li>Payment methods</li>
                  <li>Times and shipping costs</li>
                  <li>Product Returns</li>
                  <li>Shipping methods</li>
                  <li>Conformity of the products</li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="social-links-warp">
        <div className="container">
          <div className="social-links">
            <a href="http://localhost:3000/" className="instagram">
              <InstagramFilled className="fa instagram" />
              <span>instagram</span>
            </a>

            <a href="http://localhost:3000/" className="facebook">
              <FacebookFilled className="fa facebook" />
              <span>facebook</span>
            </a>

            <a href="http://localhost:3000/" className="youtube">
              <YoutubeFilled className="fa youtube" />
              <span>youtube</span>
            </a>
          </div>
        </div>

        <div className="container text-center pt-5">
          <p>
            Copyright &copy;
            <script>document.write(new Date().getFullYear());</script>
            All rights reserved | This template is made by Nguyen Quang Huy
          </p>
        </div>
      </div>
    </Footer>
  );
}

export default AppFooter;
