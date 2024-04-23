import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  InputNumber,
  Input,
  message,
  Divider,
  Tag,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  OrderServices,
  CartServices,
  AuthorServices,
} from "../../app/store/features";
import { TextUtilities } from "..";
const UserOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);
  const [price, setPrice] = useState(0);
  const [prices, setPrices] = useState([]);
  useEffect(() => {
    if (!user) {
      dispatch(AuthorServices.initUserFromLocal());
    }
    if (!cart && user !== null) {
      dispatch(CartServices.getCartByUserId(user.Id));
    }
    if (cart) {
      let array = [];
      let sum_total = 0;
      cart.CartDetails.map((e) => {
        let total = e.ProductVariants.Price * e.Quantity;
        array.push(total);
        sum_total += total;
      });
      setPrices(array);
      setPrice(sum_total);
      form.resetFields();
    }
  }, [dispatch, cart, user]);

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

  const onChangeQuantity = (index, e) => {
    let temp = [...prices];
    temp[index] = e * cart.CartDetails[index].ProductVariants.Price;
    setPrices(temp);
    let temp_total = 0;
    temp.map((e_price) => {
      temp_total += e_price;
    });
    setPrice(temp_total);
  };

  const onFinish = (values) => {
    values = { ...values, OrderDetails: values.CartDetails, CartId: cart.Id };
    dispatch(OrderServices.addOrder(values))
      .unwrap()
      .then((res) => {
        if (res.StatusCode === 200) {
          message.success({
            content: "Payment success",
            duration: 2,
          });
          navigate("/");
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

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const options = [
    {
      label: "Card",
      value: 1,
    },
    {
      label: "Banking",
      value: 2,
    },
    {
      label: "Cash",
      value: 3,
    },
  ];

  return (
    <div className="container my-4">
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
        <Divider>
          <b>User Info</b>
        </Divider>
        <Form.Item hidden name={"UserId"}>
          <Input />
        </Form.Item>
        <div className="row">
          <Form.Item
            className="col-4"
            name={"OrderCode"}
            label={"OrderCode"}
            rules={[{ required: true, message: "Missing value" }]}
            initialValue={TextUtilities.generateOrderCode()}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="col-4"
            name={"UserName"}
            label={"User Name"}
            rules={[{ required: true, message: "Missing value" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={""}
            className="col-4"
            name={"Note"}
            label={"Note"}
          >
            <Input />
          </Form.Item>
        </div>
        <div className="row">
          <Form.Item
            className="col-8"
            name={"DetailAddress"}
            label={"Address"}
            rules={[{ required: true, message: "Missing value" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className="col-4"
            name={"PhoneNumber"}
            label={"Phone"}
            rules={[{ required: true, message: "Missing value" }]}
          >
            <Input />
          </Form.Item>
        </div>
        <Divider>
          <b>Detail Order</b>
        </Divider>
        <div className="row">
          <div className="col-8">
            <Form.List name={"CartDetails"}>
              {(fields, { add, remove }) => (
                <div className="row">
                  {fields.map(({ key, name, ...restField }) => (
                    <>
                      <Form.Item className="col-6" name={[name, "ImageUrl"]}>
                        <img
                          width={"50%"}
                          src={cart?.CartDetails[name]?.ImageUrl}
                          alt=""
                        />
                      </Form.Item>
                      <div className="col-6 row">
                        <Form.Item className="col-12" name={[name, "Name"]}>
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item>
                          {cart.CartDetails[
                            name
                          ].ProductVariants.VariantValues.map((el, index) => (
                            <>
                              {index % 2 === 0 ? <br /> : ""}
                              <span className="mx-2">
                                {el.Options.Name}:
                                <b className="mx-2">{el.OptionValues.Value}</b>
                              </span>
                            </>
                          ))}
                        </Form.Item>
                        <Form.Item
                          className="col-6"
                          {...restField}
                          label="Code: "
                          name={[name, "ProductVariants", "SkuId"]}
                        >
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item
                          className="col-6"
                          {...restField}
                          label="Price: "
                          name={[name, "ProductVariants", "Price"]}
                        >
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item
                          hidden
                          className="col-12"
                          {...restField}
                          name={[name, "ImportPrice"]}
                          initialValue={
                            cart.CartDetails[name].ProductVariants.ImportPrice
                          }
                        >
                          <Input readOnly />
                        </Form.Item>
                        <Form.Item
                          hidden
                          className="col-6"
                          {...restField}
                          label="Price: "
                          name={[name, "Price"]}
                          initialValue={
                            cart.CartDetails[name].ProductVariants.Price
                          }
                        ></Form.Item>
                        <Form.Item
                          className="col-6"
                          {...restField}
                          label="Quantity: "
                          name={[name, "Quantity"]}
                        >
                          <InputNumber
                            onChange={(e) => onChangeQuantity(name, e)}
                            min={1}
                          />
                        </Form.Item>
                        <Form.Item className="col-4">
                          <Button
                            className="bg-danger"
                            onClick={() => {
                              onRemove(cart.CartDetails[name].Id);
                              remove(name);
                            }}
                          >
                            <DeleteOutlined />
                          </Button>
                        </Form.Item>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </Form.List>
          </div>
          <div className="col-4">
            <div className="row"></div>
            <Form.Item className="col-12" label={"Total Money: "}>
              <Tag className="text-danger">
                {TextUtilities.numberToMenyStr(price)}
              </Tag>
            </Form.Item>
            <Form.Item className="col-12" label={"VAT: "}>
              <Tag className="text-danger">
                {TextUtilities.numberToMenyStr((price / 100) * 10)}
              </Tag>
            </Form.Item>
            <Form.Item className="col-12" label={"Total Pay: "}>
              <Tag className="text-danger">
                {TextUtilities.numberToMenyStr(price + (price / 100) * 10)}
              </Tag>
            </Form.Item>
            <Form.Item
              label={"Type Payment: "}
              name={"TypePay"}
              className="col-12"
              rules={[
                {
                  required: true,
                  message: "Please input month!",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Select type payment"
                optionFilterProp="children"
                filterOption={filterOption}
                options={options}
              />
            </Form.Item>
            <Form.Item className="d-flex justify-content-end">
              <Button type="primary" htmlType="submit">
                Payment
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default UserOrder;
