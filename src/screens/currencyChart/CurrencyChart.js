import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import * as shape from 'd3-shape';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import styles from './styles';
import TimeFrameSelector from '../../components/timeFrameSelector/TimeFrameSelector';
import colors from '../../themes/colors';
const screenWidth = Dimensions.get('window').width;

import {
  GetRate,
  getRates,
  getCurrencies,
  getRatesBasedOnTimeFrame,
} from '../../services/ApiServices';

const chartConfig = {
  backgroundGradientFrom: colors.primary,
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: colors.primary,
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const CurrencyChart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [exchangeCurrency, setExchangeCurrency] = useState('EUR');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('1D');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [inputAmount, setInputAmount] = useState('1');
  const [ratesTimeSeries, setRatesTimeSeries] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const [openExchange, setOpenExchange] = useState(false);
  const [openBase, setOpenBase] = useState(false);

  useEffect(() => {
    if (inputAmount !== '') {
      GetRate(inputAmount, baseCurrency, exchangeCurrency, setConvertedAmount);
    }
  }, [baseCurrency, exchangeCurrency]);

  useEffect(() => {
    getRates(
      baseCurrency,
      exchangeCurrency,
      convertedAmount,
      setRatesTimeSeries,
    );
  }, [baseCurrency, exchangeCurrency, convertedAmount]);

  useEffect(() => {
    getCurrencies(setCurrencies);
  }, []);

  useEffect(() => {
    const fetchDataBasedOnTimeFrame = async () => {
      const fetchedData = await getRatesBasedOnTimeFrame(
        baseCurrency,
        exchangeCurrency,
        inputAmount,
        selectedTimeFrame,
      );
      setSelectedData(fetchedData);
    };

    fetchDataBasedOnTimeFrame();
  }, [baseCurrency, exchangeCurrency, convertedAmount, selectedTimeFrame]);

  const OnCurrencyInputChange = input => {
    setInputAmount(input);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Currency Exchange</Text>
      <View style={styles.pickersWrapper}>
        <DropDownPicker
          containerStyle={styles.pickerContainer}
          searchable
          open={openExchange}
          value={baseCurrency}
          onChangeValue={value => setBaseCurrency(value)}
          items={currencies}
          setOpen={setOpenExchange}
          setValue={setBaseCurrency}
        />
        <Text>➡️</Text>
        <DropDownPicker
          containerStyle={styles.pickerContainer}
          searchable
          open={openBase}
          value={exchangeCurrency}
          onChangeValue={value => setExchangeCurrency(value)}
          items={currencies}
          setOpen={setOpenBase}
          setValue={setExchangeCurrency}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          placeholderTextColor={colors.black}
          keyboardType="numeric"
          value={inputAmount}
          onChangeText={text => OnCurrencyInputChange(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity
          onPress={() => {
            if (
              inputAmount.trim() !== '' &&
              baseCurrency !== exchangeCurrency
            ) {
              GetRate(
                inputAmount,
                baseCurrency,
                exchangeCurrency,
                setConvertedAmount,
              );
              getRates(
                baseCurrency,
                exchangeCurrency,
                convertedAmount,
                setRatesTimeSeries,
              );
            }
          }}
          style={styles.convertButton}>
          <Text style={styles.converText}>Convert</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.convertedAmountText}>
        {baseCurrency && exchangeCurrency
          ? `Converted Amount: ${convertedAmount !== '' ? convertedAmount : ''}`
          : 'Select both currencies to convert'}
      </Text>
      <TimeFrameSelector
        selectedTimeFrame={selectedTimeFrame}
        onSelectTimeFrame={setSelectedTimeFrame}
      />
      <View style={styles.chartContainer}>
        {selectedData?.length > 0 && (
          <LineChart
            data={{
              datasets: [
                {
                  data: selectedData,
                  color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                  strokeWidth: 3,
                },
              ],
            }}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default CurrencyChart;
