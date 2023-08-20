import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const TimeFrameSelector = ({selectedTimeFrame, onSelectTimeFrame}) => {
  const timeFrames = ['1D', '1M', '3M', '1Y', '5Y'];

  return (
    <View style={styles.timeFrameRow}>
      {timeFrames.map(timeFrame => (
        <TouchableOpacity
          key={timeFrame}
          style={[
            styles.timeFrameText,
            selectedTimeFrame === timeFrame && styles.selectedTimeFrame,
          ]}
          onPress={() => {
            onSelectTimeFrame && onSelectTimeFrame(timeFrame);
          }}>
          <Text
            style={[
              styles.timeFrameLabelText,
              selectedTimeFrame === timeFrame && styles.selectedTimeFrameText,
            ]}>
            {timeFrame}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TimeFrameSelector;
