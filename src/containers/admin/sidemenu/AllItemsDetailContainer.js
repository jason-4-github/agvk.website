import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import _ from 'lodash';

import { styles } from '../../../styles';
import PageNavigator from '../../../components/PageNavigator';
import GreneralInfo from '../../../components/GreneralInfo';
import Inventory from '../../../components/Inventory';
import Salesrecord from '../../../components/Salesrecord';
class AllItemsDetailContainer extends React.Component {
    render() {
      const {
        isSideMenuOpen,
        detaildata,
      } = this.props;
      const toggleStyle = isSideMenuOpen === true ? styles.contentWithSideMenu : styles.contentWithoutSideMenu;
        return (
          <div style={toggleStyle}>
            <PageNavigator pages={ ['Inventory', 'All Items'] } />
                <h4>
                  <b>
                    { detaildata.ItemName }
                  </b>
                </h4>
              <Tabs>
                <Tab label="GENERAL INFO">
                  <GreneralInfo  Greneraldata={ detaildata }/>
                </Tab>
                <Tab label="INVENTORY">
                  <Inventory  Inventorydata={ detaildata }/>
                </Tab>
                <Tab label="SALES RECORD">
                  <Salesrecord  Salesrecorddata={ detaildata }/>
                </Tab>
              </Tabs>
          </div>
        );
    }
};
AllItemsDetailContainer.propTypes = {
   detaildata: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    ...state.admin
  };
};

export default connect(
  mapStateToProps,
  {  }
)(AllItemsDetailContainer);
