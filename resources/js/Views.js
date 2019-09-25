import $ from 'jquery';
import View from './View';

export default class Views {
    constructor() {
        this.loaded = [];
        this.loadAll();
    }
    loadAll() {
        $('[data-view]').each((i, e) => {
            const view = new View(e);
            if (view instanceof View && ! this.loaded.includes(view.component)) {
                view.load(() => {
                    this.loaded.push(view.component)
                    this.loadAll();
                });
            }
        });
    }
}
