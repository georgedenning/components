import Views from './Views';
import Icons from './Icons';
import Filter from './Filter';
import LimitList from './LimitList';

(new Views()).render().then(results => {
    window.Icons = new Icons();
    window.Filter = new Filter();
    window.LimitList = new LimitList();

    require('./section/fields');
    require('./section/toasts');
    require('./section/dialogs');

    require('./startup');
});
