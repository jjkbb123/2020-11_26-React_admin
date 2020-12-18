
/* 
  第二个版本 第一个版本的tree选项框搞迷糊了 呆弄了将近三个小时 真的是快认为自己毫无编程天分
    结果从antd抄了一个model下来 十几分钟就弄完了
*/
import React , {Component} from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  Tree,
  Card,
  Form
} from 'antd' 

import menuList from '../../menuConfig/menuConfig'

const Item = Form.Item
let arr 
export default class SetRoleAuth extends Component {

  state = {
    menus:''
  }

  //获取权限列表
  getAuthList = (menuList1) => {
    return menuList1.reduce((pre,item) => {
       pre.push(
         {
           title:item.title,
           key:item.key,
           children:item.children?this.getAuthList(item.children):null
         }
       )
       return pre
     },[])
   }
 


   //单选框
  onSelect = (selectedKeys, info) => {
    console.log(this.state.menus);
    this.onCheck(selectedKeys)
    // this.setState({
    //   menus:this.state.menus
    // })
  }

  //复选框
   onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys)
    this.setState({
      menus:checkedKeys
    })
  }

  //初始化页面时渲染权限列表
  componentWillMount() {
    this.authList = this.getAuthList(menuList)
    this.authLists=[]
    this.authLists.push({
      title:'权限管理',
      key:'_id',
      children:this.authList
    })
    this.setState({
      menus:this.props.role.menus
    })
  }

  //接收到新的属性时调用
  
  UNSAFE_componentWillReceiveProps() {
    this.setState({
      menus:this.props.role.menus
    })
  }
  render() {

    const {menus} = this.state
    this.props.getRoleMenus(menus)

    return (
      <Card
      bordered
      >
      <Item
        label="名称:"
        labelCol={{span:4}}
        wrapperCol={{span:16}}
        >
        <Input value={this.props.role.name} disabled style={{marginBottom:20}} />
        <Card
        bordered
        >
        <Tree
        checkable
        defaultExpandAll
        onSelect={this.onSelect}  
        onCheck={this.onCheck}
        checkedKeys={this.state.menus}
        treeData={this.authLists}
        />
        </Card>
        </Item>
      </Card>
        
    )
  }
}