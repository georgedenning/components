import $ from 'jquery';

export default class Dialog {
    /**
     * @param {Object} options
     */
    constructor(options) {
        this.options = { ...this.default(), ...options };

        // todo;
        console.log(this.options);
    }

    cancel() {

    }

    confirm() {

    }

    default() {
        return {
            title: 'Dialog',
            text: 'Text displayed underneath the title',
            actions: [
                {
                    text: 'Cancel',
                    style: 'minimal',
                    intent: 'default',
                    action: () => {
                        this.cancel();
                    }
                }, {
                    text: 'Confirm',
                    style: 'default',
                    intent: 'info',
                    action: () => {
                        this.confirm();
                    }
                }
            ]
        }
    }
}
