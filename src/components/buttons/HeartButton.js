import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
	View,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';

export default class HeartButton extends Component {
	constructor(props) {
		super(props);
		this.state = { addedToFavorite: false };
		this.addToFavorite = this.addToFavorite.bind(this);
	}

	addToFavorite() {
		const { onPress } = this.props;
		this.setState({
			addedToFavorite: !this.state.addedToFavorite
		}, () => {
			onPress && onPress();
		});
	}

	render() {
		const { addedToFavorite } = this.state;
		const { color, selectedColor } = this.props;
		return(
			<TouchableHighlight
			  onPress = {this.addToFavorite}
			>
			  <View>
			    <Icon 
			      name = { addedToFavorite ? 'heart' : 'heart-o' }
			      color = {addedToFavorite ? selectedColor : color }
			      size = {18}
			    />
			    
			    <Icon 
			      name = 'heart-o'
			      size = {18}
			      color = {color}
			      style = {[
			      	{ display: addedToFavorite ? 'flex' : 'none' },
			      	styles.selectedColor,
			      ]}
			    />
			  </View>
			</TouchableHighlight>
			);
	}
}

const styles = StyleSheet.create({
	selectedColor: {
		position: 'absolute',
		left: 0,
		top:0,
	}
});

HeartButton.propTypes = {
	color: PropTypes.string.isRequired,
	selectedColor: PropTypes.string.isRequired,
	itemId: PropTypes.number.isRequired,
	onPress: PropTypes.func,
}

/*
使用Iconについて
heart-o 透けてるハート
heart   色付きハート


http://blog.keisuke11.com/webdesign/display-none-visibility-hidden/
display:none;
文字通りディスプレイをなしにするので指定された要素は非表示になります。
Document Object Model からは消えないのでHTMLコード上では存在していることになります。
*/





