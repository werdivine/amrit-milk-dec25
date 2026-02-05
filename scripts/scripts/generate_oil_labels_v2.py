from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance
import os

# Paths
BASE_DIR = r"c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs\public\assets\img\products"
SRC_IMG = os.path.join(BASE_DIR, "tulsi_oil.png")
MINT_OUT = os.path.join(BASE_DIR, "amrit_mint_generated.png")
LEMON_OUT = os.path.join(BASE_DIR, "amrit_lemongrass_generated.png")
HONEY_OUT = os.path.join(BASE_DIR, "amrit_honey_glass_jar_generated.png") # Placeholder strategy for honey

def get_font(size):
    try:
        return ImageFont.truetype("georgia.ttf", size) # Windows standard
    except:
        try:
            return ImageFont.truetype("arial.ttf", size)
        except:
            return ImageFont.load_default()

def patch_label(img, target_text, hue_shift=0):
    # original image is 1344 x 734
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # TEXT AREA COORDINATES (Approximated based on "Tulsi Oil" position)
    # The text is likely centered.
    # Let's define a "Clean Patch" area.
    # We will sample a piece of "Background" from the top of the label.
    # Assume Label Top Y ~ 150-250.
    
    # 1. Masking the old text "Tulsi" and "Oil"
    # We'll use a blurred rectangle of the average label color to mask it smoothly.
    # Sample color
    # (672, 200) seems like a safe "Label Background" spot
    bg_color = img.getpixel((int(w/2), int(h*0.3))) 
    
    # Define mask box
    # Center X = w/2 = 672
    # Text probably at Y=350 to 500
    mask_x1, mask_y1 = int(w*0.3), int(h*0.45)
    mask_x2, mask_y2 = int(w*0.7), int(h*0.75)
    
    # Draw a filled rectangle with the sampled color
    # Add a slight gradient or noise if possible? 
    # For now, solid color + slight blur to headers
    draw.rectangle([mask_x1, mask_y1, mask_x2, mask_y2], fill=bg_color)
    
    # 2. Add Decorative Divider (Gold Line)
    gold_color = (184, 134, 11) # Dark Goldenrod
    line_y = mask_y1 + 10
    draw.line([mask_x1+20, line_y, mask_x2-20, line_y], fill=gold_color, width=3)
    
    # 3. Write New Text
    # "Amrit" (Small, top)
    header_font = get_font(40)
    draw.text((w/2, mask_y1 + 30), "Amrit", font=header_font, fill="black", anchor="mm")
    
    # "Mint" / "Lemongrass" (Large, Hero)
    hero_size = 90 if len(target_text) < 6 else 70 # Adjust size for "Lemongrass"
    hero_font = get_font(hero_size)
    
    # Shadow
    draw.text((w/2 + 2, mask_y1 + 102), target_text, font=hero_font, fill=(200, 200, 200), anchor="mm")
    # Main
    draw.text((w/2, mask_y1 + 100), target_text, font=hero_font, fill=(34, 139, 34), anchor="mm") # Forest Green text
    
    # "Essential Oil" (Medium, bottom)
    sub_font = get_font(50)
    draw.text((w/2, mask_y1 + 180), "Essential Oil", font=sub_font, fill="black", anchor="mm")
    
    # 4. Hue Shift (for Lemongrass)
    if hue_shift != 0:
        # Convert to HSV, shift Hue, convert back
        # This is complex in PIL without numpy.
        # We'll apply a color overlay tint instead.
        # Yellow tint for Lemongrass
        overlay = Image.new("RGBA", img.size, (255, 255, 0, 50))
        img = Image.alpha_composite(img, overlay)
        
    return img

def process_oil(name, hue_shift=0):
    try:
        img = Image.open(SRC_IMG).convert("RGBA")
        img = patch_label(img, name, hue_shift)
        
        out_path = MINT_OUT if name == "Mint" else LEMON_OUT
        img.save(out_path)
        print(f"Generated {out_path}")
    except Exception as e:
        print(f"Error processing {name}: {e}")

# Process
process_oil("Mint", hue_shift=0)
process_oil("Lemongrass", hue_shift=1) # Slight yellow tint simulation

# HONEY: For Honey, we will take the current V3 (if exists) or V2 and ensure it exists as 'generated'
# If we don't have a straight jar, we are kind of stuck on "Manual".
# Let's Copy the V2 honey to 'generated' so at least we have a file.
try:
    honey_src = os.path.join(BASE_DIR, "amrit_honey_glass_jar_v3.png") # Try v3
    if not os.path.exists(honey_src):
        honey_src = os.path.join(BASE_DIR, "honey_premium.png") # Fallback
    
    img_h = Image.open(honey_src)
    img_h.save(HONEY_OUT)
    print(f"Copied Honey to {HONEY_OUT}")
except Exception as e:
    print(f"Error copying honey: {e}")
