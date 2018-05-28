import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Easing,
	Animated,
} from 'react-native';
import colors from '../styles/colors';

export default class Notification extends Component {
	constructor(props) {
		super(props);
		this.state = {
			positionValue: new Animated.Value(-60),
		};
		this.closeNotification = this.closeNotification.bind(this);
		this.animateNotification = this.animateNotification.bind(this);
	}

	animateNotification(value) {
		const { positionValue } = this.state;
		Animated.timing(
			this.state.positionValue,
			{
				toValue: value,
				duration: 300,
				velocity: 3,
				tension: 2,
				friction: 8,
				easing: Easing.easeOutBack,
			}
		).start();
	}

	closeNotification() {
		this.props.handleCloseNotification();
	}

	render() {
		const { type, firstLine, secondLine, showNotification } = this.props
		const { positionValue } = this.state;
		showNotification ? this.animateNotification(0) : this.animateNotification(-60);
		return (
			<Animated.View style = {[{marginBottom: positionValue}, styles.wrapper]}>
  	    <View style = {styles.notificationContent}>
  	      <View style = {styles.errorMessage}>
            <Text style = {styles.errorText}>{type}</Text>
  	        <Text>{firstLine}</Text>
          </View>
  	      <Text style = {styles.errorMessage}>{secondLine}</Text>
  	    </View>
  	    <TouchableOpacity
  	      style = {styles.closeButton}
  	      onPress = {this.closeNotification}
  	    >
  	      <Icon
  	        name="times"
  	        size={20}
  	        color={colors.lightGray}
  	      />
  	    </TouchableOpacity>
  	  </Animated.View>
			);
	}
}

Notification.propTypes = {
	showNotification: PropTypes.bool.isRequired,
	type: PropTypes.string.isRequired,
	firstLine: PropTypes.string,
	secondLine: PropTypes.string,
	handleCloseNotification: PropTypes.func,
};

const styles = StyleSheet.create({
	wrapper: {
    flex: 1,
    backgroundColor: colors.white,
    height: 60,
    padding: 10,
  },
  notificationContent: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  errorText: {
    color: colors.darkOrange,
    marginRight: 5,
    fontSize: 14,
    marginBottom: 2,
  },
  errorMessage: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 2,
    fontSize: 14,
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 999,
  },
});



// constructor(props){super(props)}はstateを初期化したり、methodをバインドするときに使用する。 
// super(props)をはじめに記述しないとthis,propsが未定義になる https://reactjs.org/docs/react-component.html#constructor
// functionをreact componentへ渡すときには, constructorの中でfunctionをバインドしなければならない(でないとメソッドはnil扱いされる)

/* アニメーション timing, spring, decayについて...  https://qiita.com/imaimiami/items/1ad4170c06b1922604dd
                                                 https://facebook.github.io/react-native/docs/easing.html
変化させる変数をnew Animated.Valueで定義します。 Animated.springなどに上記変数を渡すことでアニメーションさせられます。

this.state = {
  yellowScale: new Animated.Value(1)
};

Animated.spring(
  this.state.yellowScale,
  {
    toValue: this._yellowScale - 0.1,
    friction: 1,
   }
).start(); */

// duration: Length of animation (milliseconds).
// tension: Controls speed
// friction: Controls "bounciness"/overshoot. Default 7.
// velocity: The initial velocity of the object attached to the spring. Default 0 (object is at rest).
// new Animated.Value(60) の60は, アニメーションの開始地点の{本来の場所からの}距離