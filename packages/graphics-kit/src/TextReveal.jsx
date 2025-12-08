import { AnimatePresence, motion } from 'framer-motion'
import { FramerMotion } from '../dist/es'

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
  staggerIn = 0.101,
  staggerOut = 0.1004,
  isPlaying,
}) => {
  const characters = Array.from(children) // Split the string into an array of characters - so unicodes still works
  return (
    <motion.div
      key={children}
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
