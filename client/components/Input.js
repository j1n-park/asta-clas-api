import React from 'react';
import { Panel, Form, FormGroup, ControlLabel, Button, FormControl, Modal } from 'react-bootstrap';
import { loadDataRequest, addDataRequest, delDataRequest, runRequest } from 'actions/bacteria';
import { connect } from 'react-redux';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      host: '127.0.0.1',
      port: '3000',
      showModal: false,
      bac_id: '',
      strain: '',
      exp_desc: ''
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.changeBac_ID = this.changeBac_ID.bind(this);
    this.changeStrain = this.changeStrain.bind(this);
    this.changeExpDesc = this.changeExpDesc.bind(this);
    this.changeDataFile = this.changeDataFile.bind(this);
  }

  changeBac_ID(e) {
    this.setState({bac_id: e.target.value});
  }

  changeStrain(e) {
    this.setState({strain: e.target.value});
  }

  changeExpDesc(e) {
    this.setState({exp_desc: e.target.value});
  }

  changeDataFile(e) {
    let reader = new FileReader();

    reader.onload = (e) => {
        if(e.target.readyState != 2) return;
        if(e.target.error) {
            alert('Error while reading file');
            return;
        }
        this.setState({data_file: e.target.result});
        console.log(e.target.result);
    }
    
    reader.readAsText(e.target.files[0]);
  }

  addClose() {
    this.setState({showModal: false});
  }

  addOpen() {
    this.setState({showModal: true});
  }

  handleAdd() {
    if (this.state.bac_id != '' &&
      this.state.data_file != null) {
      let peaks = [];
      let requestedData = {
        bac_id: this.state.bac_id,
        strain: this.state.strain,
        exp_desc: this.state.exp_desc,
        peaks: this.state.data_file
      }
      console.log('Add Requested:', requestedData);
      this.props.addDataRequest(requestedData);
    }
    else {
      console.log('Not appropriate');
      alert("Bac_ID and Data file are necessary");
    }
    this.setState({showModal: false});
  }

  handleDel() {
    // to be implemented...
    console.log('Del Requested');
    this.props.delDataRequest('test');
  }

  handleRun() {
    console.log('Run Requested');
    this.props.runRequest();
  }

  handleLoad() {
    return this.props.loadDataRequest();
  }

  render() {
    return (
      <Panel header={(<h3>Control Panel</h3>)}>
        <Form inline>
          <div style={{margin: "0 100px"}}>
            <FormGroup controlId="host">
              <ControlLabel>Host</ControlLabel>
              {' '}
              <FormControl type="text" placeholder={this.state.host} style={{width: "200px"}}/>
            </FormGroup>
            {' '}
            <FormGroup controlId="email">
              <ControlLabel>Port</ControlLabel>
              {' '}
              <FormControl type="text" placeholder={this.state.port} style={{width: "60px"}}/>
            </FormGroup>
            {' '}
            <Button bsStyle="primary" onClick={this.handleLoad}>
              Load Results
            </Button>
            {' '}
            <Button bsStyle="success" disabled>
              Add Marker
            </Button>
            {' '}
            <Button bsStyle="success" disabled>
              Del Marker
            </Button>
            {' '}
            <Button bsStyle="info" onClick={this.addOpen.bind(this)}>
              {this.props.status.add ? 'Waiting...' : 'Add Data'}
            </Button>
            <Modal show={this.state.showModal} onHide={this.close}>
              <form onSubmit={this.handleAdd}>
              <Modal.Body>
                <FormGroup controlId="b_id">
                  <ControlLabel>Bac_ID</ControlLabel>
                  {' '}
                  <FormControl type="text" onChange={this.changeBac_ID} style={{width: "100%"}}/>
                </FormGroup>
                {' '}
                <FormGroup controlId="strains">
                  <ControlLabel>Strains</ControlLabel>
                  {' '}
                  <FormControl type="text" onChange={this.changeStrain} style={{width: "100%"}}/>
                </FormGroup>
                {' '}
                <FormGroup controlId="exp_desc">
                  <ControlLabel>exp_desc</ControlLabel>
                  {' '}
                  <FormControl type="text" onChange={this.changeExpDesc} style={{width: "100%"}}/>
                </FormGroup>
                {' '}
                <FormGroup controlId="data_file"  >
                  <ControlLabel>Data File(CSV)</ControlLabel>
                  {' '}
                  <FormControl type="file" name="files[]" onChange={this.changeDataFile}/>
                </FormGroup>
                {' '}
              </Modal.Body>
              <Modal.Footer>
                <Button bsStyle="primary" onClick={this.handleAdd.bind(this)}>Add Data</Button>
                <Button bsStyle="danger" onClick={this.addClose.bind(this)}>Close</Button>
              </Modal.Footer>
              </form>
            </Modal>
            {' '}
            <Button bsStyle="info" onClick={this.handleDel.bind(this)}>
              { this.props.status.del ? 'Waiting...' : 'Del Data' }
            </Button>
            {' '}
            <Button bsStyle="danger" onClick={this.handleRun.bind(this)}>
              { this.props.status.del ? 'Waiting...' : 'Run Process' }
            </Button>
          </div>
        </Form>
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.bacteria.data,
    status: state.bacteria.status
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDataRequest: () => {
      return dispatch(loadDataRequest());
    },
    addDataRequest: (data) => {
      return dispatch(addDataRequest(data));
    },
    delDataRequest: (data) => {
      return dispatch(delDataRequest(data));
    },
    runRequest: (data) => {
      return dispatch(runRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Input);
