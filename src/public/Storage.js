
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

	// =========================================================================
	// = Skill
	// =========================================================================

	/**
	 * 自storage載入技能狀態
	 */
	loadSkills(state) {
		const { trees } = state;

		var storage = this.get('skills') || [];
		trees.forEach((tree, index) => {
			this.storageToTree(storage[index], tree, state);
		}, this);
	}

	/**
	 * 自storage載入技能狀態
	 */
	storageToTree(storage, tree, state) {
		if ( ! storage) return;
		storage = storage.concat();

		const { tiers, skills } = state;
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

	/**
	 * 儲存技能狀態至storage
	 */
	saveSkills(state) {
		const { trees } = state;

		var storage = trees.map((tree) => this.treeToStrage(tree, state));
		this.set('skills', storage);
	}

	treeToStrage(tree, state) {
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

		return storage;
	}

	// =========================================================================
	// = Perks
	// =========================================================================

	loadPerks(state) {
		var storage = this.get('perks');
		if ( ! storage) return;
		storage = storage.concat();

		const { perks } = state;
		var equipped = storage.shift();
		perks.forEach((perk, index) => {
			perk.tier = storage[index];
			(equipped == index) && (perk.equipped = true);
		}, this);
	}

	savePerks(state) {
		const { perks } = state;

		var storage = [];
		var equipped = null;
		perks.forEach((perk, index) => {
			storage.push(perk.tier || 0);
			perk.equipped && (equipped = index);
		}, this);

		storage.unshift(equipped);
		this.set('perks', storage);
	}

	// =========================================================================
	// = Infamy
	// =========================================================================

	loadInfamy(state) {
		var storage = this.get('infamy');
		if ( ! storage) return;

		const { infamyList } = state;
		infamyList.forEach((infamy, index) => {
			infamy.owned = (storage[index]);
		});
	}

	saveInfamy(state) {
		const { infamyList } = state;

		var storage = infamyList.map((infamy, index) => (infamy.owned)? 1 : 0);
		this.set('infamy', storage);
	}
}
