# Destinations Design Specification 1.0

> **Status:** Draft / Ready for Implementation  
> **Target Audience:** Frontend Developers, UI Designers  
> **Visual Direction:** Quiet Luxury, Editorial, Atmospheric

---

## 1. /destinations (Global Entry)

**Purpose:**  
The "Cover Page" of the world. It must not look like a directory. It should feel like the table of contents of a premium travel magazine.

### Visual Hierarchy
1.  **Hero/Statement:** A single, powerful evocative image or typographic statement.
2.  **Curated Highlights:** "Editors Pick" style featuring specific regions/countries (not just an alphabetical list).
3.  **The Collection:** The full list of countries, presented as an editorial grid, NOT a data table.

### Hero Requirements
-   **Image:** Full screen height (100vh) or cinematic ratio (21:9) on desktop.
-   **Content:** Title must be large, serif, possibly overlapping the image slightly.
-   **Anti-pattern:** Do NOT use standard centered text with a dark overlay. Use a gradient fade from bottom or clear typographic placement.
-   **CMS Source:** `DestinationsPageConfig.hero`. Fallback to a curated high-quality generic travel image.

### Grid & Rhythm
-   **Desktop:** Asymmetrical grid (Masonry or Spans).
    -   Item 1: Large (2 cols, 2 rows)
    -   Item 2: Medium (1 col, 1 row)
    -   Item 3: Medium (1 col, 1 row)
-   **Mobile:** Single column, full-width cards. NO padding on sides (bleed edge-to-edge).

### Layout Wireframe (ASCII)
```text
[   HERO: "THE WORLD AWAITS" (Serif Display)   ]
[   Subtle animated scroll prompt              ]

[   Filter Bar: Minimalist, transparent bg     ]

[ Large Country Img ] [ Med Country Img ]
[ Title Overlay     ] [ Title Below     ]

[ Med Country Img   ] [ Large Country Img ]
[ Title Below       ] [ Title Overlay     ]
```

### Required CMS Fields (Mapping)
-   **List Item:** `Country` collection.
-   **Visuals:** `featuredImage` (Mandatory).
-   **Text:** `name` (Display), `continent` (Subtitle).
-   **Label:** "X Cities" / "X Itineraries" (Small, uppercase, tracking-wide).

### Anti-patterns to Remove
-   `DestinationsListingClient` rendering a grid of uniform cards with white backgrounds and drop shadows.
-   Standard functional breadcrumbs in the Hero (move to bottom or make subtle).
-   "Sort by Date" dropdowns prominent in UI.

---

## 2. /destinations/[country] (Country Profile)

**Purpose:**  
The "Feature Article". Entering a country page should feel like opening a dossier on that nation.

### Visual Hierarchy
1.  **Immersion:** Full-width hero video or high-res image.
2.  **Editorial Intro:** Big serif typography for the introduction (drop cap style).
3.  **Cities Showcase:** Presented as "Chapters" of the country.

### Country Presentation Style
-   **No Sidebars:** Remove right/left sidebars. Use a single-column central reading layout / wide visual breaks.
-   **Typography:** Introduction text size should be 1.25x or 1.5x standard body size.
-   **Stats:** Hide population/currency data in a "Traveler's Notebook" modal or subtle footer strip, not a prominent table at the top.

### Cities Layout (Checkerboard)
Alternating layout to create rhythm.
-   Row 1: Image Left (50%) + Text Right (50%)
-   Row 2: Text Left (50%) + Image Right (50%)

### Layout Wireframe (ASCII)
```text
[FULL WIDTH HERO IMAGE - Country Vibe]
[Centered Serif Title: "J A P A N"   ]

       [  Editorial Intro Text   ]
       [  (Max width 700px)      ]

[   CITY 1 IMAGE    ]  [ City 1 Title  ]
[   (Aspect 4:3)    ]  [ Brief Excerpt ]
                       [ "Explore" Link]

[ City 2 Title  ]      [   CITY 2 IMAGE   ]
[ Brief Excerpt ]      [   (Aspect 4:3)   ]
[ "Explore" Link]
```

### CMS > UI Mapping
-   **Hero:** `Country.featuredImage`.
-   **Intro:** `Country.description` (RichText).
-   **Cities List:** Query `Cities` where `country` equals current ID.
-   **City Preview:** `City.featuredImage`, `City.excerpt`.

