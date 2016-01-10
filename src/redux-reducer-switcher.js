
export function buildReducer(switchClass, initialState = {}) {
    const switcher = buildSwitcher(switchClass).setDefault((state) => state);

    return (state, action) => {
        state = (typeof state === 'undefined')
            ? initialState
            : Object.assign({},  state);
        return switcher.resolve(action.type)(state, action);
    }
}

export function buildSwitcher(switchClass) {
    const instance = new switchClass();
    if (typeof instance.switcher !== 'function')
        throw "Method switcher not defined.";

    const cases = instance.switcher();
    if ( ! (cases instanceof Object))
        throw "Method switches must return an object.";

    var resolveDefault = () => {};

    function resolve(flag) {
        return (cases[flag] || resolveDefault).bind(instance);
    }

    function setDefault(callable) {
        if (typeof callable !== "funciton") {
            resolveDefault = callable;
        }

        return this;
    }

    setDefault(instance.default);

    return {
        resolve,
        setDefault
    }
}
