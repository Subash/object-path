export type PlainObject = {
  [key: string]: Value;
};

export type PlainValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | PlainObject;

export type Value = PlainValue | PlainValue[];

function isObjectEmpty(object: PlainObject): boolean {
  return Object.keys(object).length === 0;
}

function isPlainObject(object: unknown): object is PlainObject {
  return (
    object !== null &&
    typeof object === "object" &&
    object.constructor === Object
  );
}

function splitKeys(keyPath: string): string[] {
  return keyPath.split(".");
}

function joinKeys(keys: string[]): string {
  return keys.join(".");
}

function set(object: PlainObject, keyPath: string, value: Value): void {
  const [key, ...innerKeys] = splitKeys(keyPath);
  if (innerKeys.length) {
    const innerObject = object[key] ?? {};
    if (!isPlainObject(innerObject)) return;
    set(innerObject, joinKeys(innerKeys), value);
    object[key] = innerObject;
  } else {
    object[key] = value;
  }
}

function unset(object: PlainObject, keyPath: string): void {
  const [key, ...innerKeys] = splitKeys(keyPath);
  if (innerKeys.length) {
    const innerObject = object[key];
    if (!isPlainObject(innerObject)) return;
    unset(innerObject, joinKeys(innerKeys));
    if (isObjectEmpty(innerObject)) delete object[key]; // delete object if it has no children
  } else {
    delete object[key];
  }
}

function get(object: PlainObject, keyPath: string): Value {
  const [key, ...innerKeys] = splitKeys(keyPath);
  if (innerKeys.length) {
    const innerObject = object[key];
    if (!isPlainObject(innerObject)) return;
    return get(innerObject, joinKeys(innerKeys));
  } else {
    return object[key];
  }
}

export { set, unset, get };
