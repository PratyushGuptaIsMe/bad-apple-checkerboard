from PIL import Image
import json


def get_all_frames():
    try:
        for i in range(1, total_frames):
            if(len(str(i)) == 1):
                i = "00" + str(i)
            elif(len(str(i)) == 2):
                i = "0" + str(i)
            elif(len(str(i)) == 3):
                i = str(i)
            elif(len(str(i)) == 4):
                i = str(i)
            else:
                print("Unintended.")
                exit(1)
                return

            print(i)
            frame = Image.open(f"../{folder}/bad_apple_{i}.png")
            frame = frame.convert("L")

            frame = frame.resize((8, 8), Image.NEAREST)  
            pixels = frame.getdata()
            all_frames.append(list(pixels))


    except FileNotFoundError:
        print("File path not found. Please edit your settings or smth.")
    except:
        print("idk what happened man some error I messed up idk")


def frames_int_to_bool():
    for i in range(len(all_frames)):
        for j in range(len(all_frames[i])):
            if(all_frames[i][j] == 0):
                all_frames[i][j] = False
            elif(all_frames[i][j] == 255):
                all_frames[i][j] = True
            else:
                print("The image is not black and white ONLY.")



total_frames = 6562   # offset
all_frames = []

folder = "bad-apple"
project_name = "bad_apple"

get_all_frames()

with open(f"../projects/{project_name}.json", "w") as all_frames_file:
    json.dump(all_frames, all_frames_file)   # dump json into .json 