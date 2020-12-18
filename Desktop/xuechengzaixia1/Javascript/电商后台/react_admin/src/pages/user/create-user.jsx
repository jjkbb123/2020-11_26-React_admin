import React, {Component} from 'react'
import {Card,Form,Modal,Select,Input} from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
export default class CreateUser extends Component {

  static propTypes = {
    getValueObj:PropTypes.func.isRequired,
    roles:PropTypes.array.isRequired,
    // isShow:PropTypes.number.isRequired
  }

  onValuesChange = (value,valueObj) => {
    this.props.getValueObj(valueObj)
  }

  render() {
    const {roles,isShow} = this.props
    return (
            <Form
            labelCol={{span:4}}
            wrapperCol={{span:14}}
            onValuesChange={this.onValuesChange}
            >
            <Item
            label="用户名:"
            name="username"
            rules={
              [
                {required:true,max:14,min:4,message:'输入小于四位大于十四位'}
              ]
            }
            >
            <Input/>
            </Item>
            
            {isShow===2?null:(
              <Item
              label="密码:"
              name="password"
              rules={
                [
                  {required:true,max:8,min:4,message:'输入小于四位大于八位'}
                ]
              }
              >
              <Input type='password'/>
            </Item>
            )}
            
          <Item
          label="手机号:"
          name="phone"
          rules={
            [
              {required:true,max:11,min:11,message:'输入11位'}
            ]
          }
          >
            <Input type='number'/>
          </Item>

          <Item
          label="邮箱:"
          name="email"
          >
            <Input type='email'/>
          </Item>
          <Item
          label="角色:"
          name="role_id"
          initialValue="请选择角色"
          rules={
            [
              {required:true}
            ]
          }
          >
            <Select
            >
           {roles.map(role => (<Option key={role._id} value={role._id}> {role.name} </Option>))}
            </Select>
          </Item>
            </Form>
          
    )
  }
}