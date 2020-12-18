import React, {Component ,PureComponent} from 'react'
import {
  Card,
  Button,
  Form,
  Table,
  message,
  Modal,
  Input
} from 'antd'

import {reqRoleList,reqAddRole,reqUpdateRole} from '../../api/index'
import SetRoleAuth from './set-role-auth'
import nowTime from '../../utils/nowTime'
import user from '../../utils/memoryUtils'
import store from '../../utils/storeageUtils'

const Item = Form.Item
export default class Role extends Component {

  state = {
    roles:[], //角色列表
    role:{},  //角色信息
    isShow:false,
    roleName:'' //角色姓名
  }

  //设置Table表头信息
  getMenu = () => {
    return this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(create_time) => nowTime(create_time)
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        key: 'auth_time',
        render:nowTime
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
        key: 'auth_name',
      }
    ]
  } 

  //获取角色信息列表
  getRoleList = async() => {
    const result = await reqRoleList()
    if(result.status===0) {
    const roles = result.data
    this.setState({roles})
    }
  }

  //设置角色姓名
  
 setRoleName = (event) => {
  this.setState({
    roleName:event.target.value
  })
 }
  //添加角色
  addRole =async () => {
    this.setState({isShow:false})
    const {roleName} = this.state
    const result = await reqAddRole(roleName)
    if(result.status===0) {
      message.success('添加成功')
      const role = result.data
      this.setState(state => [...state.roles,role])
      this.getRoleList()
    }else {
      message.error('添加失败')
    }
  }

  //更新用户
  updateRole =async () => {
    this.setState({isShow:false})
    const {_id,create_time} = this.state.role
    let role = {_id,menus:this.menus,create_time,auth_name:user.user.username}
    const result = await reqUpdateRole(role)
    
    if(result.status===0) {
      if(user.user.role_id===role._id || user.user.role.id===role._id) {
        store.removeStore()
        user.user = {}
        message.success('当前用户权限已被更改,请重新登录')
        this.props.history.replace('/login')
        this.setState({
          role:result.data
        })
        this.getRoleList()
      }else {
          message.success('更新成功')
          this.setState({
            role:result.data
          })
          this.getRoleList()
        }
    }else {
      message.error('更新失败')
    }
  }

  //设置role信息
  setRole = (record) => {
    this.setState({role:record})
  }

  //获取子组件menus数组
  getRoleMenus = (menus) => {
    this.menus = menus
  }
  componentWillMount() {
     this.getMenu()
  }

  componentDidMount() {
    this.getRoleList()
  }

  render() {
    const {roles,role,isShow} = this.state
    const title = (
      <span>
        <Button type='primary'
        onClick={() => this.setState({isShow:1})}
        >创建角色</Button>&nbsp;&nbsp;&nbsp;
        <Button 
        type='primary'
        disabled={!role._id}
        onClick={() => this.setState({isShow:2})}
        >设置角色权限</Button>
        </span>
    )
    return (
      <Card
      title={title}
      >
        <Table
        rowKey="_id"
        bordered
        dataSource={roles}
        columns={this.columns} 
        // onRow={record => ({onClick:e => this.setState({role:record})})}
        onRow={record => ({onClick:e => this.setRole(record)})}
        rowSelection={{
          type:"radio",
          selectedRowKeys:[role._id],
          onSelect:record => this.setRole(record)
        }}
        >
        </Table>
        <Modal
        title="创建角色"  
        visible={isShow===1}
        onOk={this.addRole}
        onCancel={() => this.setState({isShow:false})}
      >
        <Item
        labelCol={{span:4}}
        wrapperCol={{span:16}}
        label="创建角色"
        preserve={false}
        >
          <Input 
          onChange={this.setRoleName}
          placeholder="请输入创建角色的名称"/>
        </Item>
      </Modal>
        <Modal
        title="设置角色权限"
        visible={isShow===2}
        onOk={this.updateRole}
        onCancel={() => this.setState({isShow:false})}
        >
          <SetRoleAuth role={role} getRoleMenus={this.getRoleMenus}/>
        </Modal>
      </Card>
    )
  }
}

