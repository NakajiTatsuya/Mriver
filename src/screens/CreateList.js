import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import InputField from '../components/form/InputField';

export default class CreateList extends Component {
	
	static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: <TouchableOpacity
      style={styles.closeButton}
      onPress={() => navigation.goBack()}
    >
      <Icon
        name = "md-close"
        size = {30}
        color = {colors.lightBlack}
      />
    </TouchableOpacity>,
    headerStyle: styles.headerStyle,
  });

	render() {
		return(
			<View style = {styles.wrapper}>
			  <ScrollView style = {styles.scrollView}>
			    <Text style = {styles.heading}>Create a list</Text>
			    <View style = {styles.content}>
			      <View style = {styles.inputWrapper}>
			        <InputField
			          labelText = "Title"
			          labelTextSize = {16}
			          labelColor = {colors.lightBlack}
			          inputType = "text"
			          value = "None"
			          borderBottomColor = {colors.gray05}
			          textColor = {colors.lightBlack}
			// customStyle, 
			// onChangeText, 
			// showCheckmark,
			// autoFocus,
			// autoCapitalize,
			        />
			      </View>
			    </View>
			  </ScrollView>
			</View>
			);
	}
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: colors.white,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	closeButton: {
		position: 'absolute',
		left: 20,
	},
	headerStyle: {
		backgroundColor: colors.white,
		borderBottomWidth: 0,
	},
	heading: {
		fontSize: 28,
		fontWeight: '800',
		color: colors.lightBlack,
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 15,
		},
		content: {
			paddingTop: 50,
		},
		inputWrapper: {
			paddingLeft: 20,
			paddingRight: 20,
		}
});






