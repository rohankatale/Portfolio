# Image Replacement Guide

## How to Replace Your Portfolio Images

### 1. Profile Pictures (Cursor Reveal Effect)
To change the profile pictures that appear in the cursor reveal effect:

**Location:** `public/images/hero/portraits/`

**Current files:**
- `profile1.png` - Used for UI/UX Designer mode (left side of screen)
- `profile2.png` - Used for Full Stack Developer mode (middle of screen)  
- `avatar.png` - Used for Flutter Engineer mode (right side of screen)

**To replace:**
1. Save your new profile images with the same filenames
2. Place them in `public/images/hero/portraits/`
3. Recommended size: 400x400px to 800x800px
4. Format: PNG with transparent background works best

### 2. Background Images (Cursor Reveal Effect)
To change the background images that reveal on cursor movement:

**Location:** `public/images/hero/`

**Current files:**
- `Background.jpg` - Default background (always visible)
- `Foreground.jpg` - Alternative background for developer mode

**To replace:**
1. Save your new background images with the same filenames
2. Place them in `public/images/hero/`
3. Recommended size: 1920x1080px or higher
4. Format: JPG or PNG

### 3. Project Images
**Location:** `public/images/projects/`

Replace `project1.svg`, `project2.svg`, `project3.svg` with your actual project screenshots.

### 4. Customizing the Cursor Reveal Themes

To change the themes or add new ones, edit:
`src/components/sections/CursorRevealHero.tsx`

Look for the `backgroundThemes` array and modify:
- `background`: Path to background image
- `portrait`: Path to portrait image  
- `color`: Theme accent color
- `description`: Text that appears for each theme

### 5. Quick Image Size Guidelines

| Image Type | Recommended Size | Format |
|------------|------------------|---------|
| Profile Pictures | 400x400px - 800x800px | PNG (transparent) |
| Background Images | 1920x1080px+ | JPG/PNG |
| Project Screenshots | 600x400px | JPG/PNG |

### 6. Testing Your Changes

After replacing images:
1. Save the files
2. The development server will automatically reload
3. Check http://localhost:3002
4. Move your cursor around to test the reveal effect

### 7. Performance Tips

- Keep image file sizes reasonable (< 2MB each)
- Use JPG for backgrounds, PNG for portraits with transparency
- Consider using WebP format for better compression
