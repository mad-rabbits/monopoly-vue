let aLogs = []
  , bLogToConsole = true
  , bLogToArray = false
;

const Logger = {
  add: function(text, data = {}) {
    if (bLogToArray) {
      if (!Object.values(data).length) {
        data = {};
      }
      aLogs.push({text:text, data:data});
    }
    if (bLogToConsole) {
      if (!Object.values(data).length) {
        console.log(text);
      } else {
        console.log(text, data);
      }
    }
  }
  , get: function () {
    return aLogs;
  }
  , setToArray: function (val) {
    bLogToArray = !!val;
  }
  , setToConsole: function (val) {
    bLogToConsole = !!val;
  }
};

export default Logger;