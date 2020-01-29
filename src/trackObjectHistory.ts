export function trackObjectHistory<T extends object>(arg: T): [T, T[]] {
  if (typeof arg !== "object") {
    throw new Error("Tracked value must be an object");
  }

  if (arg === null || arg === undefined) {
    throw new Error("Tracked value cannot be null or undefined");
  }

  const history: T[] = [];

  function addToHistory(obj: T) {
    history.push({ ...obj });
  }

  const trackedObject = new Proxy(arg, {
    set(obj, prop, value) {
      addToHistory(obj);
      return Reflect.set(obj, prop, value);
    },
    defineProperty(obj, prop, desc) {
      addToHistory(obj);
      return Reflect.defineProperty(obj, prop, desc);
    },
    deleteProperty(obj, prop) {
      addToHistory(obj);
      return Reflect.deleteProperty(obj, prop);
    }
  });

  return [trackedObject, history];
}
