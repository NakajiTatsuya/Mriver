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
    this.handleAddToFav = this.handleAddToFav.bind(this);
  }

	handleAddToFav(listing) {
		const { navigate } = this.props.navigation;
		navigate('CreateList', {listing});
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
*/




