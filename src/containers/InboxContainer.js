import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	StyleSheet,
	ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';

export default class InboxContainer extends Component {
	static navigationOptions = {
		tabBarLabel: 'INBOX',
		tabBarIcon: ({ tintColor }) => (
			<Icon 
			  name = "ios-archive"
			  size = {25}
			  color = {tintColor}
			/>
			),
	};
	render() {
		return(
		  <View style = {styles.wrapper}>
			  <ScrollView style = {styles.scrollView}>
			    <Text style = {styles.heading}>Inbox</Text>
			  </ScrollView>
			  <TouchableHighlight style = {styles.startExploringButton}>
			    <Text style = {styles.startExploringButtonText}>Start Exploring</Text>
			  </TouchableHighlight>
		  </View>
			);
	}
};

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		backgroundColor: colors.white,
	},
	scrollView: {
		height: '100%',
	},
	heading: {
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 40,
		color: colors.gray04,
		marginTop: 70,
		paddingLeft: 20,
		paddingRight: 20,
	},
	startExploringButton: {
		position: 'absolute',
		justifyContent: 'center',
		height: 45,
		width: '100%',
		bottom: 0,
		borderRadius: 3,
		backgroundColor: colors.pink,
	},
	startExploringButtonText: {
		color: colors.white,
		textAlign: 'center',
		fontWeight: '600',
	},
});