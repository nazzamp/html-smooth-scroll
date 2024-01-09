import { Item } from "./item.js"; // Imported Item module

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

const fx4Timeline = (item) => {
  const itemInner = item.DOM.inner;
  const itemInnerWrap = item.DOM.innerWrap;

  const intervalPixels = 100; // pixel interval
  const totalElements = itemInnerWrap.length;
  // Calculate the total width occupied by all itemInner elements except the last one
  const totalWidth = (totalElements - 1) * intervalPixels;
  // Calculate the offset to center the elements
  const offset = (totalWidth / 2) * -1;

  const initialValues = {
    x: 50,
  };

  gsap
    .timeline({
      defaults: {
        ease: "power1",
      },
      scrollTrigger: {
        trigger: item.DOM.el,
        start: "top bottom+=30%",
        end: "top top+=10%",
        scrub: true,
      },
    })
    .fromTo(
      itemInner,
      {
        xPercent: (pos, _, arr) =>
          pos < arr.length / 2
            ? -initialValues.x * pos - initialValues.x
            : initialValues.x * (pos - arr.length / 2) + initialValues.x,
        //filter: 'blur(15px)'
      },
      {
        xPercent: 0,
        //filter: 'blur(0px)'
      },
      0
    )
    .fromTo(
      itemInner,
      {
        scaleX: 1.5,
        scaleY: 0,
        transformOrigin: "50% 0%",
      },
      {
        ease: "power2.inOut",
        scaleX: 1,
        scaleY: 1,
      },
      0
    )
    .fromTo(
      itemInnerWrap,
      {
        xPercent: (pos) => {
          const distanceFromCenter = pos * intervalPixels;
          const xPercent = distanceFromCenter + offset;
          return xPercent;
        },
      },
      {
        xPercent: 0,
        stagger: {
          amount: 0.07,
          from: "center",
        },
      },
      0
    );
};

// const temp = [...document.querySelectorAll("[data-text]")][3];
const temp = [...document.querySelectorAll(".gtext")][0];
const temp_a = new Item(temp, 6);
// console.log({ temp });
// fx1Timeline(temp);

fx4Timeline(temp_a);
