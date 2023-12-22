/*
  ajax异步请求函数部分
  使用promise对象异步返回response.data数据
 */
import axios from 'axios'
import {getStorage} from "../utils/storage";
export default function ajax (url, data = {}, type = 'get') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (type === 'get') {
      // 准备url query参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送get请求
      promise = axios.get(url,{
        headers:{
          Authorization:getStorage('token')
        }
      })
    } else {
      // 发送post请求
      promise = axios.post(url, data,{
        headers:{
          Authorization:getStorage('token')
        }
      })
    }
    promise.then(response => {
      resolve(response.data)
    }).catch(error => {
      reject(error)
    })
  })
}
