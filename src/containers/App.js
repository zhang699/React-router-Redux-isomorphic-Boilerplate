import React, { Component } from 'react'
import TodoList from './TodoList.js'
import { connect } from 'react-redux'
import actions from '../redux/actions/userInfo.js'
import Header from './Header.js'
import axios from 'axios';

class App extends Component {
  componentDidMount() {
    const context = this;
    axios.get('/getUser',{})
      .then(function (response) {
        context.props.userInfoAction(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

	return state
}

export default connect(mapStateToProp,{
  userInfoAction:actions.userInfo,
})(App)
