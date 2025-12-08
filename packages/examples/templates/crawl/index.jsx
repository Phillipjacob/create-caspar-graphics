import React, { useState } from 'react'
import {
  render,
  useCaspar,
  Crawl,
  useTimeout,
  useFetch,
} from '@nxtedition/graphics-kit'

const Ticker = () => {
  const { data, isPlaying, isStopped, safeToRemove } = useCaspar()
  const { content, loop, maxItems = 100 } = data
  const [didExit, setDidExit] = useState(false)
  useTimeout(safeToRemove, isStopped || didExit ? 1000 : null)

  const contentFeed = content
    ?.map((d, index) => ({ ...d, id: index }))
    .slice(0, maxItems)
  const renderContent = (item, { showSeparator }) => {
    return (
      <div
        key={item.id}
        style={{
          whiteSpace: 'nowrap',
          fontSize: '28px',
          display: 'flex',
          alignItems: 'flex-start',
          height: '69px',
          color: 'black',
          fontWeight: 500,
        }}
      >
        {item.text}
        {showSeparator && (
          <div style={{ color: 'black' }}>
            <div style={{ margin: '0 35px 0 35px' }}>-</div>
          </div>
        )}
      </div>
    )
  }
  console.log(didExit, 'didexit')
  return (
    <div>
      {isPlaying && !didExit && (
        <Crawl
          onExit={() => setDidExit(true)}
          play={isPlaying || isStopped}
          loop={loop}
          items={contentFeed}
          renderItem={renderContent}
        ></Crawl>
      )}
    </div>
  )
}

render(Ticker)
