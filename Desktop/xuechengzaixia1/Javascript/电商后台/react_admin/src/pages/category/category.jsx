import React, {Component} from 'react'
import {Card,Button,Table,Modal,message} from 'antd'
import {PlusOutlined,ArrowRightOutlined} from '@ant-design/icons'

import {reqCaterogy,reqUpdateCaterogy,reqAddCaterogy} from '../../api/index'
import CateForm from './cate-form'
import UpdateForm from './update-form'

import './category.less'

export default class Category extends Component {

  state = {
    category:[],        //一级品类
    childCategory:[],   //子级品类
    parentId:0,         //一级品类搜索 会变化
    categoryIndex:'',   //table当前点击索引 这异步获取索引真难搞
    modalShow:'',    //为true是才显示 Modal
    categoryName:'',
    categoryInputValue:'',
    categoryId:'',
    currentCate_id:'',
    selectParentId:'',     //select选中的parentId(产品需要搜索的ID)
  }

  //获取产品
  getCategorys = async(parentId=0,currentCate_id,dataSource) => {
     parentId = this.state.parentId||parentId
    const result = await reqCaterogy(parentId)
    
    if(parentId===0) {
      this.setState({
        category:result.data,
      })
    }else {
      const result = await reqCaterogy(currentCate_id)
      this.setState({
        childCategory:result.data
      },() => {
        
      })
    }
  }

  //查看子分类
  getChildCategory = (text, record, index,dataSource,callback) => {
    let caregoryId = dataSource[index]._id
    this.setState({
      parentId:record._id,
      categoryIndex:index
    },() => {
      this.getCategorys(index,caregoryId,dataSource)
    })
  }

  modalShow =() => {
    this.currentParentId()
    this.setState({
      modalShow:1,
    })
  }
  //修改分类
  hundleUpdate = (text, categoryName, index) => {
    this.categoryName = categoryName.name
    this.setState({
      modalShow:2,
      categoryName:this.categoryName,
      categoryId:categoryName._id,
      currentCate_id:categoryName.parentId
    })
  }

  //添加分类
  handleAddCate =async () => {
    
    const {parentId,categoryInputValue,selectParentId=0} = this.state
    if(!categoryInputValue) {
      this.setState({
         modalShow:1,
       })
      return 
     }
    this.setState({
      modalShow:0,
    })
    let categoryName = categoryInputValue
    const result = await reqAddCaterogy({parentId:selectParentId,categoryName})
    if(result.status===0) {
      this.getCategorys(selectParentId,parentId)
    }
  }

  //获取select选中的parentId
  currentParentId = (parentId) => {
    this.setState({
      selectParentId:parentId
    })
  }

  //当前分类的_id 和 要修改名称的内容
  handleOk = async (categoryId,categoryInputValue) => {
    if(!categoryInputValue) {
     this.setState({
        modalShow:2,
      })
      return 
    }
    let index
    this.setState({
      modalShow:0,
    })
    const result = await reqUpdateCaterogy(categoryId,categoryInputValue)
    if(result.status===0) {
      this.getCategorys(index,this.state.currentCate_id)
    }
  }

  //取消Modal
  handleCancel = () => {
    this.setState({
      modalShow:0,
      categoryName:this.categoryName,
    })
  }

  //获取Modal的Input输入值,因为组件在子组件内 所所以用函数的形式来获取
  setInputValue = (value) => {
    this.setState({
      categoryInputValue:value
    })
  }

   componentDidMount() {
   this.getCategorys()
  }


  render() {
    /* ----------------------------------------------------------------------------------------- */
    const {
      category,
      childCategory,
      parentId,
      categoryIndex,
      modalShow,
      categoryName,
      categoryInputValue,
      categoryId,
    } = this.state
    const title=parentId===0?"一级品类":(
      <span>
        <a onClick={() =>this.setState({parentId:0,childCategory:[]})} style={{marginRight:10}}>一级品类</a>
        <ArrowRightOutlined style={{marginRight:10}} />
        {category[categoryIndex].name}
      </span>
    )
    const columns = [
      {
        title: '分类的名称',
        dataIndex: 'name',
        key: 'name',
      },
      
      {
        title: '操作',
        dataIndex: 'address',
        key: 'address',
        width:300,
        render: (text, categoryName, index) => (
        <span>
          <a onClick={() => this.hundleUpdate(text, categoryName, index)}>修改分类</a>&nbsp;&nbsp;&nbsp;
          {parentId===0?
          <a 
          onClick={() => this.getChildCategory(text, categoryName, index,category)}
          >
            查看子分类
            </a>:null}
         </span>)
      },
    ];
    
    return (
      <Card 
      title={title} 
      extra={
        <Button type='primary' onClick={this.modalShow}>
          <PlusOutlined />
          添加
        </Button>
      }
      >
        {/* 添加分类 ------------- 查看子分类 */}
        <Modal
        title="添加分类"
        visible={modalShow===1}
        onOk={() => this.handleAddCate()}
        onCancel={this.handleCancel}
      >
        {<CateForm category={category}
        setInputValue={this.setInputValue}
        currentParentId={this.currentParentId}
        />}
      </Modal>

      <Modal
        title="查看子分类"
        visible={modalShow===2}
        onOk={() => this.handleOk(categoryId,categoryInputValue)}
        onCancel={this.handleCancel}
      >
        {<UpdateForm 
        categoryName={categoryName?categoryName:''}
        setInputValue={this.setInputValue}
        />}
      </Modal>

    <Table 
    bordered
    rowKey="_id"
    dataSource={parentId===0?category:childCategory} 
    columns={columns}
    pagination={{defaultPageSize:5,showQuickJumper:true}}
    rowClassName={() => "rowClass"}
    />;
    </Card>
    )
  }
}

