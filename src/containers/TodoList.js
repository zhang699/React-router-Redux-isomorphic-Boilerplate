import React, { Component } from 'react'
import {connect} from 'react-redux'
import actions from '../redux/actions/todoActions.js'
import { bindActionCreators } from 'redux'
import List from '../components/List.js'
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class TodoList extends Component {
  send = () => {
    let text = this.inputFiled.value;
    this.props.addTodo1(text);
  }
  sendAsync = () => {
    this.props.asyncAction();
  }
  itemClick = (id) => {
    this.props.toggleTodo(id);
  }
  render() {
    return (
      <div>
        <input ref={(c) => this.inputFiled = c} />
        <button onClick={()=>this.send()}>Add</button>
        <button onClick={()=>this.sendAsync()}>Async</button>
        <List list={this.props} itemClick={(id)=>this.itemClick(id)}>
        </List>
<FlatButton label="Primary" primary={true}/>
      </div>
    )
  }

}
function mapStateToProp(state){
	return state
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addTodo1:actions.addTodo,
    toggleTodo:actions.toggleTodo,
    asyncAction:actions.asyncAction
  },dispatch);
}

export default connect(mapStateToProp,mapDispatchToProps)(TodoList)
