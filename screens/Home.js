import {View, Text, StyleSheet, Image, ScrollView, Switch} from 'react-native';
import React, {useState} from 'react';
import {LineChart} from 'react-native-gifted-charts';
import {useEffect} from 'react';
import mqtt from 'sp-react-native-mqtt';
const Home = () => {
  const [temperatureHome, setTemperatureHome] = useState();

  const publishData = (topic, message) => {
    mqtt
    .createClient({
      uri: 'mqtt://test.mosquitto.org:1883',
      clientId: 'your_client_id',
    })
    .then(function (client) {
      
      client.on('closed', function () {
        console.log('mqtt.event.closed');
      });

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg);
      });

      client.on('message', function (msg) {
        console.log('mqtt.event.message', msg);

        
      });

      client.on('connect', function () {
        console.log('connected');
        client.publish(topic, message, 0, false);
      });

      client.connect();
    })
    .catch(function (err) {
      console.log(err);
    });
  };

  useEffect(() => {
     mqtt
      .createClient({
        uri: 'mqtt://test.mosquitto.org:1883',
        clientId: 'your_client_id',
      })
      .then(function (client) {
        
        client.on('closed', function () {
          console.log('mqtt.event.closed');
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
        });

        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg);

          
          if (msg.topic === 'homeTemperature') {
            console.log(
              'Received message from topic homeTemperature:',
              msg.data.toString(),
            );
            setTemperatureHome(msg.data.toString());
          }
          else if (msg.topic === 'isFanOn') {
            if(msg.data.toString() === '0'){
              setSwitchValue3(false);
            }else{
              setSwitchValue3(true);
            }
          }
          else if (msg.topic === 'isAirOn') {
            if(msg.data.toString() === '0'){
              setSwitchValue1(false);
            }else{
              setSwitchValue1(true);
            }
          }
          else if (msg.topic === 'isChanOn') {
            if(msg.data.toString() === '0'){
              setSwitchValue2(false);
            }else{
              setSwitchValue2(true);
            }
          }
          else if (msg.topic === 'isTvOn') {
            if(msg.data.toString() === '0'){
              setSwitchValue4(false);
            }else{
              setSwitchValue4(true);
            }
          }
        });

        client.on('connect', function () {
          console.log('connected');
          client.publish('getStatus', '0', 0, false);

          client.subscribe('homeTemperature', 0);
          client.subscribe('isFanOn', 0);
          client.subscribe('isAirOn', 0);
          client.subscribe('isChanOn', 0);
          client.subscribe('isTvOn', 0);
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);
  const [switchValue3, setSwitchValue3] = useState(false);
  const [switchValue4, setSwitchValue4] = useState(false);

  const handleSwitch1Toggle = value => {
    setSwitchValue1(value);
    publishData('S', '0');
    
  };
  const handleSwitch2Toggle = value => {
    setSwitchValue2(value);
    publishData('S', '1');

    
  };
  const handleSwitch3Toggle = value => {
    setSwitchValue3(value);
    publishData('S', '2');
    
  };
  const handleSwitch4Toggle = value => {
    setSwitchValue4(value);
    publishData('S', '3');
    
  };

  const LineData = [
    {hour: '00:00', value: 20},
    {hour: '04:00', value: 21},
    {hour: '08:00', value: 22},
    {hour: '12:00', value: 30},
    {hour: '16:00', value: 29},
    {hour: '20:00', value: 25},
    {hour: '24:00', value: 20},
  ];

  return (
    <ScrollView style = {{ }}>
      <View style={styles.roomStatusFrame}>
        <View style={styles.roomTemperatureFrame}>
          <Image
            style={styles.homeIcon}
            source={require('../assets/home.png')}></Image>
              <Text style={styles.homeTemperature}>
      {temperatureHome ? `${temperatureHome}° C` : '26° C'}
    </Text>
        </View>

        <Text style={styles.indoorStatus}>
          The indoor temperature is stable
        </Text>
      </View>

      <Text style={styles.equiment}>Living room equipment:</Text>

      <View>
      <View style={styles.equimetFrame}>
          <Image
            style={styles.equimentIcon}
            source={require('../assets/home_fragment/Chandelier_icon.png')}
          />
          <View style={{width: '40%'}}>
            <Text style={styles.equimentName}>Chandelier</Text>
          </View>

          <Switch
            style={styles.switchStyle}
            value={switchValue2}
            onValueChange={handleSwitch2Toggle}
            trackColor={{false: '#767577', true: '#9BFF89'}}
            thumbColor={switchValue2 ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            disabled={false}
          />
        </View>
        <View style={styles.equimetFrame}>
          <Image
            style={styles.equimentIcon}
            source={require('../assets/home_fragment/air-conditionaer_icon.png')}
          />
          <View style={{width: '40%'}}>
            <Text style={styles.equimentName}>Air conditional</Text>
          </View>

          <Switch
            style={styles.switchStyle}
            value={switchValue1}
            onValueChange={handleSwitch1Toggle}
            trackColor={{false: '#767577', true: '#9BFF89'}}
            thumbColor={switchValue1 ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            disabled={false}
          />
        </View>



        <View style={styles.equimetFrame}>
          <Image
            style={styles.equimentIcon}
            source={require('../assets/home_fragment/fan_icon.png')}
          />
          <View style={{width: '40%'}}>
            <Text style={styles.equimentName}>Fan</Text>
          </View>

          <Switch
            style={styles.switchStyle}
            value={switchValue3}
            onValueChange={handleSwitch3Toggle}
            trackColor={{false: '#767577', true: '#9BFF89'}}
            thumbColor={switchValue3 ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            disabled={false}
          />
        </View>

        <View style={styles.equimetFrame}>
          <Image
            style={styles.equimentIcon}
            source={require('../assets/home_fragment/tv_icon.png')}
          />
          <View style={{width: '40%'}}>
            <Text style={styles.equimentName}>Tv</Text>
          </View>

          <Switch
            style={styles.switchStyle}
            value={switchValue4}
            onValueChange={handleSwitch4Toggle}
            trackColor={{false: '#767577', true: '#9BFF89'}}
            thumbColor={switchValue4 ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            disabled={false}
          />
        </View>
      </View>

      <View style={{alignSelf: 'center'}}>
        <Text style={styles.text}>Nhiệt độ trong 24h qua</Text>
        <LineChart
          initialSpacing={0}
          data={LineData}
          spacing={50}
          height={180}
          thickness={5}
          hideRules
          yAxisColor="#0BA5A4"
          showVerticalLines
          verticalLinesColor="rgba(14,164,164,0.5)"
          xAxisColor="#0BA5A4"
          color="#0BA5A4"
          isAnimated
          showValuesAsDataPointsText
          lineGradient
          xAxisLabelTextStyle={{
            color: 'black',
            textAlign: 'center',
            fontWeight: '500',
          }}
          yAxisLabelTextStyle={{
            color: 'black',
            textAlign: 'center',
            fontWeight: '500',
          }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  roomStatusFrame: {
    height: 130,
    width: '90%',
    borderRadius: 18,
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
    marginLeft: '5%',
  },
  roomTemperatureFrame: {
    margin: 15,
    width: 105,
    height: 105,
    backgroundColor: 'white',
    borderRadius: 18,
    flexDirection: 'column',
  },
  homeIcon: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: 5,
  },
  homeTemperature: {
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
  },
  indoorStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    color: 'black',
  },
  equiment: {
    marginLeft: '5%',
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    color: 'black',
  },
  equimetFrame: {
    height: 70,
    width: '90%',
    borderRadius: 20,
    backgroundColor: '#DCDCDC',
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    marginLeft: '5%',
  },
  equimentIcon: {
    height: 50,
    width: 50,
    marginLeft: 10,
  },
  equimentName: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 20,
    color: 'black',
  },
  switchStyle: {
    marginLeft: 70,
  },
  text: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
});
export default Home;