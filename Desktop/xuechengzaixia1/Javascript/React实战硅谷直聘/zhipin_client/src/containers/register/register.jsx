import React,{Component} from 'react'

import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'

import Logo from '../../components/login/login'
import './register.css'

const ListItem = List.Item
export default class Register extends Component {

  state = {
    username:'',  //用户名
    password:'',   //密码
    password2:'',  // 确认密码
    type:'Older'        // 单选按钮
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
  toLogin = ()=> {
    this.props.history.replace('/login')
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
      <InputItem placeholder="请确认密码" type="password" onChange={(val) => {this.hundleChange('password2',val)}}>确认密码:</InputItem>
      <WhiteSpace size='lg'/>
      <ListItem>
        <span>用户类型:</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
          <Radio checked={this.state.type==='Older'} onChange={() => {this.hundleChange('type','Older')}}>Older</Radio>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Radio checked={this.state.type==='Boss'} onChange={() => {this.hundleChange('type','Boss')}}>Boss</Radio>
      </ListItem>
      <Button className="button" onClick={this.register}>注册</Button>
      <Button onClick={this.toLogin}>已有账户</Button>
      </List>
      </WingBlank>
    </div>
  }
}