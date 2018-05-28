import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../../styles/colors';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	Animated,
	Easing,
} from 'react-native';

export default class InputField extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secureInput: props.inputType === 'text' || props.inputType === 'email' ? false : true,
			scaleCheckmarkValue: new Animated.Value(0),
		};
		this.toggleShowPassword = this.toggleShowPassword.bind(this);
	}

	scaleCheckmark(value) {
		Animated.timing(
			this.state.scaleCheckmarkValue,
			{
				toValue: value,
				duration: 400,
				easing: Easing.easeOutBack,
			}
			).start();
	}

	toggleShowPassword() {
		this.setState({ secureInput: !this.state.secureInput });
	}

	render() {
		const { 
			labelText, 
			labelTextSize, 
			labelTextWeight,
			labelColor, 
			textColor, 
			borderBottomColor, 
			inputType, 
			customStyle, 
			inputStyle,
			onChangeText, 
			showCheckmark,
			autoFocus,
			autoCapitalize,
			value,
			placeholder,
		} = this.props;
		const { secureInput, scaleCheckmarkValue } = this.state;
		const fontSize = labelTextSize || 14;
		const fontWeight = labelTextWeight || '700';
		const color = labelColor || colors.white;
		const inputColor = textColor || colors.white;
		const borderBottom = borderBottomColor || 'transparent'; 
		const keyboardType = inputType === 'email' ? 'email-address' : 'default';
		let customInputStyle = inputStyle || {};
		if (!inputStyle || inputStyle && !inputStyle.paddingBottom) {
			customInputStyle.paddingBottom = 5;
		}
		const iconScale = scaleCheckmarkValue.interpolate({ 
			inputRange: [0, 0.5, 1],
			outputRange: [0.01, 1.6, 1],
		});

		const scaleValue = showCheckmark ? 1: 0;
		this.scaleCheckmark(scaleValue);

		return (
			<View style = {[customStyle, styles.wrapper]}>
			  <Text style = {[{fontWeight, color, fontSize}, styles.label]}>{labelText}</Text>
			  { inputType === 'password' ?
			  <TouchableOpacity
			    style = {styles.showButton}
			    onPress = {this.toggleShowPassword}
			  >
			    <Text style = {styles.showButtonText}>{ secureInput ? 'Show' : 'Hide' }</Text>
			  </TouchableOpacity>
			: null }
			<Animated.View style = {[{transform: [{scale: iconScale}]}, styles.checkmarkWrapper]}>
			  <Icon 
			    name = "check"
			    color = {colors.white}
			    size = {20}
			  />
			</Animated.View>
			<TextInput 
			  style = {[{color: inputColor, borderBottomColor: borderBottom}, inputStyle, styles.inputField]}
			  secureTextEntry = {secureInput}
		 	  onChangeText = {onChangeText}
			  keyboardType = {keyboardType}
			  autoFocus = {autoFocus}
			  autoCapitalize = {autoCapitalize}
			  autoCorrect = {false}
			  underlineColorAndroid = "transparent"
			  value = {value || ''}
			  placeholder = {placeholder}
			/>
			</View>
			);
	}
}

InputField.propTypes = {
	labelText: PropTypes.string.isRequired,
	labelTextSize: PropTypes.number,
	labelColor: PropTypes.string,
	textColor: PropTypes.string,
	borderBottomColor: PropTypes.string,
	inputType: PropTypes.string.isRequired,
	customStyle: PropTypes.object,
	onChangeText: PropTypes.func,
	showCheckmark: PropTypes.bool.isRequired,
	autoFocus: PropTypes.bool,
	autoCapitalize: PropTypes.bool,
	labelTextWeight: PropTypes.string,
	inputStyle: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string, 
};

const styles = StyleSheet.create({
	wrapper: {
  	display: 'flex',
  },
  label: {
  	marginBottom: 20,
  },
  inputField: {
    borderBottomWidth: 1,
    paddingTop: 5,
  },
  showButton: {
    position: 'absolute',
    right: 0,
  },
  showButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  checkmarkWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 12,
  }
});





//bindとは、関数に対してthisや引数を指定することができるメソッドです。
// classにconstructor()メソッドを追加して、this.stateにオブジェクトとして初期State(*今回は,secureInputの値)の値を定義します。
// props：親から渡される情報 
// state：自Componentの状態 
// 親から初期状態としてpropsを渡し、stateで自身の状態を管理する。
// TextInput(テキストフィールドを出力するコンポーネント)
// Easing functionはアニメーションの進み具合を指定 http://easings.net/ja 
// Animated.timing()を使う時、Easingモジュールが使われる

// Animated.timing(
//    指定時間の中で、value属性をアニメーションする
//   this.state.fadeAnim, // The value to drive
//   {
//     toValue: 1, // Animate to final value of 1
//   }
// ).start(); // Start the animation

 // interpolate() functionはインプットレンジからアウトプットレンジまで改ざんする。

// inputRange: [0, 0.5, 1], outputRange: [0, 1.6, 1], により、valueが0の時は0、0.5の時は1.6,1の時は1になる。
// valueは一瞬で変化し絵いるわけではなく、ほぼ一瞬の速度で流動的に変化している。0から1に変わる変化をoutPutRangeで変えているのだ
