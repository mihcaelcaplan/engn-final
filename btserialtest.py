import serial
import time

ser=serial.Serial('/dev/rfcomm0', 9600)

while 1:
	print ser.readline()
	time.sleep(5)
