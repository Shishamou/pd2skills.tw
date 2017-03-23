import SkillsHandler from '../facades/SkillsHandler';
import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

var initialState = {
  masterTrees: [],
  trees: [],
  tiers: [],
  skills: [],
  totalSpendPoints: 0,
  totalSpendCosts: 0,
  availablePoints: 0,
  display: null,
  activedTree: 0,
};

export default function handleSkill(state = initialState, action) {
  switch (action.type) {
    // 初始化
    case types.INITIALIZE_SUCCESS:
      return loadSkills(state, action);

    // 處理事件
    case types.HANDLE_SKILL_EVENT:
      return handleSkillEvent(state, action);

    // 切換技能樹
    case types.SWITCH_SKILL_TREE:
      SkillsHandler.refreshSkillTrees(action.id)
      return Object.assign({}, state, SkillsHandler.store, {
        activedTree: action.id
      });

    // 刷新技能樹
    case types.REFRESH_SKILLS:
      SkillsHandler.refreshSkillTrees();
      return Object.assign({}, state, SkillsHandler.store);

    // 重置技能樹
    case types.RESPEC_SKILL_TREE:
      SkillsHandler.respecSkillTrees(action.id);
      return Object.assign({}, state, SkillsHandler.store);

    // 更新惡名減免
    case types.HANDLE_INFAMY_EVENT:
    case types.REFRESH_INFAMYTREE:
      return handleSkillReduce(state, action);

    default:
      return state;
  }
}

/**
 * 載入技能
 */
function loadSkills(state = {}, action) {
  var response = action.response['skills-new'];

  if (typeof response === 'undefined') {
    return state;
  }

  SkillsHandler.initialSkillTrees(response);
  return Object.assign({}, state, SkillsHandler.store);
}

/**
 * 處理事件
 */
function handleSkillEvent(state = {}, action) {
  var skill = SkillsHandler.getSkill(action.id);

  switch (action.event) {
    case events.CLICK:
      SkillsHandler.handleSkillClick(skill.id);
      break;

    case events.REMOVE:
      SkillsHandler.handleSkillRemove(skill.id);
      break;

    case events.MOUSE_ENTER:
      var hover = true;
    case events.MOUSE_LEAVE:
      if (hover) {
        state.display = skill.id;
      }

      // 更新前置技能
      if (skill.requiredSkill) {
        var requiredSkill = SkillsHandler.getSkillByName(skill.requiredSkill, true);
        requiredSkill.alerted = (requiredSkill.ownedBasic || ( ! hover))
          ? false
          : hover;
      }

      SkillsHandler.refreshAllSkillsStatus(skill.treeId);
      break;

    default:
      return state;
  }

  return Object.assign({}, state, SkillsHandler.store);
}

/**
 * 處理技能減免
 */
function handleSkillReduce(state, action) {
  if ( ! action.skillReduce) return state;
  SkillsHandler.refreshInfamyBonus(action.skillReduce);

  return Object.assign({}, state, SkillsHandler.store, {
    trees: SkillsHandler.store.trees.slice(),
    tiers: SkillsHandler.store.tiers.slice(),
    skills: SkillsHandler.store.skills.slice(),
  });
}
