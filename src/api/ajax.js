import axios from "axios";
import { message } from "antd";

const BASE = ""

export default function ajax(url, data = {}, method = "get") {
    return new Promise((resolve, reject) => {
        let promise
        if (method === "get") {
            promise = axios.get(BASE + url, {
                params: data
            })
        } else {
            promise = axios.post(BASE + url, data)
        }

        promise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error(error.message, 5)
        })
    })
}