import $ from 'jquery';
import Dialog from '../components/Dialog';

$('.section-dialogs .open-dialog').off('click').on('click', () => {
    new Dialog({
        title: 'Dialog',
    });
});
