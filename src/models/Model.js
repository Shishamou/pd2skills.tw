/**
 * Data Object
 */

export default class Model {
  constructor(props = {}) {
    if (typeof this.getInitial === "function") {
      Object.assign(this, this.getInitial());
    }

    Object.defineProperty(this, "set", {
      value: (props) => (Object.assign(this, props)),
      writable: false,
      enumerable: false,
      configurable: false
    });

    Object.preventExtensions(this);
    this.set(props);
  }

  getInitial() {
    return {};
  }
}
