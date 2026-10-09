import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Reveals text one character at a time. When the text changes, the old text is
// hidden in reverse before the new text is revealed. Pass `initial` to skip the
// exit animation, e.g. when the parent already handles presence.
//
// To hide the text on stop, animate the characters (`.char` by default) from
// the parent, e.g. with `usePresence` and `useAnimate`.
export const TextReveal = ({ initial = false, ...props }) => {
  return initial ? (
    <Content {...props} />
  ) : (
    <AnimatePresence mode="wait">
      <Content {...props} />
    </AnimatePresence>
  )
}

const Content = ({
  children,
  className = 'char',
  style,
  delay = 0,
  staggerIn = 0.01,
  staggerOut = 0.004,
}) => {
  const text = String(children ?? '')
  const characters = Array.from(text)

  return (
    <motion.div
      key={text}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={style}
      variants={{
        visible: {
          transition: {
            delayChildren: delay,
            staggerChildren: staggerIn,
          },
        },
        exit: {
          transition: {
            staggerChildren: staggerOut,
            staggerDirection: -1,
          },
        },
      }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={index}
          className={className}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.001 } },
            exit: { opacity: 0, transition: { duration: 0.001 } },
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  )
}
