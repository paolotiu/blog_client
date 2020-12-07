import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addLocale(en);
// Create formatter (English).
const timeAgo = new TimeAgo('en-US');

export const formatDate = (time: string) => {
    return timeAgo.format(new Date(time));
};
