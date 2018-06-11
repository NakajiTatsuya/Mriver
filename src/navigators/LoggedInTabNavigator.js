import { 
  StackNavigator,
  TabNavigator, 
  TabBarBottom,
} from 'react-navigation';
import ExploreContainer from '../containers/ExploreContainer';
import InboxContainer from '../containers/InboxContainer';
import ProfileContainer from '../containers/ProfileContainer';
import SavedContainer from '../containers/SavedContainer';
import TripsContainer from '../containers/TripsContainer';
import CreateList from '../screens/CreateList';
import colors from '../styles/colors';

 export const ExploreTab = StackNavigator({
   ExploreContainer: { screen: ExploreContainer },
   CreateList: { screen: CreateList },
 },
 {
   initialRouteName: 'ExploreContainer',
 },
 {
   mode: 'modal',
 });

 const LoggedInTabNavigator = TabNavigator({
  Explore: { screen: ExploreTab  },
  Saved: { screen: SavedContainer },
  Trips: { screen: TripsContainer },
  Inbox: { screen: InboxContainer },
  Profile: { screen: ProfileContainer },
	},
  {
  initialRouteName: 'Explore',
  tabBarOptions: {
  	labelStyle: {
		fontWeight: '600',
		marginBottom: 5,
  },
	activeTintColor: colors.pink,
  },
tabBarComponent: TabBarBottom,
tabBarPosition: 'bottom',
});

 export default LoggedInTabNavigator;

/*
activeTintColor...tabBarのタッチされている時の色
tabBarComponent: TabBarBottom を書かないとandroidの場合、デフォルトの
レイアウトのTabBarになる
*/

// !!!!!!!!!!!大事!!!!!!!!!!!
// https://reactnavigation.org/docs/en/params.html
//  <ルートを持つスタックナビゲータの作り方> and <ルート間でのnavigateの仕方>
// this.props.navigation.navigate('RouteName', { /* params go here */ })
// 1 navigation.navigateに関する第二引数のobjectの中にparamsを置くことによって、paramsをrouteに渡す
// 2 screen componentのなかでparamsを読み込む




