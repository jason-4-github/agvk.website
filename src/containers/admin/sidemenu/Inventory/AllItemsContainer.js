import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import { styles } from '../../../../styles';
import PageNavigator from '../../../../components/PageNavigator';
import ItemCube from '../../../../components/ItemCube';
import { doListAllItems, tableProperty } from '../../../../actions';

class AllItemsContainer extends React.Component {
  componentDidMount() {
    const { doListAllItems } = this.props;
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
    doListAllItems();
  }
  handleResize() {
    const { tableProperty } = this.props;
    tableProperty({
      columnCount: 5,
      sizeModel: 'ModelA',
    });
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
          ? <ItemCube
            data={listAllItemData}
          />
          : <CircularProgress
            style={styles.AllItemsContainer.circularProgressStyles}
          />}
        <br />
        <RaisedButton
          label="Download Inventory Report"
          className="border-color-button"
          style={styles.RackLocationTableCard.downloadButtonstyle}
          onClick={() => { window.open('http://172.21.37.5:4001/apis/downloadInventoryReport'); }}
          primary
        />
      </div>
    );
  }
}

AllItemsContainer.propTypes = {
  listAllItemData: PropTypes.array,
  doListAllItems: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};
export default connect(
  mapStateToProps,
  {
    doListAllItems,
    tableProperty,
  },
)(AllItemsContainer);
