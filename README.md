# Grovix Studio - Multi-Page Website

## 🚀 New Structure

The website has been transformed from a single-page application to a multi-page website with:

### Pages
1. **loading.html** - Loading screen with animated progress bar (3 seconds)
2. **home.html** - Main landing page with hero, trust section, stats, and CTA
3. **services.html** - Complete service offerings with process section
4. **pricing.html** - All pricing plans and à la carte services
5. **portfolio.html** - Portfolio showcase with project cards
6. **team.html** - Team members and company values
7. **contact.html** - Contact form with FAQ section

### Features

#### ✨ Loading Screen
- Animated logo and progress bar
- Starfield background animation
- Auto-redirects to home page after 3 seconds

#### 🎨 Animations
- **Fade-in**: Smooth page load transitions
- **Pop-up**: Elements scale and fade in with bounce effect
- **Slide-in**: Left/right slide animations
- **Scroll-reveal**: Elements animate when scrolling into view
- **Parallax**: Mouse-based 3D movement effects
- **3D Tilt**: Pricing cards tilt based on mouse position

#### 🎯 Page-Specific Features

**Home Page:**
- Animated hero section with staggered text
- Comparison section (Traditional vs Grovix)
- Animated statistics counters
- Call-to-action section

**Services Page:**
- Interactive service cubes with flip animation
- 4-step process visualization
- Hover effects on all cards

**Pricing Page:**
- 4 pricing tiers with feature lists
- WhatsApp integration for plan selection
- À la carte services with detailed features
- 3D tilt effect on cards

**Portfolio Page:**
- Grid layout with project cards
- Project tags and descriptions
- Hover animations

**Team Page:**
- Team member profiles
- Company values section
- Expertise tags

**Contact Page:**
- Full contact form
- Contact information cards
- FAQ section
- WhatsApp integration

### 🎭 Animations System

All pages include:
- Smooth page transitions
- Scroll-triggered animations
- Interactive hover effects
- Custom cursor with glow effect
- Parallax mouse tracking
- 3D particle background (Three.js)

### 📁 File Structure

```
finance-frontend/
├── index.html (redirects to loading.html)
├── loading.html
├── home.html
├── services.html
├── pricing.html
├── portfolio.html
├── team.html
├── contact.html
├── src/
│   ├── styles/
│   │   ├── main.css (main styles)
│   │   └── animations.css (animation definitions)
│   └── js/
│       ├── scene.js (Three.js background - shared)
│       ├── animations.js (scroll reveal & effects - shared)
│       ├── home.js (home page specific)
│       ├── pricing.js (pricing functionality)
│       └── contact.js (contact form)
```

### 🎨 Design Features

- **Dark Theme**: Modern dark background with neon accents
- **Gradient Text**: Blue to purple gradients
- **Glass Morphism**: Frosted glass effect on cards
- **Neon Glow**: Glowing effects on interactive elements
- **Responsive**: Mobile-friendly design

### 🔧 Technologies

- **Three.js**: 3D particle background
- **GSAP**: Advanced animations
- **Vanilla JS**: Core functionality
- **CSS3**: Modern styling with animations
- **HTML5**: Semantic markup

### 🚀 How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser and navigate to the local server URL

### 📱 Navigation

- Navbar links navigate between pages
- Smooth page transitions
- Consistent header/footer across all pages
- WhatsApp integration for inquiries

### ✅ Completed Sections

All sections are now fully implemented with:
- Complete content
- Proper styling
- Interactive animations
- Responsive design
- Working functionality

### 🎯 Key Improvements

1. **Multi-page structure** - Better organization and SEO
2. **Loading screen** - Professional first impression
3. **Animations everywhere** - Engaging user experience
4. **Complete content** - All sections filled
5. **Better navigation** - Clear page structure
6. **Enhanced footer** - Comprehensive links and info
7. **Contact integration** - WhatsApp and form functionality

## 📞 Contact Integration

- WhatsApp links with pre-filled messages
- Inquiry ID generation
- Form validation
- Success messages

---

**Built with ❤️ by Grovix Studio**
