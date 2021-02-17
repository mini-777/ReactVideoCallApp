import React, {useState, useRef, setState} from 'react';
import {StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components';

const Cancel = Animatable.createAnimatableComponent(styled.TouchableOpacity`
  display: ${({touch}) => (touch.length > 0 ? 'flex' : 'none')};
  padding-left: 10px;
`);

function SearchVendor({navigation}) {
  const [data, setData] = setState('');
  const searchData = async Text => {
    const res = await fetch(
      `http://182.162.22.239:9091/barcode/v1.0/cust/list`,
      {
        method: 'GET',
      },
    );
    const resJson = await res.json();
    const newResJson = resJson;
    setData(newResJson.products);
  };
  const renderItem = ({item}) => {
    retrun(
      <ResultList
        onPress={() =>
          navigation.navigate('ProductDetail', {productId: item.id})
        }>
        <ResultItem>{item.name}</ResultItem>
      </ResultList>,
    );
  };
  retrun(
    <SearchBarWrap>
      <SearchIcon
        source={{
          uri: 'https://webstockreview.net/images/search-icon-png-4.png',
        }}
        touch={searchVal}
      />
      <SearchBar
        ref={SearchRef}
        placeholder="업체명을 입력해주세요"
        onChangeText={text => searchData(text)}
      />
      <Cancel
        touch={searchVal}
        animation={searchVal.length > 0 ? btnIn : false}
        onPress={() => clearInput()}>
        <Text>취소</Text>
      </Cancel>
    </SearchBarWrap>,
  );
}

const styles = StyleSheet.create({});

export default SearchVendor;
