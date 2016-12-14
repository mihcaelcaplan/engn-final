//for temp sensing
#include <DallasTemperature.h>
#include <OneWire.h>
#include <SoftwareSerial.h>
// Data wire is plugged into pin 2 on the Arduino
#define ONE_WIRE_BUS 2
// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);
//construct new softwareserial with hc-05 connected to rx/tx pins
SoftwareSerial mySerial(10,11); // RX, TX

//for motor
#define fadePin 3

void setup() {
//motor setup
 pinMode(fadePin, OUTPUT); 

//temp setup
 // start serial port
  Serial.begin(9600);
 // Serial.println("Dallas Temperature IC Control Library Demo");
 //start virtual serial for hc-05 comms
  mySerial.begin(9600);

  // Start up the library
  sensors.begin();
}

void loop() {
static char buffer[80];
if (mySerial.available()){
  for (int i=0; i<2; i++) {
    buffer[i] = mySerial.read();
    delay(50);
  }
 Serial.println(buffer);
  }


//temp code

 // call sensors.requestTemperatures() to issue a global temperature
  // request to all devices on the bus
 // Serial.print(" Requesting temperatures...");
  sensors.requestTemperatures(); // Send the command to get temperatures
  //Serial.println("DONE");

 // prints to arduino serial monitor for debugging
 //Serial.print("1: ");
 // Serial.print(sensors.getTempCByIndex(0)); // Why "byIndex"? 
 //Serial.print("2: ");
 //Serial.println(sensors.getTempCByIndex(1));
    // You can have more than one IC on the same bus. 
    // 0 refers to the first IC on the wire

//sends to serial over bluetooth
mySerial.print ("1: ");
mySerial.print(sensors.getTempCByIndex(0));
mySerial.print ("2: ");
mySerial.println(sensors.getTempCByIndex(1));
delay(500);


//motor code
  if(buffer){
    float setTemp = atof(buffer);
    Serial.println("set temp: " + String(setTemp));

    float tempDiff = sensors.getTempCByIndex(0) - setTemp;
    Serial.println("temp diff: " + String(tempDiff));

   if(setTemp > 0 && tempDiff > 0 ){
   analogWrite(fadePin, 255);
   delay(50);
   analogWrite(fadePin, 100);
   delay(1000);
   analogWrite(fadePin, 0);
   
  }
else if(setTemp > 0 && tempDiff < 0 ){
   analogWrite(fadePin, -255);
   delay(50);
   analogWrite(fadePin, -100);
   delay(1000);
   analogWrite(fadePin, 0);
    }

  }

for (int i=0; i<2; i++) {
    buffer[i] = 0;
}
Serial.flush();
mySerial.flush();
}


