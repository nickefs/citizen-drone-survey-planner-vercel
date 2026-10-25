function isStationaryTap(start, end, elapsedMs, scrollY) {
  if (!start || start.id !== end.pointerId) return false;
  if (start.moved) return false;
  if (elapsedMs > 650 || Math.abs(scrollY - start.scrollY) > 2) return false;
  return Math.hypot(end.clientX - start.x, end.clientY - start.y) <= 8;
}

if (typeof module !== 'undefined') module.exports = { isStationaryTap };
if (typeof window !== 'undefined') window.isStationaryTap = isStationaryTap;
