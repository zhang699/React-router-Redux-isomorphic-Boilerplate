import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import SimpleDialog from './utils/SimpleDialog.js';
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import { findDOMNode } from 'react-dom';

class PersonalInfo extends Component {
  constructor(props) {
    super();
    this.state = {
      account: '',
      password: '',
      password1: '',
      email: '',
      nickName: '',
      accountCheck : true,
      passwordCheck : true,
      password1Check : true,
      emailCheck : true,
      checkNickName: true,
      dialog: false,
      dialogText: ''
    }
  }
  checkAccount(e) {
    this.state.account = e.target.value;
    if (e.target.value === ''){
      this.setState({ accountCheck: false })
      return
    }
    this.setState({ accountCheck: true })
  }
  checkPassword(e) {
    this.state.password = e.target.value;
    if (e.target.value === ''){
      this.setState({ passwordCheck: false })
      return
    }
    this.setState({ passwordCheck: true })
  }
  checkPassword1(e) {
    this.state.password1 = e.target.value;
    if (e.target.value === '' || e.target.value !== this.state.password ){
      this.setState({ password1Check: false })
      return
    }
    this.setState({ password1Check: true })
  }
  checkEmail(e) {
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    this.state.email = e.target.value;
    if (e.target.value === '' || validateEmail(e.target.value) === false){
      this.setState({ emailCheck: false })
      return
    }
    this.setState({ emailCheck: true })
  }
  checkNickName(e) {
    this.state.nickName = e.target.value;
    if (e.target.value === ''){
      this.setState({ checkNickName: false })
      return
    }
    this.setState({ checkNickName: true })
  }
  sendRequest() {
    const context = this;//因then會找不到this
    if( this.state.account === '' || this.state.password === ''
      || this.state.password1 === '' || this.state.email === ''
      || this.state.nickName === '') {
        this.setState({ dialog:true });
        this.setState({ dialogText: '您好，請填完所有欄位再點選' });
      };
    axios.post('/signup', {
        account: this.state.account,
        password: this.state.password,
        email: this.state.email,
        nickName: this.state.nickName,
      })
      .then(function (response) {
        context.setState({ dialogText: response.data });
        context.setState({ dialog: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount () {

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
              let avatarSrc = JSON.parse(xhttp.responseText).data.link;
              findDOMNode(context.refs.avatar).src = avatarSrc;
              axios.put('/UpdateUserInfo',{avatar: avatarSrc })
                .then((res) => {
                  console.log(res.data)
              })
            }
          };
        };
        FR.readAsDataURL(findDOMNode(this.refs.fileInput).files[0]);
      };
    });
  }

  render() {
    return (
        <div style={style.container}>
          <div style={style.left}>
            <img ref="avatar" height="200px" src={this.props.avatar + `?s=120&d=identicon`} />
            <input style={style.fileInput} id="file-upload" ref="fileInput" type='file' />
          </div>
          <div style={style.fieldContainer}>
          <TextField
            onBlur = {(e) => this.checkAccount(e) }
            hintText="暱稱"
            floatingLabelStyle={{color: 'gray'}}
            errorText={ this.state.accountCheck ? '' : 'This field is required' }
            floatingLabelText="暱稱"
          /><br />
          <TextField
            onBlur = {(e) => this.checkPassword(e) }
            hintText="手機"
            type="password"
            floatingLabelStyle={{color: 'gray'}}
            errorText={ this.state.passwordCheck ? '' : 'This field is required' }
            floatingLabelText="手機"
          /><br />
          <TextField
            onBlur = {(e) => this.checkPassword1(e) }
            hintText="地址"
            type="password"
            floatingLabelStyle={{color: 'gray'}}
            errorText={ this.state.password1Check ? '' : 'This field is required or Not match password' }
            floatingLabelText="地址"
          /><br />
          <TextField
            onBlur = {(e) => this.checkEmail(e) }
            hintText="興趣"
            floatingLabelStyle={{color: 'gray'}}
            errorText={ this.state.emailCheck ? '' : 'This field is required or Wrong email format' }
            floatingLabelText="興趣"
          /><br />
          <TextField
            onBlur = {(e) => this.checkNickName(e) }
            hintText="出生年月日"
            floatingLabelStyle={{color: 'gray'}}
            errorText={ this.state.checkNickName ? '' : 'This field is required' }
            floatingLabelText="出生年月日"
          /><br />
         </div>
          <RaisedButton
            onClick={() => this.sendRequest()}
            label="設定完成" primary={true}
            style={style.ok}
          />
          { this.state.dialog ? <SimpleDialog content={this.state.dialogText} context={this} /> : '' }
        </div>
      )
  }
}

const style = {
  container: {
    textAlign: 'center',
  },
  avatar: {
  },
  fieldContainer: {
    marginLeft: '400px',
    marginTop: '80px'
  },
  ok: {
    marginTop: '60px',
    marginLeft: '-40px',
    marginBottom: '100px'
  },
  text: {
    textAlign: 'center',
    fontSize: '50px',
    marginTop: '200px'
  },
  fileInput: {
    marginTop: '20px'
  },
  left: {
    position: 'absolute',
    top: '180px',
    left: '330px',
    display: 'flex',
    flexDirection: 'column'
  }
}

const mapStateToProp = (state) => {
	return state.userInfo
}

export default connect(mapStateToProp,{
})(PersonalInfo)
