import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../redux/actions/userInfo.js'
import Header from './Header.js'
import axios from 'axios';
import SimpleDialog from '../components/utils/Dialogs/SimpleDialog.js';
import config from '../config.js';

import { browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '2343333'
    }
  }

  componentWillMount() {

    const context = this;
    axios.post(config.origin + '/getUser',{})
      .then(function (response) {
        if(response.data.result === -1){
          return //未登入
        }
        socket.emit('login',response.data)
        context.props.userInfoAction(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillReceiveProps(nextProps) {
    // browserHistory.listen( location =>  {
    //  if (location.pathname === '/login') {
    //      if (nextProps.userInfo.login) {
    //        browserHistory.push('/main');
    //      }
    //  }
    // });
  }
  render() {
    return (
      <div>
        <Header />
        <div style={style.content}>
        {this.props.children}
        </div>
      </div>
    )
  }

}
const style = {
  content: {
    marginTop: "48px",
  }
}

function  mapStateToProp(state){
	return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProp,{
  userInfoAction:actions.userInfo,
})(App)
