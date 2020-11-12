/* 
  包含n个action creator 
  异步 action
  同步 action
*/
import {reqRegister,reqLogin} from '../api/index'
import {AUTH_SUCCESS,ERROR_MSG} from './action-types'

//授权成功的同步action
const authSuccess = (user) => ({type:AUTH_SUCCESS,data:user})
//错误提示信息的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg})
export const register = (user) => {
  return async dispatch => {
    //发送注册的异步ajax请求
      // reqRegister(user).then(
      //    resopnse => {
      //      const result = resopnse.data
      //    }
      // )
      const response = await reqRegister(user)
      const result = response.data
      if(result.code === 0) {  //成功
        //分发授权成功的同步action
        dispatch(authSuccess(result.data))
      }else{
        dispatch(errorMsg(result.msg))
      }
  }
}

//登录异步action
export const login = (user) => {
  return async dispatch => {
    //发送注册的异步ajax请求
      // reqRegister(user).then(
      //    resopnse => {
      //      const result = resopnse.data
      //    }
      // )
      const response = await reqLogin(user)
      const result = response.data
      if(result.code === 0) {  //成功
        //分发授权成功的同步action
        dispatch(authSuccess(result.data))
      }else{
        dispatch(errorMsg(result.msg))
      }
  }
}