import ajax from "./ajax";

//登录请求
export const reqLogin = (username, password) => {
    return ajax("/login", { username, password }, "post")
}

//天气请求
const WEATHER_URL = "https://restapi.amap.com/v3/weather/weatherInfo"
export const reqWeather = ({ key, city }) => {
    return ajax(WEATHER_URL, { key, city })
}

//获取分类列表
export const reqCategory = (parentId) => {
    return ajax("/manage/category/list", { parentId })
}
//添加分类
export const reqAddCategory = (parentId, categoryName) => {
    return ajax("/manage/category/add", { parentId, categoryName }, "post")
}
//更新分类
export const reqUpdateCategory = (categoryId, categoryName) => {
    return ajax("/manage/category/update", { categoryId, categoryName }, "post")
}