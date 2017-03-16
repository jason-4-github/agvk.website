import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { styles } from '../../../../styles';
import PageNavigator from '../../../../components/PageNavigator';
import ItemCube from '../../../../components/ItemCube';
import { doDownloadInventoryReport, doListAllItems } from '../../../../actions';

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
        {(listAllItemData !== undefined) && (listAllItemData.length !== 0)
          ? <ItemCube data={listAllItemData} />
          : <CircularProgress
            style={styles.AllItemsContainer.circularProgressStyles}
          />}
        <br />
        <RaisedButton
          label="Download Inventory Report"
          className="border-color-button"
          style={styles.RackLocationTableCard.downloadButtonstyle}
          onClick={() => { this.handleClickDownload(); }}
          primary
        />
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
