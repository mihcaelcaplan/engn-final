from twilio.rest import TwilioRestClient

account = "AC6321622f3fce5d434d49e8b2840d19f5"
token = "f3b2a624a2ed934df25b08461962b205"
client = TwilioRestClient(account, token)

message = client.sms.messages.create(to="+16038920138",
                                     from_="+16039314820",
                                     body="fuck you you piece of shit")