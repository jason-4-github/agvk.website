import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { Row, Col } from 'react-bootstrap';
import _ from 'lodash';

import { styles } from '../styles';
import SearchBar from './SearchBar';
import { searchBarOptions } from '../actions';

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
    const { tableHeightSize,
            tableWidthSize,
            tableColumnSize } = this.props;
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
          width={tableWidthSize}
          height={tableHeightSize * 0.9}
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
            width={tableColumnSize}
            align="center"
          />
          <Column
            header={<Cell>Item Name</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                { this.state.filteredDataList[rowIndex].ItemName }
              </Cell>
            )}
            width={tableColumnSize}
            align="center"
          />
          <Column
            header={<Cell>Part .No.</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                { this.state.filteredDataList[rowIndex].ItemName }
              </Cell>
              )}
            width={tableColumnSize}
            align="center"
          />
          <Column
            header={<Cell>Qty</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                { this.state.filteredDataList[rowIndex].ItemCount }
              </Cell>
              )}
            width={tableColumnSize}
            align="center"
          />
          <Column
            header={<Cell>Status</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} style={{ cursor: 'pointer' }}>
                {null}
              </Cell>
            )}
            width={tableColumnSize}
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
