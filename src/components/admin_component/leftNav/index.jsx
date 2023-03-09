import React from 'react'

import "./left_nav.css"
import logo from "../../../assets/images/logo.png"

//AntD引入
import { MailOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

//左侧下拉菜单相关函数
function getItem(label, key, icon, children, type) {
  return { key, icon, children, label, type, };
}
const items = [
  getItem('首页', '1', <MailOutlined />),
  getItem('商品', 'sub1', <MailOutlined />, [
    getItem('品类管理', '2', <MailOutlined />),
    getItem('商品管理', '3', <MailOutlined />),
  ]),
  getItem('用户管理', '4', <MailOutlined />),
  getItem('角色管理', '5', <MailOutlined />),
  getItem('图形图表', 'sub2', <MailOutlined />, [
    getItem('柱形图', '6', <MailOutlined />),
    getItem('折线图', '7', <MailOutlined />),
    getItem('饼图', '8', <MailOutlined />),
  ]),
];

export default function LeftNav() {
  return (
    <div className='left_nav'>
      <div className="left_nav_top">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </div>

      <div className="left_nav_bottom">
        <div style={{ width: 200, }}>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={[]}
            mode="inline"
            theme="dark"
            items={items}
          />
        </div>
      </div>
    </div>
  )
}
