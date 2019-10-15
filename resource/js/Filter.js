import $ from 'jquery';

export default class Filter {
    constructor() {
        $('.section-filter').each((i, section) => {
            const $input = $('<input/>', { 'type': 'search' });
            $input.insertBefore($(section));
            const $items = $(section).find('li');

            $input.on('keyup', (e) => {
                const value = $input.val().toLowerCase();
                const terms = value.split(' ').filter(Boolean);
                this.filter(terms, $items);
            });
        });
    }
    filter(terms, $items) {
        if (!terms || terms.length < 1) {
            $items.attr('data-active', true);
            return false;
        }

        $items.each((i, item) => {
            item.dataset.active = this.match(terms, item);
        });
    }
    match(terms, item) {
        let matchCount = 0;

        [...terms].forEach(term => {
            if (item.dataset.keywords.includes(term)) {
                matchCount ++;
            }
        });

        return matchCount === terms.length;
    }
}
