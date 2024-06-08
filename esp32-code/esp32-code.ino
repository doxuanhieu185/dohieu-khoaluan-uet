#include <WiFi.h>
#include <PubSubClient.h>
// Khai bao network
const char* ssid = "...";// tên mạng WIFI
const char* password = "phong402";// Password truy cập
const char* mqtt_server = "91.121.93.94";// Địa chỉ IP của Broker.

WiFiClient espClient;
PubSubClient client(espClient);

#define sub "S"
#define subStatus "getStatus"
#define pub "S_tt"
#define pubFan "isFanOn"
#define pubAir "isAirOn"
#define pubChan "isChanOn"
#define pubTV "isTvOn"
#define pubTem "homeTemperature"
#define GPIO_PIN 3
#define GPIO_PIN1 1
#define GPIO_PIN2 22
#define GPIO_PIN3 23

#define GPIO1 32
#define GPIO2 33
#define GPIO3 25
#define GPIO4 26

bool buttonState1 = HIGH; 
bool buttonState2 = HIGH; 
bool buttonState3 = HIGH; 
bool buttonState4 = HIGH; 


bool isAirOn = false;
bool isChandeOn = false;
bool isFanOn = false;
bool isTvOn = false;

char myData[15];
void setup_wifi() {
  delay(10);
  // Bat dau ket noi voi wifi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Da ket noi WiFi");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a client ID
    String clientId = "ESP8266Client-01";
    if (client.connect(clientId.c_str())) {
      Serial.println("MQTT connected");
      client.subscribe(sub);
      client.subscribe(subStatus);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void receiveData(){
  byte n = Serial2.available();
   if(n != 0)
   {
       byte m = Serial2.readBytesUntil('\n', myData, sizeof(myData) - 1);
       myData[m] = '\0';     //insert null-character
       Serial.println(myData);    //should appear Temp signal coming from Snder
       int data = atoi(myData);
       Serial.println(data);   

       if(data == 1 ){
        if(isAirOn==false){
          isAirOn = true;
          digitalWrite(GPIO_PIN, 1);
          client.publish(pubAir, "1");                   
        }else{
          isAirOn =false;
          digitalWrite(GPIO_PIN, 0);
          client.publish(pubAir, "0");

        }
       } else if(data == 2 ){
          if(isChandeOn==false){
          isChandeOn = true;
          digitalWrite(GPIO_PIN1, 1);
          client.publish(pubChan, "1");
          }else{
          isChandeOn=false;
          digitalWrite(GPIO_PIN1, 0);
          client.publish(pubChan, "0");
        }
      } else if(data == 3 ){
        if(isFanOn==false){
          isFanOn = true;
          digitalWrite(GPIO_PIN2, 1);
          client.publish(pubFan, "1");
          }
        else{
          isFanOn=false;
          digitalWrite(GPIO_PIN2, 0);
          client.publish(pubFan, "0");
        }
      } else if (data == 4){
        if(isTvOn==false){
          isTvOn = true;
          digitalWrite(GPIO_PIN3, 1);
          client.publish(pubTV, "1");
          }
        else{
          isTvOn=false;
          digitalWrite(GPIO_PIN3, 0);
          client.publish(pubTV, "0");
          } 
      } else if( data == 0 || data == 5){
      }else {
        String dataString = String(data);
        const char* dataChar = dataString.c_str();
        client.publish(pubTem, dataChar);
      }
   }
}


void callback(char* topic, byte* payload, unsigned int length) {
  if(strcmp(topic, "S") == 0){  
    Serial.print("Tin nhan[");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < length; i++) {
      Serial.print((char)payload[i]);
    }
    Serial.println();
    if ((char)payload[0] == '1') {
      if(isChandeOn==true){
        client.publish(pubChan, "0");
        isChandeOn = false;
        digitalWrite(GPIO_PIN1, 0);
      }else{
        isChandeOn = true;   
        digitalWrite(GPIO_PIN1, 1);     
        client.publish(pubChan, "1");
      }
    } else if ((char)payload[0] =='0'){
        if(isAirOn==true){
          isAirOn = false;
          digitalWrite(GPIO_PIN, 0);
          client.publish(pubAir, "0");
        }else{
          isAirOn = true;
          digitalWrite(GPIO_PIN, 1);
          client.publish(pubAir, "1");
          
      }
    } else if((char)payload[0] == '2')
    {
      if(isFanOn==true){
        isFanOn = false;
        digitalWrite(GPIO_PIN2, 0);
        client.publish(pubFan, "0");
      }else{
        isFanOn = true;
        digitalWrite(GPIO_PIN2, 1);
        client.publish(pubFan, "1");
      }
    }
    else if((char)payload[0] == '3')
    {
      if(isTvOn==true){
        isTvOn = false;
        digitalWrite(GPIO_PIN3, 0);
        client.publish(pubTV, "0");
      }else{
        isTvOn = true;
        digitalWrite(GPIO_PIN3, 1);
        client.publish(pubTV, "1");
      }    
    }
  } else if(strcmp(topic, "getStatus") == 0)
  {
    Serial.print("Tin nhan[");
    Serial.print(topic);
    Serial.print("] ");
    for (int i = 0; i < length; i++) {
      Serial.print((char)payload[i]);
    }
    Serial.println();
    if ((char)payload[0] == '0') {
    if(isAirOn == false){
      client.publish(pubAir, "0");
    } else {client.publish(pubAir, "1");}

    if(isChandeOn == false){
      client.publish(pubChan, "0");
    } else {client.publish(pubChan, "1");}

    if(isFanOn == false){
      client.publish(pubFan, "0");
    } else {client.publish(pubFan, "1");}

    if(isTvOn == false){
      client.publish(pubTV, "0");
    } else {client.publish(pubTV, "1");}
    }
  }
  
}
void buttonControl(){
  buttonState1 = digitalRead(GPIO1);
  buttonState2 = digitalRead(GPIO2);
  buttonState3 = digitalRead(GPIO3);
  buttonState4 = digitalRead(GPIO4);

  // Kiểm tra nếu nút được nhấn, chuyển đổi trạng thái của các chân output
  if (buttonState1 == LOW) {
    digitalWrite(GPIO_PIN, !digitalRead(GPIO_PIN)); // Chuyển đổi trạng thái của chân GPIO_PIN
    delay(200); // Đợi 200ms để tránh đọc các lần nhấn liên tục
  }

  if (buttonState2 == LOW) {
    digitalWrite(GPIO_PIN1, !digitalRead(GPIO_PIN1)); // Chuyển đổi trạng thái của chân GPIO_PIN1
    delay(200);
  }

  if (buttonState3 == LOW) {
    digitalWrite(GPIO_PIN2, !digitalRead(GPIO_PIN2)); // Chuyển đổi trạng thái của chân GPIO_PIN2
    delay(200);
  }

  if (buttonState4 == LOW) {
    digitalWrite(GPIO_PIN3, !digitalRead(GPIO_PIN3)); // Chuyển đổi trạng thái của chân GPIO_PIN3
    delay(200);
  }
}



void setup() {
  Serial.begin(9600);
  Serial2.begin(9600, SERIAL_8N1, 16, 17); 
  pinMode(GPIO_PIN, OUTPUT);
  pinMode(GPIO_PIN1, OUTPUT);
  pinMode(GPIO_PIN2, OUTPUT);
  pinMode(GPIO_PIN3, OUTPUT);
  pinMode(GPIO1, INPUT_PULLUP); 
  pinMode(GPIO2, INPUT_PULLUP);
  pinMode(GPIO3, INPUT_PULLUP);
  pinMode(GPIO4, INPUT_PULLUP);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}


void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();
  receiveData();
  buttonControl();
}
