import {
    useEffect,
    useLayoutEffect,
    useState,
  } from "react";
  import {
    motion,
    useMotionValueEvent,
    useScroll,
    useTransform,
  } from "framer-motion";
  import { ShaderBackground } from "./ShaderBackground";
  
  export function PageShader() {
    const { scrollY } = useScroll();
  
    const [heroHeight, setHeroHeight] = useState(1);
    const [shaderEnabled, setShaderEnabled] = useState(false);
  
    useLayoutEffect(() => {
      const hero = document.getElementById("hero");
  
      if (!hero) {
        setHeroHeight(window.innerHeight);
        return;
      }
  
      const measureHero = () => {
        setHeroHeight(
          Math.max(hero.getBoundingClientRect().height, 1),
        );
      };
  
      measureHero();
  
      const resizeObserver = new ResizeObserver(measureHero);
      resizeObserver.observe(hero);
  
      window.addEventListener("resize", measureHero);
  
      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("resize", measureHero);
      };
    }, []);
  
    useEffect(() => {
      setShaderEnabled(
        window.scrollY >= Math.max(heroHeight - 100, 1),
      );
    }, [heroHeight]);
  
    useMotionValueEvent(scrollY, "change", (currentY) => {
      const shouldEnable =
        currentY >= Math.max(heroHeight - 100, 1);
  
      setShaderEnabled((current) =>
        current === shouldEnable
          ? current
          : shouldEnable,
      );
    });
  
    const opacity = useTransform(
      scrollY,
      [
        Math.max(heroHeight - 100, 0),
        heroHeight + 180,
      ],
      [0, 1],
    );
  
    return (
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        style={{ opacity }}
        aria-hidden="true"
      >
        {shaderEnabled && (
          <>
            <ShaderBackground className="h-full w-full opacity-[0.38]" />
  
            <div
              className="absolute inset-0 bg-[rgba(5,5,5,0.34)]"
              aria-hidden="true"
            />
  
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,transparent_0%,rgba(5,5,5,0.12)_38%,rgba(5,5,5,0.62)_100%)]"
              aria-hidden="true"
            />
          </>
        )}
      </motion.div>
    );
  }