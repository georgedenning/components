import Clipboard from 'clipboard';
import Toast from './components/Toast';
require('./plugins/prism');

Prism.plugins.customClass.prefix('code-');

Prism.plugins.toolbar.registerButton('copy-to-clipboard', env => {
    var linkCopy = document.createElement('button');
    linkCopy.textContent = 'Copy';

        new Clipboard(linkCopy, {
            'text': () => env.code
        }).on('success', response => {
            new Toast({
                text: 'Code copied to your clipboard.',
                style: 'success'
            }, response.trigger);
        });

    return linkCopy;
});

new Clipboard('[data-clipboard]', {
    'text': element => element.dataset.clipboard
}).on('success', response => {
    new Toast({
        text: '"' + response.text + '" copied to your clipboard.',
        style: 'success'
    }, response.trigger);
});