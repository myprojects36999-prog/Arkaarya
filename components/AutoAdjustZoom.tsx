"use client";

import { useEffect } from "react";

/**
 * AutoAdjustZoom — Robust cross-browser zoom normalizer
 *
 * Problem:
 *   The admin dashboard is designed for ~1280px+ viewport widths at 100%
 *   browser zoom. When a user has their browser zoomed in (125%, 150%) the
 *   viewport shrinks and elements get cut off. When zoomed out (80%, 67%)
 *   the viewport grows and everything renders too small.
 *
 * Solution:
 *   1. Detect the browser's zoom level by comparing window.outerWidth to
 *      window.innerWidth (most reliable cross-browser method).
 *   2. Calculate a compensation factor so the page always renders at the
 *      intended design scale.
 *   3. Apply compensation using CSS `zoom` (Chromium, Safari) or CSS
 *      `transform: scale()` (Firefox fallback) — never both simultaneously.
 *   4. Clamp the final scale to reasonable bounds (50%–200%) to avoid
 *      extreme distortion.
 *   5. Throttle resize with requestAnimationFrame for smooth performance.
 *   6. Listen to resize, orientationchange, and devicePixelRatio changes.
 */
export default function AutoAdjustZoom() {
  useEffect(() => {
    // ── Configuration ────────────────────────────────────────────────
    const DESIGN_WIDTH = 1280;  // Minimum CSS-pixel width the layout targets
    const MIN_SCALE = 0.5;      // Never shrink below 50%
    const MAX_SCALE = 2.0;      // Never grow above 200%

    // ── Browser detection ────────────────────────────────────────────
    // Firefox doesn't support CSS `zoom`; we use `transform: scale` there.
    const isFirefox =
      typeof navigator !== "undefined" &&
      /firefox/i.test(navigator.userAgent);

    /**
     * Detect the browser's zoom level.
     *
     * We use `window.outerWidth / window.innerWidth` which gives us the
     * ratio between the browser chrome width and the CSS viewport width.
     * When the user zooms in, innerWidth shrinks → ratio > 1.
     * When the user zooms out, innerWidth grows → ratio < 1.
     *
     * Edge cases:
     *   - outerWidth can be 0 in some embedded contexts → fallback to 1
     *   - On mobile, outerWidth === innerWidth always → no adjustment needed
     *   - devicePixelRatio includes both display scaling AND browser zoom,
     *     but we can't reliably separate them, so outerWidth/innerWidth is
     *     more reliable for browser zoom detection specifically.
     */
    function getBrowserZoom(): number {
      // Method 1: outerWidth / innerWidth (most reliable for desktop)
      if (window.outerWidth && window.innerWidth) {
        // Exclude cases where the browser is in a sidebar/panel (outerWidth
        // might be the full screen width while innerWidth is a narrow panel).
        // We only trust this ratio when it's reasonable (0.25 to 4.0).
        const ratio = window.outerWidth / window.innerWidth;
        if (ratio >= 0.25 && ratio <= 4.0) {
          // Round to nearest 5% to avoid jitter from sub-pixel differences
          return Math.round(ratio * 20) / 20;
        }
      }

      // Method 2: Use devicePixelRatio as a rough fallback
      // This includes display scaling, so it's less precise, but on most
      // desktop setups where system DPI is 1x, this gives the browser zoom.
      // We normalize against what we consider "base" DPI.
      if (window.devicePixelRatio) {
        // Common base DPRs: 1 (1080p), 2 (Retina), 1.5 (some Windows)
        // We detect the "base" by looking at screen resolution vs CSS pixels
        const screenCSSWidth = window.screen.width;
        const screenPhysicalWidth = window.screen.width * window.devicePixelRatio;

        // If the physical resolution is roughly 2x the CSS resolution, base DPR is 2
        // If it's roughly 1.5x, base DPR is 1.5, etc.
        let baseDPR = 1;
        if (screenPhysicalWidth > screenCSSWidth * 1.75) {
          baseDPR = 2;
        } else if (screenPhysicalWidth > screenCSSWidth * 1.25) {
          baseDPR = 1.5;
        }

        const zoomFromDPR = window.devicePixelRatio / baseDPR;
        if (zoomFromDPR >= 0.25 && zoomFromDPR <= 4.0) {
          return Math.round(zoomFromDPR * 20) / 20;
        }
      }

      return 1;
    }

    /**
     * Core logic: figure out what scale to apply so the page looks correct.
     */
    function applyZoom(): void {
      const browserZoom = getBrowserZoom();

      // The "effective" viewport width at 100% zoom would be:
      const effectiveWidth = window.innerWidth * browserZoom;

      // We want to compute a compensation factor:
      // - If browser is at 100% and viewport >= DESIGN_WIDTH → scale = 1 (no change)
      // - If browser is zoomed in (e.g., 125%) → content is too big, but
      //   we intentionally DON'T fight that too aggressively (the user might
      //   have vision needs). We only compensate if the layout breaks.
      // - If browser is zoomed out (e.g., 80%) → content is too small,
      //   we scale up to compensate.
      // - If viewport is genuinely small (small monitor) → scale down.

      let scale: number;

      if (effectiveWidth >= DESIGN_WIDTH) {
        // The physical screen is wide enough for the design.
        // Compensate for browser zoom so content renders at intended size.
        // If zoomed out (browserZoom < 1), scale UP to compensate (1/0.8 = 1.25).
        // If zoomed in (browserZoom > 1), scale DOWN to fit the design width.
        scale = 1 / browserZoom;
      } else {
        // The physical screen is too narrow even at 100% zoom.
        // Scale the content to fit the available space.
        scale = window.innerWidth / DESIGN_WIDTH;
      }

      // Clamp to sane bounds
      scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale));

      // Round to 3 decimal places to avoid sub-pixel jitter
      scale = Math.round(scale * 1000) / 1000;

      // If scale is effectively 1 (within 2%), do nothing to avoid unnecessary DOM manipulation
      if (Math.abs(scale - 1) < 0.02) {
        resetStyles();
        return;
      }

      if (isFirefox) {
        // ── Firefox: use transform:scale ──────────────────────────────
        // Remove any zoom property (not supported anyway, but be clean)
        (document.body.style as any).zoom = "";

        document.body.style.transformOrigin = "0 0";
        document.body.style.transform = `scale(${scale})`;

        // Compensate body dimensions so content fills the viewport properly.
        // After scale(0.8), the body is rendered 80% size, so we need it
        // to be 1/0.8 = 125% wide to fill the viewport.
        document.body.style.width = `${100 / scale}%`;

        // Compensate height so there's no gap at the bottom
        const compensatedHeight = Math.ceil(window.innerHeight / scale);
        document.body.style.minHeight = `${compensatedHeight}px`;

        // Prevent horizontal scrollbar
        document.documentElement.style.overflowX = "hidden";
      } else {
        // ── Chromium / Safari: use CSS zoom ───────────────────────────
        // CSS zoom is much better than transform because it:
        //   - Preserves layout flow (no stacking context issues)
        //   - Doesn't break position:fixed elements (sidebar, modals)
        //   - Doesn't require width/height compensation
        //   - Has better sub-pixel rendering

        // Remove transform-based styles
        document.body.style.removeProperty("transform");
        document.body.style.removeProperty("transform-origin");
        document.body.style.removeProperty("width");
        document.body.style.removeProperty("min-height");
        document.documentElement.style.removeProperty("overflow-x");

        (document.body.style as any).zoom = String(scale);
      }
    }

    /**
     * Reset all styles back to defaults.
     */
    function resetStyles(): void {
      document.body.style.removeProperty("transform");
      document.body.style.removeProperty("transform-origin");
      document.body.style.removeProperty("width");
      document.body.style.removeProperty("min-height");
      (document.body.style as any).zoom = "";
      document.documentElement.style.removeProperty("overflow-x");
    }

    // ── Throttled resize handler ─────────────────────────────────────
    let raf: number | null = null;
    const handleResize = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        applyZoom();
        raf = null;
      });
    };

    // ── Listen for devicePixelRatio changes ──────────────────────────
    // When the user changes browser zoom, devicePixelRatio changes.
    // matchMedia with a resolution query lets us detect this.
    let dprMediaQuery: MediaQueryList | null = null;
    function watchDPR() {
      // Clean up previous listener
      if (dprMediaQuery) {
        dprMediaQuery.removeEventListener("change", onDPRChange);
      }
      // Create a new media query for the current DPR
      dprMediaQuery = window.matchMedia(
        `(resolution: ${window.devicePixelRatio}dppx)`
      );
      dprMediaQuery.addEventListener("change", onDPRChange);
    }
    function onDPRChange() {
      handleResize();
      // Re-watch because the DPR value changed
      watchDPR();
    }

    // ── Attach event listeners ───────────────────────────────────────
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("orientationchange", handleResize, { passive: true });
    watchDPR();

    // ── Initial run ──────────────────────────────────────────────────
    applyZoom();

    // ── Cleanup ──────────────────────────────────────────────────────
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (dprMediaQuery) {
        dprMediaQuery.removeEventListener("change", onDPRChange);
      }
      if (raf !== null) cancelAnimationFrame(raf);
      resetStyles();
    };
  }, []);

  return null;
}
