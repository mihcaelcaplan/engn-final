//////////////////////////////////////////////////////////////////
//©2011 bildr
//Released under the MIT License - Please reuse change and share
//Simple code to output a PWM sine wave signal on pin 9
//////////////////////////////////////////////////////////////////

#define fadePin 3

void setup(){
  pinMode(fadePin, OUTPUT);  
}

void loop(){

  analogWrite(fadePin, 255);
  delay(500);
 analogWrite(fadePin, 0);
delay(1000);
  


}
