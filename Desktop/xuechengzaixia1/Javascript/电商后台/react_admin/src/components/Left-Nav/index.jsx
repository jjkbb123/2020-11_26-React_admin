import React, {Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';

import menuList from '../../menuConfig/menuConfig'
import user from '../../utils/memoryUtils'

import './index.less'

const { SubMenu } = Menu;
class LeftNav extends Component {

  /* 
    使用的map方法
  */
  // getMenuList_map = (menuList) => {
  //  return  menuList.map(
  //     (menu,index) => {
  //       if(!menu.children) {
  //         return (
  //           <Menu.Item key={menu.key} icon={menu.icon}>
  //            <Link to={menu.key} >{menu.title}</Link>
  //           </Menu.Item>
  //         )
  //       }else {
  //         return (
  //           <SubMenu key={menu.key} icon={menu.icon} title={menu.title}>
  //         {this.getMenuList(menu.children)} {/* 这里使用了递归调用 */}
  //         </SubMenu>
  //         )
  //       }
  //     }
  //   )
  // }


  //对权限进行判断
  getAuth = (auth) => {
    if(user.user.username==='admin'||auth.isPublic) {
      return true
    }else if(auth.children){
     return auth.children.find(auth => {
        return !!(user.user.role.menus.find(menu => menu.indexOf(auth.key)!==-1))
      })
    }else {
       return !!(user.user.role.menus.indexOf(auth.key)!==-1)
    }
  }
  /* 
    使用的reduce方法
  */
  getMenuList_reduce =(menuList) => {
    let path = this.props.location.pathname
    return menuList.reduce(
      (pre,item) => {
        if(this.getAuth(item)) {
          if(!item.children) {
            pre.push((
              <Menu.Item key={item.key} icon={item.icon}>
               <Link to={item.key} >{item.title}</Link>
              </Menu.Item>
            ))
          }else {
            // const cItem = item.children.find(cItem => cItem.key===path)
            path=path?(path.indexOf('/product')!==-1?'/product':null):null
            const cItem = item.children.find(cItem => path===cItem.key)
            if(cItem) {
              this.openPath=item.key
            }
            pre.push((
              <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuList_reduce(item.children)} {/* 这里使用了递归调用 */}
            </SubMenu>
            ))
          }
        }
        return pre
      },[]
    )
  }
  componentWillMount() {
    //还为render之前便做的事
    //只针对于同步
    this.menuLists = this.getMenuList_reduce(menuList)
  }
  render() {
    let path = this.props.location.pathname
    
    if(path.indexOf('/product')!==-1) {
      path='/product'
    }
    return (
      <div className="left-nav">
        <Link to="/">
        <div className="left-nav-link">
          <img src={require('../../assets/images/logo.png').default} alt=""/>
          <h1>电商后台</h1>
        </div>
        </Link>

          <Menu
          // defaultSelectedKeys={path==='/'?['/home']:[path]}
          selectedKeys={[path]}
          defaultOpenKeys={[this.openPath]}
          mode="inline"
          theme="dark"
        >
          
          {/*
           <Menu.Item key="/home" icon={<HomeOutlined />}>
          <Link to="/home"> 首页</Link>
          </Menu.Item>
          
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
          <Menu.Item key="/category" icon={<MailOutlined/>}><Link to="/category">品类管理</Link></Menu.Item>
          <Menu.Item key="/product" icon={<MailOutlined/>}><Link to="/product">商品管理</Link></Menu.Item>
          </SubMenu>

          <Menu.Item key="/user" icon={<UserOutlined />}>
          <Link to="/user"> 用户管理</Link>
          </Menu.Item>
          
          <Menu.Item key="/role" icon={<UserSwitchOutlined />}>
          <Link to="/role"> 角色管理</Link>
          </Menu.Item> */}
          {this.menuLists}
        </Menu>
      </div>
    )
  }
}
export default withRouter(LeftNav)