import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions/userInfo.js'
import Navbar from '../components/Navbar'
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router'
import Menu from '../components/utils/Menu.js'

class Header extends Component {
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
        {
        this.props.userInfo.login
        ?
        <Menu style={style.menu} />
        :
        <div>
          <RaisedButton onClick={() => this.login()} label="登入"  style={style.login} />
          <RaisedButton onClick={() => this.register()} label="註冊"  style={style.register} />
        </div>
        }
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
  },
  menu: {
    marginTop: '150px'
  }
}

function  mapStateToProp(state){
	return ({
    userInfo:state.userInfo
  })
}

export default connect(mapStateToProp,{
  logOut:actions.logOut
})(Header)
