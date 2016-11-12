import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router'

export default class Header extends Component {
  login = () => {
    browserHistory.push('/login')
  };
  register = () => {
    browserHistory.push('/register')
  };
  render() {
    return (
      <div style={style.container}>
        <Navbar />
        <RaisedButton onClick={() => this.login()} label="登入"  style={style.login} />
        <RaisedButton onClick={() => this.register()} label="註冊"  style={style.register} />
      </div>
    )
  }
}

const style= {
  container: {
    width: '100%',
    height: '48px',
    background: 'yellow',
    position: 'fixed',
    top: '0px',
    zIndex: '10000'
  },
  login: {
    float: 'right',
    marginTop: '-43px',
    marginRight: '20px'
  },
  register: {
    float: 'right',
    marginTop: '-43px',
    marginRight: '140px'
  }
}
