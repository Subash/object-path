function isPlainObject(object: unknown): object is Record<string, unknown> {
  return (
    object !== null &&
    typeof object === "object" &&
    object.constructor === Object
  );
}

function isObjectEmpty(object: Record<string, unknown>): boolean {
  return Object.keys(object).length === 0;
}

function splitKeys(keyPath: string): string[] {
  return keyPath.split(".");
}

function joinKeys(keys: string[]): string {
  return keys.join(".");
}

export function set(
  object: Record<string, unknown>,
  keyPath: string,
  value: unknown
): void {
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

export function unset(object: Record<string, unknown>, keyPath: string): void {
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

export function get(object: Record<string, unknown>, keyPath: string): unknown {
  const [key, ...innerKeys] = splitKeys(keyPath);
  if (innerKeys.length) {
    const innerObject = object[key];
    if (!isPlainObject(innerObject)) return;
    return get(innerObject, joinKeys(innerKeys));
  } else {
    return object[key];
  }
}
