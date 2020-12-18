import React, {Component} from 'react'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom'

import {reqLogin} from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import sotreageUtils from '../../utils/storeageUtils'

import './less/reset.less'

const Item = Form.Item

export default class Login extends Component {

  hundleSumblt =async (data) => {
    const {username,password} = data
    const result = await reqLogin(username,password)
    const user = result.data
    memoryUtils.user=user
    
    if(result.status===1) {
      message.error(result.msg)
    }else {
      message.success('登录成功')
      this.props.history.replace('/')
      memoryUtils.user = user
      sotreageUtils.setStore(user)
    }
  }

  render() {
    if(memoryUtils.user&&memoryUtils.user._id) {
      return <Redirect to="/"/>
    }
    return (
      <div className="login">
        <header className="login-header">
          <img src={require('../../assets/images/logo.png').default} alt=""/>
          <h1>电商后台管理ITEM</h1>
        </header>
        <section className="login-section">
          <h1>用户登录</h1>

      <Form 
      name="normal_login" 
      className="login-form"
      onFinish={this.hundleSumblt}
      >
      <Item
      name="username"
      rules={[
        {required:true,whitespace:true, message:'用户名是必须输入的'},
        {min:4,message:'用户名必须大于4位数嘛'},
        {max:12,message:'但是也不能超过12位嘛'},
        {pattern:/^[a-zA-Z0-9_]+$/,message:'符合要求吗,数字和字母和下划线'},
      ]}
      >
        <Input 
        prefix={<UserOutlined className="site-form-item-icon" 
        style={{color:"rgba(0,0,0,.5)"}}/>} placeholder="用户名" />
      </Item>
      <Item name="password"
       rules={[
         {validator:(rule,val,callback) => {
           if(!val) {
            //  Promise.reject('密码是必须输入的')
            callback('密码是必须输入的')
           }else if(val.length<4) {
            callback('密码必须大于四位')
           }else if(val.length>12) {
             callback('密码不得大于十二位')
           }else if(!/^[a-zA-Z0-9_]+$/.test(val)) {
             callback('密码必须符合要求,数字和字母和下划线')
           }else {
             callback()
           }
         }}
       ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" 
          style={{color:"rgba(0,0,0,.5)"}}/>}
          type="password"
          placeholder="密码"
        />
      </Item>

      <Item>
        <Button
        type="primary" htmlType="submit" className="login-form-button">
         登录
        </Button>
      </Item>
    </Form>
        </section>
      </div>
    )
  }
}
/* 
  1. 高阶函数
    1). 一类特别的函数
        a. 接收函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. promise: Promise(() => {}).then(value => {}, reject => ())
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
    3). 高阶函数更新动态 更加具有扩展性
  2. 高阶组件
    1). 本质就是一个函数
    2). 接受一个组件(被包装的组件), 返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性 
    3). 作用: 扩展组件的功能 
    4). 高阶组件也是高阶函数: 接受一个组件函数 返回一个新的组件 
*/