import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import { findDOMNode } from 'react-dom';
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
    border: '1px solid black',
    outline: 'none'
  },
  title: {
    textAlign: 'center',
    height: '50px',
    width: '450px',
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
  titleInput = (e) => {
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
  componentDidMount () {

    findDOMNode(this.refs.div1).addEventListener('keydown',(e) => {
      console.log(this.refs.div1.innerHTML)
      this.setState({ content: this.refs.div1.innerHTML })
    });
    const context = this;
    findDOMNode(this.refs.fileInput).addEventListener("change",() => {
      if (findDOMNode(this.refs.fileInput).files && findDOMNode(this.refs.fileInput).files[0]) {
        var FR= new FileReader();
        FR.onload = function(e) {
          let base64 = e.target.result.replace(/^data:image\/(png|jpg);base64,/, "");

          var xhttp = new XMLHttpRequest();
          xhttp.open('POST','https://api.imgur.com/3/image',true)
          xhttp.setRequestHeader("Content-type", "application/json");
          xhttp.setRequestHeader("Authorization", "Client-ID b50a7351eee91f0");
          xhttp.send(JSON.stringify({'image': base64}));
          xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
              var para = document.createElement("img");
              para.height = 150;
              para.src = JSON.parse(xhttp.responseText).data.link;
              findDOMNode(context.refs.div1).appendChild(para);
            }
          };
        };
        FR.readAsDataURL(findDOMNode(this.refs.fileInput).files[0]);
      };
    });
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
            onChange={(e) => this.titleInput(e)} >
          </input>
          <input ref="fileInput" type='file' />
          <div
            ref="div1"
            contentEditable="true"
            placeholder="請輸入文章內容"
            style={style.textarea} >
          </div>
        </div>
        </Dialog>
      </div>
    );
  }
}
