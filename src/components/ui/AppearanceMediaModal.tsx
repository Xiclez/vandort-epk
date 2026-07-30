import {
    useEffect,
    useRef,
    useState,
  } from "react";
  import { createPortal } from "react-dom";
  import {
    AnimatePresence,
    motion,
  } from "framer-motion";
  import {
    ImageIcon,
    Volume2,
    VolumeX,
    X,
  } from "lucide-react";
  import type {
    Appearance,
    AppearanceMedia,
  } from "../../content/artistData";
  import { useLanguage } from "../../context/LanguageContext";
  
  interface AppearanceMediaModalProps {
    appearance: Appearance | null;
    open: boolean;
    onClose: () => void;
  }
  
  export function AppearanceMediaModal({
    appearance,
    open,
    onClose,
  }: AppearanceMediaModalProps) {
    const { t, lang } = useLanguage();
  
    const [activeVideoId, setActiveVideoId] =
      useState<string | null>(null);
  
    const videoRefs = useRef(
      new Map<string, HTMLVideoElement>(),
    );
  
    const closeButtonRef =
      useRef<HTMLButtonElement>(null);
  
    /*
     * Lock scrolling, support Escape and reset all videos
     * whenever the modal changes or closes.
     */
    useEffect(() => {
      if (!open) {
        setActiveVideoId(null);
  
        videoRefs.current.forEach((video) => {
          video.muted = true;
          video.pause();
        });
  
        return;
      }
  
      setActiveVideoId(null);
  
      const previousOverflow =
        document.body.style.overflow;
  
      document.body.style.overflow = "hidden";
  
      const handleEscape = (
        event: KeyboardEvent,
      ) => {
        if (event.key === "Escape") {
          onClose();
        }
      };
  
      window.addEventListener(
        "keydown",
        handleEscape,
      );
  
      window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
  
      return () => {
        document.body.style.overflow =
          previousOverflow;
  
        window.removeEventListener(
          "keydown",
          handleEscape,
        );
  
        videoRefs.current.forEach((video) => {
          video.muted = true;
          video.pause();
        });
      };
    }, [open, onClose, appearance?.id]);
  
    /*
     * Only the selected video may emit sound.
     * Every other video is muted immediately.
     */
    useEffect(() => {
      videoRefs.current.forEach(
        (video, videoId) => {
          const isActive =
            open && videoId === activeVideoId;
  
          video.muted = !isActive;
          video.volume = 1;
  
          if (open && video.paused) {
            void video
              .play()
              .catch(() => undefined);
          }
        },
      );
    }, [activeVideoId, open]);
  
    const registerVideo = (
      media: AppearanceMedia,
      node: HTMLVideoElement | null,
    ) => {
      if (!node) {
        videoRefs.current.delete(media.id);
        return;
      }
  
      videoRefs.current.set(media.id, node);
  
      node.muted =
        media.id !== activeVideoId;
  
      node.volume = 1;
  
      if (open) {
        void node
          .play()
          .catch(() => undefined);
      }
    };
  
    const toggleVideoSound = (
      videoId: string,
    ) => {
      setActiveVideoId((current) =>
        current === videoId
          ? null
          : videoId,
      );
    };
  
    if (typeof document === "undefined") {
      return null;
    }
  
    return createPortal(
      <AnimatePresence>
        {open && appearance && (
          <motion.div
            className="fixed inset-0 z-[160] overflow-y-auto bg-black/90 px-4 py-5 backdrop-blur-md md:px-8 md:py-8"
            role="dialog"
            aria-modal="true"
            aria-labelledby="appearance-gallery-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                onClose();
              }
            }}
          >
            <motion.div
              className="relative mx-auto min-h-full w-full max-w-[96rem] border border-bone/10 bg-[#08080a]/96"
              initial={{
                opacity: 0,
                y: 24,
                scale: 0.985,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.985,
              }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <header className="sticky top-0 z-30 flex items-start justify-between gap-5 border-b border-bone/10 bg-[#08080a]/92 px-5 py-5 backdrop-blur-xl md:px-8">
                <div>
                  <span className="font-meta text-blood-bright">
                    {appearance.detail[lang]}
                  </span>
  
                  <h2
                    id="appearance-gallery-title"
                    className="font-gothic mt-2 text-4xl font-medium normal-case leading-none tracking-[-0.02em] text-bone md:text-6xl"
                  >
                    {appearance.event}
                  </h2>
  
                  <p className="font-meta mt-3 text-muted">
                    {appearance.city}
                  </p>
                </div>
  
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 shrink-0 items-center justify-center border border-bone/20 bg-black/30 text-bone transition-colors hover:border-blood hover:bg-blood"
                  aria-label={
                    t.appearances.closeGallery
                  }
                >
                  <X
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </button>
              </header>
  
              <div className="p-4 md:p-8">
                {appearance.media.length === 0 ? (
                  <div className="flex min-h-[48vh] flex-col items-center justify-center border border-dashed border-bone/15 px-6 text-center">
                    <ImageIcon
                      className="mb-5 h-8 w-8 text-blood-bright"
                      aria-hidden="true"
                    />
  
                    <p className="max-w-md text-sm leading-relaxed text-muted">
                      {t.appearances.noMedia}
                    </p>
                  </div>
                ) : (
                  <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
                    {appearance.media.map(
                      (media) => {
                        const videoIsActive =
                          activeVideoId ===
                          media.id;
  
                        if (
                          media.type ===
                          "image"
                        ) {
                          return (
                            <figure
                              key={media.id}
                              className="mb-4 break-inside-avoid overflow-hidden border border-bone/10 bg-black"
                            >
                              <img
                                src={media.src}
                                alt={
                                  media.alt[lang]
                                }
                                className="block h-auto w-full select-none object-contain"
                                loading="lazy"
                                decoding="async"
                                draggable={false}
                              />
                            </figure>
                          );
                        }
  
                        return (
                          <figure
                            key={media.id}
                            className="group relative mb-4 break-inside-avoid overflow-hidden border border-bone/10 bg-black"
                          >
                            <div
                              role="button"
                              tabIndex={0}
                              className="relative cursor-pointer"
                              aria-label={
                                videoIsActive
                                  ? t.appearances
                                      .disableSound
                                  : t.appearances
                                      .enableSound
                              }
                              onClick={() =>
                                toggleVideoSound(
                                  media.id,
                                )
                              }
                              onKeyDown={(
                                event,
                              ) => {
                                if (
                                  event.key ===
                                    "Enter" ||
                                  event.key === " "
                                ) {
                                  event.preventDefault();
  
                                  toggleVideoSound(
                                    media.id,
                                  );
                                }
                              }}
                            >
                              <video
                                ref={(node) =>
                                  registerVideo(
                                    media,
                                    node,
                                  )
                                }
                                src={media.src}
                                poster={media.poster}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="block h-auto w-full object-contain"
                                style={
                                  media.aspectRatio
                                    ? {
                                        aspectRatio:
                                          media.aspectRatio,
                                      }
                                    : undefined
                                }
                              />
  
                              <span className="font-meta pointer-events-none absolute bottom-3 right-3 inline-flex min-h-9 items-center gap-2 border border-bone/20 bg-black/75 px-3 py-2 text-[0.62rem] text-bone backdrop-blur-md">
                                {videoIsActive ? (
                                  <Volume2
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <VolumeX
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                )}
  
                                {videoIsActive
                                  ? t.appearances
                                      .disableSound
                                  : t.appearances
                                      .enableSound}
                              </span>
                            </div>
                          </figure>
                        );
                      },
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    );
  }