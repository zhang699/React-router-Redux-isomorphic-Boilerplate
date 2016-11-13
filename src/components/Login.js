import React,{Component} from 'react';
import {connect} from 'react-redux'
import actions from '../redux/actions/userInfo.js'
import { bindActionCreators } from 'redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SimpleDialog from './utils/SimpleDialog.js';
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      account: '',
      password: '',
      accountCheck : true,
      passwordCheck : true,
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
  sendRequest() {
    const context = this;//因.then會找不到this
    axios.post('/login', {
        account: this.state.account,
        password: this.state.password
      })
      .then(function (response) {
        context.setState({ dialogText:response.data })
        context.setState({ dialog: true });
        axios.get('/getUser',{})
          .then(function (response) {
            context.props.userInfoAction(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div style={style.container}>
        <TextField
          onBlur = {(e) => this.checkAccount(e) }
          floatingLabelStyle={{color: 'gray'}}
          hintText="帳號"
          errorText={ this.state.accountCheck ? '' : 'This field is required' }
          floatingLabelText="帳號"
        /><br />
        <TextField
          onBlur = {(e) => this.checkPassword(e) }
          floatingLabelStyle={{color: 'gray'}}
          hintText="密碼"
          errorText={ this.state.passwordCheck ? '' : 'This field is required' }
          floatingLabelText="密碼"
        /><br />
        <RaisedButton onClick={() => this.sendRequest()} label="登入" primary={true}  style={style.login} />
        { this.state.dialog ? <SimpleDialog content={this.state.dialogText} context={this} /> : '' }
      </div>
    )
  }
}

const style = {
  container: {
    textAlign: 'center',
  }
}

const mapStateToProp = (state) => {
	return state
}

export default connect(mapStateToProp,{
  userInfoAction:actions.userInfo,
})(Login)
