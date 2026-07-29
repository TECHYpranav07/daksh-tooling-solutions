/**
 * Mutable scroll-progress store shared between the DOM scroll listener
 * and the R3F frame loop, avoiding React re-renders at 60fps.
 */
export const progressStore = {
  /** raw scroll progress 0..1 */
  p: 0,
  /** smoothed progress (lerped in the frame loop) */
  smooth: 0,
}
