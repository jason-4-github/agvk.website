import React from 'react';
import { connect } from 'react-redux';

import PageNavigator from '../../../../components/PageNavigator';
import { styles } from '../../../../styles';
import InOutBoundTable from '../../../../components/InOutBoundTab';

class InboundContainer extends React.Component {
  render() {
    const { isSideMenuOpen } = this.props;
    const tableHeaders = ['Amount of Invoice', 'Item QTY', 'Total QTY', 'Date'];
    const tableCells = ['amountOfInvoice', 'itemQty', 'totalQty', 'time'];
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Summary', 'Inbound']} />
        <InOutBoundTable
          isSideMenuOpen={isSideMenuOpen}
          headerNames={tableHeaders}
          cellNames={tableCells}
          boundType={'inbound'}
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
)(InboundContainer);
