import aConstants from './constants';
import oClientTransport from './client-transport';
import oDomainViewer from './domain-viewer';
import oClientUser from './client-user';

let aConfig = aConstants.aConfig
  , aEvents = aConfig.events.chat
  , globalChat = function (data) {
console.log(data);
    data.myMsg = 0;
    if (data.sessionId == oClientUser.getSessionId()) {
      data.myMsg = 1;
    }
    oDomainViewer.showMessage(data);
  }

  , bindEvents = function () {
    oClientTransport.bindEvent(aEvents.GLOBAL_CHAT_MESSAGE, globalChat);
  }

  , bindEmits = function () {
  }
;

const ClientChat = {

  init: function() {
    bindEvents();
    bindEmits();
  }
  , sendGlobalMessage: function(text) {
    oClientTransport.sendEvent(aEvents.GLOBAL_CHAT_SEND, {text: text});
  }

};

export default ClientChat;