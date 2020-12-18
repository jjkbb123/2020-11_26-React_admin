import React, {Component} from 'react'
import {Form,Input} from 'antd'
import PropTypes from 'prop-types'



export default class UpdateForm extends Component {
  static propTypes = {
    categoryName:PropTypes.string.isRequired,
    setInputValue:PropTypes.func.isRequired
  }

  hundleInput = (e,valueAgain) => {
    const {value} = e.target
    this.props.setInputValue(value)
    this.value=valueAgain
  }

  render() {  
    return (
      <Form
      >
        <Form.Item
        name="category"
        rules={[
          {required:true,message:'必须输入'}
        ]}
        >
          <Input 
          // defaultValue={categoryName}
          placeholder="请输出品类名称"
          onChange={(e) => this.hundleInput(e)}
          value={this.value}
          type="category"
          />
          
        </Form.Item>
      </Form>
    )
  }
}