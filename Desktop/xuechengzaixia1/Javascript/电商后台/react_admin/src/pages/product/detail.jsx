import React, {Component} from 'react'
import {Card,List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import {reqCategoryId} from '../../api/index'

const Item = List.Item

export default class Detail extends Component {
  state = {
    productTypeName1:'',//父分类的名称
    productTypeName2:'',//子分类的名称
  }

  async componentDidMount() {
    //pCategoryId 父
    //categoryId 子
    const {categoryId,pCategoryId} = this.props.location.state
    //判断是不是父分类下的 是就没有子分类名称
    if(pCategoryId==='0') {
     const result = await reqCategoryId(categoryId)
      this.setState({
        productTypeName1:result.data.name
      })
    }else {
      const results = await Promise.all([reqCategoryId(pCategoryId),reqCategoryId(categoryId)])
      this.setState({
        productTypeName1:results[0].data.name,
        productTypeName2:results[1].data.name
      })
    }
  }

  render() {
    const {name,price,_id,imgs,desc,detail} = this.props.location.state
    const {productTypeName1,productTypeName2} = this.state
    
    const title = <span>
      <a onClick={() => this.props.history.goBack()}>
      <ArrowLeftOutlined style={{marginRight:15,color:'green'}}
      />
      </a> 
      商品详情
      </span>
    return (
      <Card
      className="product-detail"
      title={title}
      >
        <List
        >
        <Item>
          <span className="product-detail-left">商品名称:</span>
          {name}
        </Item>
        <Item>
          <span className="product-detail-left">商品描述:</span>
          {desc?desc: '暂未填写'}
        </Item>
        <Item>
          <span>
          <span className="product-detail-left">商品价格:</span>
          {price}￥
          </span>
        </Item>
        <Item>
          <span className="product-detail-left">所属分类:</span>
          {productTypeName1} {productTypeName2? '-->' + productTypeName2 : ''}
        </Item>
        <Item>
          <span>
          <span className="product-detail-left">商品图片:</span>
          {imgs.length!==0? imgs.map(
            (img,imdex) => (
            <img 
            key={imdex}
            src={img.url}
            style={{width:150,height:150,marginRight:15}}
             alt="笔记本"
             />
          )) :'暂未上传图片'}
          </span>
        </Item>
        <Item>
          <span>
          <span className="product-detail-left">商品详情:</span>
          <span 
          dangerouslySetInnerHTML={{__html:detail}}
          />
          </span>
        </Item>
        </List>
      </Card>
    )
  }
}
