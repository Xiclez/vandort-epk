import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  MapPin,
  User,
  Instagram,
  Music2,
  Youtube,
  Send,
  FileDown,
} from "lucide-react";
import { Section } from "../layout/Section";
import { SectionHeading } from "../ui/SectionHeading";
import { PlaceholderButton } from "../ui/PlaceholderButton";
import { BatField } from "../visuals/BatField";
import { booking } from "../../content/artistData";
import { useLanguage } from "../../context/LanguageContext";
import { useReducedMotionPreference } from "../../hooks/useReducedMotionPreference";
import { fadeUp, stagger, viewportOnce } from "../../lib/motion";

export function BookingSection() {
  const { t } = useLanguage();
  const reduced = useReducedMotionPreference();

  const details = [
    { icon: User, label: t.booking.managerLabel, value: booking.manager },
    { icon: Mail, label: t.booking.emailLabel, value: booking.email },
    { icon: MessageCircle, label: t.booking.whatsappLabel, value: booking.whatsapp },
    { icon: MapPin, label: t.booking.cityLabel, value: booking.city },
    { icon: Instagram, label: t.booking.instagramLabel, value: booking.social.instagram },
    { icon: Music2, label: t.booking.soundcloudLabel, value: booking.social.soundcloud },
    { icon: Youtube, label: t.booking.youtubeLabel, value: booking.social.youtube },
  ];

  return (
    <Section
  id="booking"
  ariaLabel={t.booking.title}
  sideLabel={t.nav.booking}
  className="overflow-visible bg-[rgba(11,11,13,0.76)]"
>
      {/* The global MoonJourney reaches its final position here. */}
      <BatField
  count={7}
  mode="ambient"
  disperse
  className="z-10"
/>
      <div className="relative z-10">
        <SectionHeading index={8} title={t.booking.title} intro={t.booking.intro} />

        <div className="grid grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <motion.div
            variants={fadeUp(reduced)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <img
              src="/images/vandort/booking-portrait.webp"
              alt="Booking Portrait"
              className="w-full h-auto object-cover aspect-[3/4]"
            />
          </motion.div>

          <div>
            <motion.dl
              className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2"
              variants={stagger(reduced)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {details.map(({ icon: Icon, label, value }) => (
                <motion.div
                  key={label}
                  variants={fadeUp(reduced)}
                  className="flex items-start gap-3 bg-ink p-5"
                >
                  <Icon className="mt-1 h-4 w-4 flex-none text-blood-bright" aria-hidden="true" />
                  <div>
                    <dt className="font-meta text-muted">{label}</dt>
                    <dd className="mt-1 break-words text-bone">{value}</dd>
                  </div>
                </motion.div>
              ))}
            </motion.dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <PlaceholderButton
                variant="primary"
                placeholder
                icon={<Send className="h-4 w-4" aria-hidden="true" />}
              >
                {t.booking.primaryCta}
              </PlaceholderButton>
              <PlaceholderButton
                variant="secondary"
                placeholder
                icon={<FileDown className="h-4 w-4" aria-hidden="true" />}
              >
                {t.booking.secondaryCta}
              </PlaceholderButton>
            </div>
          </div>
        </div>

        <motion.p
          className="mt-16 text-center text-3xl leading-tight text-bone md:text-5xl"
          style={{ fontFamily: "var(--font-display)" }}
          variants={fadeUp(reduced)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          {t.booking.closing}
        </motion.p>
      </div>
    </Section>
  );
}