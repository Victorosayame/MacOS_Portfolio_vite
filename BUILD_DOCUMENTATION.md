# macOS Portfolio - Complete Build Documentation

## Project Overview

A sophisticated, modern portfolio website that mimics the macOS operating system interface. Built with React, Vite, GSAP, and Zustand, this portfolio showcases projects, skills, and contact information in an interactive, desktop-like environment.

## Technology Stack

- **Frontend Framework**: React 18 with JSX
- **Build Tool**: Vite (faster than webpack)
- **Styling**: Tailwind CSS
- **Animations**: GSAP (GreenSock) with React integration
- **State Management**: Zustand with Immer middleware
- **Icons**: Lucide React
- **Date/Time**: dayjs
- **PDF Viewer**: react-pdf
- **Utilities**: clsx for conditional CSS classes
- **Tooltips**: react-tooltip

## Step-by-Step Build Process

### Phase 1: Project Setup & Configuration

#### Step 1: Configure Vite with Tailwind CSS and Path Aliases

**Purpose**: Establish development environment with clean import paths

**Actions**:

1. Install Tailwind CSS and peer dependencies:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure Vite with path aliases in `vite.config.js`:
   - Import `resolve` and `dirname` from 'path'
   - Import `fileURLToPath` from 'url'
   - Create aliases for: #components, #constants, #store, #hoc, #windows

**Benefits**:

- Cleaner imports: `import { Dock } from '#components'` instead of `'../../components'`
- Easier refactoring - folder moves don't require import path updates
- Improves code readability and maintenance

**Files Modified**: `vite.config.js`

### Phase 2: Navigation & Header

#### Step 2: (Reserved for future expansion)

#### Step 3: Create Navbar Component with Dynamic Content

**Purpose**: Build the main navigation bar with live date/time display

**Components Created**:

- Navbar.jsx - Main navigation component

**Features**:

- Logo and portfolio title
- Navigation links (Projects, Contact, Resume) with click handlers
- System icons (WiFi, Search, User, Mode) for UI authenticity
- Live date/time display using dayjs
- Responsive design with mobile considerations

**Data Source**: Navigation items from constants (navLinks, navIcons)

**State Integration**: Uses Zustand store to open windows on navigation click

**Files Modified**: `src/components/Navbar.jsx`

### Phase 3: Welcome/Hero Section

#### Step 4: Create Welcome Component with GSAP Animations

**Purpose**: Build an engaging landing/hero section

**Installation**:

```bash
npm install gsap @gsap/react lucide-react
```

**Features**:

- Animated welcome text
- Interactive character-level animations
- Responsive design with mobile notice
- Sets premium tone for portfolio

**Dependencies**:

- GSAP for smooth animations
- @gsap/react for React integration
- lucide-react for icons

#### Step 5: Create Refs for Welcome Page Elements

**Purpose**: Enable GSAP animations on text elements

**Implementation**:

- Create `titleRef` and `subtitleRef` using React's useRef hook
- These refs allow GSAP to target and animate specific DOM elements
- Essential for character-level animation control

#### Step 6: Helper Function - renderText()

**Purpose**: Convert text strings into animatable character spans

**Function Details**:

```javascript
renderText(text, className, (baseWeight = 400));
```

- Splits text into individual characters
- Wraps each in a span element
- Preserves spaces as non-breaking spaces (\u00A0)
- Returns array of animated elements

**Benefits**:

- Enables character-level control
- Reduces code duplication
- Clean component markup

#### Step 7: Define Font Weight Animation Ranges

**Purpose**: Configure animation behavior for different text types

**Configuration**:

```javascript
FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};
```

**Implementation**:

- Subtitle: Subtle weight changes (100-400)
- Title: Dramatic weight changes (400-900)
- Creates different visual impacts for different text levels

#### Step 8: Setup Text Hover Interactive Effect

**Purpose**: Create mouse-tracking text animation

**How It Works**:

1. Detects character positions on screen
2. Calculates distance between mouse and each character
3. Uses exponential decay formula for smooth gradient
4. Animates font weight based on proximity
5. Returns cleanup function for proper unmounting

**Result**: Characters appear to "breathe" or respond to cursor movement

