import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ProductService from "../../api/ProductService";
import "./styles.scss";
import { Spin } from "antd";
import { Link } from "react-router-dom";
ListProduct.propTypes = {
  gender: PropTypes.string,
};

function ListProduct({ gender }) {
  const [spinner, setSpinner] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setSpinner(true);
    ProductService.getList().then((res) => {
      const data = res.data
        .sort((a, b) => b.mtime - a.mtime)
        .filter((dt) => {
          return dt.gender === gender;
        })
        .map((dt) => {
          return {
            id: dt.id,
            name: dt.name,
            price: dt.price,
            image: dt.image,
          };
        });
      setProducts(data);
      setSpinner(false);
    });
  }, [gender]);

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-lg-12 text-center mb-5">
            <div className="section-title">
              <h2>Quần áo {gender === "men" ? "nam" : "nữ"}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {spinner && (
            <Spin tip="Loading..." style={{ color: "#1e1e1e" }}></Spin>
          )}
          {products.map((p) => {
            return (
              <div className="col-lg-3 col-sm-6 p-3" key={p.id}>
                <div className="single-product-item">
                  <figure>
                    <Link to={`/product/${p.id}`}>
                      <img src={p.image} alt="Product" />
                    </Link>
                    <div className="p-status">new</div>
                  </figure>
                  <div className="product-text">
                    <h6>{p.name}</h6>
                    <p>${p.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default ListProduct;
