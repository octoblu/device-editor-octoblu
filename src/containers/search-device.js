import React, { Component } from 'react'

export default class SearchDevice extends Component {

  state = {
    uuid: '',
    token: ''
  }

  handleSubmit = () => {
    window.location = '/' + this.state.uuid + '?token=' + this.state.token
  }

  handleChange = (event) => {
    if (event.target.name == 'uuid') {
      this.setState({uuid: event.target.value})

    } else if (event.target.name == 'token') {
      this.setState({token: event.target.value})
    }
  }

  render() {
    return <div>
      <h2>Search for Device</h2>

      <form name='search'>
        <font>Enter your device's uuid: </font>
        <input
          name='uuid'
          onChange={this.handleChange}
        />
        <br/>

        <font>Enter your device's token: </font>
        <input
          name='token'
          onChange={this.handleChange}
        />
        <br/>

        <button
          name='searchDevice'
          form='search'
          type='submit'
          onClick={this.handleSubmit}>
          Search for device
        </button>
      </form>

    </div>
  }
}
