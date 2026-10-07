import os
import subprocess

directory = "public/images/ads"
for file in sorted(os.listdir(directory)):
    if file.endswith(".jpg"):
        path = os.path.join(directory, file)
        # run tesseract
        try:
            result = subprocess.run(["tesseract", path, "stdout", "-l", "eng+mar", "--oem", "1"], capture_output=True, text=True)
            text = result.stdout
            if "Rajesh Kangane" in text or "राजेश कांगणे" in text or "कांगणे" in text or "राजेश" in text or "Mid Land" in text or "Shivsena" in text or "शिवसेना" in text:
                print(f"{file} contains suspicious text")
        except:
            pass
