import { 
	AppRegistry, 
	StatusBar 
} from 'react-native';
import App from './App';

StatusBar.setBarStyle('light-content', true);	
AppRegistry.registerComponent('Mriver', () => App);
