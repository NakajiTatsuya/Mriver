import { Dimensions } from 'react-native';
const iPhoneSize = () => {
	const windowWidth = Dimensions.get('window').width;
	if (windowWidth === 320) {
		return 'small';  //iPhone SE
	} else if (windowWidth === 414) {
	return 'large'; //iPhone Plus
	}
	return 'Medium';  //iPhone 6
}

export default iPhoneSize;




/*
幅 320px => 'small', 414px => 'large',
   else => 'small'
*/
