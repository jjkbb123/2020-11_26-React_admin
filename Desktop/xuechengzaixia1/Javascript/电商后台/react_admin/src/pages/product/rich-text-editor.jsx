/* 
 富文本编辑器
  npm i --save react-draft-wysiwyg
*/

import React, { Component } from 'react';
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import PropTypes from 'prop-types'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {

  static propTypes = {
    detail:PropTypes.string,
    getEditor:PropTypes.func.isRequired
  }

  state = {
    editorState: EditorState.createEmpty(),
    value:''
  }

  constructor(props) {
    super(props);
    //点击修改进来的原本detail值
    const {detail} = this.props
    const html = detail;
    //判断原本detail值有或者无 如果是添加则没有
    if(html) {
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        console.log(editorState);
       this.state = {
          editorState,
        };
      }
    }
  }

  onEditorStateChange = (editorState) => {
    console.log(editorState,EditorState.createEmpty());
    this.setState({
      editorState, //文本框的值
      value:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))//获取输入的html文本来上传
    },
    this.props.getEditor(this.state.value) //获取富文本框输入的html文本值传递给父组件
    );
  };

  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          if(response.status===0) {
            resolve({data:{link:response.data.url}})
          }
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }


  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          editorStyle={{minHeight:'300px',border:'1px solid black'}}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
        />
        
      </div>
    );
  }
}