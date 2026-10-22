(() => {
  "use strict";

  const machines = {
    "450f": {
      image: "machine-450f-le.webp",
      model: "LOG 450F-LE",
      title: "A closer look at LOG.",
      description:
        "Explore the LE range with our team and discuss your production requirements.",
    },
    "270-s9-ii": {
      image: "machine-270-s9-ii.jpg",
      model: "LOG 270-S9 II",
      title: "Make room for your next project.",
      description:
        "Discover the S9 II range. Tell us about your application so we can help with equipment selection.",
    },
    140: {
      image: "machine-140-le.webp",
      model: "LOG 140-LE",
      title: "A different direction. The same focus.",
      description:
        "Explore another model in the LE range and discuss the right configuration for your process.",
    },
  };
  const customDescriptions = {
    "two-color":
      "Discuss L-type two-color customization for your product and molding process.",
    bmc: "Discuss your BMC or carbon-fiber molding requirements with our technical team. Material and process scope are confirmed individually.",
    silicone:
      "Explore liquid silicone customization around your material, product and production requirements.",
    remanufacturing:
      "Discuss remanufacturing options based on your existing equipment and the production goals you want to achieve.",
  };

  document.querySelectorAll(".product-choice").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;
      const machine = machines[button.dataset.machine];
      const image = document.querySelector("#product-image");
      document.querySelectorAll(".product-choice").forEach((choice) => {
        const active = choice === button;
        choice.classList.toggle("is-selected", active);
        choice.setAttribute("aria-pressed", String(active));
      });
      image.src = `assets/images/${machine.image}`;
      image.alt = `${machine.model} injection molding machine, side view`;
      document.querySelector("#product-model").textContent = machine.model;
      document.querySelector("#product-title").textContent = machine.title;
      document.querySelector("#product-description").textContent =
        machine.description;
      if (
        window.gsap &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        gsap.fromTo(
          image,
          { opacity: 0.35, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            overwrite: true,
            ease: "power2.out",
          },
        );
      }
    });
  });

  document.querySelectorAll(".custom-option").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".custom-option").forEach((option) => {
        const active = option === button;
        option.classList.toggle("is-selected", active);
        option.setAttribute("aria-pressed", String(active));
      });
      document.querySelector("#custom-detail").textContent =
        customDescriptions[button.dataset.custom];
    });
  });

  // Content is visible by default, including when animation scripts are unavailable.
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add(
    {
      desktop: "(min-width: 800px)",
      mobile: "(max-width: 799px)",
      reduced: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      if (context.conditions.reduced) return;
      const desktop = context.conditions.desktop;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-brand, .hero h1, .hero-description, .hero .button", {
          y: 24,
          opacity: 0,
          duration: 0.95,
          stagger: 0.09,
        })
        .from(".hero-machine", { y: 35, opacity: 0, duration: 1.15 }, 0.25);

      gsap.to(".reading-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: true },
      });
      gsap.to(".hero-machine", {
        y: desktop ? -45 : -15,
        scale: desktop ? 1.06 : 1.02,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-stage",
          start: "top 45%",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      const product = document.querySelector(".product-showcase");
      gsap.fromTo(
        product,
        { scale: 0.94 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: product,
            start: "top 95%",
            end: "top 30%",
            scrub: 0.45,
          },
        },
      );

      // Create the pin before lower sections so their trigger positions include its space.
      if (desktop && window.innerHeight >= 720) {
        gsap.to(".why-heading h2", {
          scale: 1.035,
          ease: "none",
          scrollTrigger: {
            trigger: ".why-heading",
            start: "top 110px",
            end: "+=150",
            pin: true,
            pinSpacing: true,
            scrub: 0.25,
            anticipatePin: 1,
          },
        });
      }

      document.querySelectorAll(".advantage").forEach((section) => {
        const card = section.querySelector(".visual-card");
        // Scroll-linked composition, without intercepting wheel or touch input.
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 25%",
            scrub: 0.4,
          },
          defaults: { ease: "none" },
        });
        timeline.fromTo(
          card,
          { scale: desktop ? 0.95 : 0.98 },
          { scale: 1 },
          0,
        );
        if (section.id === "trade-in") {
          timeline
            .fromTo(".trade-new", { x: desktop ? 65 : 18 }, { x: 0 }, 0)
            .fromTo(
              ".trade-arrow",
              { opacity: 0.25, x: -8 },
              { opacity: 1, x: 0 },
              0,
            );
        } else if (section.id === "rental") {
          timeline
            .fromTo(".rental-machine", { x: desktop ? -55 : -15 }, { x: 0 }, 0)
            .fromTo(
              ".rental-path > div",
              { y: 15, opacity: 0.3 },
              { y: 0, opacity: 1, stagger: 0.12 },
              0,
            );
        } else if (section.id === "custom") {
          timeline.fromTo(
            ".custom-machine-wrap",
            { x: desktop ? -35 : -10 },
            { x: 0 },
            0,
          );
        } else if (section.id === "remote") {
          timeline
            .fromTo(".remote-machine-wrap", { y: 30 }, { y: 0 }, 0)
            .fromTo(".stat-value", { opacity: 0.4 }, { opacity: 1 }, 0);
        } else if (section.id === "support") {
          timeline
            .fromTo(".hours", { scale: 0.85 }, { scale: 1 }, 0)
            .fromTo(".support-visual > img", { y: 25 }, { y: 0 }, 0);
        }
      });
    },
  );

  Promise.all(
    Array.from(document.images, (image) =>
      image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          }),
    ),
  ).then(() => ScrollTrigger.refresh());
  window.addEventListener("load", () => ScrollTrigger.refresh(), {
    once: true,
  });
  window.addEventListener("pagehide", () => media.revert(), { once: true });
})();
