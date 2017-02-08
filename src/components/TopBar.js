import React, { PropTypes } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { styles } from '../styles';

class TopBar extends React.Component {
  render() {
    const { isSideMenuOpen } = this.props;
    const toggleStyle = isSideMenuOpen === true ? styles.topBarWithSideMenu : styles.topBarWithoutSideMenu;

    return (
      <AppBar
        title="AGVK"
        style={toggleStyle}
        onLeftIconButtonTouchTap={() => this.handleToggleSideMenu(isSideMenuOpen)}
        iconElementRight={<Logged />} />
    );
  }
  handleToggleSideMenu(isSideMenuOpen) {
    const { doToggleSideMenu } = this.props;

    doToggleSideMenu({
      isSideMenuOpen: !isSideMenuOpen
    });
  }
};

const Logged = () => (
  <IconMenu
    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    iconStyle={styles.TopBar.logged}>
    <MenuItem primaryText="Refresh" />
    <MenuItem primaryText="Sign out" />
  </IconMenu>
);

TopBar.propTypes = {
  isSideMenuOpen: PropTypes.bool,
  doToggleSideMenu: PropTypes.func
};

export default TopBar;
