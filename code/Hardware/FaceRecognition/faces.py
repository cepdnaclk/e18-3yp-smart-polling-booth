from voterDetails import voters
import cv2
import face_recognition
import numpy as np
import time

known_face_encodings = []
known_face_IDs = []

# Function to encode the image for a given voter
def imgEncoding(voter):
    division = voter["divisionID"]
    _id = voter["_id"]

    imgFile = face_recognition.load_image_file(f"faces/{division}/{_id}.jpg")
    encodedImg = face_recognition.face_encodings(imgFile)[0]

    known_face_encodings.append(encodedImg)
    known_face_IDs.append(_id)

# Iterate over the voters and encode their images
for voter in voters:
    imgEncoding(voter)

# Initialize some variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

video_capture = cv2.VideoCapture(0)

start_time = time.time()
run = True

while (run):
    # Grab a single frame of video
    ret, frame = video_capture.read()

    if not ret:
        print("Failed to read frame from the video capture device.")
        break

    if frame.size == 0:
        print("Empty frame received.")
        break

    # Only process every other frame of video to save time
    if process_this_frame:
        # Resize frame of video to 1/4 size for faster face recognition processing
        small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
        # rgb_small_frame = small_frame[:, :, ::-1]
        rgb_small_frame = np.ascontiguousarray(small_frame[:, :, ::-1])


        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

        face_names = []

        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
            id = "Unknown"

            # If a match was found in known_face_encodings, find the closest match
            face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                id = known_face_IDs[best_match_index]

            face_names.append(id)

            if id != "Unknown":
                print("Match found:", id)
                run = False
                break

    process_this_frame = not process_this_frame

    # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a rectangle around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 0.8, (255, 255, 255), 1)

    # Display the resulting image
    cv2.imshow('Video', frame)

    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture resources
video_capture.release()

# Destroy any remaining OpenCV windows
cv2.destroyAllWindows()