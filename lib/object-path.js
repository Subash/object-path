function isEmpty(object) {
  return Object.keys(object).length === 0;
}

function isObject(object) {
  return object !== null && typeof object === 'object';
}

function splitKeys(keyPath) {
  return keyPath.split('.');
}

function joinKeys(keys) {
  return keys.join('.');
}

function validateArgs(object, keyPath) {
  if(!isObject(object)) throw new Error('`object` required`');
  if(!keyPath || typeof keyPath !== 'string') throw new Error('`keyPath` is required');
}

function set(object, keyPath, value) {
  validateArgs(object, keyPath);
  const [key, ...innerKeys ]= splitKeys(keyPath);
  if(innerKeys.length) {
    const innerObject = object[key] || {};
    if(!isObject(innerObject)) return;
    set(innerObject, joinKeys(innerKeys), value);
    object[key] = innerObject;
  } else {
    object[key] = value;
  }
  return object;
}

function get(object, keyPath) {
  validateArgs(object, keyPath);
  const [key, ...innerKeys] = splitKeys(keyPath);
  if(innerKeys.length) {
    const innerObject = object[key];
    if(!isObject(innerObject)) return;
    return get(innerObject, joinKeys(innerKeys));
  } else {
    return object[key];
  }
}

function unset(object, keyPath) {
  validateArgs(object, keyPath);
  const [ key, ...innerKeys ] = splitKeys(keyPath);
  if(innerKeys.length) {
    const innerObject = object[key];
    if(!isObject(innerObject)) return;
    unset(innerObject, joinKeys(innerKeys));
    //If an object becomes empty after deleting a child key, delete that object as well
    if(isEmpty(innerObject)) delete object[key];
  } else {
    delete object[key];
  }
}

module.exports = { set, unset, get };
