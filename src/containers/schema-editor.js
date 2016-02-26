import React, { Component } from 'react'

import MeshbluSchemaEditor from '../components/meshblu-schema-editor'

export default class SchemaEditor extends Component {
  render() {
    const { uuid, token } = this.props.params
    return <MeshbluSchemaEditor uuid={uuid} token={token} />
  }
}
