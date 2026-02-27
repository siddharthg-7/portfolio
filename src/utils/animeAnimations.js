/**
 * animeAnimations.js
 * Central Anime.js utility for the portfolio.
 * Provides reusable animation helpers used across components.
 */

import {
    animate,
    createTimeline,
    stagger,
    onScroll,
    createDrawable,
    createSpring,
    createDraggable,
    utils,
} from 'animejs';

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Random number between min and max */
export const rand = (min, max) => Math.random() * (max - min) + min;

// ── Hero ─────────────────────────────────────────────────────────────────────

/**
 * Staggered entrance animation for the hero text elements.
 * Call once on mount.
 * @param {string} containerSelector - CSS selector for hero text wrapper
 */
export function animateHeroEntrance(containerSelector) {
    const tl = createTimeline({ defaults: { ease: 'outExpo' } });

    tl.add(`${containerSelector} .hero-greeting-wrapper`, {
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 700,
    })
        .add(
            `${containerSelector} .hero-title`,
            {
                opacity: [0, 1],
                translateY: [40, 0],
                duration: 700,
            },
            '-=400'
        )
        .add(
            `${containerSelector} .hero-tagline`,
            {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
            },
            '-=400'
        )
        .add(
            `${containerSelector} .hero-description`,
            {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 600,
            },
            '-=300'
        )
        .add(
            `${containerSelector} .hero-cta`,
            {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 500,
            },
            '-=300'
        )
        .add(
            `${containerSelector} .hero-social a`,
            {
                opacity: [0, 1],
                translateY: [15, 0],
                duration: 400,
                delay: stagger(80),
            },
            '-=200'
        );

    return tl;
}

/**
 * Continuous floating animation for the hero profile image area.
 * @param {string} selector - CSS selector for the floating element
 */
export function animateHeroFloat(selector) {
    return animate(selector, {
        translateY: [-8, 8],
        duration: 3000,
        loop: true,
        alternate: true,
        ease: 'inOutSine',
    });
}

/**
 * Continuous pulse glow for the hero image ring.
 * @param {string} selector
 */
export function animateHeroRing(selector) {
    return animate(selector, {
        rotate: 360,
        duration: 18000,
        loop: true,
        ease: 'linear',
    });
}

// ── Skills ────────────────────────────────────────────────────────────────────

/**
 * Staggered wave entrance for skill chips.
 * @param {string} chipsSelector - e.g. '.skill-chip'
 */
export function animateSkillChips(chipsSelector) {
    return animate(chipsSelector, {
        opacity: [0, 1],
        scale: [0.7, 1],
        duration: 450,
        delay: stagger(40, { from: 'center' }),
        ease: 'outBack(1.5)',
    });
}

/**
 * Hover pulse on a skill chip element.
 * @param {Element} el
 */
export function hoverSkillChip(el) {
    animate(el, {
        scale: 1.1,
        translateY: -4,
        duration: 200,
        ease: 'outQuad',
    });
}

export function leaveSkillChip(el) {
    animate(el, {
        scale: 1,
        translateY: 0,
        duration: 200,
        ease: 'inQuad',
    });
}

// ── Projects ──────────────────────────────────────────────────────────────────

/**
 * Staggered card entrance from below.
 * @param {string} cardsSelector
 */
export function animateProjectCards(cardsSelector) {
    return animate(cardsSelector, {
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.96, 1],
        duration: 600,
        delay: stagger(120),
        ease: 'outExpo',
    });
}

// ── Section Titles ────────────────────────────────────────────────────────────

/**
 * Scroll-synced underline draw for section title decorators.
 * @param {string} lineSelector - CSS selector for the underline/decorator element
 */
export function animateSectionTitleLine(lineSelector) {
    const elements = document.querySelectorAll(lineSelector);
    elements.forEach((el) => {
        const drawable = createDrawable(el);
        animate(drawable, {
            draw: ['0 0', '0 1'],
            duration: 800,
            ease: 'inOutQuad',
            autoplay: onScroll({
                container: document.documentElement,
                enter: 'top 85%',
                sync: false,
            }),
        });
    });
}

// ── About Cards ───────────────────────────────────────────────────────────────

/**
 * Entrance for About section cards using a timeline.
 * @param {string} cardsSelector
 */
export function animateAboutCards(cardsSelector) {
    return animate(cardsSelector, {
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 600,
        delay: stagger(150),
        ease: 'outExpo',
    });
}

// ── Experience Timeline ───────────────────────────────────────────────────────

/**
 * Draw the experience timeline line on scroll.
 * @param {string} lineSelector
 */
export function animateTimelineOnScroll(lineSelector) {
    const el = document.querySelector(lineSelector);
    if (!el) return;

    animate(el, {
        scaleY: [0, 1],
        duration: 1,
        autoplay: onScroll({
            container: document.documentElement,
            enter: 'top 90%',
            leave: 'bottom 10%',
            sync: true,
        }),
    });
}

/**
 * Stagger experience items into view.
 * @param {string} itemsSelector
 */
export function animateExperienceItems(itemsSelector) {
    return animate(itemsSelector, {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 550,
        delay: stagger(180),
        ease: 'outExpo',
    });
}

// ── Floating Orbs ─────────────────────────────────────────────────────────────

/**
 * Animate floating background orbs with slight randomness.
 * @param {string} orbSelector
 */
export function animateOrbs(orbSelector) {
    const orbs = document.querySelectorAll(orbSelector);
    orbs.forEach((orb) => {
        animate(orb, {
            translateX: [rand(-30, -10), rand(10, 30)],
            translateY: [rand(-30, -10), rand(10, 30)],
            scale: [rand(0.95, 1.0), rand(1.05, 1.15)],
            duration: rand(7000, 11000),
            loop: true,
            alternate: true,
            ease: 'inOutSine',
        });
    });
}

// ── CTA Button Arrow Bounce ───────────────────────────────────────────────────

/**
 * Continuous arrow bounce inside CTA button.
 * @param {string} arrowSelector
 */
export function animateCTAArrow(arrowSelector) {
    return animate(arrowSelector, {
        translateX: [0, 6, 0],
        duration: 1400,
        loop: true,
        ease: 'inOutSine',
    });
}

// ── Scroll Indicator ─────────────────────────────────────────────────────────

/**
 * Animate the scroll progress line repeatedly.
 * @param {string} lineSelector
 */
export function animateScrollIndicator(lineSelector) {
    return animate(lineSelector, {
        height: ['0%', '100%', '0%'],
        opacity: [0, 1, 0],
        duration: 2000,
        loop: true,
        ease: 'inOutQuad',
    });
}

// ── Navbar ────────────────────────────────────────────────────────────────────

/**
 * Slide down navbar on mount.
 * @param {string} navSelector
 */
export function animateNavbarEntrance(navSelector) {
    return animate(navSelector, {
        translateY: [-80, 0],
        opacity: [0, 1],
        duration: 700,
        ease: 'outExpo',
    });
}

/**
 * Stagger nav links in.
 * @param {string} linksSelector
 */
export function animateNavLinks(linksSelector) {
    return animate(linksSelector, {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 400,
        delay: stagger(80),
        ease: 'outQuad',
    });
}

// ── Spring Draggable ──────────────────────────────────────────────────────────

/**
 * Make an element draggable with spring release.
 * @param {string} selector
 * @returns draggable instance (call .revert() to clean up)
 */
export function makeDraggableWithSpring(selector) {
    return createDraggable(selector, {
        releaseEase: createSpring({
            stiffness: 130,
            damping: 8,
        }),
    });
}
