import React from 'react';
import { connect } from 'react-redux';

import PageNavigator from '../../../components/PageNavigator';
import { styles } from '../../../styles';
import InOutBoundTable from '../../../components/InOutBoundTab';
import { doAllItemsSelectData } from '../../../actions';

class InboundContainer extends React.Component {
  componentDidMount() {
    const { doAllItemsSelectData } = this.props;
    doAllItemsSelectData();
  }
  render() {
    const { isSideMenuOpen, detailData, type } = this.props;
    const toggleStyle = isSideMenuOpen === true
      ? styles.contentWithSideMenu
      : styles.contentWithoutSideMenu;
    return (
      <div style={toggleStyle}>
        <PageNavigator pages={['Summary', 'Inbound']} />
        <InOutBoundTable data={detailData} isSideMenuOpen={isSideMenuOpen} />
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
  { doAllItemsSelectData },
)(InboundContainer);
