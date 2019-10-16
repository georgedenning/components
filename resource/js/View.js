import $ from 'jquery';

export default class View {
    constructor(element) {
        this.base = this.base();
        this.container = element;
        if (!this.container.dataset.view) {
            return false;
        }
        this.section = this.container.dataset.view;
        this.setState('waiting');
    }
    base() {
        return window.location.href + '/resource/view/';
    }
    render() {
        return new Promise(resolve => {
            $(this.container).load(this.base + this.section + '.html', response => {
                this.setState('loaded');
                resolve(response);
            });
        });
    }
    setState(state) {
        this.container.dataset.state = state;
    }
}
