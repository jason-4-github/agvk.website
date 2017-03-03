import { connect } from 'react-redux';
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Table, Column, Cell } from 'fixed-data-table-2';
import {
  Row,
  Col,
  FormControl,
  FormGroup,
  InputGroup,
  DropdownButton,
  MenuItem }
  from 'react-bootstrap';
import LinearProgress from 'material-ui/LinearProgress';
import _ from 'lodash';

import { styles } from '../styles';
import { doTransferItemDetailData } from '../actions';

const fixDataTableHeight = document.documentElement.clientHeight * 0.635;
const fixDataTableWidth = document.documentElement.clientWidth * 0.79;
const fixDataTableImageColumnWidth = ((fixDataTableWidth / 5) * 0.4);
const fixDataTableColumnWidth = ((fixDataTableWidth - fixDataTableImageColumnWidth) / 4);

class ItemCube extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = {
      filterStr: '',
      DropdownTitle: <span><i className="material-icons" style={{ fontSize:'16px' }}>search</i><span>Filters</span></span>,
      filteredDataList: data,
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleQueryStrChange = this.handleQueryStrChange.bind(this);
  }

  handleQueryStrChange(e) {
    const { data } = this.props;
    const { filterStr } = this.state;
    const size = data.length;
    const filterBy = e.target.value;
    const filteredIndexes = [];
    for (var index = 0; index < size; index++) {
      if (_.isMatch(data[index][filterStr].toString(), filterBy)) {
        filteredIndexes.push(data[index]);
      }
    }
    {e.target.value
      ? this.setState({
        filteredDataList: filteredIndexes,
      })
      : this.setState({
        filteredDataList: data,
      })
    }
  }
  handleFilterChange(value) {
      switch (value) {
        case 'Item Name':
            this.setState({
              filterStr: 'ItemName',
              DropdownTitle: value,
            });
          break;
        case 'Part.No.':
            this.setState({
              filterStr: "ItemName",
              DropdownTitle: value,
            });
          break;
        case 'Qty':
          this.setState({
            filterStr: 'ItemCount',
            DropdownTitle: value,
          });
          break;
        case 'Status':
          this.setState({
            filterStr: 'Status',
            DropdownTitle: value,
          });
          break;
        default:
          break;
      }
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
    return (
      <div>
        <Row>
          <Col xs={4} sm={4} md={4} lg={4}>
            <FormGroup>
              <InputGroup>
                <DropdownButton
                  id="input-dropdown-addon"
                  title={this.state.DropdownTitle}
                  onSelect={this.handleFilterChange}
                  componentClass={InputGroup.Button}
                  style={styles.ItemCube.dropDownCricleBorder}
                >
                  <MenuItem eventKey="Item Name" >Item Name</MenuItem>
                  <MenuItem eventKey="Part.No.">Part.No.</MenuItem>
                  <MenuItem eventKey="Qty">Qty</MenuItem>
                  <MenuItem eventKey="Status">Status</MenuItem>
                </DropdownButton>
                <FormControl
                  type="text"
                  placeholder="Keyword"
                  height="43px"
                  style={styles.ItemCube.textInputCircleBorder}
                  onChange={this.handleQueryStrChange}
                />
              </InputGroup>
            </FormGroup>
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
  {
    doTransferItemDetailData,
  },
)(ItemCube);
