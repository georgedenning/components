import $ from 'jquery';

export default class View {
    constructor(element) {
        this.container = element;

        if (!this.container.dataset.view) {
            return false;
        }

        this.component = this.container.dataset.view;
    }

    load(callback) {
        $(this.container).load('/resources/views/' + this.component + '.html', () => {
            this.container.dataset.loaded = 'true';
            callback();
        });
    }
}
