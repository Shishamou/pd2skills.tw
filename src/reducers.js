import { combineReducers } from 'redux';

import other from './reducers/other';
import handleLangs from './reducers/handleLangs';
import handleSkills from './reducers/handleSkills';
import handlePerks from './reducers/handlePerks';
import handleInfamyTree from './reducers/handleInfamyTree';
import handleDisplay from './reducers/handleDisplay';

export default combineReducers({
    other: other,
    display: handleDisplay,
    langs: handleLangs,
    infamy: handleInfamyTree,
    skills: handleSkills,
    perks: handlePerks
});
