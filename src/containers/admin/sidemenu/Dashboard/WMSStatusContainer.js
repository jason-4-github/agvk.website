import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import LinearProgress from 'material-ui/LinearProgress';

import { styles } from '../../../../styles';
import Cube from '../../../../components/Cube';
import PieChartModel from '../../../../components/PieChartModel';
import BarChartCard from '../../../../components/BarChartCard';
import PageNavigator from '../../../../components/PageNavigator';
import { doListWMSStatus } from '../../../../actions';

class WMSStatusContainer extends React.Component {
  componentDidMount() {
    const { doListWMSStatus } = this.props;
    doListWMSStatus();
  }
  render() {
    const { isSideMenuOpen, wmsStatusData } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;

    if (!wmsStatusData) {
      return (
        <div style={toggleStyle}>
          <PageNavigator pages={['Dashboard', 'WMS Status']} />
          <Row style={styles.Row}>
            <LinearProgress
              mode="indeterminate"
              style={{ width: '90%', marginLeft: '5%' }}
            />
          </Row>
        </div>
      );
    }
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Dashboard', 'WMS Status']} />
        <Row style={styles.Row}>
          <Col
            xs={12} sm={4} md={4} lg={4}
            style={styles.Col}
          >
            <Cube
              title="Total Amount of Items in Inventory"
              subtitle=""
              value={wmsStatusData.totalAmountOfItemsInInventory}
            />
          </Col>
          <Col
            xs={12} sm={4} md={4} lg={4}
            style={styles.Col}
          >
            <Cube
              title="Total Amount of QTY in Inventory"
              subtitle=""
              value={wmsStatusData.totalAmountOfQTYInInventory}
            />
          </Col>
          <Col
            xs={12} sm={4} md={4} lg={4}
            style={styles.Col}
          >
            <Cube
              title="Total Processed QTY"
              subtitle=""
              value={wmsStatusData.totalProcessedQTY}
            />
          </Col>
        </Row>
        <Row style={styles.Row}>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={styles.Col}
          >
            <Card style={{ minHeight: '100px', minWidth: '100px' }}>
              <CardHeader
                title="Remaining Space"
                subtitle=""
                style={styles.Cube.card.header}
                titleStyle={styles.Cube.card.titleStyle}
              />
              <CardText style={{ height: '300px', width: '100%' }}>
                <Divider />
                <PieChartModel />
              </CardText>
            </Card>
          </Col>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={styles.Col}
          >
            <Card style={{ minHeight: '100px', minWidth: '100px' }}>
              <CardHeader
                title="Latest Time of Issuing the Materials"
                subtitle=""
                style={styles.Cube.card.header}
                titleStyle={styles.Cube.card.titleStyle}
              />
              <CardText style={{ height: '300px', width: '100%' }}>
                <Divider />
                <PieChartModel />
              </CardText>
            </Card>
          </Col>
        </Row>
        <Row style={styles.Row}>
          <Col
            xs={12} sm={12} md={12} lg={12}
            style={styles.Col}
          >
            <BarChartCard
              title="History Record of Inbound and Outbound"
              subtitle=""
            />
          </Col>
        </Row>
      </div>
    );
  }
}

WMSStatusContainer.propTypes = {
  isSideMenuOpen: PropTypes.bool,
  doListWMSStatus: PropTypes.func,
  wmsStatusData: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doListWMSStatus,
  },
)(WMSStatusContainer);
