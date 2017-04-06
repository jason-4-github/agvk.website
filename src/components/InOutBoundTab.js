import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import { Row, Col } from 'react-bootstrap';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';

import 'react-dates/lib/css/_datepicker.css';
import '../../public/stylesheets/tableStyle.css';
import PieChartModel from './PieChartModel';
import { styles } from '../styles';
import { doListInOutboundData } from '../actions';

class InOutBoundTab extends React.Component {
  constructor(props) {
    super(props);
    const { boundType } = this.props;
    this.state = {
      date: null,
      focused: null,
      value: 0,
      boundTypeData: boundType,
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleFocusClick = this.handleFocusClick.bind(this);
  }
  handleTabsChange = (value) => {
    const { doListInOutboundData,boundType } = this.props;
    this.setState({
      value,
      date: null,
      focused: null,
    });
    doListInOutboundData({
      formatOption: null,
      queryTime: null,
      boundTypeData: boundType,
    });
  };
  handleDateClick(date) {
    const { value } = this.state;
    const formatOptionArr = ['day', 'month', 'year'];
    const dateFormat = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];
    const { doListInOutboundData, boundType } = this.props;
    this.setState({
      date,
    });
    doListInOutboundData({
      formatOption: formatOptionArr[value],
      queryTime: moment(date).format(dateFormat[value]),
      boundTypeData: boundType,
    });
  }
  handleFocusClick({ focused }) {
    this.setState({ focused });
  }
  showTableData(listInOutboundData, tableWidth, headerNames, cellNames) {
    const rootDom = [];
    _.map(cellNames, (d, i) => {
      rootDom.push(
        <Column
          header={<Cell>{headerNames[i]}</Cell>}
          cell={({ rowIndex, ...props }) => (
            <Cell {...props}>
              {listInOutboundData[rowIndex][d]}
            </Cell>
          )}
          width={tableWidth / 4}
          key={d + i}
        />,
      );
    });
    return (rootDom);
  }
  showTable(listInOutboundData, isSideMenuOpen, showTableData, headerNames, cellNames) {
    const tableWidth = (isSideMenuOpen
      ? window.innerWidth - 356
      : window.innerWidth - 100);
    return (
      <div style={{ ...styles.Inbound.tableLeftPadding, ...styles.Inbound.textCenter }}>
        {listInOutboundData
          ? (
            <Table
              rowsCount={listInOutboundData.length}
              rowHeight={50}
              headerHeight={50}
              width={tableWidth}
              height={500}
            >
              {showTableData(listInOutboundData, tableWidth, headerNames, cellNames)}
            </Table>)
          : ''
        }
      </div>
    );
  }
  showTabsContent(
    listInOutboundData,
    isSideMenuOpen,
    headerNames,
    cellNames,
    listPiChartData) {
    const { date, focused, value } = this.state;
    const dateRule = day => !isInclusivelyBeforeDay(day, moment());
    const tabName = ['Date', 'Month', 'Year'];
    const dateFormat = ['YYYY-MM-DD', 'YYYY-MM', 'YYYY'];
    const rootDom = [];
    _.map(tabName, (name, key) => {
      rootDom.push(
        <Tab
          label={name}
          value={key}
          key={key}
          style={styles.Inbound.tabStyle}
        >
          <br />
          <Card>
            <CardText>
              { name === tabName[value]
                ? <Row>
                  <Col xs={12} sm={12} md={12} lg={12}>
                    <SingleDatePicker
                      displayFormat={dateFormat[key]}
                      id="date_input"
                      onDateChange={this.handleDateClick}
                      onFocusChange={this.handleFocusClick}
                      focused={focused}
                      date={date}
                      isOutsideRange={dateRule}
                      numberOfMonths={1}
                      key={key}
                    />
                  </Col>
                  <Row>
                    <Col
                      xs={12} sm={12} md={12} lg={12}
                      style={{ height: (window.innerHeight / 4) }}
                    >
                      { (listPiChartData !== undefined) && (listPiChartData !== 0) &&
                        (listInOutboundData !== undefined) && (listInOutboundData.length !== 0)
                        ? <PieChartModel
                          isSideMenuOpen={isSideMenuOpen}
                          container="InOutBound"
                          inOutboundData={listPiChartData}
                        />
                        : ''}
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} style={styles.Inbound.tableTopMargin}>
                      {this.showTable(
                        listInOutboundData,
                        isSideMenuOpen,
                        this.showTableData,
                        headerNames,
                        cellNames)}
                    </Col>
                  </Row>
                </Row>
                : ''
              }
            </CardText>
          </Card>
        </Tab>,
      );
    });
    return (rootDom);
  }
  render() {
    const {
      listInOutboundData,
      listPiChartData,
      isSideMenuOpen,
      headerNames,
      cellNames,
      } = this.props;
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleTabsChange}
      >
        {this.showTabsContent(
          listInOutboundData,
          isSideMenuOpen,
          headerNames,
          cellNames,
          listPiChartData)}
      </Tabs>
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
  { doListInOutboundData },
)(InOutBoundTab);
