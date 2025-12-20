# Animation Performance Best Practices
## 60fps Smooth Animations Guide

---

## 🎯 **GOLDEN RULES**

### 1. **Only Animate These Properties** (GPU-Accelerated)
✅ `transform` (translate, scale, rotate)  
✅ `opacity`  
✅ `filter` (use sparingly)

❌ **NEVER Animate:**
- `width`, `height` (causes layout reflow)
- `top`, `left`, `right`, `bottom` (causes layout reflow)
- `margin`, `padding` (causes layout reflow)
- `font-size` (causes layout + repaint)
- `border-width` (causes repaint)

### Why?
```
Layout (Reflow) → Paint → Composite = SLOW (< 30fps)
Transform/Opacity → Composite = FAST (60fps)
```

---

## 🚀 **PERFORMANCE TECHNIQUES**

### **1. Force GPU Acceleration**

```css
.animated-element {
  /* Force GPU layer */
  transform: translateZ(0);
  will-change: transform, opacity;
  
  /* Or use backface-visibility */
  backface-visibility: hidden;
}
```

```javascript
// In Framer Motion
<motion.div
  style={{
    transform: "translateZ(0)",
    willChange: "transform, opacity",
  }}
  animate={{ x: 100 }}
/>
```

⚠️ **Warning**: Remove `will-change` after animation completes (memory leak)

```javascript
<motion.div
  animate={{ x: 100 }}
  onAnimationComplete={() => {
    // Remove will-change
    element.style.willChange = 'auto';
  }}
/>
```

---

### **2. Use `transform` Instead of Position**

❌ **Bad** (causes layout reflow):
```css
.box {
  position: absolute;
  left: 0;
  transition: left 0.3s;
}
.box:hover {
  left: 100px; /* Triggers layout! */
}
```

✅ **Good** (GPU-accelerated):
```css
.box {
  transform: translateX(0);
  transition: transform 0.3s;
}
.box:hover {
  transform: translateX(100px); /* Composite only! */
}
```

---

### **3. Debounce Scroll Listeners**

❌ **Bad** (fires 100+ times per second):
```javascript
window.addEventListener('scroll', () => {
  // Heavy calculation on every scroll event
  updateParallax();
});
```

✅ **Good** (use IntersectionObserver):
```javascript
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Trigger animation
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(element);
```

✅ **Good** (Framer Motion's `useInView`):
```javascript
import { useInView } from 'framer-motion';

const ref = useRef(null);
const isInView = useInView(ref, { 
  once: true,
  margin: '-100px',
});

<motion.div
  ref={ref}
  initial={{ opacity: 0 }}
  animate={isInView ? { opacity: 1 } : {}}
/>
```

---

### **4. Limit Box-Shadows on Animated Elements**

❌ **Bad** (expensive repaint):
```css
.card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5); /* Repaint! */
}
```

✅ **Good** (use pseudo-element):
```css
.card {
  position: relative;
  transition: transform 0.3s;
}
.card::before {
  content: '';
  position: absolute;
  inset: 0;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: -1;
}
.card:hover {
  transform: translateY(-10px);
}
.card:hover::before {
  opacity: 1; /* Only opacity changes! */
}
```

---

### **5. Use `contain` for Isolated Animations**

```css
.animated-section {
  /* Isolate layout/paint/style calculations */
  contain: layout style paint;
}
```

Benefits:
- Browser won't recalculate layout for parent elements
- Faster rendering for complex animations

---

### **6. Reduce Animation Complexity on Mobile**

```javascript
const isMobile = window.innerWidth < 768;

const animationDuration = isMobile ? 0.3 : 0.5;
const enableParallax = !isMobile;

<motion.div
  animate={{
    y: enableParallax ? parallaxY : 0,
  }}
  transition={{
    duration: animationDuration,
  }}
/>
```

---

### **7. Lazy Load Heavy Animations**

```javascript
import { lazy, Suspense } from 'react';

// Only load heavy animation component when needed
const HeavyAnimation = lazy(() => import('./HeavyAnimation'));

<Suspense fallback={<div>Loading...</div>}>
  {showAnimation && <HeavyAnimation />}
</Suspense>
```

---

## 🔍 **PERFORMANCE DEBUGGING**

### **Chrome DevTools Performance Tab**

1. Open DevTools → **Performance** tab
2. Click **Record** (red circle)
3. Scroll through your page
4. Click **Stop**
5. Analyze:
   - **Green bars** = Good (60fps)
   - **Yellow bars** = Scripting (optimize JS)
   - **Purple bars** = Layout/Reflow (BAD!)
   - **Green bars with red triangles** = Dropped frames

### **Look For:**
- ❌ **Purple "Layout" bars** → You're animating layout properties
- ❌ **Long tasks (red bars)** → Heavy JavaScript blocking render
- ❌ **Dropped frames** → Animation not hitting 60fps

---

### **Lighthouse Performance Audit**

```bash
# Run Lighthouse
npm install -g lighthouse
lighthouse http://localhost:5173 --view
```

Check:
- **First Contentful Paint** < 1.8s
- **Largest Contentful Paint** < 2.5s
- **Cumulative Layout Shift** < 0.1
- **Total Blocking Time** < 200ms

---

## 📱 **MOBILE PERFORMANCE**

### **Test on Real Devices**
- Don't just use Chrome DevTools mobile emulation
- Test on mid-range Android (not flagship)
- Test on older iPhones (iPhone 8, XR)

### **Mobile Optimizations:**

```javascript
// Detect mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Reduce animation complexity
const motionConfig = {
  duration: isMobile ? 0.3 : 0.5,
  ease: isMobile ? 'easeOut' : [0.43, 0.13, 0.23, 0.96],
};

// Disable parallax on mobile
const parallaxY = isMobile ? 0 : useTransform(scrollY, [0, 500], [0, 150]);

// Reduce particle count
const particleCount = isMobile ? 20 : 50;
```

---

## ♿ **ACCESSIBILITY: `prefers-reduced-motion`**

### **CSS Implementation:**

```css
/* Default: animations enabled */
.element {
  animation: fadeIn 0.5s ease-out;
}

/* Respect user preference */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### **JavaScript Implementation:**

```javascript
// Check user preference
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// Disable animations
if (prefersReducedMotion) {
  return {
    initial: false,
    animate: false,
    exit: false,
    transition: { duration: 0 },
  };
}
```

### **Framer Motion Utility:**

```javascript
// utils/motionConfig.js
export const getAnimationProps = (variants) => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      initial: false,
      animate: false,
      exit: false,
      transition: { duration: 0 },
    };
  }
  return variants;
};

