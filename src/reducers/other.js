import * as types from '../constants/SkillAppActions';
import IconDrawer from '../facades/IconDrawer';
import ImageSpriteDrawer from '../public/ImageSpriteDrawer';

var initialState = {};

export default function other(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_ICON:
            if (action.status == 'success') {
                action.response.forEach((icon) => {
                    IconDrawer.registerSprite(
                    	new ImageSpriteDrawer(icon.src, icon.options),
                    	icon.names,
                        icon.prefix
                    );
                })
            }
        default:
            return state;
    }
}
