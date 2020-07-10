import aConstants from './constants';
import oDomainViewer from './domain-viewer';
import oClientTransport from './client-transport';

let aConfig = aConstants.aConfig
  , aEvents = aConfig.events.request

  , userAddedToRequest = function (data) {
  oDomainViewer.updateUserState(data);
}

  , userCancelledRequest = function (data) {
  oDomainViewer.updateUserState(data);
}

  , bindEvents = function () {
  oClientTransport.bindEvent(aEvents.USER_ADDED_TO_REQUEST, userAddedToRequest);
  oClientTransport.bindEvent(aEvents.USER_CANCELLED_REQUEST, userCancelledRequest);
}

  , bindEmits = function () {
}
;

const ClientRequest = {
  init: function() {
    bindEvents();
    bindEmits();
  }
  , userStartRequest: function(data) {
    oClientTransport.sendEvent(aEvents.USER_START_REQUEST, data);
  }

  , userCancelRequest: function() {
    oClientTransport.sendEvent(aEvents.USER_CANCEL_REQUEST, {});
  }

};

export default ClientRequest;