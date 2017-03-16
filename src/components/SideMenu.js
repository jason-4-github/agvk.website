import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import DashboardIcon from 'material-ui/svg-icons/action/dashboard';
import SummaryIcon from 'material-ui/svg-icons/action/assessment';
import InventoryIcon from 'material-ui/svg-icons/content/archive';
import OperationIcon from 'material-ui/svg-icons/action/touch-app';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import { grey100 } from 'material-ui/styles/colors';
import _ from 'lodash';

import { styles } from '../styles';
import items from '../config/sideMenuItems';

class SideMenu extends React.Component {
  render() {
    const { isSideMenuOpen } = this.props;
    return (
      <Options isOpen={isSideMenuOpen} />
    );
  }
}
const Options = (props) => {
  const rootDom = [];
  _.map(items, (i, k) => {
    const childrenDom = [];
    _.map(i.root.children, (ii, kk) => {
      childrenDom.push(
        <ListItem
          key={kk + 1}
          style={styles.Drawer.childenItem}
          primaryText={ii.primaryText}
          onClick={() => { browserHistory.push(ii.url); }}
        />,
      );
    });
    if (k === 0) {
      rootDom.push(
        <ListItem
          key={k}
          style={styles.Drawer.rootItem}
          primaryText={i.root.primaryText}
          leftIcon={<DashboardIcon color={grey100} />}
          nestedItems={childrenDom}
          primaryTogglesNestedList
        />,
      );
    } else if (k === 1) {
      rootDom.push(
        <ListItem
          key={k}
          style={styles.Drawer.rootItem}
          primaryText={i.root.primaryText}
          leftIcon={<SummaryIcon color={grey100} />}
          nestedItems={childrenDom}
          primaryTogglesNestedList
        />,
      );
    } else if (k === 2) {
      rootDom.push(
        <ListItem
          key={k}
          style={styles.Drawer.rootItem}
          primaryText={i.root.primaryText}
          leftIcon={<InventoryIcon color={grey100} />}
          nestedItems={childrenDom}
          primaryTogglesNestedList
        />,
      );
    } else if (k === 3) {
      rootDom.push(
        <ListItem
          key={k}
          style={styles.Drawer.rootItem}
          primaryText={i.root.primaryText}
          leftIcon={<OperationIcon color={grey100} />}
          nestedItems={childrenDom}
          primaryTogglesNestedList
        />,
      );
    } else if (k === 4) {
      rootDom.push(
        <ListItem
          key={k}
          style={styles.Drawer.rootItem}
          primaryText={i.root.primaryText}
          leftIcon={<SettingIcon color={grey100} />}
          nestedItems={childrenDom}
          primaryTogglesNestedList
        />,
      );
    }
  });
  return (
    <Drawer
      open={props.isOpen}
      containerStyle={styles.Drawer}
    >
      <List>
        {rootDom}
      </List>
    </Drawer>
  );
};
SideMenu.propTypes = {
  isSideMenuOpen: PropTypes.bool,
};
SideMenu.defaultProps = {
  isSideMenuOpen: false,
};
export default SideMenu;
