import serial 
import time
import requests
import re

temp1 = "no data"
#spoofData1 = "1: 21.56"
# spoofData2 = "2: 22.60"

ser = serial.Serial('/dev/ttyACM0', 9600) #change to /dev/tty?

appUrl = "https://script.google.com/macros/s/AKfycbzzlP4cezvCwk4kBNd7Oqy_gAkRoRyjOswl9M2dUeEMUIjQCFEM/exec"

# firstLine = ser.readline() #replace with serial.readline()
firstLine = "1: 23.22"
time.sleep(0.5)
secondline = ser.readline()
# secondLine = "1:"

templist = [re.findall('1: ([1-9.]{5})', firstLine), re.findall('1: ([1-9.]{5})', secondLine)]



try:
	temp1 = float(str(templist[0][0]))
except:
	print "templist 1 not good"
try:
	temp1 = float(str(templist[1][0]))
except:
	print "templist 2 no good"

print temp1

#temp2 =  float(line[11:16])
params = {
	"temp1":temp1,
	# "temp2":temp2
}
requests.get(appUrl, params=params)

