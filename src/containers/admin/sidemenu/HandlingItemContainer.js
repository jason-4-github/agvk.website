import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import NotificationSystem from 'react-notification-system';
import io from 'socket.io-client';

import { styles } from '../../../styles';
import PageNavigator from '../../../components/PageNavigator';
import Phase1 from '../map/Phase1';
import { doHighlightLocations } from '../../../actions';

class HandlingItemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: io('http://127.0.0.1:4001'),
      highlightLocations: [],
      focusHighLightLocation: '',
    };
  }
  componentDidMount() {
    const { doHighlightLocations } = this.props;

    this.refsNotificationSystem = this.refs.notificationSystem;

    this.state.socket.on('disconnect', function () {
      this.refsNotificationSystem.addNotification({
        title: 'SocketIO Disconnect',
        message: 'Please refresh the page or restart the server.',
        autoDismiss: 0,
        level: 'error',
        position: 'tc',
      });
    }.bind(this));
    this.state.socket.emit('startToSendData');
    this.state.socket.on('barcodeData', (data) => {
      if (!data.stationName) { return; }
      this.refsNotificationSystem.addNotification({
        title: data.stationName,
        message: data.barcode,
        autoDismiss: 2,
        level: 'success',
        position: 'br',
      });

      // XXX(S.C.) => need to be modified to better code for resetting the highlight locations
      doHighlightLocations({
        highlightLocations: [
          `${parseInt(data.zone, 10)}-${parseInt(data.x, 10)}-${parseInt(data.y, 10)}`],
        focusHighLightLocation:
          `${parseInt(data.zone, 10)}-${parseInt(data.x, 10)}-${parseInt(data.y, 10)}`,
      });
      setTimeout(function () {
        doHighlightLocations({
          highlightLocations: [],
          focusHighLightLocation: '',
        });
      }, 100);
    });
  }
  componentWillUnmount() {
    this.state.socket.disconnect();
  }
  render() {
    const { isSideMenuOpen, highlightLocations, focusHighLightLocation } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;

    return (
      <div style={toggleStyle}>
        <NotificationSystem ref={(re) => { this.notificationSystem = re; }} />
        <PageNavigator pages={['Summary', 'Handling Item']} />
        <Row style={styles.Row}>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={{ ...styles.Col, ...{ textAlign: 'center' } }}
          >
            <Phase1
              highlightLocations={highlightLocations}
              focusHighLightLocation={focusHighLightLocation}
            />
          </Col>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={styles.Col}
          />
        </Row>
      </div>
    );
  }
}

HandlingItemContainer.propTypes = {
  isSideMenuOpen: PropTypes.bool,
  doHighlightLocations: PropTypes.func,
  highlightLocations: PropTypes.array,
  focusHighLightLocation: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doHighlightLocations,
  },
)(HandlingItemContainer);
