export const modalAnimate = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const errorMsgAnimate = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const navbarAnimate = {
  hidden: { opacity: 0, y: "-5%" },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const sidebarAnimate = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

export const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};
