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