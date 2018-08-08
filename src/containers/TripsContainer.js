import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

export default class InboxContainer extends Component {
	static navigationOptions = {
		tabBarLabel: 'TRIPS',
		tabBarIcon: ({ tintColor }) => (
			<Icon 
			  name = "ios-ionic"
			  size = {19}
			  color = {tintColor}
			/>
			),
	};

	constructor(props) {
		super(props);
		this.navigateToTrips = this.navigateToTrips.bind(this);
	}

	navigateToTrips() {
		const { navigate } = this.props.navigation;
    navigate('Explore');
  }

	render() {
		return(
		  <View style = {styles.wrapper}>
		    <View style = {styles.view}>
		    <Text style = {styles.headingText}>
		      楽器を教えてもらって最高の体験をしよう!!
		    </Text>
		    <View style = {{alignItems: 'center'}}>
		      <View style ={styles.circleView}>
		        <Icon 
			        name = "ios-ionic"
			        size = {100}
			        color = {colors.white}
			        style = {{zIndex: 999, top: 100-50}}
			      />
		      </View>
		    </View>
			  <TouchableHighlight 
			    style = {styles.startExploringButton}
			    onPress = {this.navigateToTrips}
			  >
			    <Text style = {styles.startExploringButtonText}>Start Exploring</Text>
			  </TouchableHighlight>
			  </View>
		  </View>
			);
	}
};

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		backgroundColor: colors.white,
	},
	view: {
		height: '100%',
	},
	headingText: {
		textAlign: 'center',
		fontWeight: '400',
		marginTop: 150,
		height: 50
	},
	circleView: {
		backgroundColor: colors.green01,
		width: 200,
		height: 200,
		borderRadius: 173,
		alignItems: 'center'
	},
	startExploringButton: {
		position: 'absolute',
		alignSelf: 'center',
		justifyContent: 'center',
		height: 50,
		width: '50%',
		bottom: 80,
		borderRadius: 5,
		backgroundColor: colors.white,
		borderWidth: 2,
		borderColor: colors.green01
	},
	startExploringButtonText: {
		color: colors.green01,
		textAlign: 'center',
		fontWeight: '600',
	},
});