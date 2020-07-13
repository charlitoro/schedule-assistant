import Moment from 'moment';
import {IActivity, IDays, IGroup, IPlanner, ISchedule} from "../utils/interfaces";
import { forEach, set, concat, get, compact } from 'lodash';

const diffHours = (start: string, end: string) => {
    const startHour = Moment(start, "HH:mm");
    const endHour = Moment(end, "HH:mm");

    return endHour.diff(startHour, 'hours');
}

export const splitItems = ( planner: IPlanner): IDays => {
    const itemsByHours: IDays = {};
    forEach(planner.activities, (activity: IActivity) => {
        forEach(activity.schedules, (schedule: ISchedule) => {
            const { start, end, day} = schedule;
            for ( let i = 0; i < diffHours(start, end); i++ ) {
                const hour = Moment(start, "HH:mm").add(i, "hour").format("kk:mm");
                set( itemsByHours, `${day}.${hour}`, compact( concat(get(itemsByHours, `${day}.${hour}`), activity)));
            }
        } )
    } )
    forEach(planner.groups, (group: IGroup) => {
        forEach(group.schedules, (schedule: ISchedule) => {
            const { start, end, day} = schedule;
            for ( let i = 0; i < diffHours(start, end); i++ ) {
                const hour = Moment(start, "HH:mm").add(i, "hour").format("kk:mm");
                set( itemsByHours, `${day}.${hour}`, compact( concat(get(itemsByHours, `${day}.${hour}`), group)));
            }
        })
    })
    return itemsByHours;
}

