import os
from PIL import Image
from pathlib import Path

def resize_webp_images(input_folder, output_folder=None, size=(350, 350)):
    """
    Resize all WebP images in a folder to the specified size.
    
    Args:
        input_folder: Path to folder containing WebP images
        output_folder: Path to save resized images (if None, saves in input_folder)
        size: Tuple of (width, height) for output images
    """
    # Convert input folder to Path object
    input_path = Path(input_folder)
    
    # Set output folder
    if output_folder is None:
        output_path = input_path / "resized"
    else:
        output_path = Path(output_folder)
    
    # Create output folder if it doesn't exist
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Find all WebP files (case-insensitive)
    webp_files = list(input_path.glob("*.webp")) + list(input_path.glob("*.WEBP"))
    
    if not webp_files:
        print(f"No WebP files found in {input_folder}")
        return
    
    print(f"Found {len(webp_files)} WebP file(s)")
    
    successful = 0
    failed = 0
    
    for webp_file in webp_files:
        try:
            # Open the image
            with Image.open(webp_file) as img:
                # Convert RGBA to RGB if needed (to handle transparency)
                if img.mode in ('RGBA', 'LA', 'P'):
                    # Create a white background
                    background = Image.new('RGB', img.size, (255, 255, 255))
                    if img.mode == 'P':
                        img = img.convert('RGBA')
                    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
                    img = background
                elif img.mode != 'RGB':
                    img = img.convert('RGB')
                
                # Resize the image
                resized_img = img.resize(size, Image.Resampling.LANCZOS)
                
                # Create output filename
                output_file = output_path / webp_file.name
                
                # Save with optimization
                resized_img.save(
                    output_file, 
                    'WEBP', 
                    quality=85,  # Adjust quality as needed (1-100)
                    optimize=True
                )
                
                print(f"✓ Resized: {webp_file.name} -> {output_file}")
                successful += 1
                
        except Exception as e:
            print(f"✗ Failed to process {webp_file.name}: {e}")
            failed += 1
    
    print(f"\nProcessing complete:")
    print(f"  Successful: {successful}")
    print(f"  Failed: {failed}")
    print(f"  Output folder: {output_path}")

def main():
    """Main function with user interaction."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Resize WebP images to 400x300 pixels')
    parser.add_argument('input_folder', help='Folder containing WebP images')
    parser.add_argument('-o', '--output', help='Output folder (default: input_folder/resized/)')
    
    args = parser.parse_args()
    
    # Check if PIL is installed
    try:
        from PIL import Image
    except ImportError:
        print("Error: Pillow library is required.")
        print("Install it with: pip install Pillow")
        return
    
    # Check if input folder exists
    if not os.path.exists(args.input_folder):
        print(f"Error: Folder '{args.input_folder}' does not exist.")
        return
    
    # Resize images
    resize_webp_images(args.input_folder, args.output)

if __name__ == "__main__":
    main()