#### Step 9: Initialize Text Hover Effects on Component Mount

**Purpose**: Wire up animations using React hooks

**Implementation**:

- Uses `useGSAP` hook from @gsap/react
- Manages animation lifecycle automatically
- Cleans up listeners on component unmount

**Files Modified**: `src/components/Welcome.jsx`

### Phase 4: Navigation & Window Management

#### Step 10: Create Dock Component - Application Launcher

**Purpose**: Build macOS-style application dock

**Features**:

- Dynamic app icons grid
- Tooltip display on hover
- Magnetic hover effect (icons scale and move)
- Application launch/close functionality
- Visual feedback for open apps
- Accessibility with aria-labels

**Data Source**: dockApps array from constants

#### Step 11: Create Reference for Dock Container

**Purpose**: Target dock element for animations

**Implementation**:

- `useRef` for dock container
- Used by GSAP for animation targeting
- Required for mousemove event listener

#### Step 12: Implement Tooltips for Dock Icons via react-tooltip

**Purpose**: Show app names on hover

**Installation**:

```bash
npm install react-tooltip
```

**Benefits**:

- Helps unfamiliar users understand icon purposes
- Professional UX enhancement
- Non-intrusive (appears on hover only)

#### Step 13: Animate Dock Icons on Mouse Proximity

**Purpose**: Create dynamic "magnetic" dock effect

**Animation Details**:

- Icons scale up as mouse approaches
- Vertical lift effect (y-axis shift upward)
- Smooth return to normal on mouse leave
- Uses exponential formula for distance-based intensity
- GSAP handles all animation smoothing

**Formula**: Exponential decay calculates intensity based on mouse distance

**Result**: Interactive, responsive dock similar to macOS

**Files Modified**: `src/components/Dock.jsx`

### Phase 5: State Management Setup

#### Step 14: Create Global Window State Store with Zustand

**Purpose**: Manage window state across entire application

**Installation**:

```bash
npm install zustand
```

**Store Structure**:

```javascript
{
  windows: {
    [windowKey]: {
      isOpen: boolean,
      zIndex: number,
      data: object
    }
  },
  nextZIndex: number
}
```

**Key Actions**:

- `openWindow(windowKey, data)` - Opens window and updates z-index
- `closeWindow(windowKey)` - Closes window and resets state
- `focusWindow(windowKey)` - Brings window to front

**Middleware**: Immer for simplified state mutations

**Benefits**:

- Centralized window state
- Simple z-index management for layering
- Easy data passing between windows
- No prop drilling needed

**Files Created**: `src/store/window.js`

#### Step 15: Access Window Store in Dock Component

**Purpose**: Enable dock to control window lifecycle

**Implementation**:

- Use `useWindowStore()` hook to access store
- Get `openWindow` and `closeWindow` actions
- Get `windows` state to check if app is open
- Toggle between open/close on icon click

**State Integration**: Dock icons show visual indicator when app is open

#### Step 16: WindowWrapper HOC (Higher-Order Component)

**Purpose**: Wrap all window components with shared functionality

**Features Provided**:

1. Window state management (open/close, z-index)
2. Focus mechanism (click to bring to front)
3. Drag functionality (move windows)
4. Animation effects (smooth transitions)
5. Proper z-index layering

**How It Works**:

```javascript
const WindowComponent = WindowWrapper(Component, "windowKey");
```

- Returns enhanced component with all features
- Manages DOM display based on isOpen state
- Handles all GSAP animations

**Benefits**:

- Code reuse across all window types
- Consistent window behavior
- Separation of concerns

**Files Created**: `src/hoc/WindowWrapper.jsx`

#### Step 17: Register GSAP Plugins in Root Component

**Purpose**: Make GSAP plugins available globally

**Implementation**:

```javascript
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
```

**Why Root Component**:

- Recommended GSAP practice
- Plugins available to all child components
- Clean initialization

**Current Plugins**: Draggable for window drag functionality

**Files Modified**: `src/App.jsx`

### Phase 6: Window Components

#### Step 18: Terminal Window - Tech Stack Display

**Purpose**: Show technologies used in portfolio

**Content**:

