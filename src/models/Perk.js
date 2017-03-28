import Model from './Model';

export default class Perk extends Model {
  getInitial() {
    return {
      id       : null,
      name     : null,
      equipped : false,
      tier     : 0,
      decks    : []
    }
  }
}
