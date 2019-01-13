import React from 'react';
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import Grid from '../components/Grid/Grid';
import { api } from '../constants/Api';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    data: [],
    isLoading: false,
    lastSeenAd: null,
    ads: [],
    isEndOfCatalog: false
  }

  componentDidMount = () => {
    this.fetchMoreData(1)
  }

  getNewAd = () => {
    let randomNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;

    while (randomNumber === this.state.lastSeenAd) {
      randomNumber = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
    }

    this.setState({
      lastSeenAd: randomNumber,
      ads: [...this.state.ads, `${api}/ads?r=${randomNumber}`]
    });
  }

  fetchMoreData = async (page, sortedColumn) => {
    if (this.state.isEndOfCatalog === true && page !== 1) {
      return null;
    }

    this.setState({
      isLoading: true,
      isEndOfCatalog: false
    });

    if (page === 1) {
      this.setState({
        data: []
      });
    }

    let response = await fetch(`${api}/products?_page=${page}&_sort=${sortedColumn}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });

    let data = await response.json();

    if ((data.length + this.state.data.length)%20 !== this.state.ads.length) {
      this.getNewAd();
    }

    this.setState({
      data: [...this.state.data, ...data],
      isLoading: false,
      endOfCatalog: data.length<10
    })
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
          <Grid 
            data={this.state.data}
            isLoading={this.state.isLoading}
            fetchMoreData={(page, sortedColumn) => this.fetchMoreData(page, sortedColumn)}
            getNewAd={() => this.getNewAd()}
            ads={this.state.ads}
            isEndOfCatalog={this.state.isEndOfCatalog}
          />
        </View>
      </SafeAreaView>
    );
  }
}