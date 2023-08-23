import {
  Button,
  Rate,
  Spin,
  Comment,
  List,
  Tooltip,
  Input,
  Avatar,
  Form,
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import ProductService from "../../api/ProductService";
import CommentService from "../../api/CommentService";
import CustomerService from "../../api/CustomerService";
import StorageKeys from "../../constants/storage-key";
import { addToCart } from "../Cart/cartSlice";
import moment from "moment";
import "./styles.scss";
const { TextArea } = Input;

ProductDetails.propTypes = {
  id: PropTypes.string,
};

function ProductDetails({ id }) {
  const [spinner, setSpinner] = useState(false);
  const [product, setProduct] = useState([]);
  const [dataComments, setDataComments] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const location = useLocation();

  const fetchCustomerAPI = useCallback(async (customer_id) => {
    return CustomerService.get(customer_id).then((user) => user.data.name);
  }, []);

  const fetchCommentsAPI = useCallback(() => {
    CommentService.get(id).then(async (res) => {
      return res.data.map(async (dt) => {
        const author = await fetchCustomerAPI(dt.customer_id);
        setDataComments((res) => [
          ...res,
          {
            actions: [<span key="comment-list-reply-to-0">Trả lời</span>],
            author: author,
            avatar: "https://joeschmoe.io/api/v1/random",
            content: (
              <>
                <p>{dt.comment}</p>
                <Rate
                  defaultValue={dt.rate}
                  style={{ fontSize: "20px" }}
                  disabled
                />
              </>
            ),
            datetime: (
              <Tooltip
                title={moment()
                  .subtract(1, "days")
                  .format("YYYY-MM-DD HH:mm:ss")}
              >
                <span>{moment().subtract(1, "days").fromNow()}</span>
              </Tooltip>
            ),
          },
        ]);
      });
    });
  }, [id, fetchCustomerAPI]);

  useEffect(() => {
    setSpinner(true);
    ProductService.get(id).then((res) => {
      setProduct(res.data);
      setSpinner(false);
    });
    fetchCommentsAPI();
  }, [id, fetchCommentsAPI]);

  const handleAddToCart = (product, quantity) => {
    if (localStorage.getItem(StorageKeys.TOKEN) === null) {
      history.replace("/login");
    } else {
      dispatch(
        addToCart({
          ...product,
          cartQuantity: quantity,
        })
      );
      history.replace("/cart");
    }
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    if (!data) return;
    setSubmitting(true);
    console.log({
      product_id: id,
      customer_id: JSON.parse(localStorage.getItem(StorageKeys.USER)).session
        .customer_id,
      comment: data.text,
      rate: data.rate,
    });
    await CommentService.create({
      product_id: id,
      customer_id: JSON.parse(localStorage.getItem(StorageKeys.USER)).session
        .customer_id,
      comment: data.text,
      rate: data.rate,
    });
    fetchCommentsAPI();
    form.resetFields();
    setSubmitting(false);
  };

  return (
    <>
      <div className="container p-5">
        <div className="row mb-5">
          {spinner && (
            <Spin tip="Loading..." style={{ color: "#1e1e1e" }}></Spin>
          )}
          <div className="col-lg-6">
            <div className="product-slider owl-carousel">
              <div className="product-img">
                <figure>
                  <img src={product.image} alt="product" />
                  <div className="p-status">new</div>
                </figure>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-content">
              <h2>Dotted Blue Shirt</h2>
              <div className="pc-meta">
                <h5>${product.price}</h5>
                <Rate allowHalf defaultValue={2.5} />
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </p>
              <ul className="tags">
                <li>
                  <span>Category :</span> {product.gender}'s Wear
                </li>
                <li>
                  <span>Tags :</span> man, shirt, dotted, elegant, cool
                </li>
              </ul>
              <div className="product-quantity">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity((pre) => (pre -= 1));
                    }
                  }}
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
                <button onClick={() => setQuantity((pre) => (pre += 1))}>
                  +
                </button>
              </div>
              <Button
                onClick={() => handleAddToCart(product, quantity)}
                className="primary-btn pc-btn"
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>

        {localStorage.getItem(StorageKeys.USER) === null ? (
          <>
            <Link
              to={{
                pathname: "/login",
                state: { from: location },
              }}
            >
              Đăng nhập để nhận xét
            </Link>
          </>
        ) : (
          <Comment
            avatar={
              <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
            }
            content={
              <Form onFinish={handleSubmit} form={form}>
                <Form.Item name="text">
                  <TextArea rows={4} />
                </Form.Item>
                <Form.Item name="rate">
                  <Rate style={{ fontSize: "20px" }} />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" loading={submitting} type="primary">
                    Add Comment
                  </Button>
                </Form.Item>
              </Form>
            }
          />
        )}

        <List
          className="comment-list"
          header={`${dataComments.length} nhận xét`}
          itemLayout="horizontal"
          dataSource={dataComments}
          renderItem={(item) => (
            <li>
              <Comment
                actions={item.actions}
                author={item.author}
                avatar={item.avatar}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </div>
    </>
  );
}
export default ProductDetails;
