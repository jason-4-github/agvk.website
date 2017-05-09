import { browserHistory } from 'react-router';
import 'whatwg-fetch';
import _ from 'lodash';

import * as types from '../constants/ActionTypes';
import user from '../apis/user';
import { localStorage } from '../index';

// TODO(S.C.) => url need to be changed as production
const serverConfig = {
  url: 'http://172.21.37.5:4001/apis',
};

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

export const doLogin = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LOGIN_REQUEST,
    isLoginLoading: true,
  });

  user.userLogin(passProps, (res) => {
    if (res !== 'ok') {
      dispatch({
        type: types.LOGIN_FAILURE,
        isLoginLoading: false,
        isLoginPass: false,
      });
      localStorage.isAuth = false;
      return;
    }
    dispatch({
      type: types.LOGIN_SUCCESS,
      isLoginLoading: false,
      isLoginPass: true,
    });
    localStorage.isAuth = true;
    browserHistory.push('/admin');
  });
};

export const doOpenLoginForm = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LOGIN_FROM_OPEN,
    isLoginFormOpen: true,
  });
};

export const doToggleSideMenu = (passProps) => (dispatch, getState) => {
  if (passProps.isSideMenuOpen === true) {
    dispatch({
      type: types.SIDE_MENU_OPEN,
      isSideMenuOpen: true,
    });
  } else {
    dispatch({
      type: types.SIDE_MENU_CLOSE,
      isSideMenuOpen: false,
    });
  }
};

export const doListRacksLocation = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LIST_RACK_LOCATION_REQUEST,
    listRacksLocationData: [],
  });
  fetch(`${serverConfig.url}/locations/rack`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.LIST_RACK_LOCATION_SUCCESS,
        listRacksLocationData: data,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RACK_LOCATION_FAILURE,
        listRacksLocationData: [],
      });
    });
};

export const doShowRacksLocation = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.SHOW_RACK_LOCATION_REQUEST,
    showRacksLocationInMapData: [],
  });
  fetch(`${serverConfig.url}/locations/rack/q/?colName=${passProps.token}&queryStr=${passProps.queryStr}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i, k) => {
        const newObj = {};
        newObj.RackName = i.RackName;
        newObj.ItemName = i.ItemName;
        newObj.ItemExternalID = i.ItemExternalID;
        newObj.ItemCount = i.ItemCount;
        newObj.Vendor = i.Vendor;
        newObj.DateCode = i.DateCode;
        newObj.Location = `${i.RackName} ${i.RackSide}-${i.RackLayer}-${i.RackBlock}`;
        newData.push(newObj);
      });
      dispatch({
        type: types.SHOW_RACK_LOCATION_SUCCESS,
        showRacksLocationInMapData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.SHOW_RACK_LOCATION_FAILURE,
        showRacksLocationInMapData: [],
      });
    });
};

export const doQueryRackDetail = (passProps) => (dispatch, getState) => {
  // if passProps is undefined, means user clicks 'station'
  // otherwise, user clicks 'rack'
  dispatch({
    type: types.LIST_RACK_DETAIL_REQUEST,
  });
  if (!passProps) {
    dispatch({
      type: types.LIST_RACK_DETAIL_SUCCESS,
      rackDetailData: [],
    });
    return;
  }
  fetch(`${serverConfig.url}/items/q/?rackName=${passProps}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.RackName = i.RackName;
        newObj.RackSide = i.RackSide;
        newObj.RackLayer = i.RackLayer;
        newObj.RackBlock = i.RackBlock;
        newObj.ItemCount = i.ItemCount;
        newObj.Vendor = i.Vendor;
        newObj.DateCode = i.DateCode;
        newObj.ItemExternalID = i.ItemExternalID;
        newObj.ItemName = i.ItemName;
        newObj.RackBlockNO = `${i.RackSide}-${i.RackLayer}-${i.RackBlock}`;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_RACK_DETAIL_SUCCESS,
        rackDetailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_RACK_DETAIL_FAILURE,
        rackDetailData: [],
      });
    });
};

