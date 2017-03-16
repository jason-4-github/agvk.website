import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import moment from 'moment';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { DateRangePicker, isInclusivelyBeforeDay } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';
import '../../../../../public/stylesheets/tableStyle.css';
import { styles } from '../../../../styles';
import PageNavigator from '../../../../components/PageNavigator';
import { doAllItemsSelectData, listeningChangedOptions } from '../../../../actions';

class ByDateContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }
  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
    const tmpStart = moment(startDate).format('YYYY-MM-DD');
    const tmpEnd = moment(endDate).format('YYYY-MM-DD');
    const { listeningChangedOptions } = this.props;
    listeningChangedOptions({
      startDate: tmpStart,
      endDate: tmpEnd,
    });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
    if (focusedInput === 'startDate') {
      this.setState({ endDate: null });
    }
  }
  handleClickSearch() {
    const { doAllItemsSelectData } = this.props;
    doAllItemsSelectData();
  }
  showDatePickerCard() {
    const { focusedInput, startDate, endDate } = this.state;
    const dateRule = day => !isInclusivelyBeforeDay(day, moment());
    return (
      <Row>
        <Col sm={6} md={6} lg={7} />
        <Col xs={12} sm={6} md={6} lg={5} style={styles.ByDatePage.textRight} >
          <DateRangePicker
            {...this.props}
            displayFormat="YYYY-MM-DD"
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
            isOutsideRange={dateRule}
            minimumNights={0}
            customArrowIcon={<i className="material-icons">date_range</i>}
          />
        </Col>
      </Row>
    );
  }
  showData(data, tableWidth) {
    const rootDom = [];
    const tmpA = ['Picture', 'Parts. No.', 'Cust. Part. No.', 'QTY', 'Vendor', 'Date', 'Location', 'Status'];
    const tmpB = ['Picture', 'ItemName', 'ItemExternalID', 'ItemCount', 'Vendor', 'DateCode', 'Location', 'Status'];
    _.map(tmpB, (d, i) => {
      rootDom.push(
        <Column
          header={<Cell>{tmpA[i]}</Cell>}
          cell={({ rowIndex, ...props }) => (
            <Cell {...props} >
              {data[rowIndex][d]}
            </Cell>
          )}
          width={tableWidth / 6.5}
          key={d + i}
          fixed={d === 'ItemName' || d === 'ItemExternalID' || d === 'Picture'
            ? true
            : false
          }
        />,
      );
    });
    return (rootDom);
  }
  showResultTableCard(data) {
    const { isSideMenuOpen, type } = this.props;
    const tableWidth = (isSideMenuOpen
      ? window.innerWidth - 340
      : window.innerWidth - 70);
    if (type === 'LIST_ALLITEMS_SELECT_REQUEST') {
      return (
        <div style={styles.ByDatePage.textCenter}>
          <CircularProgress />
        </div>
      );
    }
    return (
      <div
        style={{
          ...styles.ByDatePage.textCenter,
          ...styles.ByDatePage.tableLeftPadding }}
      >
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
      </div>
    );
  }
  render() {
    const { isSideMenuOpen, detailData, type } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;

    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'By Date']} />
        <Row style={styles.Row}>
          <Col
            xs={10} sm={10} md={10} lg={10}
            style={styles.Col}
          >
            {this.showDatePickerCard()}
          </Col>
          <Col
            xs={2} sm={2} md={2} lg={2}
            style={{
              ...styles.Col,
              ...styles.ByDatePage.textLeft,
              ...styles.ByDatePage.buttonPadding,
            }}
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
            {this.showResultTableCard(detailData, isSideMenuOpen, type)}
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
