import jsonp from 'jsonp'
import {message} from 'antd'

import ajax from './ajax'

export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')
//查询商品
export const reqCaterogy = (parentId) => ajax('/manage/category/list',{parentId})
//添加商品
export const reqAddCaterogy = ({parentId,categoryName}) => ajax('/manage/category/add',{parentId,categoryName},'POST')
//更新商品
export const reqUpdateCaterogy = (categoryId,categoryName) => ajax('/manage/category/update',{categoryId,categoryName},'POST')
//根据页码显示商品列表
export const reqListPage = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize})
//根据ID/Name搜索产品分页列表 [searchType]:searchName}巧妙的将两种搜索方式结合在一个函数中
export const reqSearchProdocts = (pageNum,pageSize,searchType,searchName) => ajax('/manage/product/search',{pageNum,pageSize,[searchType]:searchName})
//根据分类ID获取分类
export const reqCategoryId = (categoryId) => ajax('/manage/category/info',{categoryId})
//对商品进行上架/下架处理
export const setProductStatus = (productId,status) => ajax('/manage/product/updateStatus',{productId,status},'POST')
//删除图片 
export const reqRemoveImg = (name) => ajax('/manage/img/delete',{name},'POST')
//添加商品
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/'+(product._id?'update':'add'),product,'POST')
//添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add',{roleName},'POST')
//获取角色列表
export const reqRoleList = () => ajax('/manage/role/list')
//更新角色
export const reqUpdateRole = (role) => ajax('/manage/role/update',role,'POST')
//获取用户列表
export const reqUserList = () => ajax('/manage/user/list')
//添加/修改用户
export const reqAddOrUpdateUser = (users) => ajax(`/manage/user/${users._id?'update':'add'}`,users,'POST')
//删除用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete',{userId},'POST')


export const reqWeater = () => {
  return new Promise((resolve,reject) => {
    const url = 'https://v0.yiketianqi.com/api?appid=72921711&appsecret=Mct5Bkqj &version=v61'
    //接口要收费 服了
    jsonp(url,{},(err,dataWeater) => {
      if(!err) {
        const {date,update_time,wea} = dataWeater
        resolve({date,update_time,wea})
      }else {
        message.error('获取天气失败')
      }
    })
  })
}
/* 
  jsonp解决ajax跨域的原理
    1) jsonp只能解决GET类型的ajax请求跨域问题
    2) jsonp请求不是ajax请求 而是一般的get请求
    3) 基本原理
      浏览器端:
          动态生成<script>来请求后台接口(src就是接口的url)
          定义好用于接收相应数据的函数(fn) 并将函数名通过请求参数提交给后台
      服务器端:
          接收到请求处理产生结果数据后 返回一个函数调用的js代码 并将结果数据作为实参传入函数调用
      浏览器端:
          收到相应自动执行函数调用的js代码 也就执行了提前定义好的回调函数 并得到了需要的结果数据
*/