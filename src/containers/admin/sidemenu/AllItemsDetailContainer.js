import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import { styles } from '../../../styles';
import PageNavigator from '../../../components/PageNavigator';
import ItemGreneralInfo from '../../../components/ItemGreneralInfo';
import ItemInventory from '../../../components/ItemInventory';
import ItemSalesRecord from '../../../components/ItemSalesRecord';

class AllItemsDetailContainer extends React.Component {
  render() {
    const {
        isSideMenuOpen,
        itemDetailData,
      } = this.props;
    const transferItemName = this.props.params.itemName;
    const toggleStyle = isSideMenuOpen === true
                        ? styles.contentWithSideMenu
                        : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'All Items',transferItemName]} />
        <Tabs>
          <Tab label="GENERAL INFO" >
            <ItemGreneralInfo />
          </Tab>
          <Tab label="INVENTORY">
            <ItemInventory transferData={transferItemName} />
          </Tab>
          <Tab label="SALES RECORD">
            <ItemSalesRecord />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
AllItemsDetailContainer.propTypes = {
  itemDetailData: PropTypes.object,
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
