import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
/**
 * A modal dialog can only be closed by selecting one of the actions.
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
  },
  title: {
    textAlign: 'center',
    height: '50px',
    width: '250px',
    fontSize: '30px'
  }
}


export default class ArticleModal extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
    }
  }
  userInput = (e) => {
    this.setState({ content: e.target.value });
  }
  userInput1 = (e) => {
    this.setState({ title: e.target.value });
  }
  handleClose = () => {
    this.props.context.setState({showArticleModal: false});
  };

  handleConfirm = () => {
    const context = this.props.context;
    this.props.context.setState({showArticleModal: false});
    axios.post('/postArticle', {
        user: this.props.user.name,
        account: this.props.user.account,
        content: this.state.content,
        title: this.state.title,
      })
    .then((response) => {
      context.setState({ dialog:true })
      context.setState({ dialogText:response.data })
      socket.emit('postArticle',{data:'test'});
    })
    .catch((e) => {
      console.log(e)
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
    ];

    return (
      <div>
        <Dialog
          title="發表文章"
          actions={actions}
          modal={true}
          open={this.props.context.state.showArticleModal}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
        >
        <div style={{height: '600px'}}>
          <input
            style={style.title}
            placeholder="請輸入標題"
            onChange={(e) => this.userInput1(e)} >
          </input>
          <textarea
            placeholder="請輸入文章內容"
            onChange={(e) => this.userInput(e)}
            style={style.textarea} >
          </textarea>
        </div>
        </Dialog>
      </div>
    );
  }
}
