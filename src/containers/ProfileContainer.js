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
		tabBarLabel: 'PROFILE',
		tabBarIcon: ({ tintColor }) => (
			<Icon
			  name = "ios-contact-outline"
			  size = {22}
			  color = {tintColor}
			/>
			),
	};
	render() {
		return(
			<View>
			  <ScrollView style = {styles.scrollView}>
			    <Text style = {styles.heading}>福岡よかろう</Text>
			    <Text style = {styles.subHeading}>プロフィールを自由に確認して編集しよう</Text>
			    <TouchableHighlight style = {styles.footer}>
			      <View>
			      <Text style = {styles.findHomeButtonText}>ホストへチェンジ</Text>
			      <Icon
			        name = "ios-repeat-outline"
				    size = {30}
				    color = {colors.black}
				    style = {{alignSelf: "flex-end"}}
			      />
			      </View>
			    </TouchableHighlight>
			    <TouchableHighlight style = {styles.footer}>
			      <View>
			      <Text style = {styles.findHomeButtonText}>設定</Text>
			      <Icon
			        name = "ios-settings-outline"
				    size = {30}
				    color = {colors.black}
				    style = {{alignSelf: "flex-end"}}
			      />
			      </View>
			    </TouchableHighlight>
			    <TouchableHighlight style = {styles.footer}>
			      <View>
			      <Text style = {styles.findHomeButtonText}>レッスンを探す</Text>
			      <Icon
			        name = "ios-help-circle-outline"
				    size = {30}
				    color = {colors.black}
				    style = {{alignSelf: "flex-end"}}
			      />
			      </View>
			    </TouchableHighlight>
			    <TouchableHighlight style = {styles.footer}>
			      <View>
			      <Text style = {styles.findHomeButtonText}>ホストに関して</Text>
			      <Icon
			        name = "ios-home-outline"
				    size = {30}
				    color = {colors.black}
				    style = {{alignSelf: "flex-end"}}
			      />
			      </View>
			    </TouchableHighlight>
			  </ScrollView>
			</View>
			);
	}
};

const styles = StyleSheet.create({
	scrollView: {
		height: '100%',
	},
	heading: {
		fontSize: 30,
		fontWeight: '600',
		marginBottom: 5,
		color: colors.gray04,
		marginTop: 70,
		paddingLeft: 20,
		paddingRight: 20,
	},
	subHeading: {
		fontSize: 15,
		fontWeight: '300',
		marginBottom: 40,
		color: colors.gray04,
		paddingLeft: 20,
		paddingRight: 20,
	},
	footer: {
		position: 'relative',
		width: '90%',
		height: 60,
		borderBottomWidth: 1,
		borderBottomColor: colors.gray05,
		paddingLeft: 20,
		paddingRight: 20,
		alignSelf: 'center'
	},
	findHomeButtonText: {
		color: colors.black,
		textAlign: 'left',
		fontWeight: '100',
		top: 25
	},
});