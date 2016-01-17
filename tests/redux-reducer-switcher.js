import { buildSwitcher } from '../src/redux-reducer-switcher';

class TestingClass {
	constructor(hooks) {
		hooks.addHookBefore(function(container, ...args) {
			this.temp = 1234;
			return [ container || [] ].concat(args);
		});

		hooks.addHookAfter(function(container) {
			if (container.length == 3) container.push(this.temp);
			return container;
		});
	}

    switcher() {
        return {
			add: this.add
        };
    }

	add(container, arg) {
		container.push(arg + this.temp);
		return container;
	}

	default(container) {
		container = [];
	}
}


var container = ['default'];
var doAdd = buildSwitcher(TestingClass).resolve('add');

console.log(container);
doAdd(container, 'add');
doAdd(container, 'add2');
doAdd(container, 'add3');
console.log(container);
