import React, {Component} from 'react'
import {Card,Button,Table,Modal,message,Form} from 'antd'

import setTime from '../../utils/nowTime'
import {reqUserList,reqAddOrUpdateUser,reqDeleteUser} from '../../api/index'
import CreateUser from './create-user'
import { ExclamationCircleOutlined } from '@ant-design/icons';


export default class User extends Component {

  state = {
    users:[], //用户列表user
    roles:[], //角色列表role
    roleObj:{},
    isShow:false,
    valueObj:{}
  }


  //获取用户列表
  getUserList = async() => {
    const result = await reqUserList()
    if(result.status===0) {
      const {users,roles} = result.data
      this.setState({users,roles})
      this.getRoleObj()
  }
  }

  //添加用户
  addUser = async() => {
    this.setState({isShow:false})
    const {valueObj} = this.state
    valueObj._id = this._id || null
    const result = await reqAddOrUpdateUser(valueObj)
    if(result.status===0) {
      if(valueObj._id) {
        message.success('更新成功')
        this.getUserList()
      }else {
        message.success('添加成功')
        this.getUserList()
      }
    }
  }

  //修改用户
  updateUser = async(_id) => {
    this.setState({isShow:2})
    this._id = _id
  }
  
  //删除用户
  deleteUser = (userId) => {
    Modal.confirm({
      title: '确定删除该用户吗?',
      icon: <ExclamationCircleOutlined />,
      
      onOk:async() => {
        const result = await reqDeleteUser(userId.replace(/\"/g,""))
        console.log(userId.replace(/\"/g,""));
        
        if(result.status===0) {
          message.success('删除成功')
          this.getUserList()
        }else {
          message.error('删除失败,自己找原因')
        }
      },
      cancelText: '取消',
    })
  }

  //初始化列
  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'name',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render:setTime
      },
      {
        title: '所属用户',
        dataIndex: 'role_id',
        render:(role_id) => this.state.roles.find(role=>role._id===role_id.replace(/\"/g,"")).name
        // render:(role_id) => console.log(this.state.roleObj[role_id.replace(/\"/g,"")])
        // render:(role_id) => console.log(role_id.replace(/\"/g,""))
      },
      {
        title: '操作',
        dataIndex: '_id',
        render:(_id) => (
        <div>
          <a 
          style={{color:'green',marginRight:15}}
          onClick={() => this.updateUser(_id)}
          >修改</a>
          <a 
          style={{color:'green'}}
          onClick={() => this.deleteUser(_id)}
          >删除</a>
        </div>
        )
      },
    ]
  }

  //获取角色ID对象
  getRoleObj = () => {
    const {roles} = this.state
     this.roleObj=roles.reduce((pre,role) => {
     pre[role._id]=role.name
     return pre
    },{})
  }

  //获取表单输入对象
  getValueObj = (valueObj) => {
    this.setState({valueObj})
  }
  //初始化列
  componentWillMount() {
    this.initColumns()
  }

  //获取用户列表
  componentDidMount() {
    this.getUserList()
  }


  render() {
    const {users,roles,isShow} = this.state
    
    const title = <Button type='primary' onClick={() => {this._id=null;this.setState({isShow:1})}}>创建用户</Button>
    return (
      <Card
      title={title}
      >
        <Table
        bordered
        dataSource={users}
        columns={this.columns}
        rowKey="_id"
        >
        </Table>
        <Modal
           title={isShow===1?'添加用户':'修改用户'}
           visible={isShow}
           onOk={this.addUser}
           onCancel={() => this.setState({isShow:false})}
          >
            <CreateUser 
            getValueObj={this.getValueObj}
            roles={roles}
            isShow={isShow}
             />
          </Modal>
      </Card>
    )
  }
}

