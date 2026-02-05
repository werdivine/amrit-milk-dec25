import os
import time
import sys
from playwright.sync_api import sync_playwright

# Set HOME to fix the env issue
os.environ["HOME"] = os.path.expanduser("~")

PROMPTS = {
    "mint": "Professional product photography, ONE small amber glass essential oil bottle with black dropper cap. Label is beige with green elegant text 'Amrit Mint Oil'. Illustration of fresh green mint leaves on label. White background. Studio lighting. High resolution 8k.",
    "lemongrass": "Professional product photography, ONE small amber glass essential oil bottle with black dropper cap. Label is beige with green elegant text 'Amrit Lemongrass Oil'. Illustration of fresh lemongrass stalks on label. White background. Studio lighting. High resolution 8k.",
    "honey": "Professional product photography, ONE straight-sided cylindrical clear glass jar with gold metal lid. Filled with golden honey. Label is white with gold border and text 'Amrit Organic Honey'. Honeycomb illustration. White background. Studio lighting. High resolution 8k."
}

def generate_image(name, prompt):
    print(f"Starting generation for {name}...")
    with sync_playwright() as p:
        # Launch with specific args to bypass some bot detections
        browser = p.chromium.launch(headless=True, args=['--no-sandbox', '--disable-setuid-sandbox'])
        page = browser.new_page()
        
        try:
            # Perchance Generator
            url = "https://perchance.org/ai-text-to-image-generator"
            print(f"Navigating to {url}...")
            page.goto(url, timeout=60000)
            
            # Wait for input
            print("Waiting for input selector...")
            # The selector might vary, usually a textarea or input with placeholder
            # Inspecting Perchance... usually has an id or class. 
            # We'll try generic text area filling.
            # Assuming there's a button "Generate"
            
            # Need to be robust. Perchance often has a simple "text" input.
            # Let's wait for any input
            page.wait_for_selector("input[type='text'], textarea", timeout=30000)
            
            # Clear and fill
            # Using specific logic for Perchance if known, otherwise generic
            # Perchance usually uses an iframe for the actual generator or a direct input.
            # Let's try filling the first visible textual input.
            
            inputs = page.query_selector_all("input[type='text'], textarea")
            if not inputs:
                print("No input found!")
                return
            
            # Usually the Prompt input is prominent
            main_input = inputs[0] 
            main_input.fill(prompt)
            print("Prompt filled.")
            
            # Click Generate
            # Button often has text "Generate"
            generate_btn = page.get_by_role("button", name="Generate").first
            if not generate_btn.is_visible():
                # Try finding by text
                generate_btn = page.get_by_text("Generate", exact=False).first
            
            if generate_btn:
                generate_btn.click()
                print("Clicked Generate.")
            else:
                print("Generate button not found.")
                return

            # Wait for image
            print("Waiting for image...")
            # Usually an img tag appears or creates a new one. 
            # We can wait for the 'loading' to finish or an image to appear in the output container.
            # Let's wait 15 seconds fixed.
            time.sleep(20)
            
            # Find the generated image. 
            # Usually it's in an iframe or a distinct container id="output"
            # Perchance often puts result in <div id="output"> <img src="..."> </div>
            
            # Let's screenshot the page to debug if needed, but better to get the image src
            # Or just SCREENSHOT the specific element!
            
            # Try to identify the image
            # output_img = page.query_selector("#output img") 
            # If not found, maybe just take a full page screenshot and we crop later?
            # Or screenshot the relevant area.
            
            # Let's save a full screenshot safely first
            debug_path = f"debug_{name}.png"
            page.screenshot(path=debug_path)
            
            # Try to find the image to download
            # We will look for the largest image that just appeared? Hard.
            # Let's Assume the user wants us to "GET" the image.
            # I will download the specific image if I can find it.
            
            imgs = page.query_selector_all("img")
            # Filter for likely candidates (not logo, etc)
            target_src = ""
            for img in imgs:
                src = img.get_attribute("src")
                if src and "perchance" in src and "api" in src: # Heuristic
                    target_src = src
                    break
            
            if not target_src and len(imgs) > 0:
                 # Fallback: Last image?
                 target_src = imgs[-1].get_attribute("src")

            if target_src:
                print(f"Found image src: {target_src}")
                # Download using requests or playwright
                # Playwright download
                # Or just fetch content
                import requests
                response = requests.get(target_src)
                if response.status_code == 200:
                    out_path = f"public/assets/img/products/amrit_{name}_generated.png"
                    with open(out_path, 'wb') as f:
                        f.write(response.content)
                    print(f"Saved to {out_path}")
                else:
                    print("Failed to download image content.")
            else:
                print("Could not identify generated image source. Check debug screenshot.")
                
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path=f"error_{name}.png")
        finally:
            browser.close()

if __name__ == "__main__":
    generate_image("mint", PROMPTS["mint"])
    generate_image("lemongrass", PROMPTS["lemongrass"])
    generate_image("honey_glass_jar", PROMPTS["honey"])
