import {StyleSheet, Platform} from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    alignSelf: 'center',
    color: colors.primary,
  },
  pickersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    bottom: Platform.OS === 'ios' ? 50 : 20,
  },
  pickerContainer: {
    width: '35%',
  },

  chartContainer: {
    height: 200,
    marginBottom: 16,
  },
  chart: {
    flex: 1,
  },
  convertButton: {
    width: '40%',
    height: 50,
    borderRadius: 30,
    top: 4,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  converText: {color: 'white', fontWeight: 'bold'},
  inputWrapper: {
    flexDirection: 'row',
    top: Platform.OS === 'ios' ? 100 : 160,
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  input: {
    height: 50,
    width: '40%',
    color: colors.primary,
    textAlign: 'center',
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  convertedAmountText: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: Platform.OS === 'ios' ? 50 : 150,
  },
});

export default styles;
