import React from 'react';
import {
	ActivityIndicator,
  View,
	Text,
	ScrollView,
	TouchableOpacity,
	Image
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import formatDate from '../../lib/formatDate';

export default class Grid extends React.Component {
	state = {
		page: 1,
		sortedBy: null
	}

	isScrollAtBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
		const paddingToBottom = 50;
		return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
	}

	handleScroll = (event) => {
		let {
			page,
			sortedBy
		} = this.state;

		if (this.isScrollAtBottom(event) && !this.props.isLoading) {
			let newPage = page + 1;

			this.setState({
				page: newPage
			});

			this.props.fetchMoreData(newPage, sortedBy);
		}
	}

	renderBody = () => {
		const {
			data,
			isLoading,
			getNewAd,
			ads
		} = this.props;

		if (data.length) {
			return data.map((item, index) => {
				return (
					<View style={[{ flex: 1, alignSelf: 'stretch', flexDirection: 'column' }]} key={item.id}>
						{ index > 19 && index%20 === 0 ? (
							<View style={[{flex: 1}, styles.gridRow]}>
								<Image source={{uri: ads[index/20]}} style={{height: 200, width:  320}} />
							</View>
						) : null}
						<View style={[{flex: 1}, styles.gridRow]}>
							<View style={[{ flex: 3 }, styles.cell]}>
								<ScrollView horizontal={true}>
									<Text style={{fontSize: item.size}}>
										{item.face}
									</Text>
								</ScrollView>
							</View>
							<View style={[{ flex: 1 }, styles.cell]}>
								<Text>
									{item.size}
								</Text>
							</View>
							<View style={[{ flex: 2 }, styles.cell]}>
								<Text>
									{formatDate(item.date)}
								</Text>
							</View>
							<View style={[{ flex: 1 }, styles.cell]}>
								<Text>
									{item.price}
								</Text>
							</View>
						</View>
					</View>
				)
			});
		}

		if (isLoading) {
			return null;
		}

		return (
			<View>
				<Text>
					Empty :(
				</Text>
			</View>
		)
	}

	renderCaretDown (idName) {
		if(this.state.sortedBy === idName) {
			return (
				<AntDesign name="caretdown" />
			)
		}

		return null;
	}

	handleSort = (idName) => {
		if (this.state.sortedBy === idName) {
			this.setState({
				sortedBy: '',
				page: 1
			})

			this.props.fetchMoreData(1, '');
		}
		else {
			this.setState({
				sortedBy: idName,
				page: 1
			})

			this.props.fetchMoreData(1, idName);
		}
	}

  render() {
		const {
			isLoading,
			isEndOfCatalog
		} = this.props;

    return (
			<ScrollView
				style={{height: 200}}
				bounces={false}
				scrollEventThrottle={300}
				onScroll={({nativeEvent}) => this.handleScroll(nativeEvent)}
			>
				<View style={styles.gridContainer}>
					{/* <GridHeader> */}
					<View style={styles.gridRow}> 
							<View style={[{ flex: 3 }, styles.cell]}>
								<Text>
									Face
								</Text>
							</View>
							<View style={[{ flex: 1 }, styles.cell]}>
								<TouchableOpacity onPress={() => this.handleSort('size')}>
									<Text>
										Size
										{this.renderCaretDown('size')}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={[{ flex: 2 }, styles.cell]}>
								<TouchableOpacity onPress={() => this.handleSort('date')}>
									<Text>
										Date
										{this.renderCaretDown('date')}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={[{ flex: 1 }, styles.cell]}>
								<TouchableOpacity onPress={() => this.handleSort('price')}>
									<Text>
										Price
										{this.renderCaretDown('price')}
									</Text>
								</TouchableOpacity>
							</View>
					</View>
					{/* </GridHeader> */}
					{/* <GridBody> */}
					{ this.renderBody() }
					{ isLoading ? (
						<View>
							<ActivityIndicator size={'large'} />
						</View>
					) : null }

					{ isEndOfCatalog ? (
						<View>
							<Text>
								~ end of catalogue ~
							</Text>
						</View>
					) : null }
					{/* </GridBody> */}
				</View>
			</ScrollView>
    );
  }
}

const styles = {
	cell: {
		alignSelf: 'stretch',
		borderWidth: 0.5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	gridContainer: {
		flex: 1, 
		alignSelf: 'stretch', 
		flexDirection: 'column'
	},
	gridRow: {
		flex: 1, 
		alignSelf: 'stretch', 
		flexDirection: 'row' 
	}
}