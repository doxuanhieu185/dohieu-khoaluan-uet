import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking} from 'react-native';
import WebView from 'react-native-webview';

const API_KEY = 'a8c17324444e7e88c1d97275ab074290';

const LocationSr = () => {

  const [cityName, setCityName] = useState('Ha Noi');
  const url = 'https://www.google.com/search?q=Ha+Noi&rlz=1C5CHFA_enVN976VN976&oq=Ha+Noi&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg9MgYIAhBFGDzSAQk1MTEzajBqMTWoAgiwAgE&sourceid=chrome&ie=UTF-8'
  const handlePress = () => {
    Linking.openURL(generateGoogleSearchURL(cityName));
  };
  const [location, setLocation] = useState();

  const [weatherData, setWeatherData] = useState(null);
  const [googleSearchURL, setGoogleSearchURL] = useState('');

  const [loading, setLoading] = useState(true);

  const generateGoogleSearchURL = (cityName) => {
    const encodedCityName = encodeURIComponent(cityName);
    
    const url = `https://www.google.com/search?q=${encodedCityName}&rlz=1C5CHFA_enVN976VN976&oq=&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxjCAzIJCAAQRRg7GMIDMgkIARBFGDsYwgMyCQgCEEUYOxjCAzIJCAMQRRg7GMIDMgkIBBBFGDsYwgMyCQgFEEUYOxjCAzIJCAYQRRg7GMIDMgkIBxBFGDsYwgPSAQsxNzEyNjg5ajBqN6gCCLACAQ&sourceid=chrome&ie=UTF-8`;
    
    return url;
  }
  useEffect(() => {
    if (cityName) {
      const url = generateGoogleSearchURL(cityName);
      setGoogleSearchURL(url);
    }
  }, [cityName]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!cityName) return; // Kiểm tra nếu cityName không tồn tại thì không thực hiện việc gọi API

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a8c17324444e7e88c1d97275ab074290&units=metric`,
        );
        const data = await response.json();
        console.log('Weather data:', data);
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const getTemperatureDescription = temp => {
    if (temp >= 20 && temp <= 25) {
      return 'Nhiệt độ khá ổn';
    } else if (temp >= 26 && temp <= 30) {
      return 'Trời hơi nóng rùi nha';
    } else if (temp >= 31 && temp <= 35) {
      return 'Nóng quá';
    } else if (temp >= 36 && temp <= 40) {
      return 'Trời ơi nóng quá';
    } else if (temp >= 10 && temp < 20) {
      return ' Khá bá lạnh nha';
    } else {
      return ' Nhiệt độ này thì chịu';
    }
  };

  return (
    <ScrollView>
      <View style={styles.currentLocationFrame}>
        <Image
          style={{
            height: 30,
            width: 30,
            alignSelf: 'center',
            marginLeft: 10,
            marginRight: 10,
          }}
          source={require('../assets/location.png')}
        />
        <Text style={styles.locationText}> Hanoi-Vietnam</Text>
      </View>

      <View style={styles.statusFrame}>
        <View style={styles.wetherFrame}>
          <Image
            source={require('../assets/location_fragment/cloudy_and_sun.png')}
            style={styles.weatherItem}></Image>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text style={styles.temperature}>{weatherData.main.temp}° C</Text>
          )}
        </View>
        <View style={{flex: 1}}>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text style={styles.locationText}>
              {getTemperatureDescription(weatherData.main.temp)}
            </Text>
          )}
        </View>
      </View>
      <TouchableOpacity onPress={handlePress} style = {{width:'90%', height:550, alignSelf:'center', marginTop:40, borderTopRadius:20}}>
      <WebView
        source={{ uri: googleSearchURL }} 
        style={{ flex: 1 }}
        pointerEvents="none"
        />
      </TouchableOpacity>

      <View style={styles.mapFrame}>
        <Image
          source={require('../assets/location_fragment/hanoi_map.png')}
          style={styles.imageCurrentMap}></Image>
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  ImageFrame: {
    height: 140,
    width: '90%',
    borderRadius: 18,
    color: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
  currentLocationImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 18,
    alignSelf: 'center',
  },
  currentLocationFrame: {
    width: 240,
    height: 40,
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    borderRadius: 15,
    marginLeft: '5%',
    marginTop: 40,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '500',
    alignSelf: 'center',
    color: 'black',
  },
  statusFrame: {
    height: 130,
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: '5%',
  },
  wetherFrame: {
    margin: 15,
    width: 105,
    height: 105,
    backgroundColor: 'white',
    borderRadius: 18,
    flexDirection: 'column',
  },
  weatherItem: {
    width: 60,
    height: 60,
    alignSelf: 'center',
  },
  temperature: {
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
  },
  mapFrame: {
    height: 160,
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginLeft: '5%',
    position:'absolute',
    top:'29%', 
    borderTopRadius:18
  },
  imageCurrentMap: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
  },
});
export default LocationSr;
