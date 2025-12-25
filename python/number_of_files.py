import os

folder = "../bad-apple"

files = [f for f in os.listdir(folder) if os.path.isfile(os.path.join(folder, f))]
print("Number of files:", len(files))

