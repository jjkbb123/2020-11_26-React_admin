import axios from 'axios'

export default function ajax(url,data={},type='GET') {
  if(type==='GET') {  // 发送GET请求
    // 拼接求参数串
    // data:{username:tom,password:123}
    // paramStr:username=tom&password=123
       let paramStr = ''  
    Object.keys(data).forEach(key => {
      paramStr+= key + '=' + data[key] + '&' 
    })
    if(paramStr) {
      paramStr.substring(0,paramStr.length-1)
    }
    // 使用axios发送get请求
    return axios.get(url+'?'+paramStr)
  }else {
    // 使用axios发送post请求
    return axios.post(url,data)
  }
}