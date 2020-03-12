import Views from './Views';
import Icons from './Icons';
import Filter from './Filter';
import LimitList from './LimitList';
import Clipboard from './Clipboard';

(new Views()).render().then(results => {
    require('./startup');

    window.Icons = new Icons();
    window.Filter = new Filter();
    window.LimitList = new LimitList();
    window.Clipboard = new Clipboard();

    require('./section/fields');
    require('./section/toasts');
    require('./section/dialogs');
});
