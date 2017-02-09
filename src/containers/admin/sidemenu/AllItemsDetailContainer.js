import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import { styles } from '../../../styles';
import PageNavigator from '../../../components/PageNavigator';
import ItemsGreneralInfo from '../../../components/ItemsGreneralInfo';
import ItemInventory from '../../../components/ItemInventory';
import ItemSalesRecord from '../../../components/ItemSalesRecord';

class AllItemsDetailContainer extends React.Component {
  render() {
    const {
        isSideMenuOpen,
        detailData,
      } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'All Items']} />
        <h4>
          <b>{detailData.ItemName}</b>
        </h4>
        <Tabs>
          <Tab label="GENERAL INFO">
            <ItemsGreneralInfo Greneraldata={detailData} />
          </Tab>
          <Tab label="INVENTORY">
            <ItemInventory Inventorydata={detailData} />
          </Tab>
          <Tab label="SALES RECORD">
            <ItemSalesRecord Salesrecorddata={detailData} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
AllItemsDetailContainer.propTypes = {
  detailData: PropTypes.object,
  isSideMenuOpen: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
export default connect(
  mapStateToProps,
)(AllItemsDetailContainer);
