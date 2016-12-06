import serial 
import time
import requests

#spoofData1 = "1: 21.56"
# spoofData2 = "2: 22.60"

# ser = serial.Serial('/dev/ttyACM0', 9600) #change to /dev/tty?

appUrl = "https://script.google.com/macros/s/AKfycbzzlP4cezvCwk4kBNd7Oqy_gAkRoRyjOswl9M2dUeEMUIjQCFEM/exec"

line = serial.readline() #replace with serial.readline()
temp1  = float(line[3:8])
#temp2 =  float(line[11:16])
params = {
	"temp1":temp1,
	# "temp2":temp2
}
requests.get(appUrl, params=params)

