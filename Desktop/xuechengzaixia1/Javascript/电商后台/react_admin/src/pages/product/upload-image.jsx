import React, {Component} from 'react';
import { Upload , message} from 'antd';
import PropTypes from 'prop-types'

import {reqRemoveImg} from '../../api/index'

export default class UploadImage extends Component {

  static propTypes = {
    getImgs:PropTypes.func.isRequired,
    imgs:PropTypes.array
  }

  state = {
    fileList:[], //图片数组
  }

  //上传图片
  onChange = ({ file, fileList }) => {
    if(file.status==='done') {
      fileList = fileList.map((item,index) => {
        return {
          uid: index,
          name: item.name===file.name?file.response.data.name:item.name,
          status: 'done',
          url: item.name===file.name?file.response.data.url:item.url,
        }
      })
    }
    this.setState({
      fileList
    })
    this.props.getImgs(this.state.fileList)
  };

  //点击图片放大时的操作
  onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  //数据库删除图片
  removeImg = async (file) => {
    console.log(file.name);
    const result = await reqRemoveImg(file.name)
    if(result.status===0) {
      message.success('删除成功')
    }else {
      message.error('删除失败')
    }
  }

  //修改模式默认上来显示的图片
  componentDidMount() {
    let {imgs} = this.props
    imgs = imgs?imgs.map((img,index) => ({
      uid: -index,
      name: img.name,
      status: 'done',
      url: img.url
    })):[]
    // let img={ 
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }
    // this.state.fileList.push(img)
    this.setState({
      fileList:imgs
    })
  }

  render() {
    //----------------------------------------------------------------------------------------
    const {fileList} = this.state
    return (
        <Upload
          action="/manage/img/upload"
          accept='images*'
          listType="picture-card"
          name="image"
          fileList={fileList}
          onChange={this.onChange}
          onPreview={this.onPreview}
          onRemove={this.removeImg}
        >
          {fileList.length < 5 && '+ Upload'}
        </Upload>
    );
  }
}
