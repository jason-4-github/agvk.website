import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import _ from 'lodash';
import { Table, Column, Cell } from 'fixed-data-table-2';

import { styles } from '../../../../styles';
import '../../../../../public/stylesheets/tableStyle.css';
import Phase1 from '../../map/Phase1';
import SearchBar from '../../../../components/SearchBar';
import PageNavigator from '../../../../components/PageNavigator';
import {
  doListRacksLocation,
  doShowRacksLocation,
  doHighlightLocations,
  tableProperty,
} from '../../../../actions';

class ByItemContainer extends React.Component {

  componentDidMount() {
    const { doListRacksLocation } = this.props;
    doListRacksLocation();
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  handleResize() {
    const { tableProperty } = this.props;
    tableProperty({
      columnCount: 6.5,
      sizeModel: 'ModelB',
    });
  }
  showFilter() {
    const searchBarObj = {
      PartNo: 'Parts. No.',
      CustPartNo: 'Cust. Part. No.',
      Vendor: 'Vendor',
      LotNo: 'Lot No',
    };
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
          <SearchBar filters={searchBarObj} />
        </Col>
        <Col xs={2} sm={2} md={2} lg={2} style={{ textAlign: 'right' }}>
          <RaisedButton
            label="Search"
            primary
            onClick={() => { this.handleClickSearch(); }}
          />
        </Col>
      </Row>
    );
  }
  showResultTable(data, type, tableHeightSize, tableWidthSize, tableColumnSize) {
    if (type === 'SHOW_RACK_LOCATION_REQUEST') {
      return (
        <div style={styles.byItemStyle.textCenter}>
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
    return (
      <div style={styles.byItemStyle.tableContainer}>
        {data
          ? (
            <Table
              rowsCount={data.length}
              rowHeight={50}
              headerHeight={50}
              width={tableWidthSize}
              height={485}
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
              {this.showData(data, tableColumnSize)}
            </Table>)
          : ''
        }
      </div>
    );
  }
  showData(data, tableColumnSize) {
    const rootDom = [];
    const tmpA = ['Picture', 'Parts. No.', 'Cust. Part. No.', 'QTY', 'Vendor', 'Date', 'Location', 'Status'];
    const tmpB = ['Picture', 'ItemName', 'ItemExternalID', 'ItemCount', 'Vendor', 'DateCode', 'Location', 'Status'];
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
          width={tableColumnSize}
          key={d + i}
          fixed={d === 'ItemName' || d === 'ItemExternalID' || d === 'Picture'
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
    const { doShowRacksLocation, queryStr, filterStr } = this.props;
    if (!queryStr) { return; }
    if (!filterStr) { return; }

    doShowRacksLocation({
      token: filterStr,
      queryStr,
    });
  }
  render() {
    const {
      isSideMenuOpen,
      showRacksLocationInMapData,
      type,
      highlightLocations,
      focusHighLightLocation,
      tableHeightSize,
      tableWidthSize,
      tableColumnSize
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
                {this.showResultTable(
                  showRacksLocationInMapData,
                  type,
                  tableHeightSize,
                  tableWidthSize,
                  tableColumnSize)}
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
    tableProperty,
  },
)(ByItemContainer);
