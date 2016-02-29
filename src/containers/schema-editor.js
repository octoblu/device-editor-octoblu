import _ from 'lodash'
import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'
import querystring from 'querystring'
import ZooidMeshbluDeviceEditor from 'zooid-meshblu-device-editor'

export default class SchemaEditor extends Component {
  getMeshbluJson = () =>  {
    const { uuid } = this.props.params
    var query = querystring.parse(location.search.substring(1, location.search.length))
    return {
      uuid,
      token: query.token,
      server: query.server || 'meshblu.octoblu.com',
      port: query.port || 443
    }
  }

  render() {
    const { uuid, token, server, port } = this.getMeshbluJson()
    
    return <div>
      <h2>Schema Editor</h2>

      <ZooidMeshbluDeviceEditor
        uuid={uuid}
        token={token}
        server={server}
        port={port}
      />
    </div>
  }
}
