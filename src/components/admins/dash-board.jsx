import React from "react";
import { Layout, Menu } from "antd";
import {
  LineChartOutlined,
  TableOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import { ProductChart, ProductList, Sale, OptionList } from "../../components"; 
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const Dashboard = () => {
  const location = useLocation();

  return (
    <Layout>
      <Header className="header">
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background shadow-lg rounded">
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              icon={<LineChartOutlined />}
              title="Chart Management"
            >
              <Menu.Item key="/products">
                <Link to="/products">Products</Link>
              </Menu.Item>
              <Menu.Item key="/users">
                <Link to="/users">Users</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              icon={<TableOutlined />}
              title="Products Managemment"
            >
              <Menu.Item key="/product-list">
                <Link to="/product-list">Product List</Link>
              </Menu.Item>
              <Menu.Item key="/product-sale">
                <Link to="/product-sale">Product Sale</Link>
              </Menu.Item>
              <Menu.Item key="/product-popular">
                <Link to="/product-popular">Product Popular</Link>
              </Menu.Item>
              <Menu.Item key="/product-trendding">
                <Link to="/product-sale">Product Trendding</Link>
              </Menu.Item>
              <Menu.Item key="/option-list">
                <Link to="/option-list">Option List</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub3"
              icon={<TableOutlined />}
              title="Orders Managemment"
            >
              <Menu.Item key="/order-list">
                <Link to="/order-list">Order List</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              icon={<FireOutlined />}
              title="Sale Management"
            >
              <Menu.Item key="/sale">
                <Link to="/sale">Sale</Link>
              </Menu.Item>
              <Menu.Item key="/notification2">
                <Link to="/notification2">Notification 2</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {/* Render content based on route */}
            <Routes path="/">
              <Route path="/" element={<>CHART</>}></Route>
              <Route path="/users" element={<>Users Content</>}></Route>
              <Route path="/products" element={<ProductChart/>}></Route>
              <Route path="/product-list" element={<ProductList/>}></Route>
              <Route path="/option-list" element={<OptionList/>}></Route>
              <Route path="/product-sale" element={<>Product Sale</>}></Route>
              <Route path="/sale" element={<Sale/>}></Route>
              <Route path="/notification2" element={<>Notification 2 Content</>}></Route>
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
