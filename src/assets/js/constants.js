import aConfig from '../../../../monopoly-fe/public/assets/js/app-client.config.json';

const aBlankUser = {
  jwtToken:""
  , userId:""
  , nickname:"Log in"
  , status:""
  , statusId:""
  , avatar:"https://static.thenounproject.com/png/12565-200.png"
  , game : ''
  , chats : {
    global : {
      messages : []
    }
  }
  , socketConnected: false
  , aClickedTile: ''
}
export default Object.freeze({
  aBlankUser: aBlankUser
  , aConfig: aConfig
});