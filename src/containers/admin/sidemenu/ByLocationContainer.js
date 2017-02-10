import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import { styles } from '../../../styles';
import Phase1 from '../map/Phase1';
import RackLocationTableCard from '../../../components/RackLocationTableCard';
import PageNavigator from '../../../components/PageNavigator';
import { doListRacksLocation, doQueryRackDetail } from '../../../actions';

class ByLocationContainer extends React.Component {
  componentDidMount() {
    const { doListRacksLocation } = this.props;
    doListRacksLocation();
  }
  render() {
    const {
      isSideMenuOpen,
      listRacksLocationData,
      doQueryRackDetail,
      rackDetailData,
      type,
      highlightLocations,
      focusHighLightLocation,
    } = this.props;
    const toggleStyle = isSideMenuOpen === true
                        ? styles.contentWithSideMenu
                        : styles.contentWithoutSideMenu;

    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'By Location']} />
        <Row style={styles.Row}>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={{ ...styles.Col, ...{ textAlign: 'center' } }}
          >
            <Phase1
              type={type}
              listRacksLocationData={listRacksLocationData}
              rackDetailData={rackDetailData}
              handleRackClickFunc={doQueryRackDetail}
              highlightLocations={highlightLocations}
              focusHighLightLocation={focusHighLightLocation}
            />
          </Col>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={styles.Col}
          >
            <RackLocationTableCard
              title=""
              subtitle=""
              data={listRacksLocationData}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

ByLocationContainer.propTypes = {
  listRacksLocationData: PropTypes.array,
  doListRacksLocation: PropTypes.func,
  isSideMenuOpen: PropTypes.bool,
  doQueryRackDetail: PropTypes.func,
  rackDetailData: PropTypes.array,
  type: PropTypes.string,
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
    doListRacksLocation,
    doQueryRackDetail,
  },
)(ByLocationContainer);
