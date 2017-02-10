import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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


import { styles } from '../../../styles';
import Phase1 from '../map/Phase1';
import PageNavigator from '../../../components/PageNavigator';
import {
  doListRacksLocation,
  doShowRacksLocation,
  doHighlightLocations,
} from '../../../actions';

class ByItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryStr: '',
      filterStr: '',
    };
    this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
    this.handleQueryStrChange = this.handleQueryStrChange.bind(this);
  }
  componentDidMount() {
    const { doListRacksLocation } = this.props;
    doListRacksLocation();
  }
  showFilterCard() {
    return (
      <Card>
        <CardText>
          <Row style={styles.Row}>
            <Col
              xs={12} sm={6} md={6} lg={6}
              style={styles.Col}
            >
              <RadioButtonGroup
                name="filter"
                onChange={this.handleRadioButtonChange}
              >
                <RadioButton
                  value="PartNo"
                  label="Part. No."
                  style={styles.radioButton}
                />
                <RadioButton
                  value="CustPartNo"
                  label="Cust. Part. No."
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Vendor"
                  label="Vendor"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="LotNo"
                  label="Lot No"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            </Col>
            <Col
              xs={12} sm={6} md={6} lg={6}
              style={styles.Col}
            >
              <TextField
                hintText="Search"
                onChange={this.handleQueryStrChange}
              />
              <RaisedButton
                label="Search"
                primary
                onClick={() => { this.handleClickSearch(); }}
              />
            </Col>
          </Row>
        </CardText>
      </Card>
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
    const { listRacksLocationData, showRacksLocationInMapData } = this.props;
    _.map(showRacksLocationInMapData, (d) => {
      _.filter(listRacksLocationData, (dd) => {
        if (d.RackName === dd.rackName) {
          d.location = dd.rackLocation.trim();
        }
      });
    });
    return (
      <Card>
        <CardText>
          <Table
            height="270px"
            fixedHeader
            selectable={false}
            multiSelectable={false}
            onRowHover={(i) => {
              const { listRacksLocationData, showRacksLocationInMapData } = this.props;
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
              <TableRow>
                <TableHeaderColumn tooltip="Part. No.">Part. No.</TableHeaderColumn>
                <TableHeaderColumn tooltip="Cust. Part. No.">Cust. Part. No.</TableHeaderColumn>
                <TableHeaderColumn tooltip="QTY">QTY</TableHeaderColumn>
                <TableHeaderColumn tooltip="Vendor">Vendor</TableHeaderColumn>
                <TableHeaderColumn tooltip="Date">Date</TableHeaderColumn>
                <TableHeaderColumn tooltip="Location">Location</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway
              showRowHover
              stripedRows={false}
            >
              { data
                ? this.showData(data)
                : ''
              }
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
  showData(data) {
    console.log(data);
    const rootDom = [];
    _.map(data, (i, k) => {
      rootDom.push(
        <TableRow key={k} selected={false}>
          <TableRowColumn>{i.ItemName}</TableRowColumn>
          <TableRowColumn>{i.ItemExternalID}</TableRowColumn>
          <TableRowColumn>{i.ItemCount}</TableRowColumn>
          <TableRowColumn>{i.Vendor}</TableRowColumn>
          <TableRowColumn>{i.DateCode}</TableRowColumn>
          <TableRowColumn>{`${i.RackName} ${i.RackSide}-${i.RackLayer}-${i.RackBlock}`}</TableRowColumn>
        </TableRow>);
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
  handleRadioButtonChange(e) {
    this.setState({
      filterStr: e.currentTarget.value,
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
                {this.showFilterCard()}
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
