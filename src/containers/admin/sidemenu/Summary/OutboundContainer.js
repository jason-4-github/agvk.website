import React from 'react';
import { connect } from 'react-redux';

import PageNavigator from '../../../../components/PageNavigator';
import { styles } from '../../../../styles';
import InOutBoundTable from '../../../../components/InOutBoundTab';

class OutboundContainer extends React.Component {
  render() {
    const { isSideMenuOpen } = this.props;
    const tableHeaders = ['Amount of MO', 'Item QTY', 'Total QTY', 'Date'];
    const tableCells = ['amountOfMo', 'itemQty', 'totalQty', 'time'];
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Summary', 'Outbound']} />
        <InOutBoundTable
          isSideMenuOpen={isSideMenuOpen}
          headerNames={tableHeaders}
          cellNames={tableCells}
          boundType={'outbound'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
)(OutboundContainer);
