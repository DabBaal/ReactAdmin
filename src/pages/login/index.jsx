import React from 'react'
import { useNavigate } from "react-router-dom";

// 图片引入
import logo from "./images/logo.png"

// 样式引入
import "./login.css"

//AntD引入
import { Button, Form, Input, message } from 'antd';

//ajax引入
import { reqLogin } from '../../api';


export default function Login() {
  // 前台表单验证
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { username, password } = values

    //对ajax返回结果进行判断
    const response = await reqLogin(username, password)
    if (response.status === 0) {
      message.success("登录成功");
      //进行路由跳转
      navigate("/", { replace: true })
    } else {
      message.error("登录失败!  " + response.msg);
    }
  };

  const onFinishFailed = (errorInfo) => {
    const errorsLine = errorInfo.errorFields.reduce((acc, cur) => {
      return `${acc}${cur.errors[0]}\n`;
    }, "")
    message.error(errorsLine)
  };

  return (
    // HTML代码
    <div className="login">
      <header className="login_header">
        <img src={logo} alt="logo" />
        <h1>React项目：后台管理系统</h1>
      </header>
      <section className="login_content">
        <h2>用户登录</h2>
        <div className="login_form">
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  type: 'string',
                  required: true,
                  whitespace: true,
                  message: '用户名为必填项',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  type: 'string',
                  required: true,
                  whitespace: true,
                  message: '密码为必填项',
                },
                {
                  min: 4,
                  max: 12,
                  message: "密码的长度必须在4-12位之间"
                },
                {
                  pattern: new RegExp(/^[a-zA-Z0-9_]+$/, "g"),
                  message: "密码只能由字母、数字、字符串组成"
                }
              ]}
              validateFirst="true"
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </div>
  )
}