// Usage
<motion.div {...getAnimationProps(fadeInUp)} />
```

---

## 🎨 **FRAMER MOTION BEST PRACTICES**

### **1. Use `layoutId` for Shared Element Transitions**

```javascript
<motion.div layoutId="card-1">
  <img src="image.jpg" />
</motion.div>

// On another page/state
<motion.div layoutId="card-1">
  <img src="image.jpg" />
</motion.div>
```

### **2. Optimize Stagger Animations**

```javascript
// ❌ Bad: Too many children, too slow
<motion.div>
  {items.map((item, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: i * 0.1 }} // Delay increases linearly!
    />
  ))}
</motion.div>

// ✅ Good: Use staggerChildren
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
    />
  ))}
</motion.div>
```

### **3. Use `useScroll` with `useTransform` for Parallax**

```javascript
import { useScroll, useTransform } from 'framer-motion';

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 150]);
const opacity = useTransform(scrollY, [0, 300], [1, 0]);

<motion.div style={{ y, opacity }}>
  Parallax content
</motion.div>
```

### **4. Memoize Heavy Animations**

```javascript
import { useMemo } from 'react';

const animationVariants = useMemo(() => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}), []);

<motion.div variants={animationVariants} />
```

---

## 🛠️ **COMMON PERFORMANCE ISSUES & FIXES**

### **Issue 1: Janky Scroll Animations**

❌ **Problem:**
```javascript
window.addEventListener('scroll', () => {
  element.style.transform = `translateY(${window.scrollY * 0.5}px)`;
});
```

✅ **Solution:**
```javascript
import { useScroll, useTransform, motion } from 'framer-motion';

const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 500], [0, 250]);

<motion.div style={{ y }} />
```

---

### **Issue 2: Layout Shift During Animation**

❌ **Problem:**
```javascript
<motion.div
  initial={{ height: 0 }}
  animate={{ height: 'auto' }} // Causes layout shift!
/>
```

✅ **Solution:**
```javascript
<motion.div
  initial={{ opacity: 0, scaleY: 0 }}
  animate={{ opacity: 1, scaleY: 1 }}
  style={{ transformOrigin: 'top' }}
/>
```

---

### **Issue 3: Heavy Re-renders**

❌ **Problem:**
```javascript
<motion.div
  animate={{
    x: Math.random() * 100, // Re-calculates on every render!
  }}
/>
```

✅ **Solution:**
```javascript
const [x] = useState(() => Math.random() * 100);

<motion.div animate={{ x }} />
```

---

## 📊 **PERFORMANCE METRICS TO TRACK**

| Metric | Target | Tool |
|--------|--------|------|
| **FPS** | 60fps | Chrome DevTools Performance |
| **First Contentful Paint** | < 1.8s | Lighthouse |
| **Largest Contentful Paint** | < 2.5s | Lighthouse |
| **Cumulative Layout Shift** | < 0.1 | Lighthouse |
| **Total Blocking Time** | < 200ms | Lighthouse |
| **Time to Interactive** | < 3.8s | Lighthouse |

---

## 🎯 **FINAL CHECKLIST**

- [ ] Only animating `transform` and `opacity`
- [ ] Using `will-change` (and removing it after animation)
- [ ] No scroll listeners (using IntersectionObserver or `useInView`)
- [ ] Box-shadows optimized (pseudo-elements or minimal changes)
- [ ] Mobile animations simplified
- [ ] `prefers-reduced-motion` respected
- [ ] Tested on real devices (not just emulator)
- [ ] Lighthouse score > 90
- [ ] No dropped frames in Performance tab
- [ ] No purple "Layout" bars in Performance tab

---

**Remember**: Performance > Flashiness. A simple animation at 60fps feels better than a complex animation at 30fps.
