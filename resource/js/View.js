import $ from 'jquery';

export default class View {
    constructor(element) {
        this.container = element;
        if (!this.container.dataset.view) {
            return false;
        }
        this.section = this.container.dataset.view;
    }
    load(callback) {
        $(this.container).load('/resource/view/' + this.section + '.html', () => {
            this.container.dataset.loaded = 'true';
            callback();
        });
    }
}
