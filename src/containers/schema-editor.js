import React, {PropTypes} from 'react'

import MeshbluDeviceEditor from 'zooid-meshblu-device-editor'
import MeshbluHttp from 'meshblu-http'

export default React.createClass({
  state: {},
  componentDidMount: function () {
    var {uuid} = this.props.params
    if(!this.props.params) return window.location = '/search'

    this.meshblu = this.getMeshbluHttp(uuid)
    this.uuid = uuid
    this.meshblu.whoami( (error, device) => {
      this.setState({device})
    })
  },

  getMeshbluHttp: function(uuid) {
      var { token, hostname, port, callbackURL } = this.props.location.query
      var meshbluConfig = {
        uuid,
        token,
        hostname: hostname || 'meshblu.octoblu.com',
        port: port || 443
      }
      return new MeshbluHttp(meshbluConfig)
  },

  handleChange: function (device) {
    this.setState({device})
  },

  handleSave: function () {
    var {uuid, meshblu} = this
    meshblu.update(uuid, (error, device)=> {
      console.log(error, device)
      this.setState({device})
    })
  },

  render: function () {
    const {device} = this.state
    if(!device) return <h3>Loading</h3>
    return (
      <div>
        <MeshbluDeviceEditor device={device} onChange={this.handleChange} />
      <button onClick={this.handleSave}>Save</button>
      </div>
    )
  }
})
