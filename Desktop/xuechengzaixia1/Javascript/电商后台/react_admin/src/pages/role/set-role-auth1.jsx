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

  static propTypes = {
    role:PropTypes.object.isRequired,
    getRoleMenus:PropTypes.func.isRequired
  }

  state = {
    setMenus:[]
  }

  //设置权限管理的列表
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

  //选中下拉选项
  selectRole = (selectedKeys) => {
    
    arr = [...this.state.setMenus,...selectedKeys]
    this.setState(state => {
      return {
        // setMenus:[...new Set(arr)]
        setMenus:[...selectedKeys]
      }
    })
  }

  onCheck = (e) => {
    console.log(e);
  }

  componentWillMount() {
    this.authList = this.getAuthList(menuList)
    const {menus} = this.props.role
    this.setState({
      setMenus:menus
    })
  }


  render() {
    const {name} = this.props.role
    const {setMenus} = this.state
    this.props.getRoleMenus(setMenus)
    console.log(setMenus);
    
    const treeData = [
      {
        title:"平台权限",
        key:1,
        children:this.authList
      }
    ]
    return (
      <Card>
        <Item
        labelCol={{span:4}}
        wrapperCol={{span:15}}
        label="角色名称"
        >
          <Input value={name} disabled/>
          <Tree
            checkable
            treeData={treeData}
            defaultExpandAll
            // checkedKeys	={[...menus,...this.state.setMenus]}
            onCheck={this.onCheck}
            checkedKeys={setMenus}
            onSelect={this.selectRole}
         />
        </Item>
      </Card>
    )
  }
}