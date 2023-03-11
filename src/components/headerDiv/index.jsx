import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import logo from "../../assets/images/logo.png"
import "./index.css"

import { reqWeather } from '../../api'
import useComponentWillMount from "../../utils/useComponentWillMount"
import menuList from '../../config/menuConfig'
import storeUtils from "../../utils/storeUtils"
import memoryUtils from '../../utils/memoryUtils'
import LinkButton from '../../utils/linkButton'

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation()

  //登出功能设计
  function logOut() {
    storeUtils.removeUser()
    memoryUtils.user = {}
    navigate("/login", { replace: true })
  }

  //发送异步请求获取天气数据
  const [weatherInfo, setWeatherInfo] = useState({
    reporttime: "loading...",
    weather: "loading..."
  })
  useComponentWillMount(async () => {
    const weatherInfo = (await reqWeather({
      key: "280d5a3e1519f9cb3020c03466bf3706",
      city: "310000"
    })).data.lives[0]
    setWeatherInfo(weatherInfo)
  })

  //获取当前页面标题
  let path = location.pathname === "/" ? "/home" : location.pathname
  let subFlag = ""

  //找出与当前路由相匹配的侧边栏元素
  const title = (function getTitle() {
    return menuList.find((item) => {
      if (item.type === "item") {
        return item.href === path
      }
      else if (item.type === "submenu") {
        return item.children.find((subItem) => {
          if (subItem.href === path) {
            subFlag = subItem
            return true
          } else
            return false
        })
      }
      return false
    })
  })()
  const match = subFlag ? subFlag : title

  return (
    <div className='header'>
      <div className="header_top">
        <span>欢迎，{memoryUtils.user.username}</span>
        <LinkButton onClick={logOut}>退出</LinkButton>
      </div>
      <div className="header_bottom">
        <div className='left_part'>
          {match.label}
        </div>
        <div className="right_part">
          <div>{weatherInfo.reporttime.slice(0, 10)}</div>
          <img src={logo} alt="logo" />
          <div>{weatherInfo.weather}</div>
        </div>
      </div>
    </div>
  )
}
