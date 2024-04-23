import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderServices, AuthorServices } from "../../app/store/features";
import OrderCart from "./order-cart";
import { Input, Form, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer.orders);
  const user = useSelector((state) => state.userReducer.user);
  const loading = useSelector((state) => state.orderReducer.loading);
  const error = useSelector((state) => state.orderReducer.error);


  useEffect(() => {
    if (!user) {
      dispatch(AuthorServices.initUserFromLocal());
    }
    if (user && orders.length === 0) {
      let query = "UserId eq " + user?.Id;
      dispatch(OrderServices.getOrderListByUser(query));
    }
  }, [dispatch, orders, user]);

  const onFilter = (el) => {
    let query = `UserId eq ${user?.Id}`;
    if (el.OrderCode) {
      query += `  and OrderCode eq '${el.OrderCode}'`;
    }
    if (el.UserName) {
      query += ` and UserName eq '${el.UserName}'`;
    }
    if (el.Status) {
      query += ` and Status eq ${el.Status}`;
    }
    dispatch(OrderServices.getOrderListByUser(query));
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const options = [
    {
      label: "Chờ thanh toán",
      value: "0",
    },
    {
      label: "Đã thanh toán",
      value: "1",
    },
    {
      label: "Đã tiếp nhận",
      value: "2",
    },
    {
      label: "Đã giao vận chuyển",
      value: "3",
    },
    {
      label: "Đang giao",
      value: "4",
    },
    {
      label: "Đã giao",
      value: "5",
    },
    {
      label: "Đã đánh giá",
      value: "6",
    },
    {
      label: "Hoàn thành",
      value: "7",
    },
    {
      label: "Đã hủy",
      value: "8",
    },
  ];

  if (!orders || loading) {
    return <>LOADDING...</>;
  } else if (error && error.TranslateKey !== "304") {
    return <>FAILD LOAD...</>;
  }
  return (
    <div className="container my-5 shadow-lg">
      <Form onFinish={onFilter} className="row py-3 bg-nav-search">
        <Form.Item label={"Status"} name={"Status"} className="col-3">
          <Select
            showSearch
            placeholder="Select a status"
            optionFilterProp="children"
            filterOption={filterOption}
            options={options}
          />
        </Form.Item>
        <Form.Item label={"Order Code"} name={"OrderCode"} className="col-3">
          <Input />
        </Form.Item>
        <Form.Item label={"Phone Number"} name={"PhoneNumber"} className="col-3">
          <Input />
        </Form.Item>
        <Form.Item className="col-3">
          <Button htmlType="submit">
            <SearchOutlined />
          </Button>
        </Form.Item>
      </Form>
      {orders &&
        orders.map((el, index) => (
          <OrderCart key={`OrderCart-${index}`} props={el} />
        ))}
    </div>
  );
};

export default Order;
