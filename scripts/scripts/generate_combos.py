from PIL import Image, ImageOps
import os

# Base Directory
BASE_DIR = r"c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs\public\assets\img\products"

# Assets
ASSETS = {
    "Ghee": "amrit_ghee_premium.png",
    "Honey": "amrit_honey_glass_jar_v3.png", # Keeping V3 (Straight) as best option for now
    "Tulsi": "tulsi_oil.png",
    "Mint": "amrit_mint_oil_v6.png",
    "Lemongrass": "amrit_lemongrass_oil_v6.png"
}

# Combos Definitions (Name -> List of Keys)
COMBOS = {
    "combo_wellness_trio_v3.png": ["Ghee", "Honey", "Tulsi"],
    "combo_immunity_booster_v3.png": ["Honey", "Tulsi", "Mint"],
    "combo_aromatherapy_v3.png": ["Tulsi", "Lemongrass", "Mint"],
    "combo_golden_healing_v3.png": ["Ghee", "Honey"],
    "combo_complete_care_v3.png": ["Ghee", "Honey", "Tulsi", "Lemongrass", "Mint"]
}

def create_composite(output_name, items):
    print(f"Creating {output_name} with {items}")
    images = []
    
    # Load images
    for item_name in items:
        path = os.path.join(BASE_DIR, ASSETS[item_name])
        try:
            img = Image.open(path).convert("RGBA")
            # Resize logic: 
            # Jars (Ghee/Honey) should be roughly same visual size.
            # Oils should be smaller.
            # We assume original images are high res but varying sizes.
            # Let's standardize height:
            # Jars = 600px height. Oils = 400px height.
            
            target_h = 600 if item_name in ["Ghee", "Honey"] else 400
            
            # Calculate new size maintaining aspect ratio
            aspect = img.width / img.height
            new_w = int(target_h * aspect)
            img = img.resize((new_w, target_h), Image.Resampling.LANCZOS)
            images.append(img)
        except Exception as e:
            print(f"Failed to load {item_name}: {e}")
            return

    # Calculate Canvas Size
    total_w = sum(img.width for img in images) + (50 * (len(images) - 1)) # 50px gap
    max_h = max(img.height for img in images)
    
    # Pad canvas
    canvas_w = total_w + 200
    canvas_h = max_h + 200
    
    # Create white background canvas
    # Using a slight off-white or white
    canvas = Image.new("RGBA", (canvas_w, canvas_h), (255, 255, 255, 255))
    
    # Paste images centered
    current_x = 100
    base_y = canvas_h - 100 # Align bottom
    
    for img in images:
        # Align bottom of component to base_y
        y_pos = base_y - img.height
        
        # Simple Fake Shadow (Oval)
        # Shadow width = img Width * 0.8
        shadow_w = int(img.width * 0.8)
        shadow_h = 40
        shadow = Image.new("RGBA", (shadow_w, shadow_h), (0, 0, 0, 0))
        # Draw shadow logic or just skip for MVP
        
        # Paste Image
        canvas.paste(img, (current_x, y_pos), img)
        current_x += img.width + 50
        
    output_path = os.path.join(BASE_DIR, output_name)
    canvas.save(output_path)
    print(f"Saved {output_path}")

# Run
for name, items in COMBOS.items():
    create_composite(name, items)
