{"files":[{"id":"67c309c2-7b32-4c2c-a345-3d54a3c88aa7","name":"Code","type":"server_js","source":"//global vars\nvar spreadsheet\u003dSpreadsheetApp.openById(\"1LJJyrZIYCjeUJ_x5o9MZyoiQaQL2RQgNiDag9Go385s\");\n\nvar commands  \u003d [[\"Temperature:temp1\", \"Temperature:temp2\", \"Temperature:all\"],[\"Settemp:specific\",\"Settemp:offset\"]]\n\nfunction doGet(e){\n  if(e.parameter[\u0027tempSet\u0027]\u003d\u003d\"yes\"){\n  sheet \u003d spreadsheet.getSheetByName(\"setTemp\");\n  isTempSetRange \u003d sheet.getRange(sheet.getLastRow(),2);\n  isTempSetRange.setValue(\"yes\");\n    \n  }\n  \n  if(e.parameter[\u0027tempRequest\u0027]){ //serve temp to set to python script\n    //get from setTempSheet\n    sheet \u003d spreadsheet.getSheetByName(\"setTemp\");\n    tempRange \u003d sheet.getRange(sheet.getLastRow(),1)\n    isTempSetRange \u003d sheet.getRange(sheet.getLastRow(),2);\n    isTempSet \u003d isTempSetRange.getValue()\n    \n    if(isTempSet \u003d\u003d\"yes\"){\n      tempToSet \u003d 0;\n    }\n    else{\n      tempToSet \u003d tempRange.getValue();\n    }\n   return ContentService.createTextOutput(tempToSet)\n  }\n  \n  else{ // do text stuff\n  if (e.parameter[\u0027Body\u0027]\u003d\u003dcommands[0][0]){\n   xml \u003d  getLastTemperature(\"temp1\");\n  }\n  else if(e.parameter[\u0027Body\u0027]\u003d\u003dcommands[0][1]){\n   xml \u003d  getLastTemperature(\"temp2\");\n  }\n  else if(e.parameter[\u0027Body\u0027]\u003d\u003dcommands[0][2]){\n   xml \u003d  getLastTemperature(\"all\");\n  }\n  else if(e.parameter[\u0027Body\u0027].slice(0,16)\u003d\u003dcommands[1][0]){\n    tempToSet \u003d e.parameter[\u0027Body\u0027].slice(17,19);\n    globalSetTemp \u003d tempToSet;\n    xml \u003d  setTemp(tempToSet);\n   //post to setTemp sheet\n    sheet \u003d spreadsheet.getSheetByName(\"setTemp\");\n    newVal \u003d sheet.getRange(sheet.getLastRow()+1, 1)\n    \n    newVal.setValue(tempToSet); \n  }\n  else if(e.parameter[\u0027Body\u0027]\u003d\u003dcommands[1][1]){\n   xml \u003d  getLastTemperature(\"all\");\n  }\n  else{\n    xml \u003d blindReply();  \n  } \n   return ContentService.createTextOutput(xml).setMimeType(ContentService.MimeType.XML);\n    \n  }\n}\n\nfunction blindReply(){\nvar responseBody \u003d \"no idea what you said\"\nvar message \u003d XmlService.createElement(\"Message\").setText(responseBody);\nvar response \u003d XmlService.createElement(\"Response\").addContent(message);\n  \n  var document \u003d XmlService.createDocument(response);\n  var xml \u003d XmlService.getPrettyFormat().format(document);\n \n  Logger.log(xml);\n  \n  return xml\n\n\n}\n\nfunction getLastTemperature(tempToGet){\nvar currentdate \u003d new Date();\nvar currentSheetName \u003d currentdate.getFullYear()+\"-\"+(currentdate.getMonth()+1)+\"-\"+currentdate.getDate();\nvar currentSheet \u003d spreadsheet.getSheetByName(currentSheetName);\nvar specificTemp \u003d \"temp1\"; // e.g temp1, temp2, avgTemp?\nvar tempColumn \u003d 0;\nvar sheetValues \u003d currentSheet.getSheetValues(1,1,1,parseInt(currentSheet.getLastColumn())) // get the values for the first line where the headers will be\n\n// get last reported temperature\nif(tempToGet\u003d\u003d\"all\"){\n  for(i\u003d0; i\u003c currentSheet.getLastColumn();i++){ // this for loop checks through headers to find correct column, then adds data after last row\n    if(sheetValues[0][i] \u003d\u003d \"temp1\"){\n      tempColumn\u003di+1;\n    }\n }\n  var tempRange \u003d currentSheet.getRange(currentSheet.getLastRow(), tempColumn);\n  var temp1 \u003d  tempRange.getValue();\n  \n  for(i\u003d0; i\u003c currentSheet.getLastColumn();i++){ // this for loop checks through headers to find correct column, then adds data after last row\n    if(sheetValues[0][i] \u003d\u003d \"temp2\"){\n      tempColumn\u003di+1;\n    }\n }\n  var tempRange \u003d currentSheet.getRange(currentSheet.getLastRow(), tempColumn);\n  var temp2 \u003d  tempRange.getValue();\n  \n  lastTemp \u003d String(temp1) + String(temp2);\n}\n  \nelse{\n for(i\u003d0; i\u003c currentSheet.getLastColumn();i++){ // this for loop checks through headers to find correct column, then adds data after last row\n    if(sheetValues[0][i] \u003d\u003d tempToGet){\n      tempColumn\u003di+1;\n    }\n }\n  var tempRange \u003d currentSheet.getRange(currentSheet.getLastRow(), tempColumn);\n  var lastTemp \u003d  tempRange.getValue();\n  //Logger.log(temp);\n}\n// create twiml response\n  var message \u003d XmlService.createElement(\"Message\").setText(\"The last recorded temp is: \"+ lastTemp+\" degrees C.\");\n  var response \u003d XmlService.createElement(\"Response\").addContent(message);\n  var document \u003d XmlService.createDocument(response);\n  var xml \u003d XmlService.getPrettyFormat().format(document);\n  Logger.log(xml);\nreturn xml;\n}\n\nfunction setTemp(tempToSet){\n\n var message \u003d XmlService.createElement(\"Message\").setText(\"Setting temp to \"+ tempToSet+\" degrees C.\");\n var response \u003d XmlService.createElement(\"Response\").addContent(message);\n var document \u003d XmlService.createDocument(response);\n var xml \u003d XmlService.getPrettyFormat().format(document);\n  Logger.log(xml);\nreturn xml;\n\n}\n\nfunction test(){\ntempToSet \u003d \"34\"\n    sheet \u003d spreadsheet.getSheetByName(\"setTemp\");\n    newVal \u003d sheet.getRange(1,1)\n    \n    newVal.setValue(tempToSet); \n}"}]}