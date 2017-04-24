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
      fixDataTableHeight: (window.innerHeight - 200) * 0.8,
      fixDataTableWidth: (window.innerWidth - 256) * 0.98,
      fixDataTablePictureColumnWidth: 0,
      fixDataTableColumnWidth: 0,
    };
    // this.handleQueryStrChange = this.handleQueryStrChange.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  handleResize() {
    if (window.innerWidth < 412) {
      this.setState({
        fixDataTableHeight: (window.innerHeight - 200),
        fixDataTableWidth: window.innerWidth * 0.8,
        fixDataTableColumnWidth: (window.innerWidth * 0.8) / 5,
      });
    } else if (window.innerWidth >= 412 && window.innerWidth < 768) {
      this.setState({
        fixDataTableHeight: (window.innerHeight - 200),
        fixDataTableWidth: window.innerWidth * 0.8,
        fixDataTableColumnWidth: (window.innerWidth * 0.8) / 5,
      });
    } else if (window.innerWidth >= 768 && window.innerWidth < 992) {
      this.setState({
        fixDataTableHeight: (window.innerHeight - 200),
        fixDataTableWidth: window.innerWidth * 0.8,
        fixDataTableColumnWidth: (window.innerWidth * 0.8) / 5,
      });
    } else if (window.innerWidth >= 992 && window.innerWidth < 1200) {
      this.setState({
        fixDataTableHeight: (window.innerHeight - 200),
        fixDataTableWidth: (window.innerWidth - 256) * 0.8,
        fixDataTableColumnWidth: ((window.innerWidth - 256) * 0.8) / 5,
      });
    } else {
      this.setState({
        fixDataTableHeight: (window.innerHeight - 200),
        fixDataTableWidth: (window.innerWidth - 256) * 0.8,
        fixDataTableColumnWidth: ((window.innerWidth - 256) * 0.8) / 5,
      });
    }
  }
  // handleQueryStrChange(e) {
  //   const { data, filterStr, filterCurrectOption, searchBarOptions } = this.props;
  //   const size = data.length;
  //   const filteredIndexes = [];
  //   for (let index = 0; index < size; index += 1) {
  //     if (_.isMatch(data[index][filterStr].toString(), e.target.value)) {
  //       filteredIndexes.push(data[index]);
  //     }
  //   }
  //   searchBarOptions({
  //     queryStr: e.target.value,
  //     filterStr,
  //     filterCurrectOption,
  //   });
  //   this.setState({
  //     filteredDataList: e.target.value ? filteredIndexes : data,
  //   });
  // }
  // <SearchBar
  //   filters={MenuItemsObj}
  //   onChangeFunc={this.handleQueryStrChange}
  //   searchBarQueryStr={this.state.queryStr}
  // />
  render() {
    const { filteredDataList,
            fixDataTableHeight,
            fixDataTableWidth,
            fixDataTablePictureColumnWidth,
            fixDataTableColumnWidth } = this.state;
    const MenuItemsObj = {
      ItemName: 'Part.No.',
      ItemCount: 'Qty',
    };
    return (
      <div>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4} style={styles.ItemCube.searchBarCol}>
            <i className="material-icons" style={styles.ItemCube.searchIcon}>search</i>
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
            width={fixDataTableColumnWidth}
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
