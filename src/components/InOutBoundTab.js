import React from 'react';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import { Row, Col } from 'react-bootstrap';
import { Table, Column, Cell } from 'fixed-data-table-2';
import { Card, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';

import 'react-dates/lib/css/_datepicker.css';
import '../../public/stylesheets/tableStyle.css';
import PieChartModel from './PieChartModel';
import { styles } from '../styles';

class InOutBoundTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: null,
      value: 0,
    };
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleFocusClick = this.handleFocusClick.bind(this);
  }
  handleTabsChange = (value) => {
    this.setState({ value });
  };
  handleDateClick(date) {
    this.setState({ date });
  }
  handleFocusClick({ focused }) {
    this.setState({ focused });
  }
  showTableData(data, tableWidth) {
    const rootDom = [];
    const tmpA = ['Picture', 'Parts. No.', 'Cust. Part. No.', 'QTY', 'Vendor', 'Date', 'Location', 'Status'];
    const tmpB = ['Picture', 'ItemName', 'ItemExternalID', 'ItemCount', 'Vendor', 'DateCode', 'Location', 'Status'];
    _.map(tmpB, (d, i) => {
      rootDom.push(
        <Column
          header={<Cell>{tmpA[i]}</Cell>}
          cell={({ rowIndex, ...props }) => (
            <Cell {...props}>
              {data[rowIndex][d]}
            </Cell>
          )}
          width={tableWidth / 6.5}
          key={d + i}
          fixed={d === 'ItemName' || d === 'ItemExternalID' || d === 'Picture'}
        />,
      );
    });
    return (rootDom);
  }
  showTable(data, isSideMenuOpen, showTableData) {
    const tableWidth = (isSideMenuOpen
      ? window.innerWidth - 356
      : window.innerWidth - 100);
    return (
      <div style={{ ...styles.Inbound.tableLeftPadding, ...styles.Inbound.textCenter }}>
        {data
          ? (
            <Table
              rowsCount={data.length}
              rowHeight={50}
              headerHeight={50}
              width={tableWidth}
              height={500}
            >
              {showTableData(data, tableWidth)}
            </Table>)
          : ''
        }
      </div>
    );
  }
  showTabsContent(data, isSideMenuOpen) {
    const { date, focused, value } = this.state;
    const dateRule = day => !isInclusivelyBeforeDay(day, moment());
    const tabName = ['Date', 'Month', 'Year'];
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
                      displayFormat="YYYY-MM-DD"
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
                    <Col xs={12} sm={12} md={12} lg={12} style={{ height: (window.innerHeight / 4) }}>
                      { data
                        ? <PieChartModel isSideMenuOpen={isSideMenuOpen} container="InOutBound" />
                        : '' }
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12} sm={12} md={12} lg={12} style={styles.Inbound.tableTopMargin}>
                      {this.showTable(data, isSideMenuOpen, this.showTableData)}
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
    const { data, isSideMenuOpen } = this.props;
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleTabsChange}
      >
        {this.showTabsContent(data, isSideMenuOpen)}
      </Tabs>
    );
  }
}

export default InOutBoundTab;
