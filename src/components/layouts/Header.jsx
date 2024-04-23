import React, { useState, useEffect } from "react";
import {
  UserOutlined,
  ShoppingOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ContactsOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import {
  Badge,
  Dropdown,
  Space,
  Modal,
  Menu,
  Button,
  Form,
  InputNumber,
  Input,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthorServices, CartServices, OrderServices } from "../../app/store/features";
const slides = [
  {
    imageUrl:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/12/lich-chieu-phim-dau-pha-thuong-khung-phan-5-anh-1.jpg",
    alt: "Image 1",
    caption: "Slide 1",
  },
  {
    imageUrl:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/12/lich-chieu-phim-dau-pha-thuong-khung-phan-5-anh-3.jpg",
    alt: "Image 2",
    caption: "Slide 2",
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(AuthorServices.initUserFromLocal());
    }
    if (!cart && user) {
      dispatch(CartServices.getCartByUserId(user.Id));
    }
    const intervalId = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(intervalId); // Clean up on unmount
  }, [currentSlide, dispatch, user, cart]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  };

  const onRemove = (id) => {
    const values = {
      ItemId: id,
    };
    dispatch(CartServices.deleteCartItem(values))
      .unwrap()
      .then((res) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Update success",
            duration: 2,
          });
        } else {
          message.error({
            content: "Create faild " + res.Message,
            duration: 2,
            style: {
              marginTop: "3vh",
            },
          });
        }
      })
      .catch((err) => {
        message.error({
          content: err.Payload.TranslateContext + " : " + err.Message,
          duration: 2,
          style: {
            marginTop: "3vh",
          },
        });
      });
  };

  const onFinish = (values) => {
    values = {...values, OrderDetails: values.CartDetails, CartId: cart.Id}
    console.log("Received values of form:", values);
    dispatch(OrderServices.addOrder(values))
    .unwrap()
    .then((res) => {
      if (res.StatusCode === 200) {
        message.success({
          content: "Update success",
          duration: 2,
        });
      } else {
        message.error({
          content: "Create faild " + res.Message,
          duration: 2,
          style: {
            marginTop: "3vh",
          },
        });
      }
    })
    .catch((err) => {
      message.error({
        content: err.Payload.TranslateContext + " : " + err.Message,
        duration: 2,
        style: {
          marginTop: "3vh",
        },
      });
    });
  };

  const user_menu = (
    <Menu>
      {user === null ? (
        <Menu.Item key="3">
          <Link to="/sign-in" className="nav-link">
            <LoginOutlined /> SignIn
          </Link>
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key="1">
            <UserOutlined /> Account
          </Menu.Item>
          <Menu.Item key="2">
            <ShoppingOutlined /> Orders
          </Menu.Item>
          <Menu.Item key="4">
            <LogoutOutlined /> SignOut
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  return (
    // Header
    <header className="container">
      <div className="row">
        <nav className="navbar navbar-expand-lg navbar-light shadow-lg bg-nav container">
          <div className="col-2">
            <a className="navbar-brand mx-5" href="/">
              <b>
                <strong>STYLISH</strong>
              </b>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleMenu}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className={`col-4 collapse navbar-collapse ${
              isMenuOpen ? "show" : ""
            }`}
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <HomeOutlined className="mx-2" />
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link">
                  <InfoCircleOutlined className="mx-2" />
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  <ContactsOutlined className="mx-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-2 d-flex">
            <div className="mx-1">
              <Dropdown overlay={user_menu}>
                <Space>
                  <UserOutlined />
                </Space>
              </Dropdown>
            </div>
            <div className="mx-1" onClick={showModal}>
              <Badge count={cart?.CartDetails?.length} size="small">
                <ShoppingOutlined />
              </Badge>
            </div>
          </div>
        </nav>
        <div className="slideshow container shadow-lg">
          <div className="slide">
            <img
              width={"100%"}
              src={slides[currentSlide].imageUrl}
              alt={slides[currentSlide].alt}
            />
          </div>
        </div>
      </div>
      <Modal
        width={"50%"}
        title="Basic Modal"
        open={isModalOpen}
        okButtonProps={{ hidden: true }}
        onCancel={handleCancel}
      >
        {" "}
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={cart}
          style={{
            marginBottom: "10px",
            borderBottom: "1px solid #ddd",
            paddingBottom: "10px",
          }}
        >
          <Form.Item hidden name={"UserId"}>
            <Input />
          </Form.Item>
          <Form.List name={"CartDetails"}>
            {(fields, { add, remove }) => (
              <div className="row">
                {fields.map(({ key, name, ...restField }) => (
                  <>
                    <Form.Item className="col-2" name={[name, "Name"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item className="col-4">
                      <img
                        width={"40%"}
                        src="https://product.hstatic.net/1000341630/product/z4769712247372_113069440aeb5a20494a48978eec6a2a_1b59ebe0d5d14cdd906dc6ff42bfc9f0_master.jpg"
                        alt=""
                      />
                    </Form.Item>
                    <Form.Item
                      className="col-4"
                      {...restField}
                      name={[name, "ProductVariants", "SkuId"]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      className="col-1"
                      {...restField}
                      name={[name, "Quantity"]}
                    >
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          onRemove(cart.CartDetails[name].Id);
                          remove(name);
                        }}
                      >
                        delete
                      </Button>
                    </Form.Item>
                  </>
                ))}
              </div>
            )}
          </Form.List>
          <Form.Item className="d-flex justify-content-end">
            <Button type="primary" htmlType="submit">
              Create Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </header>
  );
};

export default Header;
