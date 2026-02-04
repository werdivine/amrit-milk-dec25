from PIL import Image, ImageDraw, ImageFont
import os

# Paths
BASE_DIR = r"c:\IDE-PROJECTS\ANTIGRAVITY\PATHAK\projects\amrit-wp-nextjs\public\assets\img\products"
SRC_IMG = os.path.join(BASE_DIR, "tulsi_oil.png")
MINT_OUT = os.path.join(BASE_DIR, "amrit_mint_oil_tulsi_style_v3.png")
LEMON_OUT = os.path.join(BASE_DIR, "amrit_lemongrass_oil_tulsi_style_v3.png")

def create_variant(text_name, output_path, icon_color=(34, 139, 34)):
    try:
        img = Image.open(SRC_IMG).convert("RGBA")
        draw = ImageDraw.Draw(img)
        w, h = img.size
        
        # Heuristic: The text "Tulsi Oil" is likely in the vertical center, horizontal center.
        # Image is 1344 x 734.
        # Center: 672, 367.
        # Let's define a patch to cover "Tulsi" and "Oil" check.
        # We need to cover the existing text. 
        # Assuming the label background is a dark green/flat color or gradient.
        # We'll sample the color from a nearby pixel that is "background".
        # Let's sample pixel at (672, 300) - likely above text?
        # Or (672, 250).
        
        # BETTER: Just draw a clean "Panel" for the name.
        # Rect: X=400 to 944 (Width 544), Y=350 to 550.
        
        # Sample background color
        bg_color = img.getpixel((672, 200)) # Sample from top area of label?
        # If image is transparent png of a bottle, getting pixel might get loose pixels.
        
        # Let's assume a nice dark green background color matching the label aesthetic.
        # Hex #2d5a27 (Forest Green ish) or sample.
        patch_color = bg_color #(40, 70, 40) # Approximate
        
        # Draw Rectangle to mask old text
        # Adjust these coordinates based on typical "Center Label" layout
        # W=1344. Label is likely central ~50% width.
        # Text is likely centered.
        rect_x1, rect_y1 = 450, 320
        rect_x2, rect_y2 = 900, 520
        
        # Draw 'patch' - we might want to blend or use a solid rect if we can't reconstruct.
        # For "Manual Editing", a solid colored rect with a gold border looks "intentional".
        draw.rectangle([rect_x1, rect_y1, rect_x2, rect_y2], fill=patch_color)
        
        # Load Font
        try:
            # Try system fonts
            font_title = ImageFont.truetype("times.ttf", 80)
            font_sub = ImageFont.truetype("arial.ttf", 40)
        except:
            # Fallback
            font_title = ImageFont.load_default()
            font_sub = ImageFont.load_default()

        # Draw New Text
        # Name
        text_bbox = draw.textbbox((0, 0), text_name + " Oil", font=font_title)
        text_w = text_bbox[2] - text_bbox[0]
        text_x = (w - text_w) // 2
        draw.text((text_x, 350), text_name, font=font_title, fill=(255, 255, 255))
        
        # "Oil" line
        oil_bbox = draw.textbbox((0, 0), "Oil", font=font_title)
        oil_w = oil_bbox[2] - oil_bbox[0]
        oil_x = (w - oil_w) // 2
        draw.text((oil_x, 440), "Oil", font=font_title, fill=(255, 255, 255))

        # Save
        img.save(output_path)
        print(f"Created {output_path}")

    except Exception as e:
        print(f"Error: {e}")

# Create variants
create_variant("Mint", MINT_OUT)
create_variant("Lemongrass", LEMON_OUT)
