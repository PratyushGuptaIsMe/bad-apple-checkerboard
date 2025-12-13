from PIL import Image
import json

def get_all_frames():
    try:
        for i in range(total_frames):
            i_str = str(i)
            frame_number = (5-len(i_str)) * "0" + i_str
            frame = Image.open(f"../8x8-bad-apple/frame_{frame_number}.png")
            width, height = frame.size
            current_frame = []
            res_divider = 60
            for x in range(int(width / res_divider)):
                for y in range(int(height / res_divider)):
                    current_frame.append(frame.getpixel((x,y)))
            all_frames.append(current_frame)
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



total_frames = 3087 + 1   # offset
all_frames = []

get_all_frames()

with open("../all_frames.json", "w") as all_frames_file:
    json.dump(all_frames, all_frames_file)