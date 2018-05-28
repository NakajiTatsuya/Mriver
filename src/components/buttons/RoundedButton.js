import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

export default class RoundedButton extends Component {
	render() {
		const { text, textColor, background, icon, handleOnPress } = this.props;
		const backgroundColor = background || 'transparent';
		const color = textColor || colors.black;
		return (
			<TouchableOpacity
			  style = {[{backgroundColor}, styles.wrapper]} 
			  onPress = {handleOnPress}
			  activeOpacity = {0.7}
			>
			  <View style = {styles.buttonTextWrapper} >
			  {icon}
			  <Text style = {[{color}, styles.buttonText]}>{text}</Text>
			  </View>
			</TouchableOpacity>
			);
	}
}

RoundedButton.propTypes = {
	text: PropTypes.string.isRequired,
	textColor: PropTypes.string,
	background: PropTypes.string,
	icon: PropTypes.object,
	handleOnPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
		padding: 10,
		borderRadius: 40,
		borderWidth: 1,
		borderColor:colors.white,
		marginBottom: 15,
		alignItems: 'center',
	},
	buttonTextWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
	},
	buttonText: {
		fontSize: 17,
		width: '100%',
		textAlign: 'center',
	}
});


//wrapプロパティ https://dekiru.net/article/13234/
// PropTypesはタイプチェックを行い、バグのキャッチを行う
// PropTypes.stringはpropに不適切な値が提出された時JavaScriptのコンソールで警告を行う
/* http://morizyun.github.io/javascript/react-js-proptypes-validator.html
React.props.number	数値かどうかをチェック
React.props.string	文字列かどうかをチェック
React.props.array	配列のチェック
React.props.bool	booleanか否かをチェック
React.props..object	オブジェクトかどうかをチェック
React.props.func	関数かどうかをチェック
React.PropTypes.node	renderできるものかをチェック
React.props.element	React Element
ct.props.any.isRequired	どんな型でもよいが必須
*/