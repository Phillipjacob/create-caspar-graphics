import React, { useEffect } from 'react'
import {
  render,
  useCasparData,
  useCaspar,
  useTimeout,
  FramerMotion,
} from '@nxtedition/graphics-kit'
import {
  usePresence,
  useAnimate,
  stagger,
  AnimatePresence,
  motion,
} from 'framer-motion'
import './style.css'
import { TextReveal } from '../../../graphics-kit/src/TextReveal'

const TextRevealAnimation = () => {
  const { text, bodyText, host1, host2 } = useCasparData()
  const { isPlaying, isStopped, safeToRemove } = useCaspar()
  const [scope, animate] = useAnimate()
  const [isPresent] = usePresence()

  useTimeout(safeToRemove, isStopped ? 50000 : null)

  // useEffect(() => {
  //   if (isPresent) {
  //     const enterAnimation = async () => {
  //       await animate([
  //         [
  //           '.pap',
  //           { opacity: [0, 1] },
  //           { delay: stagger(10.01), duration: 10.001 },
  //         ],
  //       ])
  //     }
  //     enterAnimation()
  //   } else {
  //     const exitAnimation = async () => {
  //       await animate([
  //         [
  //           '.pap',
  //           { opacity: 0 },
  //           {
  //             delay: stagger(10.051, { from: 'last' }),
  //             duration: 10.01,
  //           },
  //         ],
  //       ])
  //       safeToRemove()
  //     }
  //     exitAnimation()
  //   }
  // }, [animate, isPresent])
  // console.log(isStopped, 'isStopped')
  return (
    <FramerMotion>
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{
            y: 100,
            transition: {
              duration: 5,
            },
          }}
          className="container"
        ></motion.div>

        {/* <AnimatePresence mode="wait">
              <motion.div ref={scope} key={text}>
                <motion.div
                  key={text}
                  style={{ lineHeight: 1.2, fontSize: '20px' }}
                >
                  <TextReveal
                    style={{ fontSize: 50 }}
                    delay={0.3}
                    staggerIn={0.54}
                    staggerOut={0.015}
                    stopped={isStopped}
                    isPlaying
                    isStopped
                  >
                    {text}
                  </TextReveal>
                </motion.div>

                <motion.div
                  key={bodyText}
                  style={{ lineHeight: 1.2, fontSize: '50px' }}
                >
                  <TextReveal className="pap">{bodyText}</TextReveal>
                </motion.div>
              </motion.div>
            </AnimatePresence> */}

        <AnimatePresence mode="wait">
          {isPlaying && (host1 || host2) && (
            <Header key={host1 || host2} host1={host1} host2={host2} />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <BodyText key={bodyText} bodyText={bodyText} isStopped />
        </AnimatePresence>
      </div>
    </FramerMotion>
  )
}
///// Hvorfor animerer disse ikke ud
const BodyText = ({ bodyText, isStopped }) => {
  const [isPresent, safeToRemove] = usePresence()

  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate([
          [
            '.pop',
            { opacity: [0, 1] },
            {
              delay: stagger(0.2, { startDelay: 2 }),
              duration: 0.01,
            },
          ],
        ])
      }
      enterAnimation()
    } else if (isStopped) {
      const exitAnimation = async () => {
        await animate([
          [
            '.pop',
            { opacity: 0 },
            { delay: stagger(0.01, { from: 'last' }), duration: 0.01 },
          ],
        ])
        safeToRemove()
      }
      exitAnimation()
    }
  }, [isPresent, animate, isStopped])

  return (
    <div
      ref={scope}
      style={{
        boxSizing: 'border-box',
        overflow: 'hidden',
        paddingLeft: '24px',
        paddingRight: '24px',
        position: 'relative',
        whiteSpace: 'nowrap',
        bottom: 10,
        color: 'red',
        fontWeight: 600,
        fontSize: 50,
        alignItems: 'baseline',
      }}
    >
      {bodyText && <TextReveal className="pop">{bodyText}</TextReveal>}
    </div>
  )
}

const Header = ({ host1, host2, headerBgDidEnter = true }) => {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        let startDelay = headerBgDidEnter ? 0 : 0.4

        await animate([
          [
            '.char',
            { opacity: [0, 1] },
            {
              delay: stagger(0.02, { startDelay }),
              duration: 0.001,
            },
          ],
        ])
      }
      enterAnimation()
    } else {
      const exitAnimation = async () => {
        await animate([
          [
            '.char',
            { opacity: 0 },
            { delay: stagger(0.004, { from: 'last' }), duration: 0.001 },
          ],
        ])
        safeToRemove()
      }

      exitAnimation()
    }
  }, [isPresent, animate])

  return (
    <div
      ref={scope}
      style={{
        boxSizing: 'border-box',
        overflow: 'hidden',
        paddingLeft: '24px',
        paddingRight: '24px',
        position: 'relative',
        whiteSpace: 'nowrap',
        flex: '1 0 0',
        minWidth: 0,
        display: 'flex',
        fontWeight: 600,
        alignItems: 'baseline',
      }}
    >
      {host1 || host2 ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: host2 ? '1 0 0' : '0 0 auto',
          }}
        >
          {host1 && <TextReveal>{host1}</TextReveal>}
          {host2 && <TextReveal>{host2}</TextReveal>}
        </div>
      ) : null}
    </div>
  )
}

render(TextRevealAnimation)
