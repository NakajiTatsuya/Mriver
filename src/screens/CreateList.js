import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../styles/colors';
import InputField from '../components/form/InputField';
import RadioInput from '../components/form/RadioInput';

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

  constructor(props) {
  	super(props);

  	this.state = {
  		privacyOption: "private"
  	};

  	this.selectPrivacyOptions = this.selectPrivacyOptions.bind(this);
  }

  selectPrivacyOptions(privacyOption) {
  	this.setState({
  		privacyOption
  	});
  }

	render() {
		const { privacyOption } = this.state;
		return(
			<View style = {styles.wrapper}>
			  <ScrollView style = {styles.scrollView}>
			    <Text style = {styles.heading}>Create a list</Text>
			    <View style = {styles.content}>
			      <View style = {styles.inputWrapper}>
			        <InputField
			          labelText = "Title"
			          labelTextSize = {20}
			          labelTextWeight = "400"
			          labelColor = {colors.lightBlack}
			          textColor = {colors.lightBlack}
			          placeholder = "some text..."
			          value = "some value..."
			          showCheckmark = {false}
			          autoFocus = {true}
			          inputType = "text"
			          inputStyle = {styles.inputStyle}
			          borderBottomColor = {colors.gray06}
			// customStyle, 
			// onChangeText, 
			// autoCapitalize,
			        />
			      </View>
			      <View style = {styles.privacyOptions}>
			        <Text style = {styles.privacyHeading}>Privacy</Text>
			        <TouchableHighlight 
			          style = {styles.privacyOptionItem}
			          underlayColor = {colors.gray01}
			          onPress = {() => this.selectPrivacyOptions('public')}
			        >
			          <View>
			            <Text style = {styles.privacyOptionTitle}>Public</Text>
			            <Text style = {styles.privacyDescription}>Visible to everyone and included on your public Airbnb profile.</Text>
			            <View style = {styles.privacyRadioInput}>
			              <RadioInput
			                backgroundColor = {colors.gray07}
			                borderColor = {colors.gray05}
			                selectedBackgrounColor = {colors.green01}
			                selectedBorderColor = {colors.green01}
			                iconColor = {colors.white}
			                selected = {privacyOption === 'public'}
			              />
			            </View>
			          </View>
			        </TouchableHighlight>
			        <View style = {styles.driver}></View>
			        <TouchableHighlight 
			          style = {styles.privacyOptionItem}
			          underlayColor = {colors.gray01}
			          onPress = {() => this.selectPrivacyOptions('private')}
			        >
			          <View>
			            <Text style = {styles.privacyOptionTitle}>Private</Text>
			            <Text style = {styles.privacyDescription}>Visible only to you and my friends you invite.</Text>
			            <View style = {styles.privacyRadioInput}>
			              <RadioInput
			                backgroundColor = {colors.gray07}
			                borderColor = {colors.gray05}
			                selectedBackgrounColor = {colors.green01}
			                selectedBorderColor = {colors.green01}
			                iconColor = {colors.white}
			                selected = {privacyOption === 'private'}
			              />
			            </View>
			          </View>
			        </TouchableHighlight>
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
		},
		inputStyle: {
			fontSize: 24,
			fontWeight: '400',
			paddingBottom: 30,
		},
		privacyOptions: {
			marginTop: 40,
					},
		privacyHeading: {
			fontSize: 18,
			fontWeight: '400',
			color: colors.lightBlack,
			marginBottom: 5,
		    paddingLeft: 20,
		    paddingRight: 20,	
		},
		privacyOptionItem: {
			flex: 1,
			padding: 20,
		},
		privacyOptionTitle: {
			fontSize: 16,
			fontWeight: '200',
			color: colors.lightBlack,
		},
		privacyDescription: {
			fontSize: 14,
			fontWeight: '200',
			color: colors.lightBlack,
			marginTop: 10,
			marginRight: 90,
		},
		driver: {
			borderBottomWidth: 1,
			borderBottomColor: colors.gray06,
			height: 20,
			flex: 1,
			marginTop: 20,
			marginBottom: 20,
		},
		privacyRadioInput: {
			position: 'absolute',
			top: 0,
			right: 0,
		},
		privacyDescription: {

		},
});






