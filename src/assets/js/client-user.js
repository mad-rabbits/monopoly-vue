import aConstants from './constants';
import oClientTransport from './client-transport'
import oDomainViewer from './domain-viewer'
import oLogs from './utils/logger'

let aConfig = aConstants.aConfig
  , aEvents = aConstants.aConfig.events.user
  , aUserInfo = {} //= {}
  // , meta = {}
  ,
  getAuthData  = function () {
    let aAuthData = {
      jwtToken : aUserInfo.jwtToken
    }

    return aAuthData;
  }
  , doubleConnection = function () { //data
    oClientTransport.disconnect();
    alert('You were connected from another point');
  }
  , authOK = function (data) {
    oLogs.add('authOK', data);
    oDomainViewer.updateUserState(data);
    // oLogs.add(this.name, data);
  }
  , processStatus = function (data) {
    oDomainViewer.updateUserState(data);
//      oLogs.add('processStatus', data);
  }
//Server sends it to client if Connect and reconnect happen
  , getAuth = function () {
    oClientTransport.sendEvent(aEvents.USER_SEND_AUTH_DATA, getAuthData());
  }
  , bindEvents = function () {
    oClientTransport.bindEvent(aEvents.USER_DOUBLE_CONNECTION, doubleConnection);
    oClientTransport.bindEvent(aEvents.AUTH_ON_SERVER_OK, authOK);
    oClientTransport.bindEvent(aEvents.USER_GOT_NEW_STATUS, processStatus);
    oClientTransport.bindEvent(aEvents.SERVER_REQUEST_USER_AUTH_DATA, getAuth);
  }
  , bindEmits = function () {
  }
;

const ClientUser = {
  init: function (userInfo) {
    aUserInfo = userInfo;
    bindEvents();
    bindEmits();
  }
  , getSessionId: function () {

    return oClientTransport.getId();
  }
  , getUserId: function () {

    return aUserInfo.userId;
  }
  , auth: function () {
    getAuth();
  }
};

export default ClientUser;