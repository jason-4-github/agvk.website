import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import SideMenu from '../../components/SideMenu';
import TopBar from '../../components/TopBar';
import { doToggleSideMenu } from '../../actions';
import '../../../node_modules/fixed-data-table-2/dist/fixed-data-table.css';
import '../../../public/stylesheets/tableStyle.css';

const responsiveInnerWidth = 992;

class AdminContainer extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
  handleResize() {
    const { doToggleSideMenu } = this.props;
    if (window.innerWidth < responsiveInnerWidth) {
      doToggleSideMenu({ isSideMenuOpen: false });
    } else {
      doToggleSideMenu({ isSideMenuOpen: true });
    }
  }
  render() {
    return (
      <div>
        <SideMenu isSideMenuOpen={this.props.isSideMenuOpen} />
        <TopBar
          {...this.props}
          isSideMenuOpen={this.props.isSideMenuOpen}
        />
        {this.props.children && React.cloneElement(this.props.children, {
          isSideMenuOpen: this.props.isSideMenuOpen,
        })}
      </div>
    );
  }
}

AdminContainer.propTypes = {
  isSideMenuOpen: PropTypes.bool,
  doToggleSideMenu: PropTypes.func,
  children: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    ...state.admin,
  };
};

export default connect(
  mapStateToProps,
  { doToggleSideMenu },
)(AdminContainer);