- Tech stack organized by category
- Terminal-style interface with command simulation
- Success indicators with checkmarks
- Render time and load percentage
- Professional appearance

**Data Source**: techStack array from constants

**Files Created**: `src/windows/Terminal.jsx`

#### Step 19: WindowWrapper - Window Open Animation with Focus

**Purpose**: Smooth entrance animation when window opens

**Animation Details**:

- Duration: 0.4 seconds
- Scale: 0.8 → 1.0 (size growth)
- Opacity: 0 → 1 (fade in)
- Y-axis: 40 → 0 (upward pop effect)
- Easing: power3.out (smooth deceleration)

**Result**: Windows appear to "spring" into view

#### Step 20: WindowWrapper - Draggable Window Functionality

**Purpose**: Enable moving windows around screen

**Implementation**:

- GSAP Draggable plugin for performance
- Auto-calculates movement boundaries
- Brings window to focus when user starts dragging
- Smooth motion with no lag

**User Experience**:

- Windows automatically come to front when dragged
- Intuitive desktop-like behavior
- All windows can be arranged freely

#### Step 21: WindowControls Component - Window Header Buttons

**Purpose**: Provide standard macOS window controls

**Buttons**:

- Red (•) - Close - Fully functional, closes window
- Yellow (•) - Minimize - Placeholder, disabled
- Green (•) - Maximize - Placeholder, disabled

**Integration**:

- Receives `target` prop (window key)
- Calls `closeWindow()` from store on click
- Styled to match macOS appearance

**Files Created**: `src/components/WindowControls.jsx`

#### Step 22: Safari Window - Blog/Articles Display

**Purpose**: Display blog posts/articles in browser-like window

**Features**:

- Safari browser UI reproduction
- Browser controls (navigation, search, share)
- Blog post grid with images
- External links to articles
- Professional presentation

**Data Source**: blogPosts array from constants

**Files Created**: `src/windows/Safari.jsx`

#### Step 23: Resume Window - PDF Display

**Purpose**: Show resume as embedded PDF

**Features**:

- PDF rendering with react-pdf
- Download button in header
- Text layer and annotation layer support
- First page display

**Files Created**: `src/windows/Resume.jsx`

#### Step 24: Add Quick Navigation to Windows via Navbar Links

**Purpose**: Enable one-click access to main sections from navbar

**Implementation**:

- Navbar links have click handlers
- Call `openWindow()` on click
- Window type determined by link type
- Faster navigation than using dock

**User Experience**: Users can quickly jump to Resume, Projects, Contact

#### Step 25: Setup react-pdf with Web Worker

**Purpose**: Enable PDF rendering in client

**Installation**:

```bash
npm install react-pdf
```

**Setup**:

1. Import Document, Page, pdfjs from react-pdf
2. Import CSS files for annotation and text layers
3. Configure worker: `pdfjs.GlobalWorkerOptions.workerSrc = ...`
4. Connect to PDF file path

**Benefits**:

- No server PDF processing needed
- Works entirely in browser
- Smooth user experience

### Phase 7: Folder/Location Management

#### Step 26: Create Location/Folder State Store with Zustand

**Purpose**: Manage folder navigation state

**Store Features**:

- `activeLocation` - Current folder being viewed
- `setActiveLocation()` - Navigate to folder
- `resetActiveLocation()` - Return to default

**Data Source**: locations object from constants (folder structure)

**Integration with Finder**:

- Finder uses this to determine what to display
- Home component updates this when folder clicked
- Maintains navigation state across components

**Files Created**: `src/store/loaction.js`

#### Step 27: Finder Window - File/Folder Browser

**Purpose**: Browse portfolio files and folders

**Layout**:

- Left sidebar: Favorites and projects navigation
- Main area: Current folder contents
- Click handlers for different file types

**File Type Handlers**:

- PDF files → Open in Resume window
- Folders → Navigate into folder
- URLs → Open in new browser tab
- Images → Open in Image viewer
- Text files → Open in Text viewer

**Data Source**: locations constant with folder structure

**Files Created**: `src/windows/Finder.jsx`

#### Step 28: Use Location Store in Finder

**Purpose**: Access and update folder navigation

**Implementation**:

