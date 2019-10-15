import $ from 'jquery';
import View from './View';

export default class Views {
    constructor() {
        this.loaded = [];
        this.load()
    }
    render() {
        return new Promise(resolve => {
            Promise.all(this.loaded).then(() => {
                $(document).ajaxStop(event => {
                    resolve();
                });
            });
        })
    }
    load() {
        new Promise(resolve => {
            this.getWaiting().each((i, item) => {
                const load = (new View(item)).render();
                load.then(response => this.load());
                resolve(this.loaded.push(load));
            });
        })
    }
    getWaiting() {
        return $('[data-view]:not([data-state="loaded"]):not([data-state="waiting"])');
    }
}
