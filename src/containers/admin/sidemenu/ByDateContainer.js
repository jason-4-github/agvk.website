import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';
import moment from 'moment';

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
import { doAllItemsSelectData, listeningChangedOptions } from '../../../actions';

class ByDateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fromDate: '',
      toDate: '',
      filter: '',
      autoOk: true,
      disableYearSelection: false,
    };
  }
  componentDidMount() {
    const { doAllItemsSelectData } = this.props;
    doAllItemsSelectData();
  }
  handleChangeFilter = (event, value) => {
    this.setState({
      filter: value,
    });
    const { listeningChangedOptions } = this.props;
    const { fromDate, toDate } = this.state;
    listeningChangedOptions({
      fromDate,
      toDate,
      filter: value,
    });
  }
  showFilterCard() {
    return (
      <Card>
        <CardText>
          <Row style={styles.Row}>
            <Col xs={4} sm={4} md={3} lg={3} />
            <Col
              xs={4} sm={4} md={6} lg={6}
              style={{
                ...styles.Col,
                ...{ height: '18vh', paddingTop: '25px' } }}
            >
              <RadioButtonGroup
                name="filter"
                onChange={this.handleChangeFilter}
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
    const { toDate } = this.state;
    const tmpDate = moment(date).format('YYYY-MM-DD');
    this.setState({
      fromDate: tmpDate,
    });
    const { listeningChangedOptions } = this.props;
    const { fromDate, filter } = this.state;
    listeningChangedOptions({
      fromDate,
      toDate,
      filter,
    });
  };
  handleChangeMaxDate = (event, date) => {
    const tmpDate = moment(date).format('YYYY-MM-DD');
    this.setState({
      toDate: tmpDate,
    });
    const { listeningChangedOptions } = this.props;
    const { fromDate, toDate, filter } = this.state;
    listeningChangedOptions({
      fromDate,
      toDate,
      filter,
    });
  };
  minDisableDate = (date) => {
    const disableDate = moment().format('YYYY-MM-DD');
    const tmpDate = moment(date).format('YYYY-MM-DD');
    return (tmpDate < this.state.fromDate || tmpDate > disableDate);
  };
  maxDisableDate = (date) => {
    const disableDate = moment().format('YYYY-MM-DD');
    const tmpDate = moment(date).format('YYYY-MM-DD');
    return (this.state.toDate === ''
      ? tmpDate > disableDate
      : (tmpDate > disableDate || tmpDate > this.state.toDate));
  }
  showDatePickerCard() {
    return (
      <Card>
        <CardText>
          <Row style={styles.Row}>
            <Col xs={3} sm={3} md={3} lg={3} />
            <Col
              xs={6} sm={6} md={6} lg={6}
              style={{ ...styles.Col, ...{ height: '18vh' } }}
            >
              <DatePicker
                onChange={this.handleChangeMinDate}
                autoOk={this.state.autoOk}
                floatingLabelText="From"
                disableYearSelection={this.state.disableYearSelection}
                shouldDisableDate={this.maxDisableDate}
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
          <TableRowColumn>
            {`${i.RackName} ${i.RackSide}-${i.RackLayer}-${i.RackBlock}`}
          </TableRowColumn>
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
  { doAllItemsSelectData, listeningChangedOptions },
)(ByDateContainer);