- `useLocationStore()` hook
- Get `activeLocation` to display current folder
- Get `setActiveLocation` to update on click
- Subscribe to changes

#### Step 29: File Click Handler - openItem()

**Purpose**: Route file clicks to appropriate handlers

**Logic**:

1. Check file type
2. Route to correct handler:
   - PDFs → Resume window
   - Folders → Update location
   - URLs → window.open()
3. Pass file data to appropriate window

**Result**: Finder acts as true file browser

#### Step 30: Use Window Store in Finder

**Purpose**: Open files in their viewer windows

**Functionality**:

- Access `openWindow()` function
- Pass file data when opening windows
- Enables rich file viewing

### Phase 8: File Viewer Windows

#### Step 31: Text File Viewer Window

**Purpose**: Display text-based content

**Features**:

- Support for formatted text with images
- Subtitle and description rendering
- Responsive layout
- Graceful fallback if no data

**Files Created**: `src/windows/Text.jsx`

#### Step 32: Extract Text File Data from Window Store

**Purpose**: Retrieve file data when window opens

**Implementation**:

- Access `windows.txtfile.data`
- Destructure name, image, subtitle, description
- Return null if no data (window not opened properly)

#### Step 33: Image File Viewer Window

**Purpose**: Display images in dedicated viewer

**Features**:

- Full-size image display
- Proper scaling and object-fit
- Responsive container
- Clean, minimalist interface

**Files Created**: `src/windows/Image.jsx`

#### Step 34: Extract Image Data from Window Store

**Purpose**: Retrieve image URL and metadata

**Implementation**:

- Access `windows.imgfile.data`
- Get imageUrl for display
- Get name for window header

#### Step 35: Contact Window - Social Links Display

**Purpose**: Show contact information and social media

**Content**:

- Profile image
- Introduction text
- Email address
- Social media links with icons
- Links open in new tabs

**Data Source**: socials array from constants

**Files Created**: `src/windows/Contact.jsx`

### Phase 9: Desktop & Gallery

#### Step 36: Home Component - Desktop View

**Purpose**: Display projects on desktop (macOS style)

**Features**:

- Project folders scattered across desktop
- Each folder has icon and name label
- Positioning via CSS classes
- Click handler opens Finder with project selected
- Updates location store on click

**Implementation**:

- Maps through `locations.work.children` array
- Each project becomes draggable folder
- Click opens Finder and navigates to project

**Files Created**: `src/components/Home.jsx`

#### Step 37: Make Desktop Folders Draggable

**Purpose**: Enable rearranging project folders

**Implementation**:

- GSAP Draggable on all .folder elements
- Auto-constraint calculation
- Smooth drag performance
- User can organize desktop

**Benefits**:

- Interactive desktop experience
- User can arrange work samples
- Feels more like real macOS

#### Step 38: Access Store for Window Navigation

**Purpose**: Get functions for window and location management

**Implementation**:

- `useLocationStore()` to update active folder
- `useWindowStore()` to open Finder window
- Combined functionality for folder navigation

#### Step 39: Handle Project Folder Click

**Purpose**: Open Finder with selected project

**Sequence**:

1. Click folder on desktop
2. `setActiveLocation()` updates Finder state
3. `openWindow('finder')` opens Finder
4. Finder displays selected project contents

**Result**: Seamless navigation from desktop to Finder

#### Step 40: Photo/Gallery Window - Image Gallery Display

**Purpose**: Display photo gallery with categories

**Layout**:

- Left sidebar: Category navigation
- Main area: Image grid
- Click opens Image viewer for selected image

**Data Sources**:

- `photosLinks` for category sidebar
- `gallery` for image grid

**Features**:

- Organized image gallery
- Category filtering (sidebar)
- Opens images in viewer window
- Full metadata passed to viewer

**Files Created**: `src/windows/Photo.jsx`

## Component Structure

### Components (`src/components/`)

- **Navbar.jsx** - Top navigation bar
- **Welcome.jsx** - Hero/landing section
- **Dock.jsx** - Application launcher
- **Home.jsx** - Desktop with project folders
- **WindowControls.jsx** - Window header buttons

### Windows (`src/windows/`)

