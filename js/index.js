const initLenis = () => {
  const lenis = new Lenis({ lerp: 0.2, smoothWheel: true });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
};

initLenis();

const fx1Timeline = (item) => {
  const initialValues = {
    x: 50,
  };

  gsap.fromTo(
    item,
    {
      xPercent: (pos, _, arr) =>
        pos < arr.length / 2
          ? -initialValues.x * pos - initialValues.x
          : initialValues.x * (pos - arr.length / 2) + initialValues.x,
    },
    {
      ease: "power1",
      xPercent: 0,
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "top top+=10%",
        scrub: true,
      },
    }
  );
};

const temp = [...document.querySelectorAll("[data-text]")][3];
console.log({ temp });

fx1Timeline(temp);
