import React, {PropTypes} from 'react'
import MeshbluDeviceEditor from 'zooid-meshblu-device-editor'
import MeshbluHttp from 'meshblu-http'
import _ from 'lodash'

export default React.createClass({
  getInitialState: function(){
    return {}
  },

  componentDidMount: function () {
    var {uuid} = this.props.params
    if(!this.props.params) return window.location = '/search'

    this.meshblu = this.getMeshbluHttp(uuid)
    this.uuid = uuid
    this.callbackURL = this.props.location.query.callbackURL
    this.meshblu.whoami( (error, device) => {
      this.setState({device})
    })
  },

  getMeshbluHttp: function(uuid) {
      var { token, hostname, port} = this.props.location.query
      var meshbluConfig = {
        uuid,
        token,
        hostname: hostname || 'meshblu.octoblu.com',
        port: port || 443
      }
      return new MeshbluHttp(meshbluConfig)
  },

  handleChange: function ({name, options}) {
    const device = _.extend({}, this.state.device, {name, options})
    this.setState({device})
    this.meshblu.updateDangerously(this.uuid, {$set: {name, options}}, (error)=>{
      if(error) {
        console.log('Error!', error)
        return
      }
      if(!this.callbackURL) return;
      window.location = this.callbackURL
    })
  },

  render: function () {
    if(!this.state) return
    const {device} = this.state
    if(!device) return <h3>Loading</h3>
    return (<MeshbluDeviceEditor device={device} onChange={this.handleChange} />)
  }
})
