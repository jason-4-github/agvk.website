import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

import { styles } from '../../../styles';
import PageNavigator from '../../../components/PageNavigator';
import PageListItem from '../../../components/PageListItem';
import { doDownloadInventoryReport, doListAllItemsData } from '../../../actions';
class AllItemsContainer extends React.Component {
  componentDidMount() {
    const { doListAllItemsData } = this.props;
    doListAllItemsData();
  }
  handleClickDownload() {
    const { doDownloadInventoryReport } = this.props;
    doDownloadInventoryReport();
  }
  render() {
    const {
      isSideMenuOpen,
      selectRackDetailData,
    } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'All Items']} />
        <PageListItem data={selectRackDetailData} />
        <br />
        <Row style={styles.Row}>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={styles.AllItemsContainer.ColRightButton}
          >
            <RaisedButton
              label="Download Inventory Report"
              className="border-color-button"
              onClick={() => { this.handleClickDownload(); }}
              primary
            />
          </Col>
        </Row>
      </div>
    );
  }
}

AllItemsContainer.propTypes = {
  SelectRackDetailData: PropTypes.array,
  doListAllItemsData: PropTypes.func,
  doDownloadInventoryReport: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  {
    doDownloadInventoryReport,
    doListAllItemsData,
  },
)(AllItemsContainer);
