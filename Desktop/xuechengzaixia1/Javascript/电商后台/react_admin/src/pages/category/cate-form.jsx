import React, {Component} from 'react'
import {Form,Select,Input} from 'antd'
import PropTypes from 'prop-types'



const Option = Select.Option
export default class CateForm extends Component {

    static propTypes = {
      category:PropTypes.array.isRequired,
      currentParentId:PropTypes.func.isRequired,
    }

    hundleInput = (e,valueAgain) => {
      const {value} = e.target
      this.props.setInputValue(value)
      this.value=valueAgain
    }

    hundleChange = (parentId) => {
      console.log(parentId);
      this.props.currentParentId(parentId)
    }
    
  render() {
    const {category} = this.props
    return (
      <Form>
        <Form.Item >
          <span>所属分类:</span>
          <Select 
          defaultValue={0}
          onSelect={this.hundleChange}
          >  
            <Option value={0}>一级分类</Option>
            {category.map(item => <Option value={item._id} key={item._id}> {item.name} </Option>)}
          </Select>
        </Form.Item>

        <Form.Item
        name="category"
        rules={
          [{
          required:true,message:'必须输入'
          }]}
        >
          <Input
          onChange={(e) => this.hundleInput(e)}
          placeholder="请输出品类名称"
          value={this.value}
          type='category'
          />
        </Form.Item>
      </Form>
    )
  }
}