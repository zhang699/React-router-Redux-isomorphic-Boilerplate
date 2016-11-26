import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import SimpleDialog from './utils/SimpleDialog.js';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux'
import wait from '../redux/actions/waiting.js'

class Register extends Component {
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
        return;
      };
      this.props.pause();
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
  dialogConfirm = () => (
    browserHistory.push('/login')
  )
  render() {
    return (
      <div style={style.container}>
        <TextField
          onBlur = {(e) => this.checkAccount(e) }
          hintText="帳號"
          floatingLabelStyle={{color: 'gray'}}
          errorText={ this.state.accountCheck ? '' : 'This field is required' }
          floatingLabelText="帳號"
        /><br />
        <TextField
          onBlur = {(e) => this.checkPassword(e) }
          hintText="密碼"
          type="password"
          floatingLabelStyle={{color: 'gray'}}
          errorText={ this.state.passwordCheck ? '' : 'This field is required' }
          floatingLabelText="密碼"
        /><br />
        <TextField
          onBlur = {(e) => this.checkPassword1(e) }
          hintText="確認密碼"
          type="password"
          floatingLabelStyle={{color: 'gray'}}
          errorText={ this.state.password1Check ? '' : 'This field is required or Not match password' }
          floatingLabelText="確認密碼"
        /><br />
        <TextField
          onBlur = {(e) => this.checkEmail(e) }
          hintText="E-mail"
          floatingLabelStyle={{color: 'gray'}}
          errorText={ this.state.emailCheck ? '' : 'This field is required or Wrong email format' }
          floatingLabelText="E-mail"
        /><br />
        <TextField
          onBlur = {(e) => this.checkNickName(e) }
          hintText="暱稱"
          floatingLabelStyle={{color: 'gray'}}
          errorText={ this.state.checkNickName ? '' : 'This field is required' }
          floatingLabelText="暱稱"
        /><br />
        <RaisedButton
          onClick={() => this.sendRequest()}
          label="註冊" primary={true}
          style={style.login}
        />
      { this.state.dialog ? <SimpleDialog content={this.state.dialogText} confirm={() => this.dialogConfirm()} context={this} /> : '' }
      </div>
    )
  }
}

const style = {
  container: {
    textAlign: 'center',
  }
}


function  mapStateToProp(state){
	return {
    wait: state.waiting
  }
}

export default connect(mapStateToProp,{
  pause: wait.pause,
  resume: wait.resume
})(Register)
