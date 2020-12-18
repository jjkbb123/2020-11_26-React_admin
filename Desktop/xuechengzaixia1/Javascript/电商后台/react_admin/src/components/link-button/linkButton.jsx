import React from 'react'
import {Modal} from 'antd'
import {withRouter} from 'react-router-dom'

import storeageUtils from '../../utils/storeageUtils'
import memoryUtils from '../../utils/memoryUtils'
import './linkButton.less'

function LinkButton(props) {
  const logout =(s) => {
    Modal.confirm(
      {
        title:'确认要退出是吧!',
        onOk:() => {
          storeageUtils.removeStore()
          memoryUtils.user = {}
          props.history.replace('/login')
        }
      }
    )
  }
  return <button onClick={logout} className="link-button">{props.children}</button>
}
export default withRouter(LinkButton)
