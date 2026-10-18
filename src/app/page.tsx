import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import ScrollVideo from "./ScrollVideo";
import Reveal from "./Reveal";

import openShot from "../../public/product/panda-open.jpg";
import lockedShot from "../../public/product/panda-locked.jpg";
import kitchenShot from "../../public/product/panda-feeder.jpg";
import studioShot from "../../public/product/panda-front.jpg";
import stepStand from "../../public/product/step-stand.jpg";

export const metadata: Metadata = { alternates: { canonical: "/" } };
import stepTag from "../../public/product/step-tag.jpg";
import stepAway from "../../public/product/step-away.jpg";

const steps = [
  {
    step: "01",
    title: "Stand it over the bowl",
    img: stepStand,
    alt: "Two hands set the Aiwan shield down over a cat bowl on the floor.",
    desc: "The A-frame straddles your existing bowl, raised stand, or automatic feeder. Adjustable legs with suction feet find the floor and stay put — no tools, no drilling, nothing new for your cat to learn.",
  },
  {
    step: "02",
    title: "Clip on the RFID tag",
    img: stepTag,
    alt: "A small round RFID collar tag resting in an open palm.",
    desc: "The tag goes on your cat's collar like an ID disc. Hold it near the shield once to register it. It is passive — no battery to change, nothing implanted, nothing for your cat to notice.",
  },
  {
    step: "03",
    title: "Walk away",
    img: stepAway,
    alt: "The Aiwan shield standing over a full bowl in a quiet, sunlit room.",
    desc: "From then on the shield opens for the registered tag and stays shut for everyone else — while you're at work, asleep, or on the other side of the house.",
  },
];

const useCases = [
  {
    title: "Prescription diets",
    desc: "Keep kidney, diabetic, or allergy food away from healthy cats — no separate rooms, no closed doors, no standing guard.",
  },
  {
    title: "Weight management",
    desc: "A measured portion stays measured. Your dieting cat eats its own food; the others can't help themselves to it.",
  },
  {
    title: "Food stealing",
    desc: "The fast eater stops finishing the slow one's bowl. Each cat is enrolled to its own shield and eats at its own pace.",
  },
];

