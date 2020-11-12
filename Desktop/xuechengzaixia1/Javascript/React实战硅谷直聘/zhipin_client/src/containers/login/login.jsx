import React,{Component} from 'react'

import {NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'

import Logo from '../../components/login/login'
import '../register/register.css'

// const ListItem = List.Item
export default class Register extends Component {

  state = {
    username:'',  //用户名
    password:'',   //密码
  }

  hundleChange = (name,val) => {
    this.setState({
      // [name]:val
      [name]:val
    })
  }

  register = () => {
    console.log(this.state);
  }
  toRegister = ()=> {
    this.props.history.replace('/register')
  }
  render() {
    return <div>
      <NavBar>BOSS HOME</NavBar>
      <Logo/>
      <WingBlank>
      <List>
      <WhiteSpace size='lg'/>
      <InputItem placeholder="请输入用户名" onChange={(val) => {this.hundleChange('username',val)}}>用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;户:</InputItem>
      <WhiteSpace size='lg'/>
      <InputItem placeholder="请输入密码" type="password" onChange={(val) => {this.hundleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码:</InputItem>
      <WhiteSpace size='lg'/>
      <Button className="button" onClick={this.register}>登录</Button>
      <Button onClick={this.toRegister}>还没有账户</Button>
      </List>
      </WingBlank>
    </div>
  }
}