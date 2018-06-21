import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	TouchableOpacity,
	TouchableHighlight,
	StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../styles/colors';
import InputField from '../components/form/InputField';
import RadioInput from '../components/form/RadioInput';
import RoundedButton from '../components/buttons/RoundedButton';

export default class CreateList extends Component {
	
	static navigationOptions = ({ navigation }) => ({
    tabBarVisible: false,
    headerLeft: <TouchableOpacity
      style = {styles.closeButton}
      onPress = {() => navigation.goBack()}
    >
      <Icon
        name = "md-close"
        size = {30}
        color = {colors.lightBlack}
      />
    </TouchableOpacity>,
    headerStyle: styles.headerStyle,
  });

  constructor(props) {
  	super(props);

  	this.state = {
  		privacyOption: "private",
  		location: props.navigation.state.params.listing.location, // navigateで送られたoaramsの{listing}はtitle,boldTitle,showAddToFav,listingsプロパティを持っているが、locationプロパティの値のみを渡す
  		loading: false,
  	};
  	this.listCreated = false;
  	this.selectPrivacyOptions = this.selectPrivacyOptions.bind(this);
  	this.handleLocationChange = this.handleLocationChange.bind(this);
  	this.handleCreateList = this.handleCreateList.bind(this);
  }

  //componentがDOMツリーから削除される前に呼ばれる関数
  componentWillUnmount() {
  	const { navigation } = this.props;
  	navigation.state.params.onCreateListClose(navigation.state.params.listing.id, this.listCreated);
  }

  handleLocationChange(location) {
  	this.setState({ location });
  }

  selectPrivacyOptions(privacyOption) {
  	this.setState({
  		privacyOption
  	});
  }

  handleCreateList() {
  	const { goBack } = this.props.navigation;
  	this.setState({ loading: true });
  	this.listCreated = true;

  	// Fakung Slow Server
  setTimeout(() => {
  	this.setState({ loading: false }, () => {
  		goBack();
  	});
  }, 2000);
  }

	render() {
		const { privacyOption, location } = this.state;
		return(
			<View style = {styles.wrapper}>
			  <ScrollView style = {styles.scrollView}>
			    <Text style = {styles.heading}>Create a list</Text>
			    <View style = {styles.content}>
			      <View style = {styles.inputWrapper}>
			        <InputField
			          labelText = "Title"
			          labelTextSize = {20}
			          labelTextWeight = "400"
			          labelColor = {colors.lightBlack}
			          textColor = {colors.lightBlack}
			          placeholder = {location}
			          value = {location}
			          showCheckmark = {false}
			          autoFocus = {true}
			          inputType = "text"
			          inputStyle = {styles.inputStyle}
			          borderBottomColor = {colors.gray06}
			          onChangeText = {this.handleLocationChange}
			// customStyle, 
			// autoCapitalize,
			        />
			      </View>
			      <View style = {styles.privacyOptions}>
			        <Text style = {styles.privacyHeading}>Privacy</Text>
			        <TouchableHighlight 
			          style = {styles.privacyOptionItem}
			          underlayColor = {colors.gray01}
			          onPress = {() => this.selectPrivacyOptions('public')}
			        >
			          <View>
			            <Text style = {styles.privacyOptionTitle}>Public</Text>
			            <Text style = {styles.privacyDescription}>Visible to everyone and included on your public Airbnb profile.</Text>
			            <View style = {styles.privacyRadioInput}>
			              <RadioInput
			                backgroundColor = {colors.gray07}
			                borderColor = {colors.gray05}
			                selectedBackgrounColor = {colors.green01}
			                selectedBorderColor = {colors.green01}
			                iconColor = {colors.white}
			                selected = {privacyOption === 'public'}
			              />
			            </View>
			          </View>
			        </TouchableHighlight>
			        <View style = {styles.driver}></View>
			        <TouchableHighlight 
			          style = {styles.privacyOptionItem}
			          underlayColor = {colors.gray01}
			          onPress = {() => this.selectPrivacyOptions('private')}
			        >
			          <View>
			            <Text style = {styles.privacyOptionTitle}>Private</Text>
			            <Text style = {styles.privacyDescription}>Visible only to you and my friends you invite.</Text>
			            <View style = {styles.privacyRadioInput}>
			              <RadioInput
			                backgroundColor = {colors.gray07}
			                borderColor = {colors.gray05}
			                selectedBackgrounColor = {colors.green01}
			                selectedBorderColor = {colors.green01}
			                iconColor = {colors.white}
			                selected = {privacyOption === 'private'}
			              />
			            </View>
			          </View>
			        </TouchableHighlight>
			      </View>
			    </View>
			  </ScrollView>
			  <View style = {styles.createButton}>
			    <RoundedButton
			      text = "create"
			      textColor = {colors.white}
			      alignPosition = "left"
			      background = {colors.green01}
			      borderColor = "transparent"
			      iconPosition = "right"
			      disabled = {!location} // nullはfalseなのでlocationがnullの時disabledはtrueになる
			      loading = {this.state.loading}
			      icon = {
			      	<View style = {[{opacity: location ? 1 : 0.2}, styles.buttonIcon]}> //iconのスケスケ度
			      	  <FontAwesomeIcon 
			      	    name = "angle-right"
			      	    color = {colors.white}
			      	    size = {30}
			      	  />
			      	</View>
			             }
			      handleOnPress = {this.handleCreateList}
			    />
			  </View>
			</View>
			);
	}
};

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: colors.white,
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		top: 0,
	},
	closeButton: {
		position: 'absolute',
		left: 20,
	},
	headerStyle: {
		backgroundColor: colors.white,
		borderBottomWidth: 0,
	},
	heading: {
		fontSize: 28,
		fontWeight: '800',
		color: colors.lightBlack,
		paddingLeft: 20,
		paddingRight: 20,
		marginTop: 15,
		},
		content: {
			paddingTop: 50,
		},
		inputWrapper: {
			paddingLeft: 20,
			paddingRight: 20,
		},
		inputStyle: {
			fontSize: 24,
			fontWeight: '400',
			paddingBottom: 30,
		},
		privacyOptions: {
			marginTop: 40,
					},
		privacyHeading: {
			fontSize: 18,
			fontWeight: '400',
			color: colors.lightBlack,
			marginBottom: 5,
		    paddingLeft: 20,
		    paddingRight: 20,	
		},
		privacyOptionItem: {
			flex: 1,
			padding: 20,
		},
		privacyOptionTitle: {
			fontSize: 16,
			fontWeight: '200',
			color: colors.lightBlack,
		},
		privacyDescription: {
			fontSize: 14,
			fontWeight: '200',
			color: colors.lightBlack,
			marginTop: 10,
			marginRight: 90,
		},
		driver: {
			borderBottomWidth: 1,
			borderBottomColor: colors.gray06,
			height: 1,
			flex: 1,
			marginTop: 20,
			marginBottom: 20,
		},
		privacyRadioInput: {
			position: 'absolute',
			top: 0,
			right: 0,
		},
		createButton:{
			position: 'absolute',
			bottom: 0,
			right: 10,
			width: 110,
		},
		buttonIcon: {
			position: 'absolute',
			right: 0,
			top: '50%',  // RoundedButtonのwrapperViewの半分の高さからスタート
			marginTop: -16, // size 30pxなので、RoundedButtonと高さが揃う計算(margin 1pxと仮定)
		}
});


