import React, { Component } from 'react'
import TodoList from './TodoList.js'
import {connect} from 'react-redux'
import Header from './Header.js'

class App extends Component {

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


export default connect(mapStateToProp)(App)
