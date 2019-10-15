import $ from 'jquery';

export default class View {
    constructor(element) {
        this.container = element;
        if (!this.container.dataset.view) {
            return false;
        }
        this.section = this.container.dataset.view;
        this.setState('waiting');
    }
    render() {
        return new Promise(resolve => {
            $(this.container).load('/resource/view/' + this.section + '.html', response => {
                this.setState('loaded');
                resolve(response);
            });
        });
    }
    setState(state) {
        this.container.dataset.state = state;
    }
}
