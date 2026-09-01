import os
from PIL import Image, ImageChops

def trim(im):
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        return im.crop(bbox)
    return im

user_uploaded_dir = r"c:\Users\prite\.gemini\antigravity-ide\brain\f938694c-f0e6-4994-8ea8-6a4ef51ca697\.user_uploaded"
dest_dir = r"c:\Users\prite\Downloads\mmmmalabarhill\public\images\committee"

# Map of filename -> destination name
# I need the exact mapping I used before.
# Let's just re-copy everything and do it for the 10 files.
files_to_process = {
    "media_1787943654676.png": "chandrakant_sangle.png",
    "media_1787943668065.png": "amit_upadhyay.png",
    "media_1787943681017.png": "kishore_shetty.png",
    "media_1787944006134.png": "kshitij_sangle.png",
    "media_1787944006145.png": "ketan_patel.png",
    "media_1787945408309.png": "mahesh_yamkar.png",
    "media_1787945435021.png": "harsh_patel.png",
    "media_1787945458354.png": "nikhil_parab.png",
    "media_1787945475667.png": "aditya_pawar.png",
    "media_1787945525246.png": "shivkumar_pandey.png"
}

for src, dst in files_to_process.items():
    src_path = os.path.join(user_uploaded_dir, src)
    dst_path = os.path.join(dest_dir, dst)
    
    if os.path.exists(src_path):
        try:
            with Image.open(src_path) as img:
                # 1. Trim white borders
                # The background might be white (255, 255, 255)
                # Let's ensure it's RGB
                img = img.convert("RGB")
                
                # Trim by finding the bounding box of non-white pixels
                # A simple way to trim white:
                bg = Image.new(img.mode, img.size, (255, 255, 255))
                diff = ImageChops.difference(img, bg)
                bbox = diff.getbbox()
                if bbox:
                    img = img.crop(bbox)
                
                width, height = img.size
                
                # 2. Assume the left part is the human.
                # If width > height, we crop a square from the left.
                if width > height:
                    img = img.crop((0, 0, height, height))
                elif height > width:
                    # if it's taller, crop the top square? Usually faces are top/center.
                    # let's just do top square for now, or center
                    img = img.crop((0, 0, width, width))
                
                img.save(dst_path)
                print(f"Processed {src} -> {dst}")
        except Exception as e:
            print(f"Failed {src}: {e}")
