import {Dimensions, StyleSheet} from 'react-native';

const dimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default StyleSheet.create({
  rect: {
    flex: 1,
    backgroundColor: 'rgba(21,31,40,1)',
  },
  자동차문의는무진콜: {
    color: 'rgba(255,255,255,1)',
    fontSize: 45,
    lineHeight: 50,
    textAlign: 'left',
    marginLeft: 3,
    marginRight: 2,
  },
  button: {
    height: 81,
    backgroundColor: 'rgba(29,161,242,1)',
    borderRadius: 100,
    justifyContent: 'center',
    marginTop: 120,
  },
  계정생성하기: {
    color: 'rgba(255,255,255,1)',
    fontSize: 24,
    alignSelf: 'center',
  },
  자동차문의는무진콜Column: {
    marginTop: 233,
    marginLeft: 31,
    marginRight: 31,
  },
  자동차문의는무진콜ColumnFiller: {
    flex: 1,
  },
  rect2: {
    height: 39,
    marginBottom: 45,
    marginLeft: 28,
    marginRight: 28,
  },
  이미계정이있으신가요: {
    color: 'rgba(255,255,255,1)',
    fontSize: 20,
    marginTop: 13,
  },
  max: {
    flex: 1,
  },
  buttonHolder: {
    height: 100,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#0093E9',
    borderRadius: 25,
    margin: 10
  },
  buttonText: {
    color: '#fff',
  },
  fullView: {
    width: dimensions.width,
    height: dimensions.height - 100,
  },
  remoteContainer: {
    width: '100%',
    height: 150,
    position: 'absolute',
    top: 5,
  },
  remote: {
    width: 150,
    height: 150,
    marginHorizontal: 2.5,
  },
  noUserText: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#0093E9',
  },
});
