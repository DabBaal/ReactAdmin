import { MailOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children, type, href) {
    return { key, icon, children, label, type, href };
  }
  
  const menuList = [
    getItem("首页", "1", <MailOutlined />, null, "item", "/home"),
    getItem("商品","sub1",<MailOutlined />,[
        getItem("品类管理", "2", <MailOutlined />, null, "item", "/category"),
        getItem("商品管理", "3", <MailOutlined />, null, "item", "/product"),
      ],"submenu"),
    getItem("用户管理", "4", <MailOutlined />, null, "item", "/user"),
    getItem("角色管理", "5", <MailOutlined />, null, "item", "/role"),
    getItem("图形图表","sub2",<MailOutlined />,[
        getItem("柱形图", "6", <MailOutlined />, null, "item", "/charts/bar"),
        getItem("折线图", "7", <MailOutlined />, null, "item", "/charts/line"),
        getItem("饼图", "8", <MailOutlined />, null, "item", "/charts/pie"),
      ],"submenu"),
  ];

  export default menuList