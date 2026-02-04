import requests
import json
import os
import time

API_KEY = "quickstart-QUdJIGlzIGNvbWluZy4uLi4K"
URL = "https://api.deepai.org/api/text2img"
OUT_DIR = r"c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs\public\assets\img\products"

PROMPTS = {
    "amrit_honey_glass_jar_v6.png": "straight sided clear glass jar filled with honey white label gold border white background product photo",
    "amrit_mint_oil_v6.png": "small amber essential oil bottle black dropper cap label text Amrit Mint Oil mint leaves illustration white background product photo",
    "amrit_lemongrass_oil_v6.png": "small amber essential oil bottle black dropper cap label text Amrit Lemongrass Oil lemongrass stalks illustration white background product photo"
}

def generate(filename, prompt):
    print(f"Generating {filename}...")
    try:
        r = requests.post(
            URL,
            data={'text': prompt},
            headers={'api-key': API_KEY},
            timeout=60,
            verify=False # Bypass SSL if needed
        )
        
        if r.status_code == 200:
            data = r.json()
            if 'output_url' in data:
                img_url = data['output_url']
                print(f"Downloading from {img_url}...")
                
                img_r = requests.get(img_url, verify=False)
                if img_r.status_code == 200:
                    out_path = os.path.join(OUT_DIR, filename)
                    with open(out_path, 'wb') as f:
                        f.write(img_r.content)
                    print(f"Saved {out_path}")
                else:
                    print(f"Failed to download image: {img_r.status_code}")
            else:
                print(f"No output_url in response: {data}")
        else:
            print(f"API Error {r.status_code}: {r.text}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if not os.path.exists(OUT_DIR):
        os.makedirs(OUT_DIR)
        
    for name, prompt in PROMPTS.items():
        generate(name, prompt)
