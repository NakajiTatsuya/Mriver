import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import colors from '../styles/colors';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

export default class Stars extends Component {
		get stars() {
			const { votes, size, color } = this.props;
			const starsNumber = parseInt(votes);
			const startElememts = [];
			for(let i = 0; i < 5; i ++) {
				startElememts.push(
					<Icon
					  name = "star" 
					  size = {size}
					  color = { starsNumber > i ? color : colors.gray02 }
					  style = {styles.star}
					/>
					);
			}
			return startElememts;
		}

		render() {
			const { votes } = this.props;
			if (!this.stars.length) {
				return <View></View>;
			}

			return(
				<View style = {styles.wrapper}>
				  <View style = {styles.stars}>
				    {this.stars}
				    {votes ? <Text style = {styles.votesNumber}>{votes}</Text> : null}
				  </View>
				</View>
				);
		}
	}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	star: {
		marginRight: 1,
	},
	stars: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	votesNumber: {
		fontSize: 11,
		fontWeight: '600',
		marginTop: 1,
		marginLeft: 3,
	}
});







/*
const { votes, size, color } = this.props; により定数たちはpropsのレイアウト要素として定義された

parseInt(string, radix); 
   引数   string 解析する値。引数stringが文字列でなければ、(抽象操作ToStringにより)文字列に変換されます。
         radix  2から36までの整数で、前述の文字列に対する基数(数学的記数法の底)を与えます。
         この引数を必ず渡すことにより、誤解を防ぎ、意図した動作が導けます。
   戻り値 parseInt()関数は第1引数を文字列に変換し、解析したうえで、整数またはNaNを返します。
   最初の文字を数値に変換できない場合、NaN が返されます。
   戻り値は、NaNでなければ、第1引数のstringを第2引数radixの基数によって示す10進数の整数です。

   If the input string begins with "0x" or "0X", radix is 16 (hexadecimal).
If the input string begins with "0", radix is eight (octal). This feature is non-standard,
 and some implementations deliberately do not support it (instead using the radix 10).
For this reason always specify a radix when using parseInt.

const starsNumber = parseInt(votes, 10); votesがstringからintに解析される。第二引数のデフォルトは10進数

真偽値について
if (hoge) {
  ...
}
0 （int）だけが偽となり、それ以外はすべて真となる。(nullも偽)

const { votes } = this.props;
			if (votes === '0') {
				return <View></View>;
			}
*/

