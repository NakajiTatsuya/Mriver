import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from '../components/SearchBar';
import Categories from '../components/explore/Categories';
import Listings from '../components/explore/Listings';
import colors from '../styles/colors';
import categoriesList from '../data/categories';
import listings from '../data/listings';

export default class InboxContainer extends Component {

	static navigationOptions = {
    header: null,
    tabBarLabel: 'EXPLORE',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name = "ios-search"
        size = {22}
        color = {tintColor}
      />
    ),
  };

	constructor(props) {
    super(props);
    this.state = {
      favoriteListings: [],
    };
    this.onCreateListClose = this.onCreateListClose.bind(this);
    this.renderListings = this.renderListings.bind(this);
    this.handleAddToFav = this.handleAddToFav.bind(this);
  }

	handleAddToFav(listing) {
		const { navigate } = this.props.navigation;
    let { favoriteListings } = this.state;

    const index = favoriteListings.indexOf(listing.id);  
    if (index > -1) {
      favoriteListings = favoriteListings.filter(item => item !== listing.id);
      this.setState({ favoriteListings });
    } else {
     navigate('CreateList', {listing, onCreateListClose: this.onCreateListClose}); 
    }
  }

  // 'CreateList'にて、closeButtonを押すと起こる処理に指名
  onCreateListClose(listingId, listCreated) {
    let { favoriteListings } = this.state;
    if (listCreated) {
      //lisdingのidを追加
      favoriteListings.push(listingId);
    } else {
      //配列のフィルタリングでlisdingのidを捨てる
      favoriteListings = favoriteListings.filter(item => item !== listingId); // アロー関数
    }
    this.setState({ favoriteListings });
  }

	renderListings() {
		return listings.map((listing, index) => {
			return (
			  <View
			    key = {'listing-${index}'}
			  >
			  <Listings 
			    key = {`listing-item-${index}`}
          title = {listing.title}
          boldTitle = {listing.boldTitle}
          listings = {listing.listings}
          showAddToFav = {listing.showAddToFav}
          handleAddToFav = {this.handleAddToFav}
          favoriteListings = {this.state.favoriteListings}
			  />
			</View>
			);
		});
	}

render() {
    return (
      <View style = {styles.wrapper}>
        <SearchBar />
        <ScrollView
          style = {styles.scrollview}
          contentContainerStyle = {styles.scrollViewContent}
        >
          <Text style={styles.heading}>Explore M・river</Text>
          <View style={styles.categories}>
            <Categories categories={categoriesList} />
          </View>
          {this.renderListings()}
        </ScrollView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollview: {
    paddingTop: 100,
  },
  scrollViewContent: {
    paddingBottom: 80,
  },
  categories: {
    marginBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    paddingLeft: 20,
    paddingBottom: 20,
    color: colors.gray04,
  }
});


/*
navigate...Call this to link to another screen in your app

navigation.navigate({routeName, params, action, key})
navigation.navigate(routeName, params, action)

routeName - A destination routeName that has been registered somewhere in the router
params - Params to merge into the destination route
action - (advanced) The sub-action to run in the child router, if the screen is a navigator. See Actions Doc for a full list of supported actions.
key - Optional identifier of what route to navigate to. Navigate back to this route, if it already exists

A screen has access to its route via this.props.navigation.state

 https://reactnavigation.org/docs/en/params.html

!!!
var name = 'john';
var country = 'japan';
var str1 = `Hello! My name is ${name}. I live in ${country}.`; // ''ではなくて``バッククオーテーションだった！！

var name = 'john';
var country = 'japan';
var str1 = 'Hello! My name is ' + name + '. I live in ' + country + '.'; // 普通にクオーテーション

文字列検索機能について

var str = "任意の文字列"
str.indexOf( "検索したい文字", 検索開始位置(省略可能) );

例         
var str = 'banana, apple, orange, apple';
var result = str.indexOf( 'apple' );
console.log( result ); // 8

var str = 'banana, apple, orange, apple';
var result = str.lastIndexOf( 'apple' ); //後ろから　appleを発見して前から数える
console.log( result ); // 23

配列の filter について

var items = [5,2,7,8,3,1,6,8,4];
// filter( // コールバック関数 )
var result = items.filter(  function( value ) {
    //5よりも小さい数値だけを抽出
    return value < 5;
})
console.log( result );  // [2, 3, 1, 4]

(item) => { return item !== listingId }; 本体が一文である場合、ブロックを表す{...}を省略できます。また、文の戻り値がそのまま戻り値とみなされるので、return命令も省略できます。 https://qiita.com/may88seiji/items/4a49c7c78b55d75d693b
*/




