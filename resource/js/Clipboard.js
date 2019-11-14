import $ from 'jquery';
import Toast from './Toast';

export default class Clipboard {
    constructor() {
        $('[data-clipboard]').off('click').on('click', (event) => {
            let $item = $(event.target);

            if (! $item.attr('data-clipboard') !== typeof undefined) {
                $item = $item.closest('[data-clipboard]');
            }

            Clipboard.copy($item.attr('data-clipboard'), $item);
        });
    }
    static copy(text, $referrer = null) {
        const $input = $('<input/>', {
            class: 'hidden'
        });

        $('body').append($input);

        $input.val(text).select();
        document.execCommand('copy');
        $input.remove();

        new Toast({
            text: 'Copied <strong>' + text + '</strong> to your clipboard.',
            style: 'success'
        }, $referrer);
    }
}
