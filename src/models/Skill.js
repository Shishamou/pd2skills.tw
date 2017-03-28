import Model from './Model';
import * as statuses from '../constants/SkillStatuses';

export default class Skill extends Model {
  getInitial() {
    return {
      id               : null,
      treeId           : null,
      tierId           : null,
      requiredSkill    : null,
      name             : null,
      icon             : 'unknown',
      ownedBasic       : false,
      ownedAce         : false,
      unlockedBasic    : false,
      unlockedAce      : false,
      tierUnlocked     : false,
      requiredUnlocked : false,
      alerted          : false,
      status           : statuses.STATUS_LOCKED,
      datas            : {}
    }
  }
}
