import React from 'react';
import { Panel } from 'react-bootstrap';
import { Chart } from 'react-google-charts';
import { connect } from 'react-redux';

class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Panel header={(<h3>Graph Result</h3>)}>
        <Chart
          chartType="ColumnChart"
          chartTitle={this.props.data[this.props.drawing_idx].bac_id}
          data={this.props.data[this.props.drawing_idx].chart_data}
          options={{legend:{position:'none'} ,title: this.props.data[this.props.drawing_idx].bac_id}}
          graph_id="ColumnChart"
          width="100%"
          height="400px"
        />
      </Panel>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.bacteria.data,
    drawing_idx: state.bacteria.drawing_idx
  };
};

export default connect(mapStateToProps)(Graph);
