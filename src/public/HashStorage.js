import Storage from './Storage';

export default class HashStorage extends Storage {

	load(callable) {
		var hash = callable();
	}

	save(callable) {
		var hash = [];
		hash.push(this.getSkillsHash());
		hash.push(this.getPerksHash());
		callable(hash.join(':'));
	}

	// =========================================================================
	// = Skill
	// =========================================================================

	getSkillsHash() {
		return 'metgh'.split('').map((name) => {
			return this.skillStorageToHash(this.get(name));
		}, this).join(':');
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
		return this.perksStorageToHash(this.get('perks'));
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
		return hash.match(/(\w\d)/g).reduce((storage, part) => {
			char = part.charCodeAt(0);
			if (char >= 65) {
				if (char >= 97) {
					var index = char - 97;
					equipped = index;
				} else {
					var index = char - 65;
				}
				storage[index] = part.substr(-1);
			}
		}, []);
	}
}
