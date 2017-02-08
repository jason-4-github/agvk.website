import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import FontIcon from 'material-ui/FontIcon';
import { amber300 } from 'material-ui/styles/colors';

import { styles } from '../styles';
import LoginForm from '../components/LoginForm';
import { doLogin, doOpenLoginForm } from '../actions';

class IndexContainer extends React.Component {
  handleLoginButtonClick() {
    const { doOpenLoginForm } = this.props;
    doOpenLoginForm({
      isLoginFormOpen: true,
    });
  }
  render() {
    return (
      <div
        style={styles.IndexContainer.root}
        className="login-root-view"
      >
        <div>
          <FontIcon
            className="material-icons"
            style={styles.IndexContainer.iconStyles}
            color={amber300}
            onClick={() => { this.handleLoginButtonClick(); }}
          >
            person_outline
          </FontIcon>
          <h1
            style={styles.IndexContainer.title}
            className="title"
          >
            The Smartest
          </h1>
          <h2
            style={styles.IndexContainer.subTitle}
            className="title"
          >
            Vehicle System
          </h2>
          <p
            style={styles.IndexContainer.content}
            className="content"
          >
            Shape the future of your hyperconverged infrastucture with AGVK System.
          </p>
        </div>
        <LoginForm {...this.props} />
      </div>
    );
  }
}

IndexContainer.propTypes = {
  doLogin: PropTypes.func,
  doOpenLoginForm: PropTypes.func,
  isLoginLoading: PropTypes.bool,
  isLoginFormOpen: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    ...state.login,
  };
};

export default connect(
  mapStateToProps,
  { doLogin, doOpenLoginForm },
)(IndexContainer);
