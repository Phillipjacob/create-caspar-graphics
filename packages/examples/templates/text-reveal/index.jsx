import React, { useEffect } from 'react'
import { render, useCasparData, FramerMotion, TextReveal } from '@nxtedition/graphics-kit'
import { usePresence, useAnimate, stagger } from 'framer-motion'
import './style.css'

const TextRevealExample = () => {
  const { title, subtitle } = useCasparData()

  return (
    <FramerMotion hide={!title}>
      <LowerThird title={title} subtitle={subtitle} />
    </FramerMotion>
  )
}

const LowerThird = ({ title, subtitle }) => {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (isPresent) {
      animate(
        scope.current,
        { opacity: [0, 1], x: [-50, 0] },
        { duration: 0.4, ease: 'easeOut' }
      )
    } else {
      const exitAnimation = async () => {
        await animate(
          '.char',
          { opacity: 0 },
          { delay: stagger(0.01, { from: 'last' }), duration: 0.001 }
        )

        await animate(
          scope.current,
          { opacity: 0, x: -50 },
          { duration: 0.4, ease: 'easeIn' }
        )

        safeToRemove()
      }

      exitAnimation()
    }
  }, [isPresent, animate])

  return (
    <div ref={scope} className="container">
      <div className="title">
        <TextReveal delay={0.4}>{title}</TextReveal>
      </div>
      {subtitle && (
        <div className="subtitle">
          <TextReveal delay={0.6} staggerIn={0.02}>
            {subtitle}
          </TextReveal>
        </div>
      )}
    </div>
  )
}

render(TextRevealExample)
