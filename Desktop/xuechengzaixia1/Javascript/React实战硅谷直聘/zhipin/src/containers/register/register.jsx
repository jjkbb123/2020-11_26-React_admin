import React,{Component} from 'react'

import {NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace
} from 'antd-mobile'

import Logo from '../../components/login/login'
const listItem = List.Item
export default class Register extends Component {
  render() {
    return <div>
      <NavBar>BOSS HOME</NavBar>
      <Logo/>
    </div>
  }
}