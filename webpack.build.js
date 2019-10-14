/**
 * Import the styles to be processed by Webpack.
 */
import './resource/scss/main.scss';

/**
 * Import the babel polyfill.
 */
import '@babel/polyfill';

/**
 * Import the javascript to be processed by Webpack.
 */
import './resource/js/main';

/**
 * Import the icons to be processed by Webpack.
 */
require.context('./resource/icon', true);
