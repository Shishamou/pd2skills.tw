import Model from './Model';

export default class Tier extends Model {
  getInitial() {
    return {
      id                       : null,
      tier                     : null,
      treeId                   : null,
      skills                   : [],
      tierUnlockRequire        : 0,
      tierUnlockRequireReduced : 0,
      skillPointBasic          : 0,
      skillPointAce            : 0,
      skillCostBasic           : 0,
      skillCostAce             : 0,
      currectUnlockRequire     : 0,
      currectUnlockNeeded      : 0,
      unlocked                 : false
    }
  }
}