export const doListAllItems= (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LIST_ALLITEMS_REQUEST,
    listAllItemData: [],
  });
  fetch(`${serverConfig.url}/items`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.LIST_ALLITEMS_SUCCESS,
        listAllItemData: data,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_ALLITEMS_FAILURE,
        listAllItemData: [],
      });
    });
};

export const doTransferItemDetailData = (passProps) => (dispatch) => {
  dispatch({
    type: types.TRANSFER_ITEM_DETAILDATA,
    itemDetailData: passProps.itemDetailData,
  });
};

export const doHighlightLocations = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.HIGHLIGHT_LOCATIONS,
    highlightLocations: passProps.highlightLocations,
    focusHighLightLocation: passProps.focusHighLightLocation,
  });
};

export const doListWMSStatus = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LIST_WMS_STATUS_REQUEST,
    wmsStatusData: undefined,
  });
  fetch(`${serverConfig.url}/listWMSStatus/`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      dispatch({
        type: types.LIST_WMS_STATUS_SUCCESS,
        wmsStatusData: data,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_WMS_STATUS_FAILURE,
        wmsStatusData: undefined,
      });
    });
};

export const doDownloadInventoryReport = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.DOWNLOAD_INVENTORY_REPORT_REQUEST,
  });
  fetch(`${serverConfig.url}/downloadInventoryReport/`)
    .then(checkStatus)
    .then(parseJSON)
    .then(() => {
      dispatch({
        type: types.DOWNLOAD_INVENTORY_REPORT_SUCCESS,
      });
    })
    .catch(() => {
      dispatch({
        type: types.DOWNLOAD_INVENTORY_REPORT_FAILURE,
      });
    });
};

export const doAllItemsSelectData = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LIST_ALLITEMS_SELECT_REQUEST,
    detailData: [],
  });
  fetch(`${serverConfig.url}/items`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      _.map(data, (i) => {
        const newObj = {};
        newObj.ItemName = i.ItemName;
        newObj.ItemExternalID = i.ItemExternalID;
        newObj.ItemCount = i.ItemCount;
        newObj.Vendor = i.Vendor;
        newObj.DateCode = i.DateCode;
        newObj.Location = `${i.RackName} ${i.RackSide}-${i.RackLayer}-${i.RackBlock}`;
        newData.push(newObj);
      });
      dispatch({
        type: types.LIST_ALLITEMS_SELECT_SUCCESS,
        detailData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_ALLITEMS_SELECT_FAILURE,
        datailData: [],
      });
    });
};

export const doListInOutboundData = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LIST_INBOUND_REQUEST,
    listInOutboundData: [],
  });
  if (!passProps.formatOption && !passProps.queryTime) {
    dispatch({
      type: types.LIST_RACK_DETAIL_SUCCESS,
      listInOutboundData: [],
    });
    return;
  }

  fetch(`${serverConfig.url}/${passProps.boundTypeData}/q/?formatOption=${passProps.formatOption}&queryTime=${passProps.queryTime}`)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const newData = [];
      if (passProps.boundTypeData === 'inbound') {
        _.map(data, (i, j) => {
          const newObj = {};
          if (i.amountOfInvoice > 0) {
            newObj.name = `Q${j + 1}`;
            newObj.value = i.amountOfInvoice;
            newData.push(newObj);
          }
        });
      } else {
        _.map(data, (i, j) => {
          const newObj = {};
          if (i.amountOfMo > 0) {
            newObj.name = `Q${j + 1}`;
            newObj.value = i.amountOfMo;
            newData.push(newObj);
          }
        });
      }
      dispatch({
        type: types.LIST_INOUTBOUND_SUCCESS,
        listInOutboundData: data,
        listPiChartData: newData,
      });
    })
    .catch(() => {
      dispatch({
        type: types.LIST_INOUTBOUND_FAILURE,
        listInOutboundData: [],
      });
    });
};

export const listeningChangedOptions = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LISTENING_CHANGED_OPTIONS,
    changedOptions: passProps,
  });
};

export const searchBarOptions = (passProps) => (dispatch, getState) => {
  dispatch({
    type: types.LISTENING_CHANGED_OPTIONS,
    filterStr: passProps.filterStr,
    filterCurrectOption: passProps.filterCurrectOption,
    queryStr: passProps.queryStr,
  });
};
