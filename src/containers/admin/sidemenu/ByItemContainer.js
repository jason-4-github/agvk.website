import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import { Table, Column, Cell } from 'fixed-data-table-2';


import { styles } from '../../../styles';
import '../../../../public/stylesheets/tableStyle.css';
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
      <Card>
        <CardText>
          {data
            ? (
              <Table
                rowsCount={data.length}
                rowHeight={50}
                headerHeight={50}
                width={tableWidth}
                height={500}
                onRowMouseEnter={(i,k) => {
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
        </CardText>
      </Card>
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
