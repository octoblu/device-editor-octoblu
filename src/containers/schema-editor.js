import React, { Component, PropTypes } from 'react'

import ZooidMeshbluDeviceEditor from 'zooid-meshblu-device-editor'

export default class SchemaEditor extends Component {
  getMeshbluJson = () =>  {
    const { uuid } = this.props.params
    var { token, server, port } = this.props.location.query;

    return {
      uuid,
      token,
      server: server || 'meshblu.octoblu.com',
      port: port || '443'
    }
  }

  render() {
    const meshbluConfig = this.getMeshbluJson()

    return <div>
      <h2>Schema Editor</h2>

      <ZooidMeshbluDeviceEditor
        uuid={meshbluConfig.uuid}
        meshbluConfig={meshbluConfig}
      />
    </div>
  }
}
