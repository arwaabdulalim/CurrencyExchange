import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  PERMISSIONS,
  RESULTS,
  request,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';
import styles from './styles';

const Home = ({navigation}) => {
  const [locationCord, setLocationCord] = useState({});
  const [addressName, setAddressName] = useState('');

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(info => {
      setLocationCord({
        lat: info.coords?.latitude,
        long: info.coords?.longitude,
      });
      getReverseGeocoding();
    });
  };
  const getReverseGeocoding = () => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=30.0444&lon=31.2357&format=json`,
    )
      .then(response => response.json())
      .then(data => {
        setAddressName(`${data.address.city}, ${data.address.country}`);
      })
      .catch(error => console.error(error));
  };

  const askForLocationPermission = () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    )
      .then(result => {
        if (
          result === RESULTS.UNAVAILABLE ||
          result === RESULTS.DENIED ||
          result === RESULTS.LIMITED ||
          result === RESULTS.BLOCKED
        ) {
          Alert.alert('location permission is not granted');
          request(
            Platform.OS === 'ios'
              ? PERMISSIONS.IOS.LOCATION_ALWAYS
              : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result === RESULTS.GRANTED) {
              getCurrentLocation();
            }
          });
        }
        if (result === RESULTS.GRANTED) {
          getCurrentLocation();
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const askForNotificationPermission = () => {
    checkNotifications().then(({status, settings}) => {
      if (status !== 'granted') {
        requestNotifications(['alert', 'sound']).then(({status, settings}) => {
          if (status === 'granted') {
            Alert.alert('Notification permission granted.');
          } else {
            Alert.alert('Notification permission not granted.');
          }
        });
      }
    });
  };
  useEffect(() => {
    askForLocationPermission();
    askForNotificationPermission();
  }, []);

  const handleLocationChange = text => {
    setAddressName(text);
  };

  const handleSubmit = () => {
    navigation.navigate('CurrencyChart');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Let's Start</Text>

      <View style={styles.locationWrapper}>
        <Text style={styles.wherefromTxt}>Where Are You From?</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          placeholderTextColor="white"
          onChangeText={handleLocationChange}
          value={addressName}
        />
      </View>
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
