import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
	View,
	Text,
	Easing,
	Animated,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';

export default class RadioInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			scaleCheckmarkValue: new Animated.Value(0),
		};

		this.scaleCheckmark = this.scaleCheckmark.bind(this);
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

	render() {
		const {
	backgroundColor,
	borderColor,
	selectedBackgrounColor,
	selectedBorderColor,
	selected,
	iconColor,
	} = this.props;

	const background = selected ? selectedBackgrounColor : backgroundColor;
	const border = selected ? selectedBorderColor : borderColor;
	const iconScale = this.state.scaleCheckmarkValue.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0.01, 1.6, 1],
	});

	const scaleValue = selected ? 1 : 0;
	this.scaleCheckmark(scaleValue);
		return(
			<View style = {[{backgroundColor: background, borderColor: border}, styles.wrapper]}>
			  <Animated.View style = {[{transform: [{scale: iconScale}]}, styles.iconWrapper]}>
			    <Icon 
			      name = "md-checkmark"
			      color = {iconColor}
			      size = {20}
			    />
			  </Animated.View>
			</View>
			);
	}
};

RadioInput.propTypes = {
	backgroundColor: PropTypes.string.required,
	borderColor: PropTypes.string.isRequired,
	selectedBackgrounColor: PropTypes.string.isRequired, 
	selectedBorderColor: PropTypes.string.isRequired,
	selected: PropTypes.bool.isRequired,
	iconColor: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
	wrapper: {
		width: 30,
		height: 30,
		borderRadius: 30,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	iconWrapper: {
		marginTop: 2,
	}
});


/*
flex-start,flex-end,center
alignItems: 'center',      alignItemsはフレックスコンテナを上下の点から決める
justifyContent: 'center',  justifyContentはフレックスコンテナを左右の点から決める

transform accepts an array of transformation objects
transform([{ rotateX: '45deg' }, { rotateZ: '0.785398rad' }])
transform([{ skewX: '45deg' }])

***アニメーション***
① set initial value for opacity
this.state = {
			fadeAnim: new Animated.Value(0); //Initial value for opacity: 0
		};

②make a function to cause animation
componentDidMount() {
    Animated.timing(                  // 時間とともにアニメーション
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 10000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

③make View Animate
<Animated.View                 // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,         // Bind opacity to animated value
        }}
>
        {this.props.children}
      </Animated.View>

!!! timing(value, config)に関して
第一引数: Value 第二引数: 設定(duration,easing,delay,isInteraction,useNativeDriverなど)

!!!Easingモジュールのメソッド
back...アニメーションが進む前にわずかに戻るアニメーション
bounce...跳ねるアニメーション
ease...慣性のアニメーション(通常)
elastic...急に出現するアニメーション


interpolate はインプットレンジとアウトプットレンジから補完を行う
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
*/





