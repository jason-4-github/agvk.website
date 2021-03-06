// =============================================================================
// =============================================================================
// Props from ByLocationContainer:
//    type
//    listRacksLocationData
//    rackDetailData
//    handleRackClickFunc
//    highlightLocations
//    focusHighLightLocation
// -----------------------------------------------------------------------------
// Props from ByItemContainer:
//    type
//    highlightLocations
//    focusHighLightLocation
// =============================================================================
// =============================================================================

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import Phase1Config from '../../../config/maps/Phase1Config';

const customContentStyle = {
  width: '90%',
  maxWidth: 'none',
};

const unuseColor = '#F3F3F3';
const stationColor = '#3EBE35';
const aisleColor = '#D5EDFF';
const rackColor = '#FABB7D';
const highlightColor = '#FFD6E0';
const focusColor = '#FF4AA1';

const borderSize = 20;
const gap = 1;
const viewBoxAttr = `0 0 ${borderSize} ${borderSize}`;

const tmp = {};

class Phase1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      queryStr: '',
    };
  }
  componentWillUpdate() {
    if (!tmp.highlightLocations) { return; }
    // Reset highlight station color
    // XXX(S.C.) => need to be modified to better code
    const locationArr = _.split(tmp.highlightLocations[0], '-', 3);
    const locationX = parseInt(locationArr[1], 10);
    const locationY = parseInt(locationArr[2], 10);
    if (_.find(Phase1Config.stationPositions, { x: locationX, y: locationY })) {
      console.log('enter');
      _.map(tmp.highlightLocations, (h) => {
        const element = ReactDOM.findDOMNode(this.refs[h.substr(2)]);
        element.setAttribute('fill', stationColor);
      });
      return;
    }
    // Reset highlight rack color
    _.map(tmp.highlightLocations, (h) => {
      const element = ReactDOM.findDOMNode(this.refs[h.substr(2)]);
      element.setAttribute('fill', rackColor);
    });
  }
  componentDidUpdate() {
    const { highlightLocations, focusHighLightLocation } = this.props;

    if (!highlightLocations) { return; }
    if (!focusHighLightLocation) { return; }

    tmp.highlightLocations = highlightLocations;

    _.map(highlightLocations, (h) => {
      const element = ReactDOM.findDOMNode(this.refs[h.substr(2)]);
      element.setAttribute('fill', highlightColor);
    });
    const focusElement = ReactDOM.findDOMNode(this.refs[focusHighLightLocation.substr(2)]);
    focusElement.setAttribute('fill', focusColor);
  }
  showTableBodyData(data) {
    const rootDom = [];
    _.map(data, (i, k) => {
      rootDom.push(
        <TableRow key={k} selected={false}>
          <TableRowColumn>{`${i.RackSide}-${i.RackLayer}-${i.RackBlock}`}</TableRowColumn>
          <TableRowColumn>{i.ItemName}</TableRowColumn>
          <TableRowColumn>{i.ItemExternalID}</TableRowColumn>
          <TableRowColumn>{i.Vendor}</TableRowColumn>
          <TableRowColumn>{i.ItemCount}</TableRowColumn>
          <TableRowColumn>{i.DateCode}</TableRowColumn>
        </TableRow>);
    });
    return (rootDom);
  }
  handleRackClick(x, y, isEnable, identity) {
    const { handleRackClickFunc } = this.props;

    if (!handleRackClickFunc) { return; }
    if (!isEnable) { return; }

    const { listRacksLocationData } = this.props;

    const locationStr = `0-${x}-${y}`;
    let rackName;
    _.map(listRacksLocationData, (d) => {
      if (d.rackLocation.trim() === locationStr) {
        rackName = d.rackName;
      }
    });

    this.setState({
      isDialogOpen: true,
      queryStr: rackName,
    });

    handleRackClickFunc(rackName, identity);
  }
  handleDialogClose() {
    this.setState({
      isDialogOpen: false,
      queryStr: '',
    });
  }
  showTableDialog(str, type) {
    const actions = [
      <FlatButton
        label="OK"
        primary
        keyboardFocused={false}
        onTouchTap={() => { this.handleDialogClose(); }}
      />,
    ];

    if (type === 'LIST_RACK_DETAIL_REQUEST') {
      return (
        <div>
          <Dialog
            title={str}
            modal
            open={this.state.isDialogOpen}
          >
            <CircularProgress />
          </Dialog>
        </div>
      );
    }
    if (type === 'LIST_RACK_DETAIL_FAILURE') {
      return (
        <div>
          <Dialog
            title={str}
            modal={false}
            open={this.state.isDialogOpen}
            onRequestClose={() => { this.handleDialogClose(); }}
          >
            Ooops... Something wrong.
          </Dialog>
        </div>
      );
    }

    const { rackDetailData } = this.props;
    return (
      <div>
        <Dialog
          title={str}
          actions={actions}
          modal={false}
          contentStyle={customContentStyle}
          open={this.state.isDialogOpen}
          onRequestClose={() => { this.handleDialogClose(); }}
        >
          <Table
            height="450px"
            fixedHeade
            selectable={false}
            multiSelectable={false}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn tooltip="Block No.">Block No.</TableHeaderColumn>
                <TableHeaderColumn tooltip="Part. No.">Part. No.</TableHeaderColumn>
                <TableHeaderColumn tooltip="Cust. Part. No.">Cust. Part. No.</TableHeaderColumn>
                <TableHeaderColumn tooltip="Vendor">Vendor</TableHeaderColumn>
                <TableHeaderColumn tooltip="QTY">QTY</TableHeaderColumn>
                <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway
              showRowHover
              stripedRows={false}
            >
              { rackDetailData
                ? this.showTableBodyData(rackDetailData)
                : ''}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
  buildMapDom(Config) {
    const rootItemsStyle = { height: borderSize };

    const rootItems = _.range(Config.yAxisLength).map((y) => {
      const childItems = _.range(Config.xAxisLength).map((x) => {
        if (_.find(Config.stationPositions, { x, y })) {
          return (
            <svg
              data-x={`${x}`}
              fill={stationColor}
              width={borderSize}
              height={borderSize}
              viewBox={viewBoxAttr}
              ref={`${x}-${y}`}
              key={`${x}-${y}`}
              onClick={() => { this.handleRackClick(`${x}`, `${y}`, true); }}
            >d
              <rect
                x={gap}
                y={gap} width={borderSize - (2 * gap)} height={borderSize - (2 * gap)}
              />
            </svg>
          );
        }
        if (_.find(Phase1Config.unusedPositions, { x, y })) {
          return (
            <svg
              data-x={`${x}`}
              fill={unuseColor}
              width={borderSize}
              height={borderSize}
              viewBox={viewBoxAttr}
              ref={`${x}-${y}`}
              key={`${x}-${y}`}
              onClick={() => { this.handleRackClick(`${x}`, `${y}`, false); }}
            >
              <rect
                x={gap}
                y={gap} width={borderSize - (2 * gap)} height={borderSize - (2 * gap)}
              />
            </svg>
          );
        }
        if (_.find(Phase1Config.rackPositions, { x, y })) {
          return (
            <svg
              data-x={`${x}`}
              fill={rackColor}
              width={borderSize}
              height={borderSize}
              viewBox={viewBoxAttr}
              ref={`${x}-${y}`}
              key={`${x}-${y}`}
              onClick={() => { this.handleRackClick(`${x}`, `${y}`, true); }}
            >
              <rect
                x={gap}
                y={gap} width={borderSize - (2 * gap)} height={borderSize - (2 * gap)}
              />
            </svg>
          );
        }
        return (
          <svg
            data-x={`${x}`}
            fill={aisleColor}
            width={borderSize}
            height={borderSize}
            viewBox={viewBoxAttr}
            ref={`${x}-${y}`}
            key={`${x}-${y}`}
            onClick={() => { this.handleRackClick(`${x}`, `${x}`, false); }}
          >
            <rect
              x={gap}
              y={gap} width={borderSize - (2 * gap)} height={borderSize - (2 * gap)}
            />
          </svg>
        );
      });
      return (
        <div data-y={`${y}`} key={`data-y-${y}`} style={rootItemsStyle}>
          {childItems}
        </div>
      );
    });
    return rootItems;
  }
  showMapTemplate(Config) {
    const { type } = this.props;

    return (
      <div>
        {this.showTableDialog(this.state.queryStr, type)}
        {this.buildMapDom(Config)}
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.showMapTemplate(Phase1Config)}
      </div>
    );
  }
}

Phase1.propTypes = {
  listRacksLocationData: PropTypes.array,
  highlightLocations: PropTypes.array,
  rackDetailData: PropTypes.array,
  focusHighLightLocation: PropTypes.string,
  handleRackClickFunc: PropTypes.func,
  type: PropTypes.string,
};

Phase1.defaultProps = {
  listRacksLocationData: [],
  highlightLocations: [],
  rackDetailData: [],
  focusHighLightLocation: '',
  type: '',
};

export default Phase1;
