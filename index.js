import { 
	AppRegistry, 
	StatusBar 
} from 'react-native';
import App from './App';

StatusBar.setBarStyle('dark-content', true);
AppRegistry.registerComponent('Mriver', () => App);
