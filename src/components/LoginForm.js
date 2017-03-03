import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import Snackbar from 'material-ui/Snackbar';
import CircularProgress from 'material-ui/CircularProgress';

import { styles } from '../styles';

class LoginForm extends React.Component {
  static showSnackbar() {
    return (
      <Snackbar
        open
        message="Ooops...Username or password is wrong."
        autoHideDuration={3000}
      />
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isTyping: false,
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }
  handleClickLogin() {
    const { doLogin } = this.props;
    doLogin({
      username: this.state.username,
      password: this.state.password,
    });
    this.setState({
      isTyping: false,
    });
  }
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
      isTyping: true,
    });
  }
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
      isTyping: true,
    });
  }
  render() {
    const { isLoginLoading, isLoginPass, isLoginFormOpen } = this.props;
    return (
      <Drawer
        open={isLoginFormOpen}
        openSecondary
        width={350}
        containerStyle={styles.LoginForm.drawer}
      >
        <div style={styles.LoginForm.form}>
          <div style={styles.LoginForm.form.header}>
            AGVK
          </div>
          <div>
            <TextField
              hintText="username"
              fullWidth
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            <TextField
              hintText="password"
              fullWidth
              onChange={this.handlePasswordChange}
            />
          </div>
          <div style={styles.LoginForm.form.loginButton}>
            { isLoginLoading
                ? <CircularProgress size={20} style={styles.LoginForm.form.spinner} />
                : ''
            }
            <RaisedButton
              label="Login"
              className="border-color-button"
              onClick={() => { return (this.handleClickLogin()); }}
              disabled={isLoginLoading}
              primary
            />
          </div>
          <p style={styles.LoginForm.form.footer}>© 2016 New Kinpo Group</p>
          {(isLoginPass === false && (isLoginPass === false && this.state.isTyping === false))
                            ? this.showSnackbar()
                            : ''
          }
        </div>
      </Drawer>
    );
  }
}
LoginForm.propTypes = {
  isLoginLoading: PropTypes.bool,
  isLoginPass: PropTypes.bool,
  isLoginFormOpen: PropTypes.bool,
  doLogin: PropTypes.func,
};
export default LoginForm;
