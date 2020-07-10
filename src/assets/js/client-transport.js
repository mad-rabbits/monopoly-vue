import oDomainViewer from './domain-viewer'
import oLogs from './utils/logger'
import aConstants from './constants';

let aConfig = aConstants.aConfig
  , oServer = aConfig.socketServer
  , sServerUrl = oServer.url + ':' + oServer.port
  , socket
;

const ClientTransport = {

  init : function() {
    socket = window.io(sServerUrl, {
      autoConnect: false,
      reconnection: oServer.reconnection,
      reconnectionDelay: oServer.reconnectionDelay,
      reconnectionAttempts: oServer.reconnectionAttempts
    });

    socket.on('connect', () => {
      oDomainViewer.updateUserState({socketConnected: true});
    });
    socket.on('disconnect', () => {
      oDomainViewer.updateUserState({socketConnected: false});
    });
  }
  , bindEvent : function (eventName, callBack) {
    socket.on(eventName, function(data){
      oLogs.add('event received '+eventName, data);
      callBack(data);
    });
  }
  , sendEvent : function (eventName, data) {
    oLogs.add('event sent '+eventName, data);
    socket.emit(eventName, data);
  }
  , getId : function () {

    return socket.id;
  }
  , disconnect : function () {
    oLogs.add('Disconnect');

    return socket.close();
  }
  , connect : function () {
    oLogs.add('Connect to ' + sServerUrl);

    return socket.connect();
  }
};

export default ClientTransport;