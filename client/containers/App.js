import React from 'react';
import { connect } from 'react-redux';
import { Header, Graph, Input, Table, Notice } from 'components';
import { Grid } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

const grid_style = {margin: '40px auto 40px'};

class App extends React.Component {
    render(){
        return (
            <Grid style={grid_style}>
              <Row>
                <Header />
              </Row>
              <Row>
                <Notice />
              </Row>
              <Row>
                <Table/>
              </Row>
              <Row>
                <Input />
              </Row>
              <Row>
                <Graph />
              </Row>
            </Grid>
        );
    }
}

export default App;
