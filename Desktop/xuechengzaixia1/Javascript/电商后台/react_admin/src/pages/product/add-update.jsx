import React, {Component} from 'react'
import {
  Card,
  Input,
  Form,
  Button,
  Cascader,
  message
} from 'antd'

import {ArrowLeftOutlined} from '@ant-design/icons'

import {reqCaterogy,reqAddOrUpdateProduct} from '../../api/index'
import UploadImage from './upload-image'
import RichTextEditor from './rich-text-editor'

const {Item} = Form
const {TextArea} = Input

export default class AddUpdate extends Component {

  state = {
    options:[],
    imgs:[],
    editorValue:''//富文本框hmtl值
  }

  //提交按钮
  updateData = async(val) => {
    val.imgs=this.state.imgs
    const {editorValue} = this.state
    console.log(val,editorValue);
    console.log(val.category[1]);
    let product = {
      categoryId:val.category[1]?val.category[1]:val.category[0],
      pCategoryId:!val.category[1]?0:val.category[0],
      name:val.name,
      desc:val.desc,
      price:val.price,
      detail:editorValue,
      imgs:val.imgs,
      _id:this.props.location.state?this.props.location.state._id:null
    }
    
    const result = await reqAddOrUpdateProduct(product)
    if(result.status===0) {
      this.props.history.goBack()
      message.success('添加成功')
    }else {
      message.error('添加失败')
    }
  }

  //初始化分类
  initCaterogy = async(parentId) => {
    const result = await reqCaterogy(parentId)
    const {data} = result
        if(!parentId) {
          if(result.status===0) {
            let item = data.map(cItem => ({
              value:cItem._id,
              label:cItem.name,
              isLeaf:false,
            }))
            this.setState({
              options:item
            })
          }
        }else {
            const {options} = this.state
            let option = data.find(e => e.parentId===parentId)
            options.map(item => {
              return item.value===option.parentId?item.children=[{
                label:`${option.name}`,
                value:option._id,
                isLeaf:false,
              }]:null
            })
            this.setState({
              options
            })
        }
  }

  //获取上传的文件 因为在子组件 所以需要通过传递函数的形式来获取
  getImgs = (imgs) => {
    this.setState({
      imgs
    })
  }

  //获取富文本框输入的html文本
  getEditor = (editorValue) => {
    this.setState({
      editorValue
    })
  }

  //初始化分类
   async componentDidMount() {
    const {categoryId,pCategoryId} = this.props.location.state?this.props.location.state:{}
    let parentId=pCategoryId==='0'?0:pCategoryId
    this.initCaterogy(0)
    this.initCaterogy(parentId)
  }

  //加载二级分类
  loadData =async selectedOptions => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;
      const result = await reqCaterogy(targetOption.value)
      targetOption.loading = false;
      const {data} = result
      if(result.status===0) {
       //这一步很重要 在targetOption的孩子上增加数组数据才行 我服了
        targetOption.children = data.map(item => ({
          label: `${item.name}`,
          value: item._id,})
        )
      this.setState({
        //搞半天是要在原来的数据上增加targetOption.children
        options:this.state.options
      })
    }
  };

  render() {
    //记住!! 添加和修改是使用了同一个页面
    //获取系相应数据 加{}是为了防止报错 因为点击添加时this.props.location.state是没有数据的
    const {name,desc,price,categoryId,pCategoryId,imgs,detail} = this.props.location.state?this.props.location.state:{}
    //对界面组件的一些配置
    const layout = {
      labelCol: {span: 2,},
      wrapperCol: {span: 8,}
    };
    const title = <span>
      <a 
      onClick={() => this.props.history.goBack()}
      style={{marginRight:15}}
    > 
      <ArrowLeftOutlined/>
      </a>
        {/* 这里根据pCategoryId===0判断是否是修改商品或者添加商品 因为修改的链接push传递了点击该产品的数据 */}
      {pCategoryId?'修改商品':'添加商品'}
      </span>
    return (
      <Card
      title={title}
      >
        <Form
        onFinish={this.updateData}
        {...layout}
        >
          <Item
          initialValue={name}
          label="商品名称"
          name="name"
          rules={[
            {
              required: true,
              message: '请输入商品名称',
            },
          ]}
          >
            <Input 
            // defaultValue={name}
            placeholder="请输入商品名称"/>
          </Item>

          <Item
          initialValue={desc?desc:null}
          label="商品描述"
          name="desc"
          rules={[
            {
              required: true,
              message: '请输入商品名称',
            },
          ]}
          >
            <TextArea
            // defaultValue={desc?desc:null}
            placeholder="请输入商品描述" autoSize={{minRows:2,maxRows:4}}/>
          </Item>

          <Item
          initialValue={price}
          label="商品价格"
          name="price"
          rules={[
            {
              required: true,
              message: "你倒是输入啊,但是别小于0好吧",
              //对输入的价格进行判断 需要大于0
              validator:(ruel,val,callback) => {
                if(val*1 < 1||!val) {
                  new Promise((resolve,reject) => reject('1'))
                }else { 
                  new Promise(() => callback())
                }
              }
            },
          ]}
          >
            <Input 
            type='number'
            // defaultValue={price}
            addonAfter="元"
            placeholder="请输入商品价格"
            onChange={() => this.priceSub}
            />
          </Item>

          <Item
          //这里巧妙的修复了添加商品的商品分类下会出现/的问题
          initialValue={!pCategoryId?'':(pCategoryId==='0'?[categoryId]:[pCategoryId,categoryId])}
          label="商品分类"
          name="category"
          rules={[
            {
              type: 'array',
              required: true,
              message: '请选择商品分类啊!',
            },
          ]}
          >
            <Cascader 
            placeholder="请选择商品分类"
            options={this.state.options}
            changeOnSelect
            loadData={this.loadData}
             />
          </Item>
          <Item
          label="商品图片"
          name="photo"
          >
           <UploadImage getImgs={this.getImgs} imgs={imgs}/>
          </Item>

          <Item
          initialValue={this.state.editorValue}
          label="商品详情"
          name="detail"
          labelCol={{span:2}}
          wrapperCol={{span:20}}
          >
            <RichTextEditor getEditor={this.getEditor} detail={detail}/>
          </Item>

          <Button
           type='primary'
           htmlType="submit"
           >
            提交
          </Button>
        </Form>
      </Card>
    )
  }
}

