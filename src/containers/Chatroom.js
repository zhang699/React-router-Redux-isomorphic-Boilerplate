import React, { Component } from 'react'
import {connect} from 'react-redux'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SendIcon from 'material-ui/svg-icons/content/send';
import { findDOMNode } from 'react-dom';
import ChatList from '../components/ChatList.js';
import axios from 'axios';

const style = {
  container: {
    width: '95vw',
    height: '90vh',
    marginLeft: '2%'
  },
  MsgContent: {
    width: '80%',
    height: '90%',
    boxShadow: '10px 10px 5px #888888',
    overflowY: 'scroll'
  },
  MsgInputBlock: {
    width: '70%',
    height: '8%',
    boxShadow: '10px 10px 5px #888888',
    fontSize: '25px'
  },
  MsgInputBtn: {
    position: 'relative',
    width: '8%',
    height: '8%',
    boxShadow: '10px 10px 5px #888888',
    background: '#64FFDA',
    marginTop: '1%',
    top: '5px',
    left: '15px'
  }
}

class Chatroom extends Component {
  constructor() {
    super();
    this.state = {
      msg:[]
    }
  }
  componentWillMount() {
    
  }  
  componentDidMount () {
    socket.emit('chatPage',{ //使用者進入聊天室
      avatar: this.props.userInfo.avatar,
      name: this.props.userInfo.name,
    });
    socket.on('chat',(res) => { //使用者發表訊息
      console.log(res)
      let newList = this.state.msg;
      newList.push(res.data.content);
      this.setState({ msg: newList });
      /*保持捲軸在最下方新消息 */findDOMNode(this.refs.contentDiv).scrollTop = findDOMNode(this.refs.contentDiv).scrollHeight;
    })
  }
  send() {

    let item = {
      avatar: this.props.userInfo.avatar,
      name: this.props.userInfo.name,
      content: findDOMNode(this.refs.content).value,
      date: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    }

    // const date = new Date();
    // console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
    socket.emit('chat',{content: item});
  }

  render() {
    return (
      <div style={style.container}>
        <div ref="contentDiv" style={style.MsgContent}>
        <ChatList msg={this.state.msg} />
        </div>
        <input ref="content" style={style.MsgInputBlock} />
        <button onClick={() => this.send()} style={style.MsgInputBtn}><SendIcon /></button>
      </div>
    )
  }

}
const mapStateToProp = (state) => ({
  userInfo: state.userInfo
})

export default connect(mapStateToProp, {
  
})(Chatroom)
