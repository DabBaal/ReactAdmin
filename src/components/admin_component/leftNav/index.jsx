import React from "react";
import { Link, useLocation } from "react-router-dom";

import "./left_nav.css";
import logo from "../../../assets/images/logo.png";
import menuList from "../../../config/menuConfig";

import { Menu } from "antd";

export default function LeftNav() {
  //寻找被选中元素的key属性
  const path = useLocation().pathname;
  let defaultSelectedKeys = "", defaultOpenKeys = ""

  menuList.forEach((item) => {
    if (item.type === "item" && item.href === path) {
      defaultSelectedKeys = item.key
    }
    else if (item.type === "submenu") {
      item.children.forEach((subItem) => {
        if (subItem.href === path) {
          defaultSelectedKeys = subItem.key
          defaultOpenKeys = item.key
        }
      })
    }
  })

  return (
    <div className="left_nav">
      <div className="left_nav_top">
        <img src={logo} alt="logo" />
        <h1>硅谷后台</h1>
      </div>

      <div className="left_nav_bottom">
        <div style={{ width: 200 }}>
          <Menu
            defaultSelectedKeys={[defaultSelectedKeys]}
            defaultOpenKeys={[defaultOpenKeys]}
            mode="inline"
            theme="dark"
          >
            {menuList.map((item) => {
              if (item.type === "item") {
                return (
                  <Menu.Item key={item.key} icon={item.icon}>
                    <Link to={item.href}>{item.label}</Link>
                  </Menu.Item>
                );
              }
              if (item.type === "submenu") {
                return (
                  <Menu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.label}
                  >
                    {item.children.map((subItem) => {
                      return (
                        <Menu.Item key={subItem.key} icon={subItem.icon}>
                          <Link to={subItem.href}>{subItem.label}</Link>
                        </Menu.Item>
                      )
                    })}
                  </Menu.SubMenu>
                );
              }
              return null;
            })}
          </Menu>
        </div>
      </div>
    </div>
  );
}
