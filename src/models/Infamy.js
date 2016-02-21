import Model from './Model';
import * as statuses from '../constants/InfamyStatuses';

export default class Infamy extends Model {
    getInitial() {
        return {
            id       : null,
            name     : null,
            icon     : null,
            unlocked : false,
            owned    : false,
            disable  : false,
            status   : statuses.STATUS_LOCKED,
            reduce   : [],
            datas    : {}
        }
    }
}
