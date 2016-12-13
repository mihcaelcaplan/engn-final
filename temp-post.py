from w1thermsensor import W1ThermSensor
import os

#os.system('modprobe w1-gpio')
#os.system('modprobe w1-therm')

#sensor = W1ThermSensor(W1ThermSensor.THERM_SENSOR_DS18B20,"0316741f27ff")
sensor = W1ThermSensor()
temperature_in_celsius = sensor.get_temperature()
print temperature_in_celsius
