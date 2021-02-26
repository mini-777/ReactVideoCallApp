import React, {useState, useRef, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import styled from 'styled-components';
import mixIn from '../style/Mixin';
import BASE_URL from '../settings/URL';
import axios from 'axios';

export default function Search({navigation, route}) {
  const [searchVal, setSearchVal] = useState('');
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const searchRef = useRef();

  useEffect(() => {
    console.log('this is route', route);
    getData();
  }, [route]);
  const getData = async () => {
    var firstData = [];
    const res = await fetch(
      'http://182.162.22.239:9091/barcode/v1.0/cust/list',
      {
        method: 'GET',
      },
    );
    const resJson = await res.json();
    setData(resJson.response);
    for await (var i of resJson.response) {
      firstData.push(i.custNm);
    }
    setSearchedData(firstData);
  };
  const searchData = async (text: React.SetStateAction<string>) => {
    setSearchVal(text);
    var searchData = [];

    for await (var i of data) {
      var carNm = i.custNm;
      if (carNm.includes(text)) {
        searchData.push(carNm);
      }
    }
    setSearchedData(searchData);
  };

  const renderItem = ({item}) => {
    return (
      <ResultList
        onPress={() => {
          navigation.navigate('Vendor', {});
          axios
            .post(`${BASE_URL}3001/signup`, {
              token: route.params.token,
              email: route.params.email,
              password: route.params.password,
              phoneNum: route.params.phoneNum,
              name: route.params.name,
            })
            .then(() => {
              Alert.alert('회원가입이 완료되었습니다 !');
              navigation.replace('Login', route.params);
            })
            .catch(err => {
              console.error(err);
            });
        }}>
        <ResultItem>{item}</ResultItem>
      </ResultList>
    );
  };

  const clearInput = () => {
    setSearchVal('');
    setData([]);
    navigation.goBack();
  };

  return (
    <Container>
      <SearchBarWrap>
        <SearchIcon
          source={{
            uri: 'https://webstockreview.net/images/search-icon-png-4.png',
          }}
          touch={searchVal}
        />
        <SearchBar
          ref={searchRef}
          placeholder="검색어를 입력해 주세요"
          onChangeText={(text: string) => searchData(text)}
          touch={searchVal}
          animation={typed}
        />
        <Cancel
          touch={searchVal}
          animation={btnIn}
          onPress={() => clearInput()}>
          <Text>취소</Text>
        </Cancel>
      </SearchBarWrap>
      <ResultContainer>
        <ResultLabel>업체 선택하기</ResultLabel>
        <FlatList
          data={searchedData}
          renderItem={renderItem}
          keyExtractor={(item, idx) => idx.toString()}
        />
      </ResultContainer>
    </Container>
  );
}

const Container = styled.View``;

const SearchBarWrap = styled.View`
  position: relative;
  ${mixIn.flex('row', 'flex-start', 'center')};
  width: 100%;
`;

const Cancel = Animatable.createAnimatableComponent(styled.TouchableOpacity`
  padding-left: 10px;
`);

const SearchIcon = styled.Image`
  position: absolute;
  left: 19;
  width: 20px;
  height: 20px;
  z-index: ${({touch}) => (touch.length > 0 ? -1 : 1)};
`;

const SearchBar = Animatable.createAnimatableComponent(styled.TextInput`
  width: ${({touch}) => (touch.length > 0 ? '80%' : '95%')};
  height: 50px;
  margin: 10px;
  padding-left: 10px;
  border-radius: 10;
`);

const ResultContainer = styled.View`
  height: 100%;
`;

const ResultLabel = styled.Text`
  height: 50px;
  padding-left: 10px;
  line-height: 60px;
  font-size: 12px;
`;

const ResultList = styled.TouchableOpacity`
  height: 60px;
  padding-left: 10px;
  border: 0.3px solid #ddd;
`;

const ResultItem = styled.Text`
  line-height: 60px;
`;

const typed = {
  0: {
    width: '95%',
  },
  1: {
    width: '80%',
  },
};

const btnIn = {
  0: {
    animation: false,
  },
  1: {
    animation: 'slideInRight',
  },
};
