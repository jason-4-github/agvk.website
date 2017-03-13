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

class ItemCube extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      queryStr: '',
      filteredDataList: data,
      ChangeSize: false,
      fixDataTableHeight: (window.innerHeight - 200) * 0.8,
      fixDataTableWidth: (window.innerWidth - 256) * 0.98,
      fixDataTablePictureColumnWidth: 0,
      fixDataTableColumnWidth: 0,
    };
    this.handleQueryStrChange = this.handleQueryStrChange.bind(this);
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  handleResize() {
    const checkWidthsize = window.innerWidth - 256;
    const checkHeightsize = window.innerHeight - 200;
    if ((checkWidthsize <= 992) || (checkHeightsize <= 435)) {
      this.setState({
        fixDataTableHeight: checkHeightsize * 0.8,
        fixDataTableWidth: window.innerWidth * 0.98,
        fixDataTablePictureColumnWidth: (((window.innerWidth * 0.98) / 5) * 0.4),
        fixDataTableColumnWidth: (((window.innerWidth * 0.98)
                               - (((window.innerWidth * 0.98) / 5) * 0.4)) / 4),
      });
    } else if ((checkWidthsize !== 1110) || (checkHeightsize !== 462)) {
      this.setState({
        fixDataTableHeight: checkHeightsize * 0.8,
        fixDataTableWidth: checkWidthsize * 0.98,
        fixDataTablePictureColumnWidth: ((checkWidthsize / 5) * 0.4),
        fixDataTableColumnWidth: ((checkWidthsize - ((checkWidthsize / 5) * 0.4)) / 4),
      });
    } else {
      this.setState({
        fixDataTableHeight: 356,
        fixDataTableWidth: 1072,
        fixDataTablePictureColumnWidth: ((checkWidthsize / 5) * 0.4),
        fixDataTableColumnWidth: ((checkWidthsize - ((checkWidthsize / 5) * 0.4)) / 4),
      });
    }
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
    const { fixDataTableHeight,
            fixDataTableWidth,
            fixDataTablePictureColumnWidth,
            fixDataTableColumnWidth } = this.state;
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
            width={fixDataTablePictureColumnWidth}
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
