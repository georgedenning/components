import $ from 'jquery';

export default class Toast {
    /**
     * @param {Object} options title, text, icon, status, time
     */
    constructor(options, $referrer = null) {
        this.options = { ...this.default(), ...options };

        let $parent = $('[data-view="theme"]');

        if ($referrer) {
            $parent = $referrer.closest('[data-view="theme"]')
        }

        this.$list = $parent.find('.toast-list');

        if (! this.$list.length) {
            this.$list = $('<ul/>', { class: 'toast-list' });
        }
        
        if (! $parent.find('.toast-list').length) {
            if ($parent[0].getBoundingClientRect().right !== $(window).width()) {
                this.$list.css('right', $(window).width() - $parent.width());
            }
            $parent.prepend(this.$list);
        }

        const $item = $('<li/>', {
            'class': 'toast-item'
        });

        const $toast = $('<div/>', {
            'class': 'toast',
            'data-intent': this.options.style
        });

        const $icon = $('body').find('svg.icon').eq(0).clone().removeClass();
        const $close = $icon.clone();

        const $title = $('<div/>', {
            'class': 'toast-title'
        });

        const $text = $('<p/>', {
            'class': 'toast-text'
        });

        $icon.addClass('toast-icon').find('use').attr('xlink:href', '#icon-' + this.options.icon);
        $close.addClass('toast-close').find('use').attr('xlink:href', '#icon-cross');

        $title.html(this.options.title);
        $text.html(this.options.text);

        $close.off('click').on('click', () => {
            $item.remove();
        });

        $toast.append($close);
        $toast.append($icon);
        $toast.append($title);
        $toast.append($text);

        $item.append($toast);

        this.$list.prepend($item);
    }

    default() {
        return {
            title: 'Notification',
            text: 'You have been notified.',
            icon: 'notifications',
            style: 'default'
        }
    }
}
