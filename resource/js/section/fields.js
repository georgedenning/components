import $ from 'jquery';
import Field from '../components/Field';

$('.field').each((index, element) => {
    new Field(element);
});
