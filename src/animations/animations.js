export const fadeInUp = ({ duration, y } = {}) => ({
  initial: {
    y: y ?? 20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: duration,
    },
  },
  exit: {
    y: y ?? 20,
    opacity: 0,
  },
})

export const fadeInDown = ({ duration, y } = {}) => ({
  initial: {
    y: y ?? -20,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: duration,
    },
  },
  exit: {
    y: y ?? -20,
    opacity: 0,
  },
})

export const fadeInRight = ({ duration, x } = {}) => ({
  initial: {
    x: x ?? -20,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: duration,
    },
  },
  exit: {
    x: x ?? -20,
    opacity: 0,
  },
})

export const staggerAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}
