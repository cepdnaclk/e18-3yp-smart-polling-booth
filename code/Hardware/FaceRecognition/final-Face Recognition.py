from voterDetails import voters

import cv2
import face_recognition
import numpy as np
import time

# Get a reference to webcam #0 (the default one)
# video_capture = cv2.VideoCapture(0)

# # Load a sample picture and learn how to recognize it.
# kushan= face_recognition.load_image_file("faces/kushan.jpg")
# kushan_encoding= face_recognition.face_encodings(kushan)[0]

known_face_encodings = []
known_face_IDs = []

def imgEncoding(voter):
    print("encoding")
    division = voter["divisionID"]
    id = voter["_id"]

    imgFile= face_recognition.load_image_file("faces/" + division + "/" + id + ".jpg")
    encodedImg = face_recognition.face_encodings(imgFile)[0]

    known_face_encodings.append(encodedImg)

for voter in voters:
    print("For loop")
    imgEncoding(voter)
    known_face_IDs.append(voter["_id"])

# known_face_encodings = [kushan_encoding, dhananjaya_encoding]
# known_face_names = ["Kushan", "Dhananjaya"]

copy_FaceIDs = known_face_IDs.copy()

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

video_capture = cv2.VideoCapture(0)

# now = datetime.now()
# current_date = now.strftime("%Y-%m-%d")

# f = open(current_date + ".csv", "w+", newline="")
# writer = csv.writer(f)

start_time = time.time()

# while time.time() - start_time < 5:
while True:
    # Grab a single frame of video
    print("while start")
    ret, frame = video_capture.read()


    # if ret:
    #     rows, cols, _ = frame.shape
    #     M = cv2.getRotationMatrix2D((cols/2,rows/2), 90, 0.5)
    #     small_frame = cv2.warpAffine(frame, M, (cols, rows))

    # Only process every other frame of video to save time
    if process_this_frame:
        print("process this frame-while")

        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        rgb_small_frame = small_frame[:, :, ::-1]

        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []

        for face_encoding in face_encodings:
            print("face encoding-while")

            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            id = "Unknown"

            # print(matches)

            # If a match was found in known_face_encodings, just use the first one.
            if True in matches:
                first_match_index = matches.index(True)
                name = known_face_IDs[first_match_index]

            # # Or instead, use the known face with the smallest distance to the new face
            # face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            # best_match_index = np.argmin(face_distances)
            # if matches[best_match_index]:
            #     id = known_face_IDs[best_match_index]

            face_names.append(id)

            if id in known_face_IDs:
                if id in copy_FaceIDs:
                    print("if if-while")

                    print(id)
                    
                    break
                    # people.remove(name)
                    # print(people)
                    # current_time = now.strftime("%H-%M-%S")
                    # writer.writerow([id, current_time])

    print("not process")
    process_this_frame = not process_this_frame
    video_capture.release()
    cv2.destroyAllWindows()
    # # Display the results
    # for (top, right, bottom, left), id in zip(face_locations, face_names):
    #     # Scale back up face locations since the frame we detected in was scaled to 1/4 size
    #     top *= 4
    #     right *= 4
    #     bottom *= 4
    #     left *= 4

    #     # Draw a box around the face
    #     cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

    #     # Draw a label with a name below the face
    #     cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
    #     font = cv2.FONT_HERSHEY_DUPLEX
    #     cv2.putText(frame, id, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

    # # Display the resulting image
    # cv2.imshow('Face Recognition System', frame)

    # # Hit 'q' on the keyboard to quit!
    # if cv2.waitKey(1) & 0xFF == ord('q'):
    #     break
    # # ------------------------
    # # Release handle to the webcam
    # f.close()
    # video_capture.release()
    # cv2.destroyAllWindows()