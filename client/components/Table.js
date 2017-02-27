import React from 'react';
import { BootstrapTable, TableHeaderColumn, TableD } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { loadDataRequest, selectData } from 'actions/bacteria';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.selectRowProp = {
      mode: 'checkbox'
    };
  }

  componentDidMount() {
    this.props.loadDataRequest();
  }

  onClickProductSelected(cell, row, rowIndex){
   console.log('Product #', rowIndex);
   this.props.selectData(rowIndex);
  }

  cellButton(cell, row, enumObject, rowIndex) {
    return (
      <Button
        bsStyle="primary"
        bsSize="xsmall"
        onClick={() =>
        this.onClickProductSelected(cell, row, rowIndex)}
      >
      SELECT
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
      selectRow={this.selectRowProp}
      height='240'
      scrollTop={ 'Bottom' }
      exportCSV={ true }>
        <TableHeaderColumn isKey dataField='bac_id'>Bac_ID</TableHeaderColumn>
        <TableHeaderColumn dataField='genus'>Genus</TableHeaderColumn>
        <TableHeaderColumn dataField='species'>Species</TableHeaderColumn>
        <TableHeaderColumn dataField='strain'>Strain</TableHeaderColumn>
        <TableHeaderColumn dataField='exp_desc'>Exp_Desc</TableHeaderColumn>
        <TableHeaderColumn dataField='bac_id' dataFormat={ this.fileFormatter } export={ false }>DataFile</TableHeaderColumn>
        <TableHeaderColumn dataFormat={ this.cellButton.bind(this) } export={ false }>DrawChart</TableHeaderColumn>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
