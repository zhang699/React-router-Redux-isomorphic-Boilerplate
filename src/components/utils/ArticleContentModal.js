import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { findDOMNode } from 'react-dom';
/**
 * A modal dialog can only be closed by selecting one of the actions.
 *
 *   在Dialog加上
 *   modal={false}
     onRequestClose={this.handleClose}
     讓點擊方框旁也可關閉
 */
const style = {
  contentStyle: {
    width: '90%',
    maxWidth: 'none',
  },
  textarea: {
    marginTop: '20px',
    width: '100%',
    height: '50%',
    fontSize: '20px',
    border: '1px solid black',
    outline: 'none',
    overflow: 'scroll'
  },
  title: {
    height: '50px',
    fontSize: '30px'
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
    const actions = [
      <FlatButton
        label="關閉"
        primary={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
        <Dialog
          title=""
          actions={actions}
          modal={false}
          open={this.props.context.state.articleContentModal}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
          onRequestClose={this.handleClose}
        >
        <div style={style.title}>{this.props.activeArticle.title}</div>
        <div style={{height: '700px'}}>
          <div
            ref="div1"
            style={style.textarea}
            dangerouslySetInnerHTML={{
            __html:this.props.activeArticle.content
           }}>
          </div>
        </div>
        </Dialog>
      </div>
    );
  }
}
