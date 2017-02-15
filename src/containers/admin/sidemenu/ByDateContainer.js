import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { Card, CardText } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import _ from 'lodash';
import moment from 'moment';
import { Table, Column, Cell } from 'fixed-data-table-2';
import dimensions from 'react-dimensions';

import '../../../../public/stylesheets/tableStyle.css';
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
                ...styles.Col, ...styles.ByDatePage.filterStyle }}
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
            <Col style={styles.ByDatePage.textCenter}>
              Date:
            </Col>
          </Row>
          <Row style={styles.Row}>
            <Col xs={2} sm={2} md={2} lg={2} />
            <Col
              xs={8} sm={8} md={8} lg={8}
              style={{ ...styles.Col, ...styles.ByDatePage.datePickerDiv }}
            >
              <DatePicker
                onChange={this.handleChangeMinDate}
                autoOk={this.state.autoOk}
                floatingLabelText="From"
                disableYearSelection={this.state.disableYearSelection}
                shouldDisableDate={this.maxDisableDate}
                textFieldStyle={styles.ByDatePage.datePickerText}
                style={styles.ByDatePage.dateInput}
              />
              <DatePicker
                onChange={this.handleChangeMaxDate}
                autoOk={this.state.autoOk}
                floatingLabelText="To"
                disableYearSelection={this.state.disableYearSelection}
                shouldDisableDate={this.minDisableDate}
                textFieldStyle={styles.ByDatePage.datePickerText}
              />
            </Col>
          </Row>
        </CardText>
      </Card>
    );
  }
  showData(data, tableWidth) {
    const rootDom = [];
    const tmpA = ['Part. No.', 'Cust. Part. No.', 'QTY', 'Vendor', 'Date', 'Location'];
    const tmpB = ['ItemName', 'ItemExternalID', 'ItemCount', 'Vendor', 'DateCode', 'Location'];
    _.map(tmpB, (d, i) => {
      if (d === 'ItemName' || d === 'ItemExternalID') {
        rootDom.push(
          <Column
            header={<Cell>{tmpA[i]}</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props} >
                {data[rowIndex][d]}
              </Cell>
            )}
            width={tableWidth / 5.5}
            key={d + i}
            fixed
          />,
        );
      } else {
        rootDom.push(
          <Column
            header={<Cell>{tmpA[i]}</Cell>}
            cell={({ rowIndex, ...props }) => (
              <Cell {...props}>
                {data[rowIndex][d]}
              </Cell>
            )}
            width={tableWidth / 5.5}
            key={d + i}
          />,
        );
      }
    });
    return (rootDom);
  }
  showResultTableCard(data, isSideMenuOpen) {
    let tableWidth = (isSideMenuOpen
      ? window.innerWidth - 356
      : window.innerWidth - 100);
    return (
      <Card>
        <CardText style={styles.ByDatePage.textCenter}>
          {data
            ? (
              <Table
                rowsCount={data.length}
                rowHeight={50}
                headerHeight={50}
                width={tableWidth}
                height={500}
              >
                {this.showData(data, tableWidth)}
              </Table>)
            : ''
          }
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
            style={{ ...styles.Col, ...styles.ByDatePage.textCenter }}
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
            style={{ ...styles.Col, ...styles.ByDatePage.textCenter }}
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
            {this.showResultTableCard(detailData, isSideMenuOpen)}
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
