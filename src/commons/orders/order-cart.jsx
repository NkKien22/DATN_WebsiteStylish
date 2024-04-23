import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Card,
  Tag,
  Form,
  Input,
  InputNumber,
  Divider,
  Image,
  Popconfirm,
} from "antd";
import { AiFillEye, AiOutlineExclamationCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { OrderServices } from "../../app/store/features";

const OrderCart = ({ props }) => {
  const order = { ...props };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);

  useEffect(() => {
    setCanUpdate(isUpdate());
  }, [canUpdate, props]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = (e) => {
    setOpen(false);
  };

  const handleCancel = (e) => {
    setOpen(false);
  };

  const onUpdate = (e) => {};

  const updatePayment = (status) => {
    order.Status = status;
    dispatch(OrderServices.updateStatusOrder(order))
      .unwrap()
      .then((res) => {
        if (res.StatusCode === 200) {
        } else {
        }
      });
  };

  const getButtonUpdate = () => {
    switch (order.Status) {
      case 0:
        return (
          <div className="row">
            <Form.Item className="col-4">
              <Button htmlType="submit" className="bg-primary">
                Update
              </Button>
            </Form.Item>
            <Form.Item className="col-4">
              <Popconfirm
                title="Payment"
                description="Are you sure to payment this order?"
                okText="Oke"
                onConfirm={() => updatePayment(1)}
              >
                <Button className="bg-success">Payment</Button>
              </Popconfirm>
            </Form.Item>
            <Form.Item className="col-4">
              <Popconfirm
                title="Cancel"
                description="Are you sure to cancel this order?"
                okText="Oke"
                onConfirm={() => updatePayment(8)}
              >
                <Button className="bg-success">Cancel</Button>
              </Popconfirm>
            </Form.Item>
          </div>
        );
      case 5:
        return (
          <Form.Item>
            <Button className="bg-success">Evaluate</Button>
          </Form.Item>
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

  const isUpdate = () => {
    switch (order.Status) {
      case 0:
        return false;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return true;
    }
  };

  return (
    <div className="my-2">
      <Card title={`${order.OrderCode}`} bordered={false}>
        <div className="d-flex justify-content-center">
          {getStatusOrderStr(order.Status)}
        </div>
        <div className="row">
          <div className="col">
            <b>Sum Products: </b>
            {order.OrderDetails?.length}
          </div>
          <div className="col">
            <b>Total Amount: </b>
            {order.TotalAmount}
          </div>
          <div className="col">
            <b>PhoneNumber: </b>
            {order.PhoneNumber}
          </div>
          <div className="col">
            <b>UserName: </b>
            {order.UserName}
          </div>
        </div>
        <div className="row my-2">
          <div className="col-8">
            <b>Detail Address: </b>
            {order.DetailAddress}
          </div>
          <div className="col-4">
            <b>Action: </b>
            <AiOutlineExclamationCircle
              type="button"
              onClick={showModal}
              className="mx-2"
            />
            <AiFillEye className="mx-2" type="button" />
          </div>
        </div>
      </Card>
      <Modal
        title={`${order.OrderCode}`}
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <Form initialValues={order} onFinish={onUpdate}>
          <Divider>
            <b>{getStatusOrderStr(order.Status)}</b>
          </Divider>
          <div className="row">
            <Form.Item className="col-6" label={"User Name"} name={"UserName"}>
              <Input readOnly={canUpdate} />
            </Form.Item>
            <Form.Item
              className="col-6"
              label={"Phone Number"}
              name={"PhoneNumber"}
            >
              <Input readOnly={canUpdate} />
            </Form.Item>
          </div>
          <div className="row">
            <Form.Item className="col-6" label={"Sale"} name={"TotalSale"}>
              <Tag>
                <b>{order.TotalSale}</b>
              </Tag>
            </Form.Item>
            <Form.Item
              className="col-6"
              label={"Total Amount"}
              name={"TotalAmount"}
            >
              <Tag>
                <b>
                  {order.TotalAmount} <span className="text-success">VDN</span>
                </b>
              </Tag>
            </Form.Item>
          </div>
          <Form.Item className="col-6" label={"Address"} name={"DetailAddress"}>
            <Input readOnly={canUpdate} />
          </Form.Item>
          <div className="row">
            <Form.List name={"OrderDetails"}>
              {(products, { add, remove }) => (
                <div className="row row justify-content-between">
                  {products.map((product, key, name, ...restField) => (
                    <div className="row">
                      <Divider>
                        <Tag>{`Product: ${key}`}</Tag>
                      </Divider>
                      <Form.Item name={[name, "Id"]} hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item name={[name, "OrderId"]} hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item name={[name, "ProductVariantId"]} hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        className="col-12"
                        {...restField}
                        label={"Product Name"}
                        name={[product.name, "Name"]}
                      >
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item
                        className="col-12"
                        {...restField}
                        label={"SkuId"}
                        name={[product.name, "ProductVariant", "SkuId"]}
                      >
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item
                        className="col-6"
                        {...restField}
                        label={"Quantity"}
                        name={[product.name, "Quantity"]}
                      >
                        <InputNumber
                          min={1}
                          max={
                            order.OrderDetails[product.name]?.ProductVariant
                              ?.Quantity
                          }
                          readOnly={canUpdate}
                        />
                      </Form.Item>
                      <Form.Item
                        className="col-4"
                        {...restField}
                        label={"Price"}
                        name={[product.name, "ProductVariant", "Price"]}
                      >
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item
                        className="col-12"
                        {...restField}
                        label={"Image"}
                        name={[product.name, "ImageUrl"]}
                      >
                        <Image
                          width={100}
                          src={order.OrderDetails[product.name]?.ImageUrl}
                        />
                        <Input hidden />
                      </Form.Item>
                    </div>
                  ))}
                </div>
              )}
            </Form.List>
          </div>
          {getButtonUpdate()}
        </Form>
      </Modal>
    </div>
  );
};

export default OrderCart;
