import {StyleSheet, Platform} from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  locationWrapper: {
    backgroundColor: colors.primary,
    width: '90%',
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  wherefromTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.white,
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: colors.white,
  },
  button: {
    color: colors.primary,
    fontSize: Platform.OS === 'ios' ? 24 : 20,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default styles;
