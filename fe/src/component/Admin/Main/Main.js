import React, { useState } from 'react';
import './main.css'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

// npm i react-icons FaDolly  
import { MdCategory } from "react-icons/md"
import { FaDolly, FaUserAlt } from "react-icons/fa";
import { IoIosColorPalette } from "react-icons/io"
import { BiCategoryAlt } from "react-icons/bi"
import { AiOutlineShoppingCart, AiOutlineOrderedList, AiOutlineFontSize } from "react-icons/ai"
import { BiSolidCartAdd } from "react-icons/bi"
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const Main = () => {

    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate()

    return (
        <Layout>

            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h4>LDT DEV</h4>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    onClick={({ key }) => {
                        if (key === 'signout') {

                        } else {
                            navigate(key)
                        }
                    }}
                    items={[

                        {
                            key: 'typeproduct',
                            icon: <MdCategory style={{ fontSize: 20 }} />,
                            label: 'Type product',
                        },
                        {
                            key: 'category',
                            icon: <BiCategoryAlt />,
                            label: 'Category',
                        },
                        {
                            key: 'color',
                            icon: <IoIosColorPalette style={{ fontSize: 20 }} />,
                            label: 'Color product',
                        },
                        {
                            key: 'size',
                            icon: <AiOutlineFontSize style={{ fontSize: 20 }} />,
                            label: 'Size product',
                        },
                        {
                            key: 'order',
                            icon: <FaDolly style={{ fontSize: 20 }} />,
                            label: 'Order product',
                        },


                        {
                            key: 'product',
                            icon: <AiOutlineShoppingCart style={{ fontSize: 25 }} />,
                            label: 'Product',
                            children: [
                                {
                                    key: 'addProduct',
                                    icon: <BiSolidCartAdd style={{ fontSize: 20 }} />,
                                    label: 'add product',
                                },
                                {
                                    key: 'listproduct',
                                    icon: <AiOutlineOrderedList style={{ fontSize: 20 }} />,
                                    label: 'List product',
                                },

                            ]
                        },
                    ]}
                />
            </Sider>

            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default Main;