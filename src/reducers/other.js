import * as types from '../constants/SkillAppActions';
import IconDrawer from '../facades/IconDrawer';
import ImageSpriteDrawer from '../services/ImageSpriteDrawer';

var initialState = {};

export default function other(state = initialState, action) {
  switch (action.type) {
    case types.INITIALIZE_SUCCESS:
      loadIcon(action);

    default:
      return state;
  }
}

/**
 * 載入 icon
 */
function loadIcon(action) {
  var datas = action.response.icon;

  if (typeof datas === 'undefined') {
    return state;
  }

  datas.forEach((icon) => {
    IconDrawer.registerSprite(
      new ImageSpriteDrawer(icon.src, icon.options),
      icon.names,
      icon.prefix
    );
  })
}
