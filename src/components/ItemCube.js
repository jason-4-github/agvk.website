import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { Row, Col } from 'react-bootstrap';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import { styles } from '../styles';
import SearchBar from './SearchBar';
import { searchBarOptions } from '../actions';

const fixDataTableHeight = document.documentElement.clientHeight * 0.635;
const fixDataTableWidth = document.documentElement.clientWidth * 0.79;
const fixDataTableImageColumnWidth = ((fixDataTableWidth / 5) * 0.4);
const fixDataTableColumnWidth = ((fixDataTableWidth - fixDataTableImageColumnWidth) / 4);

class ItemCube extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      queryStr: '',
      filteredDataList: data,
    };
    this.handleQueryStrChange = this.handleQueryStrChange.bind(this);
  }
  handleQueryStrChange(e) {
    const { data, filterStr, filterCurrectOption, searchBarOptions } = this.props;
    const size = data.length;
    const filteredIndexes = [];
    for (let index = 0; index < size; index += 1) {
      if (_.isMatch(data[index][filterStr].toString(), e.target.value)) {
        filteredIndexes.push(data[index]);
      }
    }
    searchBarOptions({
      queryStr: e.target.value,
      filterStr,
      filterCurrectOption,
    });
    this.setState({
      filteredDataList: e.target.value ? filteredIndexes : data,
    });
  }
  render() {
    const { filteredDataList } = this.state;
    if (document.readyState !== 'complete') {
      return (
        <Row style={styles.Row}>
          <font size="5"><center>Loading of the site, please later....</center></font>
          <LinearProgress
            mode="indeterminate"
            style={{ width: '90%', marginLeft: '5%' }}
          />
        </Row>
      );
    }
    const MenuItemsObj = {
      ItemName: 'Part.No.',
      ItemCount: 'Qty',
    };
    return (
      <div>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} style={styles.ItemCube.searchBarCol}>
            <i className="material-icons" style={styles.ItemCube.searchIcon}>search</i>
            <SearchBar
              filters={MenuItemsObj}
              onChangeFunc={this.handleQueryStrChange}
              searchBarQueryStr={this.state.queryStr}

            />
          </Col>
          <Col xs={8} sm={8} md={8} lg={8} />
        </Row>
        <Table
          rowHeight={50}
          headerHeight={50}
          rowsCount={filteredDataList.length}
          width={fixDataTableWidth}
          height={fixDataTableHeight}
          onRowClick={(i, j) => {
            browserHistory.push(`/admin/inventory/all-items/${this.state.filteredDataList[j].ItemName}`);
          }}
        >
          <Column
            header={<Cell>Picture</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                { null }
              </Cell>
            )}
            width={fixDataTableImageColumnWidth}
            align="center"
          />
          <Column
            header={<Cell>Item Name</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                { this.state.filteredDataList[rowIndex].ItemName }
              </Cell>
            )}
            width={fixDataTableColumnWidth}
            align="center"
          />
          <Column
            header={<Cell>Part .No.</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                { this.state.filteredDataList[rowIndex].ItemName }
              </Cell>
              )}
            width={fixDataTableColumnWidth}
            align="center"
          />
          <Column
            header={<Cell>Qty</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                { this.state.filteredDataList[rowIndex].ItemCount }
              </Cell>
              )}
            width={fixDataTableColumnWidth}
            align="center"
          />
          <Column
            header={<Cell>Status</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                {null}
              </Cell>
            )}
            width={fixDataTableColumnWidth}
            align="center"
          />
        </Table>
      </div>
    );
  }
}

ItemCube.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
export default connect(
  mapStateToProps,
  { searchBarOptions },
)(ItemCube);
