/**
 * Single source of truth: DermicIQ Technologies (public brand; legal entity in policy documents).
 * Same facts and key messages as the PDF, with wording that reads like a real conversation.
 */

import { siteOrigin } from "@/lib/site";

export const siteContent = {
  brand: {
    name: "DermicIQ Technologies",
    shortName: "DermicIQ",
    wordmarkSubline: "Technologies",
    productName: "DermicIQ",
    tagline: "Cosmetic ingredients explained for your skin, not for a scoreboard.",
    description:
      "DermicIQ™ is a tool that lines up product ingredients with what you already know about your skin: what irritates you, what you choose to avoid, and what you’ve learned from your own experience. It’s not another blanket “clean” or “toxic” stamp for everyone.",
  },

  meta: {
    defaultTitle: "DermicIQ | Ingredient help that’s actually about you",
    defaultDescription:
      "DermicIQ is calm, clear, and built on one question: is this ingredient relevant to me? No universal safety score, no fear-first messaging.",
    keywords:
      "DermicIQ, cosmetic ingredients, INCI, sensitive skin, contact dermatitis, personalization, ingredient scanner, clean beauty, transparency, allergy-aware skincare",
    siteUrl: siteOrigin,
  },

  navigation: {
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "For sensitive skin", href: "/for-sensitive-skin" },
      { label: "Contact", href: "/contact" },
      { label: "Blog", href: "https://blog.dermiciq.com" },
      { label: "Become a Partner", href: "/become-a-partner" },
    ],
    cta: { label: "Start Free Analysis", href: "https://app.dermiciq.com/" },
    contactEmail: "hello@DermicIQ.com",
  },

  home: {
    hero: {
      id: "home",
      headline: "Skincare ingredients that match how your skin really behaves",
      subhead:
        "We look at INCI lists the way a thoughtful consultant would: against your history, your intolerances, and what you already know works.",
      eyebrow: "DermicIQ Technologies",
      /** Prefer responsive WebP/JPEG in HomeHero; kept for reference / fallbacks. */
      imageSrc: "images/hero-1200.jpg",
      imageAlt: "",
      cta: { label: "Set up your profile", href: "https://app.dermiciq.com/" },
    },

    executiveSummary: {
      id: "summary",
      title: "Why we’re building this",
      paragraphs: [
        "You can read a label online in a second, and that’s a real win. The frustrating part is what most apps do next. They still bucket ingredients for everyone: “good,” “bad,” “clean,” or “toxic,” as if everyone's biology is the same. When it comes to real life, that's never the case.",
        "DermicIQ is here to show how a given ingredient lines up with you, not to declare a whole product as safe or dangerous. We weigh what you tell us: sensitivities, deal-breakers, and what you’ve already figured out about your own skin.",
        "If you’ve got fragrance issues, contact dermatitis, eczema, rosacea, acne-prone skin, or a known allergy, you know the problem. A single “safety” number can be wrong both ways. A crowd favorite might burn you. Something with a scary name in an app might be completely fine in your routine.",
        "Instead of chasing a moral score, we’d rather you ask, “Is this relevant to me?” You decide what counts. We stay educational, not alarmist. The point is to put something useful between the fine print and you, and to respect that skin is wildly individual.",
      ],
    },

    missionVision: {
      id: "mission",
      title: "What we believe",
      mission:
        "Give people a clear, neutral, personalized read on cosmetic ingredients, without the performance anxiety.",
      coreInsight: "No ingredient is “good” or “bad” for everyone. What matters is how you react.",
      visionLead:
        "We position ourselves between the product and your skin, so the conversation stays honest and relevant.",
      visionBody:
        "We’re not here to stoke fear or sell you a single story about “chemicals.” We want the question to be whether something matters for you, not whether it wins a popularity contest. When we do that well, everyday transparency becomes more authentic and far more inclusive.",
      ctaAbout: { label: "Read our full mission and vision", href: "/about" },
    },

    problemSolution: {
      id: "solution",
      title: "What’s not working, and what we do instead",
      problemTitle: "Why one score for everyone doesn’t work",
      problemIntro:
        "Scanners and “clean beauty” lists are everywhere. A lot of them still do the same few things:",
      problemBullets: [
        "One-size-fits-all scores (clean/dirty, safe/unsafe) for every user",
        "The same blacklist, no matter who you are",
        "Risk numbers that ignore the rest of the formula",
        "Language that invokes fear instead of explanation",
      ],
      problemClosing:
        "Many of these apps read like a final judgment on safety. The actual science — and your own skin — is usually messier than a single number.",
      solutionTitle: "What DermicIQ does",
      solutionLead:
        "We give you context. We don’t hand out one “good” or “bad” stamp and call it a day for the whole world.",
      traditionalQuestion: "Most apps ask: is this ingredient bad?",
      DermicIQQuestion: "We’re built around: is it relevant to your sensitivities?",
      solutionClosing:
        "How an ingredient lands depends on the formulation, how much of it is present, how you use the product, and (most of all) on you.",
      ctaSensitive: { label: "Sensitive skin? Here’s a fuller read", href: "/for-sensitive-skin" },
    },

    keyDifferentiators: {
      id: "differentiators",
      title: "What makes DermicIQ different",
      items: [
        {
          kind: "bullets" as const,
          title: "Sensitivity matching, your way",
          bullets: [
            "You name what ingredients you are seeking and which are a hard “no”",
            "We don’t force the same default blacklist on every account",
            "With each diary entry, we learn more about your skin and can offer better and better recommendations tailored to you",
          ],
        },
        {
          kind: "examples" as const,
          title: "We favor context, not a verdict",
          intro: "You’ll see language that sounds more like the examples below, and less like a courtroom:",
          examples: [
            "“Commonly associated with irritation in some sensitive users”",
            "“Generally well tolerated, but flagged because of your profile”",
            "“In the formula for preservation (or texture), not as the main active”",
          ],
          closing: "Science is nuanced, skin is nuanced, and labels should read that way too.",
        },
        {
          kind: "bullets" as const,
          title: "Built to teach first",
          bullets: [
            "We focus on the ingredient’s role in the product, rather than just judging it by its name.",
            "We stick to how formulas actually work, not the trend of the week",
            "We’re not pretending to be your dermatologist. We do not diagnose nor offer treatment.",
          ],
          footer: "We want you informed, not paranoid.",
        },
      ],
    },

    howPreview: {
      id: "skin-analysis",
      title: "How DermicIQ works",
      intro: "Four simple steps, plain language end to end.",
      steps: [
        {
          n: 1,
          title: "Build your profile",
          body: "You tell us what to watch for: known allergens, whole ingredient families to skip, or specific names you want called out.",
        },
        {
          n: 2,
          title: "Read the list as written",
          body: "We parse the list you give us whether it’s the INCI, on the box, or a rough list in your own words.",
        },
        {
          n: 3,
          title: "Match to you",
          body: "We compare each line to your profile. You get personal relevance, not a one-size-fits-all risk number.",
        },
        {
          n: 4,
          title: "Show it clearly",
          body: "You see short explanations in normal language, and a clear sense of what to pay attention to for your skin.",
        },
      ],
      disclaimer:
        "DermicIQ does not diagnose conditions or predict what will happen on your skin. It’s here to add clarity so you can decide for yourself.",
      cta: { label: "See the full walkthrough", href: "/how-it-works" },
    },

    targetUsers: {
      id: "users",
      title: "Who we’re for",
      primaryTitle: "We built this with you in mind if…",
      primaryBullets: [
        "Your skin is sensitive or deals with fluctuating flare ups",
        "You already know you have a cosmetic or contact allergy",
        "You’re done with “clean or dirty” apps that don’t know you at all",
      ],
      secondaryTitle: "You might also get a lot out of it if…",
      secondaryBullets: [
        "You like skincare and want formula analyses that don't employ scare tactics",
        "You're tired of manually reading through label after label just to find a product that includes or excludes important ingredients for you",
        "You work in beauty and seek a resource that doesn’t throw ingredients under the bus because it's the latest trend",
      ],
    },

    productEthical: {
      id: "scope",
      title: "What the first version does, and what it doesn’t",
      mvpTitle: "What we’re shipping first (MVP)",
      mvpBullets: [
        "Scan a barcode or look ingredients up by hand",
        "Build a sensitivity profile you control",
        "Flag what’s relevant to that profile, ingredient by ingredient",
        "Short, plain-language explanations of what you’re looking at",
      ],
      exclusionsTitle: "What we’re not doing (on purpose)",
      exclusionsBullets: [
        "No medical diagnosis or treatment plans",
        "No stamp that says a product is “safe” in a regulatory sense",
        "No promise that a product will or won’t work for you",
      ],
      ethicalTitle: "How we play by the rules",
      ethicalIntro: "DermicIQ is an educational software tool, full stop.",
      ethicalBullets: [
        "We don’t diagnose, treat, cure, or prevent medical conditions",
        "We don’t certify that a product meets a safety or compliance bar",
        "We work from public ingredient information and what you tell us in your profile",
      ],
      ethicalClosing:
        "We stay in that lane on purpose, so you get fewer vague promises.",
      businessTitle: "Down the line (broad strokes)",
      businessIntro: "Later on, a few models could make sense, such as:",
      businessBullets: [
        "A free tier for basics, with paid access to deeper personalization",
        "Subscription plans for richer profiles, deeper notes, and history you can look back on",
        "Optional industry-facing insights from anonymized, aggregated use (only with clear controls)",
      ],
      businessClosing: "Whatever we ship, privacy and honest data use come first.",
    },

    contact: {
      id: "contact",
      title: "Want to get in touch?",
      body: "We’re a small team and we take sensitive skin seriously. Send a note and a human will read it.",
      email: "hello@DermicIQ.com",
      ctaLabel: "Contact",
      ctaHref: "/contact",
    },
  },

  pages: {
    howItWorks: {
      metaTitle: "How DermicIQ works | DermicIQ",
      metaDescription:
        "A simple path from your skin details to clear ingredient context. No universal scores, no medical claims, no scare copy.",
      headline: "How DermicIQ Works",
      intro:
        "We help match your skin, as it is today, with the formulation that fits it best. Our goal is to tailor personal care products to you, not pretend there’s a one-size-fits-all score.",
      processSectionTitle: "The four steps",
      steps: [
        {
          n: 1,
          title: "Tell us about your skin",
          body:
            "We start with what you already know: ingredients you avoid, a diagnosis that matters, or a patch-test result. Even “my skin is picky” is useful. The closer this is to the truth, the better we can match products to you later.",
        },
        {
          n: 2,
          title: "We take a closer look",
          body:
            "You can search by product or ingredient, and we parse and check each line against the profile you’ve built. We aim for a careful, contextual read so you can feel confident about what you spend your hard-earned money on.",
        },
        {
          n: 3,
          title: "Get real recommendations",
          body:
            "You get practical takeaways: what’s worth a second look, what’s probably fine, and a brief “why” in plain language. It’s designed to help you shop and compare with confidence, not to replace a dermatology visit for diagnosis or treatment.",
        },
        {
          n: 4,
          title: "Your profile learns over time",
          body:
            "Track your experience in our personalized product diary. Share what you’ve liked and what you absolutely can’t stand. The more clues you give us about your skin, the better your matches will get. Find new holy grails and avoid wasting money on products that aren’t worth your time.",
        },
      ],
      resultsSectionTitle: "What you see in the app",
      resultsSectionBody:
        "Our screen formatting is designed for a quick, comprehensive read, not a vague summary of what you can already read on the back of a box. We use clear wording that avoids alarmist language by design, so the focus stays on what matters to you.",
      disclaimer:
        "We do not diagnose, predict flare-ups, or replace a clinician. We provide context so your next choice requires a little less guesswork.",
      boundariesSectionTitle: "Not in our lane (by design)",
      boundariesSectionIntro:
        "We narrow in on purpose, not empty promises. DermicIQ does not:",
      boundariesBullets: [
        "provide medical diagnoses or treatment plans",
        "stamp products as “safe” in a regulatory sense",
        "promise that a product will or won’t work for you",
      ],
      ctaStart: {
        title: "Ready when you are",
        subtext: "When you are ready, continue in the DermicIQ app, no extra steps on this site.",
        label: "Start Free Analysis",
        href: "https://app.dermiciq.com/",
      },
    },

    about: {
      metaTitle: "About DermicIQ | DermicIQ",
      metaDescription:
        "A small team building calmer, personal ingredient help for people who are tired of one-size-fits-all scores. Our mission, what we do differently, and a note from us.",
      headline: "About DermicIQ",
      intro:
        "We are DermicIQ Technologies, a company focused on one thing: making cosmetic ingredients easier to read in a way that respects you, your history, and your real skin, not a generic “safe for everyone” stamp.",
      missionTitle: "Our mission, and why we exist",
      missionParagraphs: [
        "DermicIQ exists because you shouldn’t have to guess whether a long, chemical-sounding ingredient name matters for you based on a color code or crowd score. Our mission is to show how ingredients line up with your preferences, intolerances, and lived experience.",
        "We are not here to be the most dramatic app out there. We are here to stay calm, explain things in plain language, and let you decide what to try or skip.",
      ],
      differentTitle: "What makes us a bit different",
      differentPoints: [
        "A personalized profile, not a default one. You decide what to watch for, so you are not stuck with a generic blacklist the whole world is expected to follow.",
        "We favour context. An ingredient in a product is a story about the concentration, role, and relevance to you. We try to speak the same way, with nuance instead of a single “good” or “bad” badge.",
        "We are honest about our limits. DermicIQ is an educational tool, not a replacement for a diagnosis or treatment plan. Saying that out loud is part of earning your trust.",
      ],
      teamTitle: "A note from us",
      teamBody:
        "DermicIQ is built by a small, focused team. We care about reactive skin, about people who are tired of being spoken for, and about bridging the gap between the label in your hand and a clear answer. We are early, we are building in public, and we take feedback from real people with real reactions seriously. If you write to us, a human will read it, even if the reply is short.",
      teamFootnote:
        "We are a software company, not a clinic. That keeps the product in the right lane, and the expectations clear, for all of us.",
      cta: {
        title: "Curious to try the flow yourself?",
        subtext:
          "Open the home page and walk through your skin profile, or read how it all fits together first, whichever you prefer.",
        label: "Start Free Analysis",
        href: "https://app.dermiciq.com/",
        sublinkLabel: "How it works",
        sublinkHref: "/how-it-works",
      },
    },

    forSensitiveSkin: {
      metaTitle: "For sensitive skin | DermicIQ",
      metaDescription:
        "When your skin is reactive, a green check from an app is cold comfort. DermicIQ matches an ingredient list to the history you already carry, without turning your face into a crowd default.",
      headline: "For sensitive skin",
      subhead:
        "If a product ever looked “safe” on paper but still triggered a reaction, you are not overreacting. Sensitivity is real and personal; a single score rarely captures that.",
      currentLandscapeTitle: "A pattern we see a lot in apps and lists",
      currentLandscapeIntro:
        "It is easy to find scanners and so-called clean beauty scorecards. Many still do the same few things:",
      currentLandscapeBullets: [
        "The same up-or-down score, like clean, dirty, or safe, for every user, no matter their unique biology or medical history.",
        "A shared “avoid this” list, even when an ingredient can be safe to use and beneficial for many consumers.",
        "A one-line risk label that ignores how much of an ingredient is in the formula and what else it’s combined with.",
        "Language that nudges you to panic about an ingredient name, rather than helping you understand how it fits into your story.",
      ],
      whyFailsTitle: "Why that feels so empty in real life",
      whyFailsBullets: [
        "A red hazard indicator for one person can be a non-issue for someone else, and a green check can still miss your own trigger. “Safe for everyone” breaks down quickly on sensitized skin.",
        "A “safe” or “clean” label is no guarantee. Allergy and irritation come from your own history, not a popularity count.",
        "If the app never really asks for your list of known reactions, you are not getting a personalized assessment. You are getting a crowd default.",
        "Fear-based wording can pile stress on top of a flare-up. Most people in that position want a calmer, clearer look at the list, not a louder alarm.",
      ],
      whyFailsClosing:
        "If you are juggling eczema, a contact allergy, fragrance intolerance, rosacea, or just skin that stings when the air turns dry, the same sentiment comes up: “I used the app, and I still don’t know what to trust for my own face.” A one-number verdict is rarely the thing you can rely on. It does not match what living with your skin is actually like.",
      gapTitle: "What a lot of people are still looking for",
      gapIntro:
        "The issue is not whether information exists online. It is that much of it stops short of being truly about your skin. Most tools still will not:",
      gapBullets: [
        "Let you name what your skin tends to do, the ingredients you’ve been told to avoid, and the things that always sting.",
        "Compare a cosmetic ingredient list against that story, line by line, instead of using one shared blacklist for everyone.",
        "Explain what an ingredient is doing in the formula without turning it into a moral pass-or-fail judgment that ignores your personal history.",
      ],
      gapClosing:
        "The facts may be on the screen, and you can still be standing in the aisle asking: is this a reasonable pick for my skin?",
      solutionTitle: "What we try to offer instead",
      solutionParagraphs: [
        "DermicIQ doesn’t stamp products as good or bad, full stop. We help connect a label with the sensitivities, no-gos, and lived experience you bring to it, because that is what changes the answer for you.",
        "The question that guides our work is simple: does this ingredient deserve a second look for the skin you’re actually in, not for a trend and not for someone else’s face on the internet?",
        "How an ingredient behaves on skin still depends on the full formula, how you use the product, and factors the screen will never know. We stay in a clear lane — education and context — so diagnosis and care stay where they belong: with your dermatologist and your own decision-making.",
      ],
    },

    contact: {
      metaTitle: "Contact | DermicIQ",
      metaDescription:
        "Get in touch with DermicIQ Technologies. Send a message about the product, partnerships, or sensitive-skin questions.",
      headline: "Contact us",
      intro:
        "Questions about DermicIQ, feedback, or press? Send a short note and a human on our small team will read it.",
      submitLabel: "Send message",
      submittingLabel: "Sending…",
      successTitle: "Message received",
      successLead:
        "Your message was submitted successfully. We sent a confirmation email to",
      successBody:
        "Our team at support@dermiciq.com will review your note and reply as soon as we can.",
      sendAnotherLabel: "Send another message",
      privacyNote:
        "This form is protected by Cloudflare Turnstile. See our Privacy and Cookie policies for how we handle submissions.",
    },

    becomeAPartner: {
      metaTitle: "Become a Partner | DermicIQ",
      metaDescription:
        "Partner with DermicIQ to help your clients make more informed beauty decisions. Licensed beauty and aesthetic businesses can earn commission on eligible memberships.",
      headline: "Help Your Clients Make More Informed Beauty Decisions",
      intro:
        "Become a DermicIQ Partner and give your clients access to a simpler way to understand cosmetic ingredients, explore products, and make more confident beauty and skincare choices.",
      primaryCta: {
        label: "Apply to Become a Partner",
        href: "https://app.dermiciq.com/partner",
      },
      secondaryCta: {
        label: "Learn How It Works",
        href: "/affiliate-partner-agreement",
      },
      overview: {
        title: "Partner with DermicIQ",
        paragraphs: [
          "DermicIQ partners with licensed businesses in the beauty and aesthetic industry that value education, transparency, and personalized client care.",
          "Approved partners receive a unique discount code to share with their clients. When clients use that code to purchase an eligible annual DermicIQ membership, the partner receives a fixed commission for each successful membership signup.",
        ],
      },
      eligibility: {
        title: "Is This Program Right for Your Business?",
        intro:
          "We are currently welcoming established, licensed businesses with an existing client base, including:",
        bullets: [
          "Medical aesthetic clinics",
          "Aesthetics and skincare businesses",
          "Spas and wellness clinics",
          "Beauty salons and professional beauty studios",
          "Cosmetic retailers and beauty boutiques",
          "Other licensed businesses serving skincare, beauty, or aesthetic clients",
        ],
        closing:
          "If your business regularly helps clients make decisions about beauty or personal-care products, we would love to learn more about you.",
      },
      benefits: {
        title: "What Partners Receive",
        items: [
          {
            title: "Earn commission",
            body: "Receive a fixed commission for each eligible annual membership purchased using your unique partner discount code.",
          },
          {
            title: "Receive training",
            body: "Learn how to introduce DermicIQ and explain its features to your team and clients.",
          },
          {
            title: "Access ready-to-use marketing materials",
            body: "Receive in-store promotional materials and prepared social media graphics to help you promote the app.",
          },
          {
            title: "Track your results",
            body: "Monitor membership signups and earned commissions through your partner portal.",
          },
        ],
      },
      howItWorks: {
        title: "How the Partnership Works",
        steps: [
          {
            n: 1,
            title: "Apply",
            body: "Tell us about your licensed business, client base, and interest in DermicIQ.",
          },
          {
            n: 2,
            title: "Get approved",
            body: "Our team reviews your application and contacts approved businesses with next steps.",
          },
          {
            n: 3,
            title: "Receive your partner tools",
            body: "Approved partners receive a unique discount code, partner portal access, training, and promotional materials.",
          },
          {
            n: 4,
            title: "Share DermicIQ with your clients",
            body: "Introduce your clients to DermicIQ through your business, in-store materials, social media, and other approved channels.",
          },
        ],
      },
      closingCta: {
        title: "Interested in Becoming a DermicIQ Partner?",
        body: "Complete the application form and tell us about your business. We will review your information and contact you if your business is selected for the program.",
        label: "Apply Now",
        href: "https://app.dermiciq.com/partner",
      },
    },
  },

  faq: {
    items: [
      {
        question: "Does DermicIQ diagnose skin conditions?",
        answer:
          "No. DermicIQ doesn’t diagnose, treat, cure, or prevent medical conditions. It’s informational software—here to add context so you can make your own informed choices.",
      },
      {
        question: "Is DermicIQ a “clean beauty” or safety certification tool?",
        answer:
          "No. We don’t certify that a product is “safe,” and we don’t speak for regulators. We also don’t give everyone the same “good” or “bad” stamp. We focus on what’s relevant to the profile you chose.",
      },
      {
        question: "How is DermicIQ different from apps that score every ingredient the same for everyone?",
        answer:
          "You define what matters to your skin. We match ingredients to that—not to a default blacklist for every user. The tone stays educational, not alarmist.",
      },
    ],
  },

  notFound: {
    headline: "Page not found",
    description: "That page may have moved, or the link might be a little off.",
    homeButton: "Back to home",
    backButton: "Go back",
  },

  footer: {
    copyright: "© 2026 DermicIQ Technologies | All rights reserved.",
    columns: [
      {
        title: "Product",
        links: [
          { label: "How it works", href: "/how-it-works" },
          { label: "For sensitive skin", href: "/for-sensitive-skin" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About & mission", href: "/about" },
          { label: "Contact", href: "/contact" },
          { label: "Blog", href: "https://blog.dermiciq.com" },
          { label: "Become a Partner", href: "/become-a-partner" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
          { label: "Cookies", href: "/cookies" },
        ],
      },
    ],
  },
} as const;