- **Terminal.jsx** - Tech stack display
- **Safari.jsx** - Blog/articles
- **Resume.jsx** - PDF viewer
- **Finder.jsx** - File/folder browser
- **Text.jsx** - Text file viewer
- **Image.jsx** - Image viewer
- **Contact.jsx** - Contact info
- **Photo.jsx** - Photo gallery

### State Management (`src/store/`)

- **window.js** - Global window state
- **loaction.js** - Folder navigation state

### HOCs (`src/hoc/`)

- **WindowWrapper.jsx** - Window enhancement HOC

### Constants (`src/constants/`)

- **index.js** - All app data (links, apps, projects, etc.)

## Key Design Patterns

### State Management Flow

```
User Action (click)
    ↓
Action called (openWindow, closeWindow)
    ↓
Zustand store updated
    ↓
Components re-render with new state
    ↓
DOM updated with new properties
```

### Animation Architecture

```
Component A (Welcome, Dock, etc.)
    ↓
useRef hooks create DOM targets
    ↓
useGSAP hook detected dependencies
    ↓
GSAP animations created
    ↓
Cleanup function removes on unmount
```

### Window Lifecycle

```
Dock icon clicked
    ↓
openWindow() called
    ↓
Window state: isOpen = true, zIndex updated
    ↓
WindowWrapper renders component
    ↓
GSAP animation plays (scale, opacity)
    ↓
User interacts with window
    ↓
closeWindow() called
    ↓
State resets, window hides
```

## Data Flow

### Opening a Project

1. Click project folder on desktop (Home component)
2. `setActiveLocation(project)` - Location store updated
3. `openWindow('finder')` - Window store updated
4. Finder component re-renders
5. Finder shows selected project's contents

### Opening a File

1. Click file in Finder
2. `openItem()` checks file type
3. `openWindow(windowType, fileData)` called
4. Window opens with file data
5. Window component renders file content

### Dragging a Window

1. Mouse down on window header
2. GSAP Draggable detects interaction
3. `focusWindow()` called - window gets highest z-index
4. Mouse move tracked, window follows cursor
5. Mouse up ends drag
6. Window stays in new position

## Performance Considerations

### Optimization Techniques Used

1. **Lazy animations** - GSAP only runs when needed
2. **Event delegation** - Dock icons use single listener pattern
3. **Cleanup functions** - Memory leaks prevented with proper unmounting
4. **Zustand** - Lightweight state management (no unnecessary re-renders)
5. **Immer middleware** - Simplified state mutations without performance cost
6. **Vite** - Fast build and dev server
7. **Tailwind purging** - Unused CSS removed in production

### Animation Performance

- GSAP uses GPU acceleration when possible
- Transform and opacity changes (no layout thrashing)
- Draggable uses requestAnimationFrame
- Multiple animations don't block main thread

## Deployment Considerations

### Build Process

```bash
npm run build
```

- Vite bundles optimized code
- Tailwind CSS purges unused styles
- Production bundle is significantly smaller

### Hosting Requirements

- Static file hosting (Netlify, Vercel, GitHub Pages)
- No backend required
- PDF files served alongside app
- Image assets optimized for web

### Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires ES6+ JavaScript support
- CSS Grid and Flexbox
- GSAP plugins widely supported

## Future Enhancement Ideas

1. **Window Snapping** - Snap windows to grid positions
2. **Minimize Button** - Actually minimize to dock
3. **Maximize Button** - Window fullscreen
4. **Right-click Menus** - Context menus for files
5. **File Thumbnails** - Preview images in Finder
6. **Dark Mode** - Theme switcher
7. **Keyboard Shortcuts** - CMD+Tab window switching
8. **Double-click** - Enter fullscreen mode
9. **Window Resizing** - Resize windows by dragging edges
10. **Mobile Responsive** - Touch-optimized for tablets

## Conclusion

This macOS portfolio demonstrates advanced React patterns including:

- Hooks (useRef, useGSAP, custom hooks)
- Higher-Order Components
- State management with Zustand
- GSAP animations
- Responsive design with Tailwind

The modular architecture makes it easy to:

- Add new windows
- Create new project sections
- Modify animations
- Change styling
- Scale the application

Each component is self-contained and follows the single responsibility principle, making the codebase maintainable and extensible.
