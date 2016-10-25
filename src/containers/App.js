import React, { Component } from 'react'
import TodoList from './TodoList.js'
import {connect} from 'react-redux'

class App extends Component {

  render() {
    return (
      <div>
        <h1>Tdoddd tdd</h1>
        <a className="waves-effect waves-light btn">button</a>
        {this.props.children}
      </div>
    )
  }

}
function  mapStateToProp(state){

	return state
}


export default connect(mapStateToProp)(App)
