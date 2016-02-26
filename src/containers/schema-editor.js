import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'
import querystring from 'querystring'
import _ from 'lodash'

export default class SchemaEditor extends Component {

  state = {
    schema: null,
    formData: null,
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })

    const meshbluJson = this.getMeshbluJson()

    if (!meshbluJson.token){
      this.setState({
        loading: false,
        status: 'no-token'
      })
      return;
    }

    this.conn = meshblu.createConnection(meshbluJson)

    const self = this

    this.conn.on('ready', function(data){
      console.log('UUID AUTHENTICATED!')

      self.conn.whoami({}, function(device){
        const { name, optionsSchema, options } = device

        optionsSchema.title = name

        self.setState({
          schema: optionsSchema,
          formData: options,
          loading: false
        })
      });
    });
  }

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

  handleSubmit = ({ formData }) => {
    const { uuid } = this.props.params

    this.conn.update({
      uuid,
      "options": formData
    })
  }

  render() {
    const { loading, schema, formData, status } = this.state

    if (status == 'no-token') return <div>No token provided</div>
    if (loading) return <div>Loading...</div>
    if (!schema) return <div>Device has no schema</div>

    return <div>
      <h2>Schema Editor</h2>

      <ReactSchemaForm
        schema={schema}
        formData={formData}
        onSubmit={this.handleSubmit}
      />
    </div>
  }
}
