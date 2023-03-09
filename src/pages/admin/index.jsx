import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

import memoryUtils from "../../utils/memoryUtils";
import { adminRoutesList } from "../../routes"

//组件引入
import LeftNav from "../../components/admin_component/leftNav";

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
        <Header>Header</Header>
        <Content>{element}</Content>
        <Footer style={{ "textAlign": "center", "color": "#aaa" }}>
          推荐使用谷歌浏览器,可以获得更佳页面操作体验
        </Footer>
      </Layout>
    </Layout>
  )
}
