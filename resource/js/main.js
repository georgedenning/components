import $ from 'jquery';
import Views from './Views';
import Icons from './Icons';

$(() => {
    window.Views = new Views();
    window.Icons = new Icons();
});
