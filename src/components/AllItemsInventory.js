import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import _ from 'lodash';

import { styles } from '../styles';
import Phase1 from '../containers/admin/map/Phase1';
import {
  doListRacksLocation,
  doShowRacksLocation,
  doHighlightLocations,
} from '../actions';

class AllItemsInventory extends React.Component {
  static showData(data) {
    const rootDom = [];
    _.map(data, (i, k) => {
      rootDom.push(
        <TableRow key={k} selected={false}>
          <TableRowColumn>{ i.ItemName }</TableRowColumn>
          <TableRowColumn />
          <TableRowColumn>{ i.ItemExternalID }</TableRowColumn>
          <TableRowColumn>{ i.ItemCount }</TableRowColumn>
          <TableRowColumn>{ i.Vendor }</TableRowColumn>
          <TableRowColumn>{ i.DateCode }</TableRowColumn>
          <TableRowColumn>{ `${i.RackName} ${i.RackSide}-${i.RackLayer}-${i.RackBlock}` }</TableRowColumn>
          <TableRowColumn />
        </TableRow>);
    });
    return (rootDom);
  }
  componentDidMount() {
    const { doListRacksLocation,
            doShowRacksLocation,
              Inventorydata,
      } = this.props;
    doListRacksLocation();
    doShowRacksLocation({
      token: 'PartNo',
      queryStr: Inventorydata.ItemName,
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
    return (
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
          <Card>
            <CardText>
              <Table
                height="300px"
                width="100%"
                fixedHeader
                selectable={false}
                multiSelectable={false}
                onRowHover={(i) => {
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
                    focusHighLightLocation: locations[i],
                  });
                }}
              >
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
                  <TableRow >
                    <TableHeaderColumn tooltip="Part.No.">Part.No.</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Pic">Pic</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Cust.Part.No.">Cust.Part.No.</TableHeaderColumn>
                    <TableHeaderColumn tooltip="QTY">QTY</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Vendor">Vendor</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Location">Location</TableHeaderColumn>
                    <TableHeaderColumn tooltip="Status">Status</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  deselectOnClickaway
                  showRowHover
                  stripedRows={false}
                >
                  { showRacksLocationInMapData ? AllItemsInventory.showData(showRacksLocationInMapData) : '' }
                </TableBody>
              </Table>
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }

}
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
AllItemsInventory.propTypes = {
  doListRacksLocation: PropTypes.func,
  doShowRacksLocation: PropTypes.func,
  Inventorydata: PropTypes.object,
  type: PropTypes.string,
  highlightLocations: PropTypes.array,
  focusHighLightLocation: PropTypes.string,
  showRacksLocationInMapData: PropTypes.array,
  listRacksLocationData: PropTypes.array,
};
AllItemsInventory.defaultProps = {
  doListRacksLocation: null,
  doShowRacksLocation: null,
  Inventorydata: null,
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
)(AllItemsInventory);
