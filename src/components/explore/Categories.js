import React, { Component } from 'react';
import {
	ScrollView,
	StyleSheet,
	TouchableHighlight,
	Image,
	View,
	Text,
} from 'react-native';
import colors from '../../styles/colors';
import iPhoneSize from '../../helpers/utils';

const size = iPhoneSize();
let cardSize = 100;
let cardMargin = 8;

if (size === 'small') {
	cardSize = 90;
	cardMargin = 4;
} else if (size === 'large') {
	cardSize = 115;
}

 export default class Categories extends Component {
 	get Categories() {
 		const { categories } = this.props;
 		return categories.map((category, index) => {
 			return(
 				<TouchableHighlight
 				style = {styles.card}
 				>
 				  <Image 
 				    source = {category.photo}
 				    style = {styles.image}
 				  />
 				</TouchableHighlight>
 				);
 		});
 	}

 	render() {
 		return(
 			<ScrollView 
 			contentContainerStyle = {styles.wrapper}
 			horizontal = {true}
 			showsHorizontalScrollIndicator = {false}
 			>
 			  {this.Categories}
 			</ScrollView>
 			);
 	 }
 }

 const styles = StyleSheet.create({
 	wrapper: {
 		flex: 1,
 		flexDirection: 'row',
 		alignItems: 'center',
 		justifyContent: 'center',
 	},
 	card: {
 		display: 'flex',
 		flexDirection: 'column',
 		width: cardSize,
 		height: cardSize,
 		marginRight: cardMargin,
 		marginLeft: cardMargin,
 	},
 	image: {
 		flex: 1,
 		width: undefined,
 		height: undefined,
 	},
 });

// ScrollViewのhorizontalプロパティ...trueの時、ScrollViewの子要素が、列の中で水平横方向に並べられる(横スクロールが可能)
// showsHorizontalScrollIndicator...trueの時、スクロールの尺度が表示される The default value is true.

/*

map関数の例
 	renderBoxes() {
    return Array.map( (data, index, array) => this.myFunction(index));
} 

イメージスタイル
If you need to scale the image dynamically (i.e. via flex), 
you may need to manually set { width: undefined, height: undefined } on the style attribute.


*** 大事 *** 
map関数について https://stackoverflow.com/questions/38364400/index-inside-map-function
  配列.map(要素,インデックス,配列そのもの)
var list = [ 'h', 'e', 'l', 'l', 'o'];
list.map((currElement, index) => {
  console.log("The current iteration is: " + index);
  console.log("The current element is: " + currElement);
  console.log("\n");
  return 'X';
});

The current iteration is: 0 
The current element is: h

The current iteration is: 1 
The current element is: e

The current iteration is: 2 
The current element is: l

The current iteration is: 3 
The current element is: l

The current iteration is: 4 
The current element is: o



*/



