import React, { Component } from 'react';
import colors from '../styles/colors';
import { transparentHeaderStyle } from '../styles/navigation';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableHighlight,
	ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import RoundedButton from '../components/buttons/RoundedButton';
import NavBarButton from '../components/buttons/NavBarButton';
import iPhoneSize from '../helpers/utils';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
var FB_PHOTO_WIDTH = 200;

const size = iPhoneSize();
let termsTextSize = 13;
let headingTextSize = 30;

if (size === 'small') {
	termsTextSize = 12;
	headingTextSize = 26;
}

export default class LoggedOut extends Component {


	static navigationOptions = ({ navigation }) => ({
		headerRight: <NavBarButton handleButtonPress = {() => navigation.navigate('LogIn')} location = "right" color = {colors.white} text = "Log In" />,
		headerStyle: transparentHeaderStyle,
		headerTintColor: colors.white,
	});

	onFacebookPress() {
		alert('Facebook button pressed');
		FBLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.SystemAccount);
		FBLoginManager.loginWithPermissions(["email","user_friends","public_profile"], function(error, data){
		  if (!error) {
		    console.log("君は認証トークン(クッキー)を持ってるね!", data);
		  } else {
		    console.log("エラーだよ ", error);
		  }
		})
	}

	onCreateAccountPress() {
		alert('Create Account Button pressed');
	}

	onMoreOptionsPress() {
		alert('More options button pressed');
	}

	render() {
		var _this = this;
		return (
			<ScrollView style = {styles.wrapper} > 
			<View style = {styles.welcomeWrapper}>
			<Image 
			source = {require('../img/airbnb-logo.png')}
			style = {styles.logo}
			/>
			<Text style = {styles.welcomeText} >Welcome to M・river.</Text>
			<RoundedButton
			text = "Continue with Facebook"
			textColor = {colors.green01}
			background = {colors.white} 
			icon = {<Icon name = "facebook" size = {20} style = {styles.facebookButtonIcon}/>}
			handleOnPress = {this.onFacebookPress}
			disabled ={false}
			/>
			<RoundedButton 
			text = "Create Account"
			textColor = {colors.white}
			handleOnPress = {this.onCreateAccountPress}
			disabled ={false}
			/>
			<TouchableHighlight
			  style = {styles.moreOptionsButton}
			  onPress = {this.onMoreOptionsPress}
			>
			  <Text style={styles.moreOptionsButtonText}>More options</Text>
			</TouchableHighlight>

			<View style = {styles.termsAndConditions}>
			  <Text style = {styles.termsText}>By tapping Continue, Create Account or More</Text>
			  <Text style = {styles.termsText}>options, </Text>
			  <Text style = {styles.termsText}>I agree to Airbnb's </Text>
			  <TouchableHighlight style = {styles.linkButton}>
			    <Text style = {styles.termsText}>Terms of Service</Text>
			  </TouchableHighlight>
			  <Text style = {styles.termsText}>, </Text>
			  <TouchableHighlight style = {styles.linkButton}>
			    <Text style = {styles.termsText}>Payments Terms of Service</Text>
			  </TouchableHighlight>
			  <Text style={styles.termsText}>, </Text>
			  <TouchableHighlight style = {styles.linkButton}>
			    <Text style = {styles.termsText}>Privacy Policy</Text>
			  </TouchableHighlight>
			  <Text style = {styles.termsText}>, and </Text>
			  <TouchableHighlight style={styles.linkButton}>
			    <Text style={styles.termsText}>Nondiscrimination Policy</Text>
			  </TouchableHighlight>
			  <Text style = {styles.termsText}>.</Text>
			</View>
			</View>
			</ScrollView>
			);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		display: 'flex',
		backgroundColor: colors.green01,
	},
	welcomeWrapper: {
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20,
  },
	logo: {
		width: 50,
		height: 50,
		marginTop: 50,
		marginBottom: 40,
	},
	welcomeText: {
		fontSize: headingTextSize,
		color: colors.white,
		fontWeight: '300',
		marginBottom: 40,
	},
	facebookButtonIcon: {
		color: colors.green01,
		position: 'relative',
		left: 20,
		zIndex: 8,
	},
	moreOptionsButton: {
		marginTop: 10,
	},
	moreOptionsButtonText: {
		color: colors.white,
		fontSize: 16,
	},
	termsAndConditions: {
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		flexDirection: 'row',
		marginTop: 30,
	},
	termsText: {
		color: colors.white,
		fontSize: termsTextSize,
		fontWeight: '600',
	},
	linkButton: {
		borderBottomWidth: 1,
		borderBottomColor: colors.white,
	},
});



// flexは、http://minotaur.badwitch.io/reactnative-flexbox/参照
/* fontWight
100	Thin (Hairline)
200	Extra Light (Ultra Light)
300	Light
400	Normal
500	Medium
600	Semi Bold (Demi Bold)
700	Bold
800	Extra Bold (Ultra Bold)
900	Black (Heavy) 
*/
