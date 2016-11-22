import React, { Component } from 'react'
import TodoList from './TodoList.js'
import { connect } from 'react-redux'
import actions from '../redux/actions/userInfo.js'
import Header from './Header.js'
import axios from 'axios';

import { browserHistory } from 'react-router';

class App extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

    // browserHistory.listen( location =>  {
    //  if (location.pathname === '/personalinfo') {
    //    if (this.props.userInfo.login === false) {
    //      browserHistory.push('/login');
    //    }
    //
    //  }
    //
    // });
    const context = this;
    axios.get('/getUser',{})
      .then(function (response) {
        if(typeof response.data === 'string'){
          return //如session內無user會回傳空值 type為String
        }
        context.props.userInfoAction(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentWillMount() {




  }

  componentWillReceiveProps(nextProps) {
    browserHistory.listen( location =>  {
     if (location.pathname === '/login') {
       if (nextProps.userInfo.login) {
         browserHistory.push('/main');
       }
     }

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
