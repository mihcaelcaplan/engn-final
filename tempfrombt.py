import serial 
import time
import requests
import re
from datetime import date

temp1 = "no data"
temp2 = "no data"
#spoofData1 = "1: 21.56"
# spoofData2 = "2: 22.60"

todayDate = date.today()

ser = serial.Serial('/dev/rfcomm0', 9600) 

appUrl = "https://script.google.com/macros/s/AKfycbzzlP4cezvCwk4kBNd7Oqy_gAkRoRyjOswl9M2dUeEMUIjQCFEM/exec"

firstLine = ser.readline() #replace with serial.readline()
#firstLine = "1: 23.22"
time.sleep(0.5)
secondLine = ser.readline()
# secondLine = "1:"

print firstLine
print secondLine

templist = [re.findall('1: ([0-9.]{5})', firstLine), re.findall('1: ([0-9.]{5})', secondLine),re.findall('2: ([0-9.]{5})', firstLine),re.findall('2: ([0-9.]{5})', firstLine)]

for n in templist:
	print n

try:
	temp1 = float(str(templist[0][0]))
except:
	print "templist 1 not good"
try:
	temp1 = float(str(templist[1][0]))
except:
	print "templist 2 no good"
try:
	temp2 = float(str(templist[2][0]))
except:
	print "templist 3 not good"
try:
	temp2 = float(str(templist[3][0]))
except:
	print "templist 4 no good"

#print temp1

#temp2 =  float(line[11:16])
params = {
	"temp1":temp1,
	"temp2":temp2,			
	"sheet":todayDate

}

requests.get(appUrl, params=params)


## set any temps that need to be set

tempToSet = requests.get("https://script.google.com/macros/s/AKfycbwgqd_FgWQGQALPWGxY-6HDmNVtiBbdf6EIQo3jok3Bgrddgtc/exec?tempRequest=yes").content

if((abs(float(tempToSet)-float(temp1)) > 1)):
	ser.write(tempToSet)
	print "setting temp to " + tempToSet
	
else:
	requests.get("https://script.google.com/macros/s/AKfycbwgqd_FgWQGQALPWGxY-6HDmNVtiBbdf6EIQo3jok3Bgrddgtc/exec?tempSet=yes")			
