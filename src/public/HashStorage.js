import Storage from './Storage';

export default class HashStorage extends Storage {

	load(callable) {
		var hash = callable();
		var parts = hash.split(':');
		if (parts.length >= 7) {
			this.setSkillsHash(parts.splice(0, 5));
			this.setPerksHash(parts.shift());
			this.setInfamyHash(parts.shift());
		}
	}

	save(callable) {
		var hash = [];
		hash.push(this.getSkillsHash().join(':'));
		hash.push(this.getPerksHash());
		hash.push(this.getInfamyHash());
		callable(hash.join(':'));
	}

	// =========================================================================
	// = Skill
	// =========================================================================

	getSkillsHash() {
		return 'metgh'.split('').map((name) => {
			return this.skillStorageToHash(this.get(name) || []);
		}, this);
	}

	setSkillsHash(parts) {
		'metgh'.split('').forEach((name) => {
			return this.set(name, this.hashToSkillStorage(parts.shift()));
		}, this);
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
		return hash.split('').reduce((storage, char, index) => {
			storage.push(
				(function(char, index) {
					char = char.charCodeAt(0);
					if (char == index + 65)
						return 2;
					if (char == index + 97)
						return 1;
					return 0;
				})(char, index)
			);
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
