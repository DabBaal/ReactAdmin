import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import memoryUtils from "../../utils/memoryUtils";
import { adminRoutesList } from "../../routes"

//组件引入
import LeftNav from "../../components/leftNav";
import HeaderDiv from "../../components/headerDiv";

//AntD引入
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


export default function Admin() {
  const user = memoryUtils.user;
  const navigate = useNavigate();
  const element = useRoutes(adminRoutesList)

  useEffect(() => {
    if (!user._id) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <Layout style={{ "height": "100%" }}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
        <Header style={{ 
        "backgroundColor": "white", 
        "height": "80px", 
        "padding": "0" 
        }}>
          <HeaderDiv />
        </Header>
        <Content style={{"border":"20px solid #D3D3D3"}}>{element}</Content>
        <Footer style={{ "textAlign": "center", "color": "#aaa" }}>
          推荐使用谷歌浏览器,可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout>
  )
}
