from PIL import Image
total_frames = 3087 + 1 # offset
all_frames = []

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

print(all_frames)