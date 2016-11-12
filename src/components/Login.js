import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      account: '',
      password: '',
      accountCheck : true,
      passwordCheck : true
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
    axios.post('/test', {
        account: this.state.account,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response);
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
      </div>
    )
  }
}

const style = {
  container: {
    textAlign: 'center',
  }
}

export default Login;
