import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Flex,
  Button,
  Tag,
  Input,
  Form,
  Select,
  Popconfirm,
} from "antd";
import {
  PlusSquareOutlined,
  CloseCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { CreateOption, UpdateOption } from "../../commons/admins";
import { OrderServices } from "../../app/store/features";

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderReducer.orders);
  const loading = useSelector((state) => state.optionReducer.loading);
  const error = useSelector((state) => state.optionReducer.error);

  const [open, setOpen] = useState(true);
  const [openUpdate, setOpenUpdate] = useState(true);

  useEffect(() => {
    if (orders.length === 0) {
      let query = `&$filter=IsDeleted eq false`;
      dispatch(OrderServices.getOrderList(query));
    }
  }, [dispatch, orders]);

  /* table function */

  const showCreate = () => {
    setOpen(!open);
    setOpenUpdate(true);
  };

  const updatePayment = (status, order) => {
    order.Status = status;
    dispatch(OrderServices.updateStatusOrder(order))
      .unwrap()
      .then((res) => {
        if (res.StatusCode === 200) {
        } else {
        }
      });
  };

  const getButtonUpdate = (order) => {
    switch (order.Status) {
      case 1:
        return (
          <div className="row">
            <div className="col-4">
              <Popconfirm
                title="Approp the order"
                description="Are you sure to Approp this order?"
                okText="Oke"
                onConfirm={() => updatePayment(2, order)}
              >
                <Tag type="button" color="#f5aa42">
                  Approp
                </Tag>
              </Popconfirm>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="row">
            <div className="col-4">
              <Popconfirm
                title="Send ship the order"
                description="Are you sure to Send ship this order?"
                okText="Oke"
                onConfirm={() => updatePayment(3, order)}
              >
                <Tag type="button" color="#66ab1d">
                  Send ship
                </Tag>
              </Popconfirm>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="row">
            <div className="col-4">
              <Popconfirm
                title="Shipping the order"
                description="Are you sure to shipping this order?"
                okText="Oke"
                onConfirm={() => updatePayment(4, order)}
              >
                <Tag type="button" color="#0286a1">
                  Shipping
                </Tag>
              </Popconfirm>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="row">
            <div className="col-4">
              <Popconfirm
                title="Send to guest"
                description="Are you sure to send guest this order?"
                okText="Oke"
                onConfirm={() => updatePayment(5, order)}
              >
                <Tag type="button" color="#0f68f7">
                  Send guest
                </Tag>
              </Popconfirm>
            </div>
          </div>
        );
    }
  };

  const getStatusOrderStr = (status_order) => {
    switch (status_order) {
      case 0:
        return <Tag color="#87d068">Chờ thanh toán</Tag>;
      case 1:
        return <Tag color="#2db7f5">Đã thanh toán</Tag>;
      case 2:
        return (
          <Tag color="#51c9c7" className="text-danger">
            Đã tiếp nhận
          </Tag>
        );
      case 3:
        return (
          <Tag color="#00ff48" className="text-danger">
            Đã giao vận chuyển
          </Tag>
        );
      case 4:
        return <Tag color="#401b7a">Đang giao</Tag>;
      case 5:
      case 6:
        return <Tag color="#108ee9">Đã giao</Tag>;
      case 7:
        return (
          <Tag color="#78f542" className="text-body">
            Hoàn thành
          </Tag>
        );
      default:
        return <Tag color="#7d0404">Đã hủy</Tag>;
    }
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

  /* table setting */

  const columns = [
    {
      title: "OrderCode",
      dataIndex: "OrderCode",
      key: "OrderCode",
    },
    {
      title: "UserName",
      dataIndex: "UserName",
      key: "UserName",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (e) => getStatusOrderStr(e),
    },
    {
      title: "PhoneNumber",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },
    {
      title: "DetailAddress",
      dataIndex: "DetailAddress",
      key: "DetailAddress",
    },
    {
      title: "Note",
      dataIndex: "Note",
      key: "Note",
    },
    {
      title: "NoteCancel",
      dataIndex: "NoteCancel",
      key: "NoteCancel",
    },
    {
      title: "NoteCancel",
      dataIndex: "NoteCancel",
      key: "NoteCancel",
    },
    {
      title: "NoteCancel",
      dataIndex: "NoteCancel",
      key: "NoteCancel",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (e) => getButtonUpdate(e),
    },
  ];

  const columns_orderDetails = [
    {
      title: "Product Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "SkuId",
      dataIndex: "ProductVariant",
      key: "ProductVariant",
      render: (e) => (
        <>
          <Tag>{e?.SkuId}</Tag>
        </>
      ),
    },
    {
      title: "Price",
      dataIndex: "ProductVariant",
      key: "ProductVariant",
      render: (e) => (
        <>
          <Tag>{e?.Price} VND</Tag>
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
  ];

  const onFilter = (el) => {
    let query = `&$filter=IsDeleted eq false`;
    if (el.OrderCode) {
      query += `  and OrderCode eq '${el.OrderCode}'`;
    }
    if (el.UserName) {
      query += ` and UserName eq '${el.UserName}'`;
    }
    if (el.Status) {
      query += ` and Status eq ${el.Status}`;
    }
    dispatch(OrderServices.getOrderList(query));
  };

  const dataSourceWithKeys = orders.map((item) => {
    return { ...item, key: item.Id };
  });

  /* end table setting */

  if (!orders || loading) {
    return <>LOADDING...</>;
  } else if (error && error.TranslateKey !== "304") {
    return <>FAILD LOAD...</>;
  }

  return (
    <div>
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
        <Form.Item
          label={"Phone Number"}
          name={"PhoneNumber"}
          className="col-3"
        >
          <Input />
        </Form.Item>
        <Form.Item className="col-3">
          <Button htmlType="submit">
            <SearchOutlined />
          </Button>
        </Form.Item>
      </Form>
      <div>
        <Flex gap="4px 0" wrap="wrap" align="flex-end" vertical>
          <Flex gap="small" wrap="wrap">
            <Button onClick={() => showCreate()} type="primary">
              <PlusSquareOutlined />
            </Button>
          </Flex>
        </Flex>
      </div>
      {open ? (
        <></>
      ) : (
        <div className="bg-white p-5">
          <CreateOption />
        </div>
      )}
      {openUpdate ? (
        <></>
      ) : (
        <div className="bg-white p-5">
          <CloseCircleOutlined
            onClick={() => setOpenUpdate(true)}
            className="d-flex justify-content-end inline-block pt-1 text-danger"
          />
          <UpdateOption />
        </div>
      )}
      <Table
        className="shadow-lg rounded"
        dataSource={dataSourceWithKeys}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p
              style={{
                margin: 0,
              }}
            >
              <Table
                columns={columns_orderDetails}
                dataSource={record.OrderDetails}
              />
            </p>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </div>
  );
};

export default OrderList;
