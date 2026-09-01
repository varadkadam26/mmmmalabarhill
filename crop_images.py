import os
from PIL import Image

image_dir = r"c:\Users\prite\Downloads\mmmmalabarhill\public\images\committee"

for filename in os.listdir(image_dir):
    if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
        filepath = os.path.join(image_dir, filename)
        try:
            with Image.open(filepath) as img:
                width, height = img.size
                # If image is wider than it is tall, it probably has the text on the right
                if width > height:
                    # Crop to a square from the left (left=0, upper=0, right=height, lower=height)
                    # Some images might have the face slightly offset, but usually 0 to height is perfect for a left-aligned photo.
                    # Wait, if width is like 800 and height is 600, then left crop of 600x600 is good.
                    
                    # Sometimes the user's images have a lot of white space, so let's just make it a square on the left.
                    cropped_img = img.crop((0, 0, height, height))
                    cropped_img.save(filepath)
                    print(f"Cropped {filename}")
                else:
                    print(f"Skipped {filename} (already square or portrait)")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")
