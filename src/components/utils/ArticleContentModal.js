import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { findDOMNode } from 'react-dom';
import ListMsg from '../List.js'
/**
 * A modal dialog can only be closed by selecting one of the actions.
 *
 *   在Dialog加上
 *   modal={false}
     onRequestClose={this.handleClose}
     讓點擊方框旁也可關閉

     articleContentModal 須在parent的state加上

     props:
     contentEditable
     confirmBtn
     activeArticle
 */
const style = {
  contentStyle: {
    width: '90%',
    maxWidth: 'none',
  },
  textarea: {
    marginTop: '20px',
    width: '102%',
    height: '90%',
    fontSize: '20px',
    outline: 'none',
    overflow: 'scroll'
  },
  title: {
    height: '20px',
    fontSize: '30px'
  },
  levmsgLine: {
    borderTop: '1px solid gray'
  },
  levmsgTitle: {
    textAlign: 'center',
    marginTop: '20px'
  }
}


export default class ArticleContentModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
    }
  }
  handleClose = () => {
    this.props.context.setState({articleContentModal: false});
  };
  render() {
    const action1 = [
      <FlatButton
        label="關閉"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="確認"
        primary={true}
        onTouchTap={this.props.context.handleConfirm}
      />
    ];

    const action2 = [
      <FlatButton
        label="留言"
        primary={true}
        onTouchTap={this.props.context.levmsg}
      />,
      <FlatButton
        label="關閉"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <Dialog
          title={this.props.activeArticle.title}
          actionsContainerStyle={style.btn}
          actions={ this.props.confirmBtn ? action1 : action2}
          modal={false}
          open={this.props.context.state.articleContentModal}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
        <div style={{height: '700px'}}>
          <div
            contentEditable={this.props.contentEditable}
            ref="div1"
            style={style.textarea}
            dangerouslySetInnerHTML={{
            __html:this.props.activeArticle.content
           }}>
          </div>
        </div>
        <div style={style.levmsgLine}></div>
        <div style={style.levmsgTitle}>留言內容</div>
        <ListMsg />
        </Dialog>
      </div>
    );
  }
}
