import os
import time
from playwright.sync_api import sync_playwright

# Fix environment for Playwright in this shell
os.environ["HOME"] = os.path.expanduser("~")

PROMPTS = {
    "honey_v5": "professional product photography straight cylindrical glass jar filled with golden honey white label gold border white background 8k",
    "mint_v5": "professional product photography small amber essential oil bottle black dropper cap label text Amrit Mint Oil mint leaves illustration white background 8k",
    "lemongrass_v5": "professional product photography small amber essential oil bottle black dropper cap label text Amrit Lemongrass Oil lemongrass illustration white background 8k"
}

OUTPUT_DIR = r"c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs\public\assets\img\products"

def generate(name, prompt):
    print(f"--- Generating {name} ---")
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to Craiyon...")
            page.goto("https://www.craiyon.com/", timeout=60000)
            
            # Context: Craiyon has a simple input with id="prompt" usually, or we search by placeholder
            print("Waiting for prompt input...")
            # Try specific selector or fallback
            textarea = page.wait_for_selector("#prompt", timeout=30000) 
            if not textarea:
                print("Could not find prompt input.")
                return

            print(f"Entering prompt: {prompt}")
            textarea.fill(prompt)
            
            # Click Generate (Button usually has "Generate" text)
            # Craiyon button depends on UI updates. Look for button by ID or text.
            # Usually id="generateButton"
            btn = page.query_selector("#generateButton") 
            if not btn:
                # Fallback search
                btn = page.get_by_role("button", name="Draw").first
            
            if btn:
                btn.click()
                print("Clicked Generate. Waiting (approx 60s)...")
            else:
                print("Could not find Generate button.")
                return

            # Craiyon takes ~60 seconds. We wait for images to load.
            # Images appear in a container.
            # We can wait for the first image result.
            # Selector for results is often specific.
            time.sleep(60) # Blind wait for processing
            
            # Looking for result images
            # Usually img tags with specific class or inside a gallery
            # Let's verify if results appeared
            
            # Take screenshot of results to ensure we have something
            debug_shot = os.path.join(OUTPUT_DIR, f"debug_{name}.png")
            page.screenshot(path=debug_shot)
            print(f"Debug screenshot: {debug_shot}")
            
            # Try to grab the first image src (Craiyon generates 9 grid)
            # The images are usually in a div grid
            # We want one upscale or just the first grid item
            
            # Find all images that look like results
            # Heuristic: images that are not the logo
            images = page.query_selector_all("img")
            target_src = ""
            
            # Filter for specific Craiyon source patterns if possible, or just size
            # Craiyon images usually come from verify.craiyon.com or similar cdn
            
            candidates = []
            for img in images:
                src = img.get_attribute("src")
                if src and "craiyon" in src and "img" in src:
                    candidates.append(src)
            
            if not candidates:
                # Fallback: look for generic webp/jpeg data blobs
                for img in images:
                     src = img.get_attribute("src")
                     if src and src.startswith("https://"):
                         candidates.append(src)

            if candidates:
                # Usually the results are the *last* images loaded or in the middle
                # Craiyon results are often larger.
                # Let's blindly take the 3rd image found (to skip logos)
                if len(candidates) > 2:
                    target_src = candidates[2]
                else:
                    target_src = candidates[0]
                
                print(f"Downloading from {target_src[:50]}...")
                
                # Download
                import requests
                # Craiyon sometimes protects images, but usually accessible
                r = requests.get(target_src)
                if r.status_code == 200:
                    out_path = os.path.join(OUTPUT_DIR, f"amrit_{name}.png")
                    with open(out_path, 'wb') as f:
                        f.write(r.content)
                    print(f"Success! Saved to {out_path}")
                else:
                    print("Download failed.")
            else:
                print("No candidate images found.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    for name, prompt in PROMPTS.items():
        generate(name, prompt)
