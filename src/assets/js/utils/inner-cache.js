var oInnerCache = {
  storage : {}
};

oInnerCache.set = function (sKey, data) {
  oInnerCache.storage[sKey] = data;
};

oInnerCache.get = function (sKey) {
  let result = null;
  if (sKey in oInnerCache.storage) {
    result = oInnerCache.storage[sKey];
  }

  return result;
};

export default oInnerCache;