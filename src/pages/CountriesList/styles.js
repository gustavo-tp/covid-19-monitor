import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17202A',
    padding: 15,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    width: '82%',
    height: 44,
    backgroundColor: '#212F3D',
    color: '#FFF',
    fontSize: 16,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 15
  },
  globalButton: {
    width: '15%',
    height: 44,
    backgroundColor: '#212F3D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
