import Model from './Model';

export default class MasterTree extends Model {
  getInitial() {
    return {
      id          : null,
      name        : null,
      subtrees    : [],
      spendPoints : 0,
      spendCosts  : 0
    }
  }
}