const details = [
  {
    t: "Fits the bowl you already own",
    d: "Ceramic bowl, raised stand, or automatic feeder — the frame stands over it instead of replacing it.",
  },
  {
    t: "Adjustable legs, suction feet",
    d: "Each leg adjusts for height and angle, then locks down onto tile or hardwood so a determined cat can't shove it aside.",
  },
  {
    t: "Folds flat",
    d: "The bi-fold lid folds in half as it opens, and the frame collapses for cleaning, storage, or travel.",
  },
  {
    t: "No app required",
    d: "Registration happens on the unit itself. Nothing to pair, no account, no notification at dinnertime.",
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="px-3 sm:px-5 pt-2">
        <div className="relative h-[560px] sm:h-[640px] lg:h-[720px] overflow-hidden rounded-[28px] shadow-warm">
          <Image
            src={openShot}
            alt="A silver tabby walks up to the open Aiwan food shield, its lid folded back over the bowl."
            priority
            fill
            sizes="100vw"
            className="hero-zoom object-cover object-[70%_60%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c140e]/75 via-[#1c140e]/35 to-transparent" />
          <div className="relative h-full max-w-6xl mx-auto px-6 sm:px-10 flex items-center">
            <Reveal className="max-w-xl text-white">
              <span className="inline-block text-xs font-medium tracking-wide uppercase mb-5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20">
                RFID food shield
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.05] tracking-tight mb-5">
                The right cat eats the right food.
              </h1>
              <p className="text-lg text-white/85 leading-relaxed mb-8 max-w-md">
                Aiwan stands over any bowl, reads the tag on your cat&apos;s collar,
                and opens only for that cat. Everyone else meets a closed door.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#product"
                  className="bg-brand text-white font-medium px-7 py-3 rounded-full shadow-soft hover:bg-brand-dark transition-colors"
                >
                  See the shield
                </Link>
                <Link
                  href="/#how"
                  className="bg-white/10 backdrop-blur-sm border border-white/40 text-white font-medium px-7 py-3 rounded-full hover:bg-white hover:text-ink transition-colors"
                >
                  How it works
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Scroll-driven product film */}
      <ScrollVideo />

      {/* Right cat / wrong cat */}
      <section className="max-w-6xl mx-auto px-5 pb-24" id="product">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <h2 className="text-3xl sm:text-[2.6rem] font-semibold tracking-tight">
            One bowl. Two cats.
          </h2>
          <p className="text-muted max-w-md text-[15px] leading-relaxed">
            The shield checks the RFID tag before it lets anyone in — no timer to
            program, no schedule to guess at, nothing for your cats to negotiate
            between themselves.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              img: openShot,
              alt: "The enrolled tabby reaches the open Aiwan shield, lid folded out of the way.",
              pos: "object-[45%_center]",
              dot: "bg-emerald-400",
              title: "Right tag — open",
              desc: "The cat registered to this shield walks up, the reader picks up the tag on its collar, and the lid folds out of the way.",
            },
            {
              img: lockedShot,
              alt: "An orange cat without the registered tag finds the Aiwan shield closed over the food bowl.",
              pos: "object-[50%_center]",
              dot: "bg-brand",
              title: "Wrong tag — closed",
              desc: "Anyone else — the other cat, the dog, the kitten who eats everything — finds a solid panel where the food used to be.",
            },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <article className="group relative rounded-[28px] overflow-hidden shadow-warm">
                <Image
                  src={card.img}
                  alt={card.alt}
                  sizes="(max-width: 640px) 100vw, 560px"
                  className={`w-full h-[400px] sm:h-[480px] object-cover ${card.pos} transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c140e]/80 via-[#1c140e]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8 text-white">
                  <h3 className="flex items-center gap-2.5 text-xl font-semibold mb-1.5">
                    <span className={`w-2 h-2 rounded-full ${card.dot}`} />
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/85 leading-relaxed max-w-sm">{card.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-3 sm:px-5" id="how">
        <div className="bg-mist rounded-[36px] py-20 sm:py-24">
          <div className="max-w-6xl mx-auto px-5">
            <Reveal>
              <h2 className="text-3xl sm:text-[2.6rem] font-semibold tracking-tight mb-12">
                Set up in one sitting
              </h2>
            </Reveal>
            <ol className="grid md:grid-cols-3 gap-6">
              {steps.map((item, i) => (
                <li key={item.step}>
                  <Reveal delay={i * 120} className="h-full">
                    <div className="h-full bg-background rounded-[24px] p-3 shadow-soft">
                      <div className="relative overflow-hidden rounded-[18px]">
                        <Image
                          src={item.img}
                          alt={item.alt}
                          sizes="(max-width: 768px) 100vw, 360px"
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <span className="absolute top-3 left-3 text-xs font-semibold text-ink bg-white/85 backdrop-blur-sm rounded-full px-2.5 py-1">
                          {item.step}
                        </span>
                      </div>
                      <div className="px-3 pt-5 pb-4">
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted text-[15px] leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-6xl mx-auto px-5 py-24">
        <Reveal>
          <h2 className="text-3xl sm:text-[2.6rem] font-semibold tracking-tight mb-12">
            Built for real multi-cat challenges
          </h2>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-6">
          {useCases.map((item, i) => (
            <Reveal key={item.title} delay={i * 120} className="h-full">
              <div className="h-full bg-white border border-line rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <span className="block w-8 h-[3px] rounded-full bg-brand mb-6" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hardware details */}
      <section className="px-3 sm:px-5">
        <div className="bg-mist rounded-[36px]">
          <div className="max-w-6xl mx-auto px-5 py-20 sm:py-24 grid md:grid-cols-2 gap-12 items-center">
            <Reveal>
              <h2 className="text-3xl sm:text-[2.6rem] font-semibold tracking-tight mb-5">
                Designed to disappear into the kitchen
              </h2>
              <p className="text-muted text-[15px] leading-relaxed mb-8 max-w-md">
                A white frame, a charcoal top, a low profile, and no screen to
                glow at you at 3am. It reads as furniture, not as a gadget
                parked on the floor.
              </p>
              <dl className="divide-y divide-ink/10 border-y border-ink/10">
                {details.map((item) => (
                  <div key={item.t} className="py-4">
                    <dt className="font-semibold mb-1">{item.t}</dt>
                    <dd className="text-muted text-[15px] leading-relaxed">{item.d}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={150}>
              <div className="rounded-[28px] overflow-hidden shadow-warm">
                <Image
                  src={studioShot}
                  alt="The Aiwan RFID food shield standing over a bowl, with a hand adjusting one of its suction feet."
                  sizes="(max-width: 768px) 100vw, 520px"
                  className="w-full aspect-[4/3] object-cover object-[40%_center]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog */}
      {posts.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 py-24">
          <Reveal className="flex items-end justify-between gap-4 mb-10">
            <h2 className="text-3xl sm:text-[2.6rem] font-semibold tracking-tight">Learn</h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-dark hover:text-brand transition-colors"
            >
              All articles →
            </Link>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 120} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block h-full bg-white border border-line rounded-[24px] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <h3 className="font-semibold leading-snug mb-2">{post.title}</h3>
                  <p className="text-sm text-muted leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                  <span className="inline-block mt-5 text-sm font-medium text-brand-dark">
                    Read →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Closing CTA */}
      <section className="px-3 sm:px-5">
        <div className="relative overflow-hidden rounded-[28px] shadow-warm">
          <Image
            src={kitchenShot}
            alt="Two hands set the Aiwan shield down over an automatic feeder in a sunlit room."
            sizes="100vw"
            className="w-full h-[460px] object-cover object-[60%_40%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c140e]/80 via-[#1c140e]/40 to-transparent" />
          <div className="absolute inset-0 max-w-6xl mx-auto px-6 sm:px-10 flex items-center">
            <Reveal className="max-w-lg text-white">
              <h2 className="text-3xl sm:text-[2.6rem] font-semibold tracking-tight mb-4">
                Stop feeding in shifts.
              </h2>
              <p className="text-white/85 leading-relaxed mb-7">
                No more carrying bowls into separate rooms or finding the diet
                food gone again. One shield per cat, one tag per collar.
              </p>
              <Link
                href="/blog"
                className="inline-block bg-white text-ink font-medium px-7 py-3 rounded-full hover:bg-white/90 transition-colors"
              >
                Read the feeding guides
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
