import $ from 'jquery';

export default class Icons {
    constructor() {
        this.load();
    }
    load() {
        $.get(window.location.href + '/asset/img/icons.svg', response => {
            $('body').prepend(response.documentElement.outerHTML);
        }, 'xml');
    }
}
