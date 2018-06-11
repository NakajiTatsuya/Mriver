import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
	View,
	Text,
	TouchableHighlight,
	TouchableOpacity,
	ScrollView,
	Image,
	StyleSheet,
} from 'react-native';
import HeartButton from '../buttons/HeartButton';
import Stars from '../Stars';
import colors from '../../styles/colors';

export default class Listings extends Component {
	constructor(props) {
		super(props);
		this.renderListings = this.renderListings.bind(this);
	}

	get randomColor () {
		const colorsList = [
			colors.gray04,
			colors.darkOrange,
			colors.black,
			colors.brown01,
			colors.blue,
			colors.brown02,
			colors.green01,
		];
		return colorsList[Math.floor(Math.random() * colorsList.length)];
	}

	renderListings() {
		const { listings, showAddToFav, handleAddToFav } = this.props;
		return listings.map((listing, index) => {
			return (
				<TouchableHighlight
				  style = {styles.card}
				  key = {'listing-${index}'}
				>
				  <View>
				  {showAddToFav ?
				  <View style = {styles.addToFavoriteBtn}> 
				  	<HeartButton 
				  	  color = {colors.white}
				  	  selectedColor = {colors.pink}
				  	  onPress = {() => handleAddToFav(listing)}
				  	/>
				  </View>
				  	: null}
				    <Image
				      style = {styles.image}
				      resizeMode = "contain"
				      source = {listing.photo}
				    />
				    <Text style = {[{color: this.randomColor}, styles.listingType]}>{listing.type}</Text>
				      <Text 
				        style = {styles.listingTitle}
				        numberOfLines = {2}
				      >
				        {listing.title}
				      </Text>
				      <Text style = {styles.listingPrice}>${listing.priceType} {listing.priceType}</Text>
				      <Stars 
				        votes = {listing.stars}
				        size = {10}
				        color = {colors.green02} 
				      />
				    </View>
				</TouchableHighlight>
				  );
		});
	}

	render() {
		const { title, boldTitle } = this.props;
		const titleStyle = boldTitle ? { fontSize: 22, fontWeight: '600' } : { fontSize: 18 }
		return(
			<View style = {styles.wrapper}>
			  <View style = {styles.titleWrapper}>
			    <Text style = {[titleStyle, styles.title]}>{title}</Text>
			    <TouchableOpacity style = {styles.seeAllBtn}>
			      <Text style = {styles.seeAllBtnText}>See all</Text>
			      <Icon 
			        name = 'angle-right'
			        size = {18}
			        color = {colors.gray04}
			      />
			    </TouchableOpacity>
			    </View>
			    <ScrollView
			      style = {styles.scrollView}
			      contentContainerStyle = {{paddingRight: 30}}
			      horizontal = {true}
			      showsHorizontalScrollIndicator = {false}
			    >
			      {this.renderListings()}
			    </ScrollView>
			</View>
			);
	}
}

Listings.propTypes = {
	title: PropTypes.string.isRequired,
	boldTitle: PropTypes.bool,
	listings: PropTypes.array.isRequired,
	showAddToFav: PropTypes.bool,
	handleAddToFav: PropTypes.func,
}

const styles = StyleSheet.create({
	wrapper: {
		display: 'flex',
	},
	titleWrapper: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingLeft: 21,
		paddingRight: 21,
	},
	title: {
		color: colors.gray04,
	},
	seeAllBtn: {
		marginTop: 2,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	seeAllBtnText: {
		color: colors.gray04,
		marginRight: 5,
	},
	scrollView: {
		marginTop: 20,
		marginLeft: 15,
		marginBottom: 40,
	},
	card: {
		marginRight: 6,
		marginLeft: 6,
		width: 157,
		flexDirection: 'column',
		minHeight: 100,
			},
	image: {
		width: undefined,
		flex: 1,
		height: 100,
		borderRadius: 8,
		marginBottom: 7,
	},
	listingTitle: {
		fontSize: 14,
		fontWeight: '700',
		color: colors.gray04,
		marginTop: 10,
	},
	listingType: {
		fontWeight: '700',
		fontSize: 10,
	},
	addToFavoriteBtn: {
		position: 'absolute',
		right: 12,
		top: 7,
		zIndex: 2,
	},
	listingPrice: {
		color: colors.gray04,
		marginTop: 4,
		marginBottom: 2,
		fontSize: 12,
		fontWeight: '300',
	}
});




/*
justify-content: flex-start;     flex アイテムを始端に集める 
justify-content: flex-end;         flex アイテムを終端に集める 
justify-content: center;           アイテムを中央に集める 
justify-content: space-between;  アイテムを均等に分散する。
                                   最初のアイテムは始端に接する。
                                   最後のアイテムは終端に接する。 
justify-content: space-around;   アイテムを均等に分散する。
                                   アイテムは、両側に半分のサイズの
                                   スペースを持つ。 
justify-content: space-evenly;   アイテムを均等に分散する。
                                   各アイテムの周囲に均等なスペースを置く 


ボタンを作る要素三つ

TouchableHighlight
• 効果: 形や背景を持つ、要素やボタンをタッチできるようにしたい時
• 目的: 

TouchableOpacity
• 効果: Lightens the opacity of the entire element when pressed.
• 目的: 背景色を持たない、テキストやアイコンをタッチできるようにしたい時

TouchableNativeFeedback
• 効果: タッチした時に、背景に連鎖効果(波及効果)を加える
• 目的: アンドロイドのタッチ要素はほぼ全て使える


randomColor ()について... (色の数) * (0~1の数) => 色の数以下の数を、整数で切り上げてインデックスとしている


get 構文
オブジェクトのプロパティが参照された時に関数が呼び出されるように,
プロパティを結びつけます。
Math.random() 0と1の間でランダムな数字を返す(0< && <1) 例: 0.1732136213

return Math.floor(引数) 引数として与えた数以下の最大の整数を返します。 10
return Math.abs(引数) 関数は、数値の絶対値を返します  -10なら10
return Math.ceil() 関数は、引数として与えた数以上の最小の整数を返します。
return Math.round() 関数は、引数として与えた数を四捨五入して、もっとも近似の整数を返します。

*** Math.floor(Math.random() * 10); ***  
   // returns a number between 0 and 10 (0< && <10)

resizeModee
   cover... ぴったりか、オーバーしてフィット(aspect ratio)
   contain... ぴったりか、空白ができてフィット(aspect ratio)
   stretch... 綺麗にフィット,高さ幅は崩れる
   repeat... サイズと高さ比はそのままで、イメージを繰り返す
   center... イメージがViewの中央に来る
   
*/

