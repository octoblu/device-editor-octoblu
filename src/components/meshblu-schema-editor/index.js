import React, { Component, PropTypes } from 'react'
import ReactSchemaForm from 'react-jsonschema-form'

export default class MeshbluSchemaEditor extends Component {

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }

  state = {
    schema: null,
    formData: null,
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true })

    const { uuid, token } = this.props
    this.conn = meshblu.createConnection({uuid, token})

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

  handleSubmit = (event) => {
    this.conn.update({
      "uuid": this.props.uuid,
      "options": event.formData
    })
  }

  render() {
    const { loading, schema, formData } = this.state

    if (loading) return <div>Loading...</div>
    if (!loading && !schema) return <div>Device has no schema</div>

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
