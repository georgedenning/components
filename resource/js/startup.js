
import $ from 'jquery';
import Pre from './components/Pre';

$('pre').each((index, element) => {
    new Pre(element);
});
