import {StyleSheet, Text, View} from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  timeFrameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
  },
  timeFrameText: {
    padding: 10,
    borderRadius: 5,
  },
  timeFrameLabelText: {
    fontSize: 16,
  },
  selectedTimeFrame: {
    backgroundColor: colors.primary,
  },
  selectedTimeFrameText: {
    color: colors.white,
  },
});

export default styles;
