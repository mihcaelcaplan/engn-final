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
 
void setup(void)
{
  // start serial port
  Serial.begin(9600);
 // Serial.println("Dallas Temperature IC Control Library Demo");
 //start virtual serial for hc-05 comms
  mySerial.begin(9600);

  // Start up the library
  sensors.begin();
}
 
 
void loop(void)
{
  // call sensors.requestTemperatures() to issue a global temperature
  // request to all devices on the bus
 // Serial.print(" Requesting temperatures...");
  sensors.requestTemperatures(); // Send the command to get temperatures
  //Serial.println("DONE");

 // old method of sending temp on serial port
 Serial.print("1: ");
  Serial.print(sensors.getTempCByIndex(0)); // Why "byIndex"? 
 Serial.print("2: ");
 Serial.println(sensors.getTempCByIndex(1));
    // You can have more than one IC on the same bus. 
    // 0 refers to the first IC on the wire
 
//char tempString1[] = sprintf(sensors.getTempCByIndex(0));
//char tempString1[5] = dtostrf(sensors.getTempCByIndex(0), 5, 2, 0);

mySerial.print ("1: ");
mySerial.print(sensors.getTempCByIndex(0));
mySerial.print ("2: ");
mySerial.println(sensors.getTempCByIndex(1));

delay(500);
}
