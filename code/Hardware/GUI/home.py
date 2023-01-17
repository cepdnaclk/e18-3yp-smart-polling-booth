import sys
sys.path.append("../Fingerprint/")

fin = __import__('../Fingerprint.fin.py')

# import fin
from voterDetails import voters

import time
import subprocess

# while True:
print("Hi, Welcome to .smart polling booth")
print("Place your finger on the fingerprint Sensor")

if fin.get_fingerprint():
    voter = fin.findVoter(fin.finger.finger_id)
    print("Voter's fingerprint Authenticatd")
    # start camera and detect face
    # subprocess.run(["python3", "final.py"])

    # recognnize face

    # send respose  

    print(voter)
    time.sleep(3)

else:
    print("Voter not recognized. Try again\n")
    time.sleep(3)
