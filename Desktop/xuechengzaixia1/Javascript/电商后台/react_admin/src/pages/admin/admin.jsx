import React, {Component} from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import {Layout} from 'antd'

import memoryUtils from '../../utils/memoryUtils'
import LeftNav from '../../components/Left-Nav/index'
import Header from '../../components/header/index'
import Home from '../home/home'
import Product from '../product/product'
import Category from '../category/category'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../chats/bar'
import Line from '../chats/line'
import Pie from '../chats/pie'

const { Footer, Sider, Content } = Layout;
export default class Admin extends Component {
  

  render() {
    const user = memoryUtils.user
    if(!user || !user._id) {
      return <Redirect to='/login'/>
    }
  return (
      <Layout style={{height:'100%'}}>
    <Sider>
      <LeftNav/>
    </Sider>
      <Layout>
          <Header>Header</Header>
          <Content style={{ background:'white',margin:20}}>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/product" component={Product}></Route>
              <Route path="/category" component={Category}></Route>
              <Route path="/role" component={Role}></Route>
              <Route path="/user" component={User}></Route>
              <Route path="/charts/bar" component={Bar}></Route>
              <Route path="/charts/line" component={Line}></Route>
              <Route path="/charts/pie" component={Pie}></Route>
              <Redirect to="/home"/>
            </Switch>
          </Content>
          <Footer style={{textAlign:'center'}}>建议使用Chrome浏览器,以获取更好的体验</Footer>
      </Layout>
    </Layout>
    )
  }
}