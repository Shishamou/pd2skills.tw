
export default class Storage {
	constructor() {
		this.clear();
	}

	set(name, value) {
		return this.container[name] = value;
	}

	get(name) {
		return this.container[name];
	}

	isset(name) {
		return (typeof this.container[name] !== 'undefined');
	}

	unset(name) {
		return delete this.container[name];
	}

	clear() {
		this.container = {};
	}
}
