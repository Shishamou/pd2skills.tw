import Storage from './Storage';

export default class HashStorage extends Storage {

	load(callable) {
		var hash = callable();
		var parts = hash.split(':');
		if (parts.length >= 3) {
			this.setPerksHash(parts.pop());
			this.setInfamyHash(parts.pop());
			this.setSkillsHash(parts.splice(0, parts.length));
		}
	}

	save(callable) {
		var hash = [];
		hash.push(this.getSkillsHash());
		hash.push(this.getPerksHash());
		hash.push(this.getInfamyHash());
		callable(hash.join(':'));
	}

	// =========================================================================
	// = Skill
	// =========================================================================

	getSkillsHash() {
		var storage = this.get('skills') || [];
		var parts = storage.reduce((parts, storage, index) => {
			var part = this.skillStorageToHash(storage);
			if (part) {
				part = String.fromCharCode(index + 97) + part;
				parts.push(part);
			}

			return parts;
		}, [])

		return parts.join(':');
	}

	setSkillsHash(parts) {
		var storage = parts.reduce((storage, part) => {
			var index = part.charCodeAt(0) - 97;
			storage[index] = this.hashToSkillStorage(part.substr(1));

			return storage;
		}, []);

		storage = Array.from({length: storage.length}, (v, k) => storage[k] || []);
		this.set('skills', storage);
	}

	skillStorageToHash(storage) {
		return storage.reduce((hash, single, index) => {
			switch (single) {
				case 2:
					return hash += String.fromCharCode(index + 97 - 32);
				case 1:
					return hash += String.fromCharCode(index + 97);
				default:
					return hash;
			}
		}, '');
	}

	hashToSkillStorage(hash) {
		var storage = [];

		return hash.split('').reduce((storage, char, index) => {
			var code = char.charCodeAt(0);

			var lower = code - 97;
			var upper = code - 65;

			if (0 <= lower && lower < 26) {
				storage[lower] = 1;
			} else if (0 <= upper && upper < 26) {
				storage[upper] = 2;
			}

			return storage;
		}, []);
	}

	// =========================================================================
	// = Perks
	// =========================================================================

	getPerksHash() {
		return this.perksStorageToHash((this.get('perks') || []).concat());
	}

	setPerksHash(hash) {
		return this.set('perks', this.hashToPerksStorage(hash));
	}

	perksStorageToHash(storage) {
		var equipped = storage.shift();
		return storage.reduce((hash, tier, index) => {
			if (tier > 0) {
				var code = (equipped === index)? 65 : 97;
				hash += String.fromCharCode(index + code) + tier;
			}
			return hash;
		}, '');
	}

	hashToPerksStorage(hash) {
		var equipped = null;
		var parts = hash.match(/(\w\d)/g);
		if ( ! parts)
			return [null];

		var storage = parts.reduce((storage, part) => {
			var char = part.charCodeAt(0);
			if (char >= 65) {
				if (char >= 97) {
					var index = char - 97;
				} else {
					var index = char - 65;
					equipped = index;
				}
				storage[index] = parseInt(part.substr(-1));
			}
			return storage;
		}, []);


		storage = Array.from({length: storage.length}, (v, k) => storage[k] || 0);
		storage.unshift(equipped);
		return storage;
	}

	// =========================================================================
	// = Infamy
	// =========================================================================

	getInfamyHash() {
		return this.infamyStorageToHash(this.get('infamy') || []);
	}

	setInfamyHash(hash) {
		return this.set('infamy', this.hashToInfamyStorage(hash));
	}

	infamyStorageToHash(storage) {
		return storage.reduce((hash, infamy, index) => {
			if (infamy > 0) {
				hash += String.fromCharCode(index + 97);
			}
			return hash;
		}, '');
	}

	hashToInfamyStorage(hash) {
		return hash.split('').reduce((storage, part) => {
			var char = part.charCodeAt(0);
			if (char >= 65) {
				if (char >= 97) {
					var index = char - 97;
				} else {
					var index = char - 65;
				}
				storage[index] = 1;
			}
			return storage;
		}, []);
	}
}
