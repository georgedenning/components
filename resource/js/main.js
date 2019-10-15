import Views from './Views';
import Icons from './Icons';
import Filter from './Filter';

(new Views()).render().then(results => {
    window.Icons = new Icons();
    window.Filter = new Filter();
});
