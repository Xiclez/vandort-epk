import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";

/**
 * Lightweight blood moon.
 * ------------------------------------------------------------------
 * FUTURE SPLINE HOOK: a Spline scene could replace this component in
 * place. Keep the same wrapper size/position so the swap is drop-in.
 * ------------------------------------------------------------------
 * One shared conceptual component, repositioned per section via `className`.
 * Renders a static CSS moon when WebGL is unavailable or motion is reduced;
 * otherwise lazy-loads the Three.js scene (keeps three out of the main bundle).
 */

// Lazy so three.js is fetched only when the WebGL path is actually taken.
const BloodMoonScene = lazy(() => import("./BloodMoonScene"));

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/** Static, dependency-free fallback. */
function CssMoon({ className }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none ${className ?? ""}`}
      aria-hidden="true"
    >
      <div
        className="h-full w-full rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle at 34% 30%, rgba(165,34,52,0.9) 0%, rgba(92,10,25,0.96) 34%, rgba(28,3,10,0.98) 69%, rgba(3,3,4,1) 100%)",
          boxShadow:
            "inset -42px -30px 74px rgba(0,0,0,0.82), 0 0 52px 8px rgba(158,16,37,0.16)",
        }}
      />
    </div>
  );
}

export function BloodMoon({ className = "" }: { className?: string }) {
  const reduced = useReducedMotionPreference();

const [webgl] = useState(() =>
  typeof window === "undefined" ? true : hasWebGL()
);

const [sceneReady, setSceneReady] = useState(false);

const active = useRef(true);
const wrapRef = useRef<HTMLDivElement>(null);

const handleSceneReady = useCallback(() => {
  setSceneReady(true);
}, []);

  // Pause the render loop when the moon scrolls out of view.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        active.current = entry.isIntersecting;
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const glow = useMemo(
    () => ({
      filter:
        "drop-shadow(0 0 28px rgba(158,16,37,0.38)) drop-shadow(0 0 90px rgba(158,16,37,0.2))",
    }),
    []
  );

  if (!webgl || reduced) {
    return <CssMoon className={className} />;
  }

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none relative ${className}`}
      style={glow}
      aria-hidden="true"
    >
      <div
        className={[
          "absolute inset-0 transition-opacity duration-700",
          sceneReady ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        <CssMoon className="h-full w-full" />
      </div>
  
      <div
        className={[
          "absolute inset-0 transition-opacity duration-700",
          sceneReady ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <Suspense fallback={null}>
          <BloodMoonScene
            active={active}
            onReady={handleSceneReady}
          />
        </Suspense>
      </div>
    </div>
  );
}
