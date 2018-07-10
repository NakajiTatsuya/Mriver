import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableNativeFeedback,
	Platform,
	StyleSheet,
} from 'react-native';
import colors from '../../styles/colors';

export default class RoundedButton extends Component {
	render() {
		const {
		 loading,
		 disabled,
		 text,
		 textColor, 
		 textSize,
		 textWeight,
		 iconPosition,
		 alignPosition,
		 borderColor,
		 background, 
		 icon, 
		 handleOnPress,
		  } = this.props;
		  // スタイルレイアウト用の定数は実際のプロパティ名で作っておくと name:nameとせずに　name一回だけですむ
		const backgroundColor = background || 'transparent';
		const color = textColor || colors.black;
		const fontSize = textSize || 16;
		const fontWeight = textWeight || '600';
		const textAlign = alignPosition || 'center';
		const iconLocation = iconPosition || 'left';
		const border = borderColor || colors.white;
		const opacityStyle = disabled || loading ? 0.5 : 1;
		const textOpacity = loading ? 0 : 1;
		const rippleColor = backgroundColor === 'transparent' ? color : 'rgba(0, 0, 0, 0.4)';
		const ButtonComponent = (buttonProps) => {
				if (Platform.OS === 'ios') {
					return (
						<TouchableOpacity
						  style = {[{opacity: opacityStyle, backgroundColor, borderColor: border}, styles.iosWrapper]} 
						  onPress = {handleOnPress}
						  activeOpacity = {0.6}
						  disabled = {disabled || loading}
						>
						  {buttonProps.children}
						</TouchableOpacity>
						);
				} 
				return (
				<View style = {[styles.androidWrapper, {borderColor: border}]}>
				<TouchableNativeFeedback
				  useForeground = {true}
				  onPress = {handleOnPress}
				  disabled = {disabled || loading}
				  background = {TouchableNativeFeedback.Ripple(rippleColor, false)}
				>
				  <View style = {[{opacity: opacityStyle, backgroundColor}, styles.androidButtonText]}>
				    {buttonProps.children}
				  </View>
				</TouchableNativeFeedback>
				</View>
				);
		};

		return (
			<ButtonComponent>
			  <View style = {styles.buttonTextWrapper} >
			    {iconLocation === 'left' && !loading ? icon : null}
			    {loading ?
                <View style={styles.loaderContainer}>
                  <Image
                    style = {styles.loaderImage}
                    source = {require('../../img/whiteLoader.gif')}
                  />
                </View>
                : null }
			    <Text style = {[{
			  	  opacity: textOpacity, 
			  	  fontSize,
			  	  fontWeight, 
			  	  textAlign, 
			  	  color
			    }, styles.buttonText]}>{text}</Text>
			    {iconLocation === 'right' && !loading ? icon : null}
			  </View>
			</ButtonComponent>
			);
	}
}

RoundedButton.propTypes = {
	text: PropTypes.string.isRequired,
	textColor: PropTypes.string,
	textSize: PropTypes.string,
	textWeight: PropTypes.string,
	alignPosition: PropTypes.string,
	background: PropTypes.string,
	borderColor: PropTypes.string,
	icon: PropTypes.object,
	iconPosition: PropTypes.string,
	handleOnPress: PropTypes.func.isRequired,
	disabled: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
	iosWrapper: {
		display: 'flex',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 12,
		paddingBottom: 12,
		borderRadius: 40,
		borderWidth: 1,
		marginBottom: 15,
		alignItems: 'center',
	},
	androidWrapper: {
		overflow: 'hidden',
		borderRadius: 40,
		borderWidth: 1,
		marginBottom: 15, 
	},
	androidButtonText: {
		display: 'flex',
		paddingLeft: 20,
		paddingRight: 20,
		padding: 12,
		alignItems: 'center',
	},
	buttonTextWrapper: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	buttonText: {
		width: '100%',
	},
	loaderContainer: {
		width: 90,
		height: 90,
		borderRadius: 15,
		position: 'absolute',
		left: '50%',
		top: '50%',
		marginLeft: -45,
		marginTop: -45,
	},
	loaderImage: {
		position: 'absolute',
		width: 40,
		height: 40,
		borderRadius: 15,
		left: '50%',
		top: '50%',
		marginLeft: -20,
		marginTop: -20,
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