import React, { Component } from 'react'
import Navbar from '../components/Navbar'

export default class Header extends Component {
  render() {
    return (
      <div style={style.container}>
        <Navbar />
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
  }
}
