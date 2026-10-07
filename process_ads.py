import os
import subprocess
from PIL import Image
import shutil

# Create ads directory
output_dir = "public/images/ads"
if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir, exist_ok=True)

pdfs = [
    {"file": "Smarnika Colour - 1 - 2026 FINAL.pdf", "prefix": "c1"},
    {"file": "Smarnika Colour 2 - 2026 FINAL.pdf", "prefix": "c2"},
    {"file": "Smarnika Black - 2026 FINAL.pdf", "prefix": "b"}
]

# Exclusions (1-indexed page number, side: 'L' or 'R' or 'ALL')
exclusions = {
    "c1": [], # All ads are fine in Colour 1
    "c2": [
        (8, 'L'), # Shivsena
        (9, 'R')  # Akhil Bharatiya Sena
    ],
    "b": [
        (1, 'ALL'), (2, 'ALL'), (3, 'ALL'), (4, 'ALL'), (5, 'ALL'), (6, 'ALL'), (7, 'ALL'), # Trust info
        (12, 'L') # Shivsena
    ]
}

def is_excluded(prefix, page_num, side):
    for ex_page, ex_side in exclusions[prefix]:
        if ex_page == page_num and ex_side in (side, 'ALL'):
            return True
    return False

ad_count = 1
for pdf in pdfs:
    pdf_path = pdf["file"]
    prefix = pdf["prefix"]
    
    # Convert PDF to images using pdftoppm
    subprocess.run(["pdftoppm", "-jpeg", "-r", "150", pdf_path, f"/tmp/{prefix}"])
    
    # List generated images
    images = sorted([img for img in os.listdir("/tmp") if img.startswith(prefix) and img.endswith(".jpg")])
    
    for i, img_name in enumerate(images):
        page_num = i + 1
        img_path = os.path.join("/tmp", img_name)
        
        if is_excluded(prefix, page_num, 'ALL'):
            continue
            
        with Image.open(img_path) as img:
            width, height = img.size
            # Split in half
            left_box = (0, 0, width // 2, height)
            right_box = (width // 2, 0, width, height)
            
            left_img = img.crop(left_box)
            right_img = img.crop(right_box)
            
            if not is_excluded(prefix, page_num, 'L'):
                left_img.save(os.path.join(output_dir, f"ad_{ad_count:03d}.jpg"))
                ad_count += 1
                
            if not is_excluded(prefix, page_num, 'R'):
                right_img.save(os.path.join(output_dir, f"ad_{ad_count:03d}.jpg"))
                ad_count += 1

print(f"Total ads extracted: {ad_count - 1}")
