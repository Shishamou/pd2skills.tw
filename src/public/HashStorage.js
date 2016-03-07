import Storage from './Storage';

export default class HashStorage extends Storage {

	// =========================================================================
	// = Skill
	// =========================================================================

	loadSkills(state) {
		const { trees } = state;

		trees.forEach((tree) => {
			this.loadTree(tree, state);
		}, this);
	}

	saveSkills(state) {
		const { trees } = state;

		trees.forEach((tree) => {
			this.saveTree(tree, state);
		}, this);
	}

	getSkillsHash() {
		return 'metgh'.split('').map((name) => {
			return this.skillStorageToHash(this.get(name));
		}, this).join(':');
	}

	loadTree(tree, state) {
		const { tiers, skills } = state;
		var storage = this.get(tree.name.charAt(0).toLowerCase());

		tree.tiers.forEach((tier) => {
			tier = tiers[tier];

			tier.skills.forEach((skill) => {
				skill = skills[skill];

				switch (storage.shift()) {
					case 2:
						skill.ownedAce = true;
					case 1:
						skill.ownedBasic = true;
				}
			});
		});
	}

	saveTree(tree, state) {
		const { tiers, skills } = state;

		var storage = [];
		tree.tiers.forEach((tier) => {
			tier = tiers[tier];

			tier.skills.forEach((skill) => {
				skill = skills[skill];

				storage.push(
					(skill => {
						if (skill.ownedAce)
							return 2;
						if (skill.ownedBasic)
							return 1;
						return 0;
					})(skill)
				);
			});
		});

		this.set(tree.name.charAt(0).toLowerCase(), storage);
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
					if (char == index + 97 - 32)
						return 2;
					if (char == index + 97)
						return 1;
					return 0;
				})(char, index)
			);
			return storage;
		}, []);
	}
}
