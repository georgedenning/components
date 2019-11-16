import $ from 'jquery';

export default class Toast {
    /**
     * @param {Object} options title, text, icon, status, time
     */
    constructor(options, $referrer = null) {
        this.options = { ...this.default(), ...options };
        this.delayTimer = null;

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

        const $icon = $('body').find('svg.icon').eq(0).clone();

        const $title = $('<div/>', {
            'class': 'toast-title'
        });

        const $text = $('<p/>', {
            'class': 'toast-text'
        });

        $icon.addClass('toast-icon').find('use').attr('xlink:href', '#icon-' + this.options.icon);

        $title.html(this.options.title);
        $text.html(this.options.text);

        $toast.append($icon);
        $toast.append($title);
        $toast.append($text);

        $item.append($toast);

        this.removeAfter(this.options.timeout, $item);

        this.$list.prepend($item);
    }

    default() {
        return {
            title: 'Notification',
            text: 'You have been notified.',
            icon: 'notifications',
            style: 'default',
            timeout: 5000
        }
    }

    removeAfter(time, $item) {
        if (! time) {
            return false;
        }

        clearTimeout(this.delayTimer);
        this.delayTimer = setTimeout(() => {
            this.remove($item)
        }, time);
    }

    remove($item) {
        $item.addClass('fade-out');

        this.removeTimer = setTimeout(() => {
            $item.remove();
        }, this.options.timeout);

        $item.off('mouseover').on('mouseover', () => {
            $item.removeClass('fade-out');
            clearTimeout(this.delayTimer);
            clearTimeout(this.removeTimer);
        });

        $item.off('mouseleave').on('mouseleave', () => {
            $item.addClass('fade-out');
            this.removeAfter(this.options.timeout, $item);
        });
    }
}
