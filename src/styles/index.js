export const styles = {
  Row: {
    marginBottom: 0,
  },
  Col: {
    marginBottom: 10,
  },
  Divider: {
    marginBottom: 10,
    marginTop: 10,
  },
  arrow: {
    marginTop: 5,
    marginLeft: 2,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  contentWithSideMenu: {
    paddingLeft: 270,
    paddingTop: 10,
    paddingRight: 10,
  },
  contentWithoutSideMenu: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },
  topBarWithSideMenu: {
    paddingLeft: 270,
    backgroundColor: '#417378',
  },
  topBarWithoutSideMenu: {
    paddingLeft: 10,
    backgroundColor: '#417378',
  },
  TopBar: {
    logged: {
      color: '#FFFFFF',
    },
  },
  Drawer: {
    backgroundColor: '#3E423A',
    rootItem: {
      color: '#FFFFFF',
    },
    childenItem: {
      color: '#FFFFFF',
      borderRight: '5px solid #EB7F00',
      backgroundColor: '#6C6E58',
    },
  },
  Cube: {
    card: {
      height: 120,
      header: {
        height: 40,
      },
      titleStyle: {
        fontSize: 12,
        fontWeight: 700,
      },
      value: {
        color: '#F77A52',
        fontSize: 40,
      },
    },
  },
  IndexContainer: {
    root: {
      backgroundColor: '#054B8E',
      height: '100vh',
      paddingRight: '400px',
      backgroundImage: 'url(http://reactivex.io/assets/reactivex_bg.jpg)',
    },
    title: {
      color: '#FFFFFF',
      marginTop: 0,
      fontSize: 60,
      paddingTop: 200,
      paddingLeft: 20,
    },
    subTitle: {
      color: '#FFFFFF',
      marginTop: -10,
      fontSize: 40,
      paddingTop: 0,
      paddingLeft: 20,
    },
    content: {
      color: '#FFFFFF',
      marginTop: 0,
      fontSize: 20,
      paddingTop: 0,
      paddingLeft: 20,
    },
    iconStyles: {
      marginRight: 0,
      fontSize: 50,
      position: 'absolute',
      bottom: 20,
      right: 20,
    },
  },
  LoginForm: {
    drawer: {
      backgroundColor: '#FAFAFA',
    },
    form: {
      padding: '0px 20px',
      header: {
        fontSize: 50,
        marginTop: 150,
        marginBottom: 20,
      },
      loginButton: {
        marginTop: 30,
        marginLeft: 220,
      },
      spinner: {
        position: 'absolute',
        marginTop: 10,
        right: '120px',
      },
      footer: {
        color: '#666666',
        fontSize: 12,
        position: 'absolute',
        bottom: '10px',
      },
    },
  },
  AllItemsContainer: {
    colRightButton: {
      marginBottom: 10,
      bottom: 0,
      right: -300,
      position: 'fixed',
    },
  },
  ItemCube: {
    rectangle: {
      height: 100,
      width: '100%',
      cursor: 'pointer',
    },
    circle: {
      height: 70,
      width: 70,
      backgroundColor: '#66B3FF',
      borderRadius: 70,
      border: '5px #d0d0d0 solid',
    },
    rowPageSize: {
      marginBottom: 0,
      height: '66vh',
      overflow: 'auto',
    },
  },
  ItemGreneralInfo: {
    tablestyle: {
      width: '50%',
      position: 'absolute',
      left: '30%',
      textalign: 'center',
    },
    circle: {
      height: 100,
      width: 100,
      backgroundColor: '#66B3FF',
      borderRadius: 100,
      border: '5px #d0d0d0 solid',
    },
    tableTd: {
      width: '30%',
    },
  },
};
