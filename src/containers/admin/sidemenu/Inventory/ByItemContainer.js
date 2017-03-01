import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormControl, FormGroup, InputGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import { Table, Column, Cell } from 'fixed-data-table-2';

import { styles } from '../../../../styles';
import '../../../../../public/stylesheets/tableStyle.css';
import Phase1 from '../../map/Phase1';
import PageNavigator from '../../../../components/PageNavigator';
import {
  doListRacksLocation,
  doShowRacksLocation,
  doHighlightLocations,
} from '../../../../actions';

class ByItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryStr: '',
      filterStr: 'Options',
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleQueryStrChange = this.handleQueryStrChange.bind(this);
  }
  componentDidMount() {
    const { doListRacksLocation } = this.props;
    doListRacksLocation();
  }
  showFilter() {
    return (
      <Row style={styles.Row}>
        <Col
          xs={2} sm={5} md={5} lg={5}
          style={styles.Col}
        />
        <Col
          xs={1} sm={1} md={1} lg={1}
          style={styles.byItemStyle.emptyCol}
        >
          <i className="material-icons">search</i>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4} >
          <FormGroup>
            <InputGroup>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={this.state.filterStr}
                onSelect={this.handleFilterChange}
                style={styles.byItemStyle.dropDownCricleBorder}
              >
                <MenuItem key="1" eventKey="PartNo">Part. No.</MenuItem>
                <MenuItem key="2" eventKey="CustPartNo">Cust. Part. No.</MenuItem>
                <MenuItem key="3" eventKey="Vendor">Vendor</MenuItem>
                <MenuItem key="4" eventKey="LotNo">Lot No</MenuItem>
              </DropdownButton>
              <FormControl
                type="text"
                style={styles.byItemStyle.textInputCircleBorder}
                onChange={this.handleQueryStrChange}
              />
            </InputGroup>
          </FormGroup>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} >
          <RaisedButton
            label="Search"
            primary
            onClick={() => { this.handleClickSearch(); }}
          />
        </Col>
      </Row>
    );
  }
  showResultTable(data, type) {
    if (type === 'SHOW_RACK_LOCATION_REQUEST') {
      return (
        <div>
          <CircularProgress />
        </div>
      );
    }
    if (type === 'SHOW_RACK_LOCATION_FAILURE') {
      return (
        <div>
          Ooops... Something Wrong.
        </div>
      );
    }
    if (!data) { return ''; }
    const { isSideMenuOpen } = this.props;
    let tableWidth = (isSideMenuOpen
      ? (window.innerWidth * 0.75) - 256
      : window.innerWidth * 0.7);
    if (window.innerWidth < 767) {
      tableWidth = (isSideMenuOpen
        ? window.innerWidth - 336
        : window.innerWidth - 80);
    }
    return (
      <div style={styles.byItemStyle.tableContainer}>
        {data
          ? (
            <Table
              rowsCount={data.length}
              rowHeight={50}
              headerHeight={50}
              width={tableWidth}
              height={500}
              onRowMouseEnter={(i, k) => {
                const { listRacksLocationData, showRacksLocationInMapData } = this.props;
                const locations = [];
                _.map(showRacksLocationInMapData, (d) => {
                  _.filter(listRacksLocationData, (dd) => {
                    if (d.RackName === dd.rackName) {
                      locations.push(dd.rackLocation.trim());
                    }
                  });
                });
                const { doHighlightLocations } = this.props;
                doHighlightLocations({
                  highlightLocations: _.uniq(locations),
                  focusHighLightLocation: locations[k],
                });
              }}
            >
              {this.showData(data, tableWidth)}
            </Table>)
          : ''
        }
      </div>
    );
  }
  showData(data, tableWidth) {
    const rootDom = [];
    const tmpA = ['Part. No.', 'Cust. Part. No.', 'QTY', 'Vendor', 'Date', 'Location'];
    const tmpB = ['ItemName', 'ItemExternalID', 'ItemCount', 'Vendor', 'DateCode', 'Location'];
    _.map(tmpB, (d, i) => {
      rootDom.push(
        <Column
          header={<Cell>{tmpA[i]}</Cell>}
          cell={({ rowIndex, ...props }) => (
            <Cell {...props}>
              {d === 'Location'
                ? `${data[rowIndex].RackName} ${data[rowIndex][d]}`
                : data[rowIndex][d]}
            </Cell>
          )}
          width={tableWidth / 5.5}
          key={d + i}
          fixed={d === 'ItemName' || d === 'ItemExternalID'
            ? true
            : false
          }
          align="center"
        />,
      );
    });
    return (rootDom);
  }
  handleClickSearch() {
    if (!this.state.queryStr) { return; }
    if (!this.state.filterStr) { return; }

    const { doShowRacksLocation } = this.props;
    doShowRacksLocation({
      token: this.state.filterStr,
      queryStr: this.state.queryStr,
    });
  }
  handleQueryStrChange(e) {
    this.setState({
      queryStr: e.target.value,
    });
  }
  handleFilterChange(event) {
    this.setState({
      filterStr: event,
    });
  }
  render() {
    const {
      isSideMenuOpen,
      showRacksLocationInMapData,
      type,
      highlightLocations,
      focusHighLightLocation,
    } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;

    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'By Item']} />
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
          <Col
            xs={12} sm={9} md={9} lg={9}
            style={styles.Col}
          >
            <Row style={styles.Row}>
              <Col
                xs={12} sm={12} md={12} lg={12}
                style={styles.Col}
              >
                {this.showFilter()}
              </Col>
            </Row>
            <Row style={styles.Row}>
              <Col
                xs={12} sm={12} md={12} lg={12}
                style={styles.Col}
              >
                {this.showResultTable(showRacksLocationInMapData, type)}
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

ByItemContainer.propTypes = {
  isSideMenuOpen: PropTypes.bool,
  showRacksLocationInMapData: PropTypes.array,
  listRacksLocationData: PropTypes.array,
  highlightLocations: PropTypes.array,
  doListRacksLocation: PropTypes.func,
  doHighlightLocations: PropTypes.func,
  doShowRacksLocation: PropTypes.func,
  focusHighLightLocation: PropTypes.string,
  type: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doListRacksLocation,
    doShowRacksLocation,
    doHighlightLocations,
  },
)(ByItemContainer);
