import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import RaisedButton from 'material-ui/RaisedButton';

import { styles } from '../../../styles';
import PageNavigator from '../../../components/PageNavigator';
import ItemCube from '../../../components/ItemCube';
import { doDownloadInventoryReport, doListAllItems } from '../../../actions';

class AllItemsContainer extends React.Component {
  componentDidMount() {
    const { doListAllItems } = this.props;
    doListAllItems();
  }
  handleClickDownload() {
    const { doDownloadInventoryReport } = this.props;
    doDownloadInventoryReport();
  }
  render() {
    const {
      isSideMenuOpen,
      listAllItemData,
    } = this.props;
    const toggleStyle = isSideMenuOpen === true
                        ? styles.contentWithSideMenu
                        : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'All Items']} />
        <ItemCube data={listAllItemData} />
        <br />
        <Row style={styles.Row}>
          <Col
            xs={12} sm={6} md={6} lg={6}
            style={styles.AllItemsContainer.colRightButton}
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
  listAllItemData: PropTypes.array,
  doListAllItems: PropTypes.func,
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
    doListAllItems,
  },
)(AllItemsContainer);
