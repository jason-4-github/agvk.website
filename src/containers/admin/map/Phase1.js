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
import { Table, Column, Cell } from 'fixed-data-table-2';

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
      fixDataTableHeight: 0,
      fixDataTableWidth: 0,
      fixDataTableColumnWidth: 0,
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  componentWillUpdate() {
    if (!tmp.highlightLocations) { return; }
    // Reset highlight station color
    // XXX(S.C.) => need to be modified to better code
    const locationArr = _.split(tmp.highlightLocations[0], '-', 3);
    const locationX = parseInt(locationArr[1], 10);
    const locationY = parseInt(locationArr[2], 10);
    if (_.find(Phase1Config.stationPositions, { x: locationX, y: locationY })) {
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
  handleResize() {
    if (window.innerWidth < 768) {
      this.setState({
        fixDataTableHeight: window.innerHeight * 0.6,
        fixDataTableWidth: window.innerWidth * 0.8,
        fixDataTableColumnWidth: ((window.innerWidth * 0.8) / 8),
      });
    } else {
      this.setState({
        fixDataTableHeight: window.innerHeight * 0.6,
        fixDataTableWidth: window.innerWidth * 0.85,
        fixDataTableColumnWidth: ((window.innerWidth * 0.85) / 8),
      });
    }
  }
  showTableDialog(str, type) {
    const { fixDataTableHeight,
            fixDataTableWidth,
            fixDataTableColumnWidth } = this.state;
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
          name="rckDialog"
          title={str}
          actions={actions}
          modal={false}
          contentStyle={customContentStyle}
          open={this.state.isDialogOpen}
          onRequestClose={() => { this.handleDialogClose(); }}
        >
          {rackDetailData
            ? <Table
              rowHeight={50}
              rowsCount={rackDetailData.length}
              width={fixDataTableWidth}
              height={fixDataTableHeight}
              headerHeight={50}
            >
              <Column
                header={<Cell>Block No.</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    {rackDetailData[rowIndex].RackBlockNO}
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>Pic</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { rackDetailData[rowIndex].picture }
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>Part. No.</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { rackDetailData[rowIndex].ItemName }
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>Cust. Part. No.</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { rackDetailData[rowIndex].ItemExternalID }
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>Vendor</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { rackDetailData[rowIndex].Vendor }
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>QTY</Cell>}
                cell={({ rowIndex, ...props }) => (
                  <Cell {...props}>
                    { rackDetailData[rowIndex].ItemCount }
                  </Cell>
                    )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>Date</Cell>}
                cell={({ rowIndex, ...props }) => (
                <Cell {...props}>
                  { rackDetailData[rowIndex].DateCode }
                </Cell>
                )}
                width={fixDataTableColumnWidth}
                align="center"
              />
              <Column
                header={<Cell>Status</Cell>}
                cell={({ rowIndex, ...props }) => (
                <Cell {...props}>
                  { rackDetailData[rowIndex].status }
                </Cell>
                )}
                width={fixDataTableColumnWidth}
                align="center"
              />
            </Table>
            : '' }
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
