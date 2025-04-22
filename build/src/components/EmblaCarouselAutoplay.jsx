import { useCallback, useEffect, useState } from 'react'

export const useAutoplay = (emblaApi) => {
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false)

  const onAutoplayButtonClick = useCallback(
    (callback) => {
      const autoplay = emblaApi?.plugins()?.autoplay
      if (!autoplay) return

      const resetOrDestroy =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.destroy

      resetOrDestroy()
      autoplay.play() // Ensure autoplay resumes
      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!autoplay) return

    const playOrDestroy = autoplay.isPlaying() ? autoplay.destroy : autoplay.play
    playOrDestroy()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const autoplay = emblaApi.plugins()?.autoplay
    if (!autoplay) return

    setAutoplayIsPlaying(autoplay.isPlaying())

    const handleDragStart = () => autoplay.reset() // Pause but keep autoplay enabled
    const handleDragEnd = () => autoplay.play() // Resume autoplay

    emblaApi
      .on('autoplay:play', () => setAutoplayIsPlaying(true))
      .on('autoplay:stop', () => setAutoplayIsPlaying(false))
      .on('reInit', () => setAutoplayIsPlaying(autoplay.isPlaying()))
      .on('pointerDown', handleDragStart) // Pauses autoplay when dragging starts
      .on('pointerUp', handleDragEnd) // Resumes autoplay when dragging ends
      .on('pointerLeave', handleDragEnd) // Ensures autoplay resumes if the pointer leaves

    return () => {
      emblaApi.off('pointerDown', handleDragStart)
      emblaApi.off('pointerUp', handleDragEnd)
      emblaApi.off('pointerLeave', handleDragEnd)
    }
  }, [emblaApi])

  return {
    autoplayIsPlaying,
    toggleAutoplay,
    onAutoplayButtonClick
  }
}
