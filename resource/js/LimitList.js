import $ from 'jquery';

export default class LimitList {
    constructor() {
        this.options = {
            attribute: 'data-limit',
            scroll: true
        }

        this.observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'attributes') {
                    this.collapse($(mutation.target));
                }
            });
        });

        $('ul[' + this.options.attribute + ']').each((index, element) => {
            this.collapse($(element));
        });
    }

    collapse($list) {
        const limit = parseInt($list.attr(this.options.attribute));
        const listHeight = $list.innerHeight() - $list.height();
        const itemHeight = $list.find('li').outerHeight();
        const collapsedHeight = listHeight + (itemHeight * limit);

        $list.css('height', collapsedHeight);

        if (this.options.scroll) {
            $list.css('overflow-y', 'scroll');
        }

        this.observer.observe($list[0], {
            attributes: true
        });
    }
}
