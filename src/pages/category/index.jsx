import React, { useEffect, useState } from 'react';

import { Card, Table, Button, message } from 'antd';
import { PlusOutlined, RightOutlined } from '@ant-design/icons';
import LinkButton from '../../utils/linkButton';

import "./index.css"
import { reqCategory, reqUpdateCategory } from '../../api';

export default function Category() {
  //当前页面展示数据
  const [dataSource, setDataSource] = useState()
  //存储当前页面各级标题的数据
  const [dataList, setDataList] = useState([])

  //当前标题HTML
  const [title, setTitle] = useState(<span onClick={titleClick}>一级分类列表</span>)
  //存储当前页面各级标题的内容
  const [titleList, setTitleList] = useState(["一级分类列表"])

  //当前页面元素父元素的id与名字
  const [parentId, setParentId] = useState("0")
  const [categoryName, setCategoryName] = useState()

  //表格列变量
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
            <LinkButton onClick={() => { addCategory(record) }} style={{ "marginRight": "30px" }}>修改分类</LinkButton>
            <LinkButton onClick={() => showChildCategory(record)}>查看子分类</LinkButton>
          </div>
        )
      }
    },
  ];

  //静态页面基础变量
  let extra = (
    <Button type='primary'>
      <PlusOutlined />
      添加
    </Button>
  )

  //处理标题上的点击函数
  function titleClick(event, arr) {
    let clickIndex = event.target.id
    let data = dataList[clickIndex]
    if (data) {
      //修改标题
      let newTitleArr = titleList.slice(0, clickIndex + 1)
      setTitleList(newTitleArr)
      setTitle(newHtml(newTitleArr))

      //修改页面
      let newDataArr = dataList.slice(0, clickIndex)
      let newCategoryName = arr[clickIndex]
      setParentId(data[0].parentId)
      setDataList(newDataArr)
      setCategoryName(newCategoryName)
    }
  }

  //根据传入数组构建HTML
  function newHtml(arr) {
    return (
      <span>
        {
          arr.map((item, index) => {
            return (
              <span key={index}>
                <span onClick={(event) => titleClick(event, arr)} id={index}>{item}</span>
                <RightOutlined />
              </span>
            )
          })
        }
      </span>
    )
  }

  //动态显示当前标题
  function updateTitle(content, type) {
    let newArr
    if (type === "Add") {
      newArr = [...titleList, content]
      setTitleList(newArr)
      setTitle(newHtml(newArr))
    } else if (type === "Change") {
      let index = titleList.indexOf(content)
      newArr = titleList.slice(0, index + 1)
      setTitleList(newArr)
      setTitle(newHtml(newArr))
    }
  }

  //查看子分类
  function showChildCategory(record) {
    setCategoryName(record.name)
    setParentId(record._id)
    updateTitle(record.name, "Add")
  }

  //修改分类操作
  async function addCategory(record) {
    const { _id } = record
    const input = prompt('请输入新分类名：');
    const reqData = (await reqUpdateCategory(_id, input)).data
    if (reqData.status === 0) {
      //修改状态
      setCategoryName(input)
      setDataList((dataList) => dataList.slice(0, dataList.length - 1))
      getCategory()
    } else {
      message.error(reqData.error)
    }
  }

  //发送异步请求，获取各级列表数据
  async function getCategory() {
    let reqData = (await reqCategory(parentId)).data
    if (!reqData.status) {
      let simpleData = reqData.data
      setDataSource(simpleData)
      //将内容更新到titleList中
      setDataList((dataList) => [...dataList, simpleData ? simpleData : {}])
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
      {
        [1].map(() => {
          console.log(dataList);
        })
      }
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
