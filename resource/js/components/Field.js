import $ from 'jquery';

export default class Field {
    /**
     * @param {HTMLObject} input
     */
    constructor(input) {
        this.$input = $(input);

        console.log(this.$input.attr('data-state'))

        this.$field = $('<div/>', {
            'class': 'field',
            'data-type': this.$input.attr('type') || 'text',
            'data-intent': this.$input.attr('data-intent') || 'default',
            'data-state': this.$input.attr('data-state'),
            'data-before': this.$input.attr('data-before') || '',
            'data-after': this.$input.attr('data-after') || '',
        });

        this.$before = this.$field.attr('data-before');
        this.$after = this.$field.attr('data-after');

        if (this.$before) {
            this.$before = $('body').find('svg.icon').eq(0).clone();
            this.$before.addClass('field-before');
            this.$before.find('use').attr('xlink:href', '#' + this.$field.attr('data-before'));
        }

        if (this.$after) {
            this.$after = $('body').find('svg.icon').eq(0).clone();
            this.$after.addClass('field-after');
            this.$after.find('use').attr('xlink:href', '#' + this.$field.attr('data-after'));
        }

        this.$input.removeAttr('data-intent');
        this.$input.removeAttr('data-state');
        this.$input.removeAttr('data-before');
        this.$input.removeAttr('data-after');
        this.$input.removeClass('field');

        this.$input.wrap(this.$field);
        this.$input.parent().prepend(this.$before);
        this.$input.parent().append(this.$after);

        this.$input.on({
            'blur': () => {
                if (this.$input.parent().attr('data-state') !== 'disabled') {
                    this.$input.parent().attr('data-state', 'waiting');
                }
            },
            'focus': () => {
                if (this.$input.parent().attr('data-state') !== 'disabled') {
                    this.$input.parent().attr('data-state', 'focus');
                }
            }
        });
    }
}
