import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import { Table, Column, Cell } from 'fixed-data-table-2';
import _ from 'lodash';

import { styles } from '../styles';
import Phase1 from '../containers/admin/map/Phase1';
import { TableResizefunc } from '../utils/tableSize';
import {
  doListRacksLocation,
  doShowRacksLocation,
  doHighlightLocations,
} from '../actions';

class ItemInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixDataTableHeight: 0,
      fixDataTableWidth: 0,
      fixDataTableColumnWidth: 0,
    };
  }
  componentDidMount() {
    const { doListRacksLocation,
            doShowRacksLocation,
            transferData,
      } = this.props;
    doListRacksLocation();
    doShowRacksLocation({
      token: 'PartNo',
      queryStr: transferData,
    });
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  handleResize() {
    const sizeArrs = TableResizefunc({
      columnCount: 8,
      sizeModel: 'ModelB',
    });
    this.setState({
      fixDataTableHeight: sizeArrs[0],
      fixDataTableWidth: sizeArrs[1],
      fixDataTableColumnWidth: sizeArrs[2],
    });
  }
  render() {
    const {
        type,
        highlightLocations,
        focusHighLightLocation,
        showRacksLocationInMapData,
        listRacksLocationData,
      } = this.props;
    const { fixDataTableHeight,
            fixDataTableWidth,
            fixDataTableColumnWidth } = this.state;
    return (
      <Card>
        <CardText>
          <Row style={styles.Row}>
            <Col
              xs={12} sm={3} md={3} lg={3}
              style={{ ...styles.Col, ...{ textAlign: 'center' } }}
            >
              <Phase1
                type={type}
                highlightLocations={highlightLocations}
                focusHighLightLocation={focusHighLightLocation}
              />
            </Col>
            <Col xs={12} sm={9} md={9} lg={9} style={styles.Col}>
              { showRacksLocationInMapData
                ? <Table
                  rowHeight={50}
                  rowsCount={showRacksLocationInMapData.length}
                  width={fixDataTableWidth}
                  height={fixDataTableHeight}
                  headerHeight={50}
                  onRowMouseEnter={(i, j) => {
                    const locations = [];
                    _.map(showRacksLocationInMapData, (d) => {
                      _.filter(listRacksLocationData, (dd) => {
                        if (d.RackName === dd.rackName) {
                          locations.push(dd.rackLocation.trim());
                          d.location = dd.rackLocation.trim();
                        }
                      });
                    });
                    const { doHighlightLocations } = this.props;
                    doHighlightLocations({
                      highlightLocations: _.uniq(locations),
                      focusHighLightLocation: locations[j],
                    });
                  }}
                >
                  <Column
                    header={<Cell>Part. No.</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { showRacksLocationInMapData[rowIndex].ItemName }
                      </Cell>
                        )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                  <Column
                    header={<Cell>Pic</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { showRacksLocationInMapData[rowIndex].ItemName }
                      </Cell>
                        )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                  <Column
                    header={<Cell>Cust. Part. No.</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { showRacksLocationInMapData[rowIndex].ItemExternalID }
                      </Cell>
                        )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                  <Column
                    header={<Cell>QTY</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { showRacksLocationInMapData[rowIndex].ItemCount }
                      </Cell>
                        )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                  <Column
                    header={<Cell>Vendor</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { showRacksLocationInMapData[rowIndex].Vendor }
                      </Cell>
                    )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                  <Column
                    header={<Cell>Date</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { showRacksLocationInMapData[rowIndex].DateCode }
                      </Cell>
                    )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                  <Column
                    header={<Cell>Location</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { showRacksLocationInMapData[rowIndex].Location }
                      </Cell>
                    )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                  <Column
                    header={<Cell>Status</Cell>}
                    cell={({ rowIndex, ...props }) => (
                      <Cell {...props}>
                        { null }
                      </Cell>
                    )}
                    width={fixDataTableColumnWidth}
                    align="center"
                  />
                </Table>
              : '' }
            </Col>
          </Row>
        </CardText>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
ItemInventory.propTypes = {
  doListRacksLocation: PropTypes.func,
  doShowRacksLocation: PropTypes.func,
  transferData: PropTypes.string,
  type: PropTypes.string,
  highlightLocations: PropTypes.array,
  focusHighLightLocation: PropTypes.string,
  showRacksLocationInMapData: PropTypes.array,
  listRacksLocationData: PropTypes.array,
};
ItemInventory.defaultProps = {
  doListRacksLocation: null,
  doShowRacksLocation: null,
  transferData: null,
  type: null,
  highlightLocations: [],
  focusHighLightLocation: null,
  showRacksLocationInMapData: [],
  listRacksLocationData: [],
};
export default connect(
  mapStateToProps,
  {
    doListRacksLocation,
    doShowRacksLocation,
    doHighlightLocations,
  },
)(ItemInventory);
