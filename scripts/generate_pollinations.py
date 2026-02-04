import requests
import os
import time

BASE_URL = "https://image.pollinations.ai/prompt/"
OUT_DIR = r"c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs\public\assets\img\products"

# Prompts tuned for Pollinations (Flux/SD based)
PROMPTS = {
    "amrit_honey_glass_jar_v4.png": "product photography of a straight-sided cylindrical clear glass jar filled with golden honey, white label with gold border text 'Amrit Organic Honey', wooden table, bokah background, 8k, photorealistic",
    "amrit_mint_oil_v4.png": "product photography of a small amber essential oil bottle with black dropper cap, label text 'Amrit Mint Oil', fresh mint leaves illustration on label, white background, studio lighting, 8k",
    "amrit_lemongrass_oil_v4.png": "product photography of a small amber essential oil bottle with black dropper cap, label text 'Amrit Lemongrass Oil', fresh lemongrass stalks illustration on label, white background, studio lighting, 8k"
}

def download_image(filename, prompt):
    # Encode prompt
    url = BASE_URL + prompt.replace(" ", "%20") + "?width=1024&height=1024&nologo=true"
    print(f"Fetching {filename} from {url}...")
    
    try:
        # Bypassing SSL verification due to local environment issues
        resp = requests.get(url, timeout=60, verify=False)
        if resp.status_code == 200:
            path = os.path.join(OUT_DIR, filename)
            with open(path, "wb") as f:
                f.write(resp.content)
            print(f"Saved {path}")
        else:
            print(f"Failed: {resp.status_code}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if not os.path.exists(OUT_DIR):
        os.makedirs(OUT_DIR)
        
    for name, prompt in PROMPTS.items():
        download_image(name, prompt)
        time.sleep(2) # Be nice to the API
