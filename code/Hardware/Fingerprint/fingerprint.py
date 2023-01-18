# SPDX-FileCopyrightText: 2021 ladyada for Adafruit Industries
# SPDX-License-Identifier: MIT
import sys
sys.path.append("../GUI/")

import voterDetails
# from voterDetails import voters

import time
import serial
import adafruit_fingerprint
# from home import findVoter
import json

uart = serial.Serial("/dev/ttyUSB1", baudrate=57600, timeout=1)
finger = adafruit_fingerprint.Adafruit_Fingerprint(uart)

##################################################

def findVoter(id):
    for voter in voters:
        if (int(voter["fingerprint"][0:3]) == (id)):
            return voter

def authenticate_fingerprint():
    # Get the image from the sensor
    print("Waiting for image...")
    while finger.get_image() != adafruit_fingerprint.OK:
        pass
    # Create a template from the sensor image
    print("Templating...")
    if finger.image_2_tz(1) != adafruit_fingerprint.OK:
        return False

    # Read the locally saved fingerprint image and create a template
    with open("985478523V.png", "rb") as f:
        saved_image = f.read()
    saved_template = adafruit_fingerprint.create_template(saved_image)

    # Compare the two templates
    result = adafruit_fingerprint.compare_template(finger.finger_id, saved_template)
    if result == adafruit_fingerprint.OK:
        print("Fingerprint authenticated!")
        return True
    else:
        print("Fingerprint not authenticated.")
        return False


##################################################
def get_fingerprint():
    """Get a finger print image, template it, and see if it matches!"""

    print("Put yout finger on the Fingerprint Sensor...")
    while finger.get_image() != adafruit_fingerprint.OK:
        pass

    # print("Templating...")
    if finger.image_2_tz(1) != adafruit_fingerprint.OK:
        return False

    # print("Searching...")
    if finger.finger_search() != adafruit_fingerprint.OK:
        return False
    return True


# pylint: disable=too-many-branches
def get_fingerprint_detail():
    """Get a finger print image, template it, and see if it matches!
    This time, print out each error instead of just returning on failure"""
    print("Getting image...", end="")

    i = finger.get_image()
    if i == adafruit_fingerprint.OK:
        print("Image taken")
    else:
        if i == adafruit_fingerprint.NOFINGER:
            print("No finger detected")
        elif i == adafruit_fingerprint.IMAGEFAIL:
            print("Imaging error")
        else:
            print("Other error")
        return False

    print("Templating...", end="")
    i = finger.image_2_tz(1)
    if i == adafruit_fingerprint.OK:
        print("Templated")
    else:
        if i == adafruit_fingerprint.IMAGEMESS:
            print("Image too messy")
        elif i == adafruit_fingerprint.FEATUREFAIL:
            print("Could not identify features")
        elif i == adafruit_fingerprint.INVALIDIMAGE:
            print("Image invalid")
        else:
            print("Other error")
        return False

    print("Searching...", end="")
    i = finger.finger_fast_search()
    # pylint: disable=no-else-return
    # This block needs to be refactored when it can be tested.
    if i == adafruit_fingerprint.OK:
        print("Found fingerprint!")
        return True
    else:
        if i == adafruit_fingerprint.NOTFOUND:
            print("No match found")
        else:
            print("Other error")
        return False


# pylint: disable=too-many-statements
def enroll_finger(id):
    """Take a 2 finger images and template it, then store in 'location'"""

    voter = findVoter(id)
    for fingering in range(1, 3):
        if fingering == 1:
            print("Place finger on sensor...", end="")
        else:
            print("Place same finger again...", end="")

        while True:
            i = finger.get_image()
            if i == adafruit_fingerprint.OK:
                print("Image taken")
                break
            if i == adafruit_fingerprint.NOFINGER:
                print(".", end="")
            elif i == adafruit_fingerprint.IMAGEFAIL:
                print("Imaging error")
                return False
            else:
                print("Other error")
                return False

        print("Templating...", end="")
        i = finger.image_2_tz(fingering)
        if i == adafruit_fingerprint.OK:
            print("Templated")
        else:
            if i == adafruit_fingerprint.IMAGEMESS:
                print("Image too messy")
            elif i == adafruit_fingerprint.FEATUREFAIL:
                print("Could not identify features")
            elif i == adafruit_fingerprint.INVALIDIMAGE:
                print("Image invalid")
            else:
                print("Other error")
            return False

        if fingering == 1:
            print("Remove finger")
            time.sleep(1)
            while i != adafruit_fingerprint.NOFINGER:
                i = finger.get_image()

    print("Creating model...", end="")
    i = finger.create_model()
    if i == adafruit_fingerprint.OK:
        print("Created")
    else:
        if i == adafruit_fingerprint.ENROLLMISMATCH:
            print("Prints did not match")
        else:
            print("Other error")
        return False

    print("Storing model #%d..." % id, end="")
    i = finger.store_model(id)
    if i == adafruit_fingerprint.OK:
        print("Stored")
        print("Voter Registered Successfully...")
        print("Voter Details")
        print("Name: " + voter["fname"])
        print("NIC : " + voter["nic"])

    else:
        if i == adafruit_fingerprint.BADLOCATION:
            print("Bad storage location")
        elif i == adafruit_fingerprint.FLASHERR:
            print("Flash storage error")
        else:
            print("Other error")
        return False

    return True


