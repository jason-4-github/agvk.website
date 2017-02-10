import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import DatePicker from 'material-ui/DatePicker';
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
import PageNavigator from '../../../components/PageNavigator';
import { doAllItemsSelectData } from '../../../actions';

class ByDateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      minDate: {},
      maxDate: {},
      autoOk: true,
      disableYearSelection: false,
    };
  }
  componentDidMount() {
    const { doAllItemsSelectData } = this.props;
    doAllItemsSelectData();
  }
  showFilterCard() {
    return (
      <Card>
        <CardText>
          <Row style={styles.Row}>
            <Col xs={4} sm={4} md={3} lg={3} />
            <Col
              xs={4} sm={4} md={6} lg={6}
              style={{ ...styles.Col, ...{ height: '20vh', paddingTop: '30px' } }}
            >
              <RadioButtonGroup
                name="filter"
              >
                <RadioButton
                  value="Receive"
                  label="Receive"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Issue"
                  label="Issue"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Others"
                  label="Others"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            </Col>
          </Row>
        </CardText>
      </Card>
    );
  }
  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
    console.log(date);
  };
  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
  };
  // TODO(JasonHsu): fix or delete.
  minDisableDate = (date) => {
    const disableDate = new Date();
    return date > disableDate;
  };
  showDatePickerCard() {
    return (
      <Card>
        <CardText>
          <Row style={styles.Row}>
            <Col xs={3} sm={3} md={3} lg={3} />
            <Col
              xs={6} sm={6} md={6} lg={6}
              style={{ ...styles.Col, ...{ height: '20vh' } }}
            >
              <DatePicker
                onChange={this.handleChangeMinDate}
                autoOk={this.state.autoOk}
                floatingLabelText="From"
                disableYearSelection={this.state.disableYearSelection}
                shouldDisableDate={this.minDisableDate}
              />
              <DatePicker
                onChange={this.handleChangeMaxDate}
                autoOk={this.state.autoOk}
                floatingLabelText="To"
                disableYearSelection={this.state.disableYearSelection}
                shouldDisableDate={this.minDisableDate}
              />
            </Col>
          </Row>
        </CardText>
      </Card>
    );
  }
  showData(data) {
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
  showResultTableCard(data) {
    return (
      <Card>
        <CardText>
          <Table
            height="270px"
            fixedHeader
            selectable={false}
            multiSelectable={false}
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
                : ''}
            </TableBody>
          </Table>
        </CardText>
      </Card>
    );
  }
  render() {
    const { isSideMenuOpen, detailData } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'By Date']} />
        <Row style={styles.Row}>
          <Col
            xs={12} sm={5} md={5} lg={5}
            style={{ ...styles.Col, ...{ textAlign: 'center' } }}
          >
            {this.showFilterCard()}
          </Col>
          <Col
            xs={12} sm={5} md={5} lg={5}
            style={styles.Col}
          >
            {this.showDatePickerCard()}
          </Col>
          <Col
            xs={12} sm={2} md={2} lg={2}
            style={{ ...styles.Col, ...{ textAlign: 'center' } }}
          >
            <RaisedButton
              label="Search"
              primary
              onClick={() => { this.handleClickSearch(); }}
            />
          </Col>
          <Col
            xs={12} sm={12} md={12} lg={12}
            style={styles.Col}
          >
            {this.showResultTableCard(detailData)}
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  { doAllItemsSelectData },
)(ByDateContainer);
