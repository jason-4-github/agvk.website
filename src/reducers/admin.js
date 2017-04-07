import {
  SIDE_MENU_OPEN,
  SIDE_MENU_CLOSE,
  LIST_RACK_LOCATION_REQUEST,
  LIST_RACK_LOCATION_SUCCESS,
  LIST_RACK_LOCATION_FAILURE,
  LIST_RACK_DETAIL_REQUEST,
  LIST_RACK_DETAIL_SUCCESS,
  LIST_RACK_DETAIL_FAILURE,
  SHOW_RACK_LOCATION_REQUEST,
  SHOW_RACK_LOCATION_SUCCESS,
  SHOW_RACK_LOCATION_FAILURE,
  HIGHLIGHT_LOCATIONS,
  LIST_WMS_STATUS_REQUEST,
  LIST_WMS_STATUS_SUCCESS,
  LIST_WMS_STATUS_FAILURE,
  LIST_ALLITEMS_REQUEST,
  LIST_ALLITEMS_SUCCESS,
  LIST_ALLITEMS_FAILURE,
  TRANSFER_ITEM_DETAILDATA,
  DOWNLOAD_INVENTORY_REPORT_REQUEST,
  DOWNLOAD_INVENTORY_REPORT_SUCCESS,
  DOWNLOAD_INVENTORY_REPORT_FAILURE,
  LIST_ALLITEMS_SELECT_REQUEST,
  LIST_ALLITEMS_SELECT_SUCCESS,
  LIST_ALLITEMS_SELECT_FAILURE,
  LIST_INBOUND_REQUEST,
  LIST_INOUTBOUND_SUCCESS,
  LIST_INOUTBOUND_FAILURE,
  LISTENING_CHANGED_OPTIONS,
} from '../constants/ActionTypes';

const initialState = {
  isSideMenuOpen: false,
};

const admin = (state = initialState, action) => {
  switch (action.type) {
    case SIDE_MENU_OPEN:
    case SIDE_MENU_CLOSE:
      return {
        ...state,
        ...action,
      };
    case LIST_RACK_LOCATION_REQUEST:
    case LIST_RACK_LOCATION_SUCCESS:
    case LIST_RACK_LOCATION_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_RACK_DETAIL_REQUEST:
    case LIST_RACK_DETAIL_SUCCESS:
    case LIST_RACK_DETAIL_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_ALLITEMS_REQUEST:
    case LIST_ALLITEMS_SUCCESS:
    case LIST_ALLITEMS_FAILURE:
      return {
        ...state,
        ...action,
      };
    case TRANSFER_ITEM_DETAILDATA:
      return {
        ...state,
        ...action,
      };
    case SHOW_RACK_LOCATION_REQUEST:
    case SHOW_RACK_LOCATION_SUCCESS:
    case SHOW_RACK_LOCATION_FAILURE:
      return {
        ...state,
        ...action,
      };
    case HIGHLIGHT_LOCATIONS:
      return {
        ...state,
        ...action,
      };
    case LIST_WMS_STATUS_REQUEST:
    case LIST_WMS_STATUS_SUCCESS:
    case LIST_WMS_STATUS_FAILURE:
      return {
        ...state,
        ...action,
      };
    case DOWNLOAD_INVENTORY_REPORT_REQUEST:
    case DOWNLOAD_INVENTORY_REPORT_SUCCESS:
    case DOWNLOAD_INVENTORY_REPORT_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_ALLITEMS_SELECT_REQUEST:
    case LIST_ALLITEMS_SELECT_SUCCESS:
    case LIST_ALLITEMS_SELECT_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LIST_INBOUND_REQUEST:
    case LIST_INOUTBOUND_SUCCESS:
    case LIST_INOUTBOUND_FAILURE:
      return {
        ...state,
        ...action,
      };
    case LISTENING_CHANGED_OPTIONS:
      return {
        ...state,
        ...action,
      };
    default:
      return {
        ...state,
        highlightLocations: [],
        focusHighLightLocation: '',
        showRacksLocationInMapData: undefined,
      };
  }
};

export default admin;
