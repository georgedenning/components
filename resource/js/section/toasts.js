import $ from 'jquery';
import Toast from './../Toast';

$('.section-toasts .toast').off('click').on('click', () => {
    let $item = $(event.target);

    if (! $item.hasClass('toast')) {
        $item = $item.closest('.toast');
    }

    new Toast({
        title: 'Notification ' + $item.attr('data-intent'),
        text: 'You can click this box to hide the current notification',
        style: $item.attr('data-intent')
    }, $item);
});
