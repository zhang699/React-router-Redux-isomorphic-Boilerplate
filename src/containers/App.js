import React, { Component } from 'react'
import TodoList from './TodoList.js'
import {connect} from 'react-redux'
import Nav from './Nav.js'

class App extends Component {

  render() {
    return (
      <div>
        <Nav />
        <div style={style.content}>
        <h1>Tode li</h1>
        {this.props.children}
        </div>
      </div>
    )
  }

}
const style = {
  content: {
    marginTop: "5%",
    marginLeft: "5%"
  }
}

function  mapStateToProp(state){

	return state
}


export default connect(mapStateToProp)(App)