### Anti-patterns to Remove
-   Auto-generated lists of "All Cities" as small clickable chips.
-   "Sidebar Right" layout with widgets.
-   Generic "Featured Image" placement (boxed).

---

## 3. /destinations/[country]/[city] (City Portrait)

**Purpose:**  
The "Character Study". A city is complex and moody. The design should reflect this locally.

### Visual Identity
-   **Mood:** City heroes should ideally be "in action" (street scenes, skyline at dusk) rather than postcard static.
-   **Attractions:** Displayed as a horizontal scrolling strip (carousel) OR a masonry grid. NOT a vertical list.

### Itinerary Integration
-   Do not just list itineraries. Show them as "Ways to see [City]".
-   Use "Recipe Card" style: "3 Days in Tokyo" (Image + Title + Difficulty Pill).

### Layout Wireframe (ASCII)
```text
[   HERO: Atmospheric City Shot                ]
[   Title bottom-left: "Tokyo"                 ]

[   Quick Facts Strip (Weather, Time)          ]

[   "Design District"   ] [ "Old Town"       ]
[   Image Tile          ] [ Image Tile       ]
<-- Horizontal Scroll of Districts/Areas -->

[   Section: "Unmissable" (Attractions)      ]
[   [Attr 1]  [Attr 2]  [Attr 3]             ]
[   (Vertical Portrait Cards)                ]

[   Section: "Curated Journeys" (Itineraries)]
[   (Wide Cards with Day Count)              ]
```

### CMS > UI Mapping
-   **Hero:** `City.featuredImage`.
-   **Districts/Attractions:** `Attractions` collection filtered by City.
-   **Journeys:** `Itineraries` collection filtered by City. Note: Use `Itinerary.duration` to display "X Days".

### Do Not Do
-   Do not show a map immediately at the top. Maps belong in the practical info section or specific Attraction view.
-   Do not use standard bullet points for "Highlights". Use icon+text or small visual grid.

---



### Connection to Parent
-   Sticky "Book this trip" or "Save to Favorites" bar at bottom (mobile) or top-right (desktop).
-   Back button should say "Back to [City Name]" not just "Back".

### CMS > UI Mapping
-   **Day Data:** `Itineraries.days` array.
-   **Day Title:** `days[i].title`.
-   **Day Content:** `days[i].description`.
-   **Day City:** link to `days[i].city` details if present.

### What NOT to Repeat
-   Do not repeat generic City descriptions inside the itinerary day. Keep it focused on the *action* of the day.

---

## 5. Global Design Rules

### Typography
-   **Headings:** `font-serif` (Playfair Display, Cormorant, or similar). Light font weight (300/400) usually looks more premium than Bold (700) for large sizes.
-   **Body:** `font-sans` (Inter, Lato, etc.) for high readability.
-   **Labels/UI:** Uppercase, tracking wider (`0.05em`).

### Image Rules
-   **Aspect Ratios:**
    -   Landscape: 3:2 (Standard), 21:9 (Cinematic), 16:9 (Video).
    -   Portrait: 3:4 or 4:5 (good for mobile lists).
-   **Treatment:** No filters applied in CSS. Rely on high-quality source.
-   **Corners:** Sharp (0px) or Micro-radius (2px). No large 16px/24px rounded corners (feels too SaaS/App-like).

### Spacing Philosophy (The "Luxury Air")
-   **Margins:** Double standard Tailwind spacing. If you used `py-8`, use `py-16` or `py-24`.
-   **Whitespace:** White space is an active design element. Don't fear empty gaps between the text and the edge of the screen.

### Mobile vs Desktop
-   **Mobile:** Font sizes must remain readable but can be smaller than standard mobile defaults to look elegant. Side margins `px-4` or `px-5`.
-   **Desktop:** Max-width containers should be wide (`max-w-7xl` or `max-w-screen-2xl`) for visual impact but text columns constrained (`max-w-2xl`).

### Current Anti-Patterns to Remove
1.  **Sidebar Layouts:** (`getLayoutClasses` in `page.tsx`). Remove `sidebar-right`, `sidebar-left`. Default to `full-width` / `centered`.
2.  **`section-md`**: Often too small. Create `section-xl` class for major breaks.
3.  **`bg-surface-primary`**: Avoid gray backgrounds for sections unless deliberate. White or very subtle off-white (`#fafafa`) is cleaner.
4.  **Blue Header Bars:** Specifically in `DayCard` (`bg-primary-600`). This is very "Bootstrap" and corporate. Remove.