/*
Each screen component in your app is provided with the navigation prop automatically. It looks like this:

this.props.navigation
navigate - go to another screen, figures out the action it needs to take to do it
goBack - close active screen and move back in the stack
addListener - subscribe to updates to navigation lifecycle
isFocused - function that returns true if the screen is focused and false otherwise.
state - current state/routes
setParams - make changes to route's params
getParam - get a specific param with fallback
dispatch - send an action to router


this.props.navigation.state によりスクリーンのルートにアクセスする

stateのプロパティはルート、キー、パラム
{
  // the name of the route config in the router
  routeName: 'profile',
  //a unique identifier used to sort routes
  key: 'main0',
  //an optional object of string options for this screen
  params: { hello: 'world' }
}

React.jsのComponent Lifecycle (https://qiita.com/koba04/items/66e9c5be8f2e31f28461)

componentWillMount()...ComponentがDOMツリーに追加される前に一度だけ呼ばれます。なので初期化処理を行うのに適しています。(swiftでいうwillSet)

componentWillReceiveProps(nextProps)...Propが更新される時に呼ばれます。ちなみにComponentが新しくDOMツリーに追加される時には呼ばれません。
親ComponentのStateがPropとして渡されていて、その値が変化した時に画面の表示以外で何かしたいときに使う感じです。Notification的な？

shouldComponentUpdate()...trueかfalseを返す必要があります。Componentがrerenderされる前に呼ばれ、falseを返すとVirtualDOMの比較を行わずにrerenderもされなくなります。
なので独自でPropやStateを比較するような処理を実装することで無駄な計算をなくし、Performanceの向上を行うことを目的に実装します。

componentWillUpdate(nextProps, nextState)...Componentが更新する前に呼ばれます。初回時には呼ばれません。この中でsetStateを呼ぶことは出来ないので
Propの値を元にsetStateしたいような場合はcomponentWillReceivePropsを使います。

componentDidUpdate(prevProps, prevState)...Componentが更新された後に呼ばれます。初回時には呼ばれません。

componentWillUnmount()...ComponentがDOMから削除される時に呼ばれます。
イベントの解除などクリーンアップ処理をしたいような場合に使うと便利です。
ComponentDidMountで登録したTimerの処理やDOMのイベントはここで解除するべきです。
*/



