/**
 * @format
 */
import './shim.js';
import crypto from 'crypto';
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import './src/global';

import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
