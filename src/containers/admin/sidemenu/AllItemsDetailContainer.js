import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';

import { styles } from '../../../styles';
import PageNavigator from '../../../components/PageNavigator';
import AllItemsGreneralInfo from '../../../components/AllItemsGreneralInfo';
import AllItemsInventory from '../../../components/AllItemsInventory';
import AllItemsSalesRecord from '../../../components/AllItemsSalesRecord';

class AllItemsDetailContainer extends React.Component {

  render() {
    const {
        isSideMenuOpen,
        DetailData,
      } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Inventory', 'All Items']} />
        <h4>
          <b>{DetailData.ItemName}</b>
        </h4>
        <Tabs>
          <Tab label="GENERAL INFO">
            <AllItemsGreneralInfo Greneraldata={DetailData} />
          </Tab>
          <Tab label="INVENTORY">
            <AllItemsInventory Inventorydata={DetailData} />
          </Tab>
          <Tab label="SALES RECORD">
            <AllItemsSalesRecord Salesrecorddata={DetailData} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}
AllItemsDetailContainer.propTypes = {
  DetailData: PropTypes.object,
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
