#include <SoftwareSerial.h>
 
SoftwareSerial mySerial(10,11); // RX, TX
 
void setup()
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
 
  Serial.println("Ready!");
 
  // set the data rate for the SoftwareSerial port
 
  // for HC-05 use 38400 when poerwing with KEY/STATE set to HIGH on power on
  mySerial.begin(9600);
}
 
void loop() // run over and over
{
 static char buffer[80];
if (mySerial.available()){
  for (int i=0; i<2; i++) {
    buffer[i] = mySerial.read();
    delay(50);
  }
 Serial.println(buffer);
  }
  if (Serial.available())
    mySerial.write(Serial.read());
}
