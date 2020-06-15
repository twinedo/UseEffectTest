/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/pages/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {LanguageContextProvider} from './src/context/LanguageContext';
AppRegistry.registerComponent(appName, () => LanguageContextProvider);
