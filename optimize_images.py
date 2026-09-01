#!/usr/bin/env python3
import os
import sys
from PIL import Image

def optimize_image(filepath):
    ext = os.path.splitext(filepath)[1].lower()
    if ext not in ['.jpg', '.jpeg', '.png']:
        return

    orig_size = os.path.getsize(filepath)
    filename = os.path.basename(filepath)
    dirname = os.path.dirname(filepath)
    base_name = os.path.splitext(filename)[0]
    webp_path = os.path.join(dirname, base_name + '.webp')

    try:
        with Image.open(filepath) as img:
            # Generate WebP
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                img_conv = img.convert('RGBA')
                img_conv.save(webp_path, 'WEBP', quality=82, method=6)
            else:
                img_conv = img.convert('RGB')
                img_conv.save(webp_path, 'WEBP', quality=82, method=6)
            
            webp_size = os.path.getsize(webp_path)

            # Re-optimize original PNG/JPG in place
            if ext in ['.jpg', '.jpeg']:
                img_conv = img.convert('RGB')
                img_conv.save(filepath, 'JPEG', quality=82, optimize=True)
            elif ext == '.png':
                # Preserve alpha transparency if present
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    img.save(filepath, 'PNG', optimize=True)
                else:
                    img_conv = img.convert('P', palette=Image.ADAPTIVE, colors=256)
                    img_conv.save(filepath, 'PNG', optimize=True)

            new_size = os.path.getsize(filepath)
            print(f"Optimized {filename}: Orig={orig_size//1024}KB -> New={new_size//1024}KB, WebP={webp_size//1024}KB")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

def main():
    target_dir = os.path.join(os.path.dirname(__file__), 'public', 'images')
    print(f"Starting image optimization in {target_dir}...")
    for root, dirs, files in os.walk(target_dir):
        for f in files:
            filepath = os.path.join(root, f)
            optimize_image(filepath)

if __name__ == '__main__':
    main()