def save_fingerprint_image(filename):
    """Scan fingerprint then save image to filename."""
    while finger.get_image():
        pass

    # let PIL take care of the image headers and file structure
    from PIL import Image  # pylint: disable=import-outside-toplevel

    img = Image.new("L", (256, 288), "white")
    pixeldata = img.load()
    mask = 0b00001111
    result = finger.get_fpdata(sensorbuffer="image")

    # this block "unpacks" the data received from the fingerprint
    #   module then copies the image data to the image placeholder "img"
    #   pixel by pixel.  please refer to section 4.2.1 of the manual for
    #   more details.  thanks to Bastian Raschke and Danylo Esterman.
    # pylint: disable=invalid-name
    x = 0
    # pylint: disable=invalid-name
    y = 0
    # pylint: disable=consider-using-enumerate
    for i in range(len(result)):
        pixeldata[x, y] = (int(result[i]) >> 4) * 17
        x += 1
        pixeldata[x, y] = (int(result[i]) & mask) * 17
        if x == 255:
            x = 0
            y += 1
        else:
            x += 1

    if not img.save(filename):
        return True
    return False


##################################################


def get_num(max_number):
    """Use input() to get a valid number from 0 to the maximum size
    of the library. Retry till success!"""
    i = -1
    while (i > max_number - 1) or (i < 0):
        try:
            i = int(input("Enter ID # from 0-{}: ".format(max_number - 1)))
        except ValueError:
            pass
    return i


# while True:
#     # print("----------------")
#     # if finger.read_templates() != adafruit_fingerprint.OK:
#     #     raise RuntimeError("Failed to read templates")
#     # print("Fingerprint templates: ", finger.templates)
#     # if finger.count_templates() != adafruit_fingerprint.OK:
#     #     raise RuntimeError("Failed to read templates")
#     # print("Number of templates found: ", finger.template_count)
#     # if finger.read_sysparam() != adafruit_fingerprint.OK:
#     #     raise RuntimeError("Failed to get system parameters")
#     # print("Size of template library: ", finger.library_size)
#     # print("e) enroll fingerprint")
#     # print("a) Authenticate Fingerprint")
#     # print("f) find fingerprint")
#     # print("d) delete fingerprint")
#     # print("s) save fingerprint image")
#     # print("r) reset library")
#     # print("q) quit")
#     # print("----------------")
#     # # c = input("> ")
#     c="f"

#     #############################################

#     if c =="a":
#         authenticate_fingerprint()

#     #############################################


#     # enroll new finger
#     if c == "e":
#         # enroll_finger(get_num(finger.library_size))
#         finger_id = int(input("Enter your Fingerprint ID:(001-300) "))
#         enroll_finger(finger_id)


#     # find the enrolled finger
#     if c == "f":
#         if get_fingerprint():
#             print("Detected #", finger.finger_id, "with confidence", finger.confidence)
#             voter = findVoter(finger.finger_id)
#             print("Voter Authenticatd")
#             print("Name", voter["fname"])
#             print("NIC", voter["nic"]+"\n")
#             time.sleep(3)

#         else:
#             print("Finger not found. Try again\n")
#             time.sleep(3)

#     # delete finger
#     if c == "d":
#         if finger.delete_model(get_num(finger.library_size)) == adafruit_fingerprint.OK:
#             print("Deleted!")
#         else:
#             print("Failed to delete")

#     # save a fingerprint
#     if c == "s":
#         finger_id = input("Enter Voter's ID : ")
#         if save_fingerprint_image(finger_id+".png"):
#             print("Fingerprint image saved")
#         else:
#             print("Failed to save fingerprint image")

#     # remove all fingerprint images
#     if c == "r":
#         if finger.empty_library() == adafruit_fingerprint.OK:
#             print("Library empty!")
#         else:
#             print("Failed to empty library")

#     # quit the program
#     if c == "q":
#         print("Exiting fingerprint example program")
#         raise SystemExit