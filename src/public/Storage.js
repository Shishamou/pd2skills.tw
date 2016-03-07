
export default class Storage {
	constructor() {
		this.storage = {};
	}

	// =========================================================================
	// = Skill
	// =========================================================================

	loadSkills(store) {

	}

	saveSkills(store) {
		const { trees, tiers, skills } = store;

		trees.forEach((tree) => {
			var treeStorage = tree.tiers.forEach((tier) => {
				tier = tiers[tier];
				return tier.skills.map((skill) => {
					skill = skills[skill];
					if (skill.ownedAce)
						return 2;
					if (skill.ownedBasic)
						return 1;
					return 0;
				})
			});
		});
	}
}
