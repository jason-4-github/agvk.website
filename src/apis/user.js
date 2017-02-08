const TIMEOUT = 2000;

export default {
  userLogin: (passProps, cb, timeout) => {
    const { username, password } = passProps;
    if (username !== 'scott' || password !== '123') {
      setTimeout(() => {
        cb('fail');
      }, timeout || TIMEOUT);
      return;
    }

    setTimeout(() => {
      cb('ok');
    }, timeout || TIMEOUT);
  },
};
