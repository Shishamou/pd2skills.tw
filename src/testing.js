import Localisation from './public/Localisation';

var local = new Localisation;

local.loadLang('local.json');
local.setLocale('tc');

setTimeout((e) => {
    var mm = local.localize('menu_mastermind');
    console.log('mm');
    console.log(mm);
}, 1000);
