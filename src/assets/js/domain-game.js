import oClientTransport from './client-transport';
import oDomainViewer from './domain-viewer';
import aConstants from './constants';

let aConfig = aConstants.aConfig
  , aEvents = aConfig.events.game
  , aRoom = {
    lastUpdated : 0
  }
  , gameData = function (data) {
    oDomainViewer.resetLog();
    oDomainViewer.setUserState(data);
  }

  , turnData = function (data) {
    oDomainViewer.updateUserState(data);
  }

  , showAlert = function (data) {
    alert(data.message);
  }
  , bindEvents = function () {
    oClientTransport.bindEvent(aEvents.GET_GAME_DATA, gameData);
    oClientTransport.bindEvent(aEvents.TURN_DATA, turnData);
    oClientTransport.bindEvent(aEvents.PLAYER_CAN_NOT_DO_THAT, showAlert);
  }
  , bindEmits = function () {
  }
;

const DomainGame = {

  init : function() {
    bindEvents();
    bindEmits();
    oClientTransport.sendEvent(aEvents.GET_GAME_DATA, {
      lastUpdated : aRoom.lastUpdated
    });
  }
  // , throwDices : function() {
  //   oClientTransport.sendEvent(aEvents.THROW_DICES, {
  //     lastUpdated : aRoom.lastUpdated
  //   });
  // }
  // , teleportToTileById : function(tileId) {
  //   oClientTransport.sendEvent(aEvents.TELEPORT_TO_TILE_BY_ID, {
  //     tileId : tileId
  //   });
  // }
  // , ignoreTeleport : function() {
  //   oClientTransport.sendEvent(aEvents.IGNORE_TELEPORT, {});
  // }
  // , tryToLeaveJail : function(action) {
  //   oClientTransport.sendEvent(action, {});
  // }
  , playerSendMessage : function(data) {
    oClientTransport.sendEvent(aEvents.PLAYER_SEND_MESSAGE, data);
  }
  , clickUiAction : function(action, data) {
    oClientTransport.sendEvent(action, data);
  }
};

export default DomainGame;