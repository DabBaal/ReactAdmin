import React, { useEffect, useState } from 'react';

import { Card, Table, Button, message } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import LinkButton from '../../utils/linkButton';

import "./index.css"
import { reqCategory } from '../../api';

export default function Category() {
  //hooks定义
  const [dataSource, setDataSource] = useState()
  const [title, setTitle] = useState(updateTitle("一级分类列表"))
  const [parentId, setParentId] = useState("0")
  const [parentName, setParentName] = useState("")

  //静态页面基础变量
  let extra = (
    <Button type='primary'>
      <PlusOutlined />
      添加
    </Button>
  )

  //title点击事件实现
  function updateState(event) {
    //设置页面显示
    let match = "0"
    if (dataSource) {
      match = dataSource.find((item) => item.name === event.target.textContent)
    }
    updateTitle(null, match)
    match = match ? match._id : "0"
    setParentId(match)
  }

  function updateTitle(content, match = {}) {
    if (content) {
      if (content === "一级分类列表")
        return (<span onClick={updateState}>{content}</span>)
      else {
        return (
          <span>
            {title}
            <RightOutlined />
            <span onClick={updateState}>{content}</span>
          </span>
        )
      }
    } else {
      let newTitle
      if (!match) {
        newTitle = <span onClick={updateState}>一级分类列表</span>
      } else if (match.parentId === "0") {
        newTitle = (<span>
          <span onClick={updateState}>一级分类列表</span>
          <RightOutlined />
          <span onClick={updateState}>{match.name}</span>
        </span>)
      } else {
        newTitle = title
      }
      setTitle(newTitle)
    }
  }

  //查看子分类实现
  function showChildCategory(record) {
    setParentName(record.name)
    setParentId(record._id)
    setTitle(updateTitle(record.name))
  }

  const columns = [
    {
      title: '分类的名称',
      dataIndex: 'name',
      className: 'table_fix',
    },
    {
      title: '操作',
      width: 300,
      className: 'table_fix',
      render: (_, record) => {
        return (
          <div>
            <LinkButton style={{ "marginRight": "30px" }}>修改分类</LinkButton>
            <LinkButton onClick={() => showChildCategory(record)}>查看子分类</LinkButton>
          </div>
        )
      }
    },
  ];

  //发送异步请求，获取各级列表数据
  async function getCategory() {
    let reqData = (await reqCategory(parentId)).data
    if (!reqData.status) {
      setDataSource(reqData.data)
    } else {
      message.error(reqData.error)
    }
  }

  useEffect(() => {
    //服务器异步请求一级分类列表
    getCategory()
  }, [parentId])

  if (!dataSource) {
    return (<div>Loading...</div>)
  }

  return (
    <Card title={title} extra={extra}
      className="card_fix">
      <Table
        bordered
        rowKey="_id"
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 6 }}
      />
    </Card>
  )
}
