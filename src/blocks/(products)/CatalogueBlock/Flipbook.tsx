import HTMLFlipBook from 'react-pageflip'

export const Flipbook = () => {
  return (
    <HTMLFlipBook
      width={300}
      height={500}
      size="fixed"
      minWidth={0}
      maxWidth={0}
      minHeight={0}
      maxHeight={0}
      drawShadow={true}
      flippingTime={1000}
      usePortrait={true}
      startPage={0}
      style={{}}
      className="w-full h-full"
      startZIndex={0}
      autoSize={true}
      maxShadowOpacity={1}
      showCover={false}
      mobileScrollSupport={true}
      clickEventForward={true}
      useMouseEvents={true}
      swipeDistance={0}
      showPageCorners={true}
      disableFlipByClick={false}
    >
      <div className="demoPage">Page 1</div>
      <div className="demoPage">Page 2</div>
      <div className="demoPage">Page 3</div>
      <div className="demoPage">Page 4</div>
    </HTMLFlipBook>
  )
}
