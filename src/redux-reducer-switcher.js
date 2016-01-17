
export function buildReducer(scaffolding, initialState = {}) {
    const switcher = buildSwitcher(scaffolding).setDefault((state) => state);
    return (state, action) => {
        state = (typeof state === 'undefined')
            ? initialState
            : Object.assign({},  state);
        return switcher.resolve(action.type)(state, action);
    }
}

export function buildSwitcher(scaffolding) {
    // =========================================================================
    // = Initial hooks
    // =========================================================================

    var hookBefore = [];
    var hookAfter = [];

    const addHookBefore = (callable) => {
        if (isCallable(callable)) hookBefore.push(callable);
        return this;
    };

    const addHookAfter = (callable) => {
        if (isCallable(callable)) hookAfter.push(callable);
        return this;
    };

    // =========================================================================
    // = Build switcher
    // =========================================================================

    const instance = new scaffolding({ addHookBefore, addHookAfter });
    const cases = ((instance) => {
        if ( ! isCallable(instance.switcher))
            throw "Method switcher not defined.";
        var cases = instance.switcher();

        if ( ! (cases instanceof Object))
            throw "Method switcher must return an object.";
        return cases;
    })(instance);

    // =========================================================================
    // = Return
    // =========================================================================
    var defaultCommand = () => {};
    function setDefault(callable) {
        if (isCallable(callable)) defaultCommand = callable;
        return this;
    }

    function resolve(flag) {
        const command = (cases[flag] || defaultCommand);
        return (...args) => {
            return Array()
                .concat(hookBefore, command, hookAfter)
                .reduce((previous, currectHandler, index) => {
                    previous = previous || [];
                    previous = ( ! (previous instanceof Array))? [previous] : previous;
                    try {
                        return currectHandler.bind(instance)(...previous);
                    } catch (error) {
                        console.log({error, previous, currectHandler, index});
                    }
                }, args)
        }
    }

    setDefault(instance.default);
    return {
        resolve,
        setDefault
    }

    // =========================================================================
    // = Functions
    // =========================================================================

    function isCallable(callable) {
        return (typeof callable === 'function');
    }
}
