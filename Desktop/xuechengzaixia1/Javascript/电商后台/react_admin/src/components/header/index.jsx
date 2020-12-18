import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

import nowTime from '../../utils/nowTime'
import {reqWeater} from '../../api/index' //天气接口收费了 没钱
import menuList from '../../menuConfig/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import LinkButton from '../../components/link-button/linkButton'

import './header.less'
 class Header extends Component {

  state = {
    currentTime: nowTime(new Date()),
    wea:'',
    title:''
  }

  getTitle = (menuList) => {
    const path = this.props.location.pathname
    let title
    menuList.forEach((item,index) => {
      if(item.key===path) {
        title = item.title
      }else if(item.children) {
        const cItem = item.children.find(cItem => cItem.key===(path.indexOf('/product')!==-1?'/product':path))
        if(cItem) {
          title=cItem.title
        }
      }
    })
    return title
  }


  componentDidMount() {
    this.timeId = setInterval(() => {
      this.setState({
        currentTime:nowTime(new Date()),
        wea:'晴'
      })
    }, 10000);
  }
  componentWillUnmount() {
    clearInterval(this.timeId)
  }

  render() {
    const title = this.getTitle(menuList)
    const user = memoryUtils.user
    
    return (
      <div className="header">
        <div className="header-top">
          <span>欢迎, {user.username} </span>
          <LinkButton props={this.props }>退出</LinkButton>
        </div>
        
        <div className="header-bottom">
          <span className="header-bottom-left">
            {title}
          </span>
          <span className="header-bottom-right">
            <span>{this.state.currentTime} </span>
            <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2456598790,3918683429&fm=26&gp=0.jpg" alt="weater"/>
            <span> {this.state.wea}  </span>
          </span>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)