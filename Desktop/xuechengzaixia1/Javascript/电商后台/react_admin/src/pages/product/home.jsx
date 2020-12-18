import React, {Component} from 'react'
import {Card,Input,Table,Select,Button,message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'

import {reqListPage,reqSearchProdocts,setProductStatus} from '../../api/index'
import {PAGE_SIZE} from '../../utils/page-size'
const Option = Select.Option
export default class ProductHome extends Component {

  state = {
    porducts:[],
    total:'',
    loading:false,
    value:'',//搜索内容
    searchType:'productName',//搜索的类型
    currentPage:1,
    productStatus:''//根据商品的状态判断上架/下架
  }

  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render:price => <span>￥{price}</span> 
      },
      {
        width:100,
        title: '状态',
        render:product => {
          let status = product.status===1 ? 2 : 1
          return (
          <span>
            <Button 
            type='primary'
            onClick={() => this.updateStatus(product._id,status)}
            > {status===1?'下架':'上架'} </Button>
            {status===1?'在售':'已下架'}
          </span>
        )
        }
      },
      {
        width:100,
        title: '操作',
        render:(product) => (
          <span>
            <a onClick={() => this.props.history.push('/product/detail',product)}>详情</a>
            <br/>
            <a
            onClick={() => this.props.history.push('/product/addupdate',product)}
            >修改</a>
          </span>
        )
      },
    ]
  }
  //商品上架与下架
  updateStatus =async (productId,status) => {
    const {currentPage} = this.state
    const result = await setProductStatus(productId,status)
      if(result.status===0) {
        //重新获取商品一刷新页面显示 传递当前页码 更改时当前页码不变动
        this.getListPage(currentPage)
        message.success('更新状态成功')
    }else {
        message.error('更新状态失败')
    }
    
  }
  //获取分页商品的函数
  getListPage =async (pageNum=1) => {
    this.setState({
      loading:true
    })
   const result = await reqListPage(pageNum,PAGE_SIZE)
   if(result.status===0) {
    this.setState({
      loading:false,
      porducts:result.data.list,
      total:result.data.total,
      currentPage:pageNum
    })
   }
  }

  //搜索指定的商品
  searchProduct =async () => {
    this.setState({
      loading:true
    })
    const {searchType,value} = this.state
    console.log(searchType,value);
    let searchName=value
    let pageNum=1
    const result = await reqSearchProdocts(pageNum,PAGE_SIZE,searchType,searchName)
    console.log(pageNum);
    this.setState({
      porducts:result.data.list,
      total:result.data.total,
      loading:false,
      currentPage:1
    })
  }

  //初始化渲染cloumns
  componentWillMount() {
    this.initColumns()
  }
  
  componentDidMount() {
    this.getListPage()
  }

  render() {
    const {porducts,total,loading,currentPage,productStatus} = this.state
    //搜索区
    const title = (
      <span>
        <Select 
        defaultValue="productName" 
        style={{width:150}}
        onChange={(value) => this.setState({searchType:value})}
        >
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按类型搜索</Option>
        </Select>
        <Input 
        placeholder="关键字" 
        style={{width:150,margin:'0 15px'}}
        onChange={(event) => this.setState({value:event.target.value})}
        ></Input>
        <Button 
        type='primary'
        onClick={this.searchProduct}
        >搜索</Button>
      </span>
    )
    //添加商品区
    const extra = (
      <Button 
      type='primary'
      onClick={() => this.props.history.push('/product/addupdate')}
      >
        <PlusOutlined/>
        添加商品
      </Button>
    )

    return (
      <Card
      title={title}
      extra={extra}
      >

    <Table 
    rowKey="_id"
    dataSource={porducts} 
    columns={this.columns}
    loading={loading} 
    pagination={{
      defaultPageSize:3,
      total:total,
      onChange:(pageNum) => {this.getListPage(pageNum)},
      showQuickJumper:true,
      current:currentPage
    }}
    />
      </Card>
    )
  }
}
