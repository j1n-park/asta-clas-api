import React from 'react';
import { BootstrapTable, TableHeaderColumn, TableD } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { delDataRequest, loadDataRequest, selectData } from 'actions/bacteria';

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadDataRequest();
  }

  onClickChartSelected(cell, row, rowIndex){
   console.log('Draw #', rowIndex);
   this.props.selectData(rowIndex);
  }

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <Button
        bsStyle="primary"
        bsSize="xsmall"
        onClick={() =>
        this.onClickChartSelected(cell, row, rowIndex)}
      >
        DRAW
      </Button>
    );
  }

  onClickDeleteSelected(cell, row, rowIndex){
    console.log('Delete #', rowIndex);
    this.props.delDataRequest(row.bac_id);
  }

  deleteButton(cell, row, enumObject, rowIndex) {
    return (
      <Button
        bsStyle="primary"
        bsSize="xsmall"
        onClick={() =>
        this.onClickDeleteSelected(cell, row, rowIndex)}
      >
        DELETE
      </Button>
    );
  }

  fileFormatter(cell, row) {
    return `<a target='_blank' href='http://127.0.0.1:3000/datafile/test_file/${cell}.csv'> Download </a>`;
  }

  render() {
    return (
      <BootstrapTable
      data={this.props.data}
      height='240'
      scrollTop={ 'Bottom' }
      exportCSV={ true }>
        <TableHeaderColumn isKey dataField='bac_id'>Bac_ID</TableHeaderColumn>
        <TableHeaderColumn dataField='genus'>Genus</TableHeaderColumn>
        <TableHeaderColumn dataField='species'>Species</TableHeaderColumn>
        <TableHeaderColumn dataField='strain'>Strain</TableHeaderColumn>
        <TableHeaderColumn dataField='exp_desc'>Exp_Desc</TableHeaderColumn>
        <TableHeaderColumn dataField='bac_id' dataFormat={ this.fileFormatter } export={ false } width='80px'>DataFile</TableHeaderColumn>
        <TableHeaderColumn dataFormat={ this.cellButton.bind(this) } export={ false } width='65px'>{''}</TableHeaderColumn>
        <TableHeaderColumn dataFormat={ this.deleteButton.bind(this) } export={ false } width='75px'>{''}</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.bacteria.data,
    drawing_idx: state.bacteria.drawing_idx
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadDataRequest: () => {
      return dispatch(loadDataRequest());
    },
    selectData: (idx) => {
      return dispatch(selectData(idx));
    },
    delDataRequest: (idx) => {
      return dispatch(delDataRequest(idx));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
