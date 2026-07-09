/**
 * 8-bit beeps synthesized with the Web Audio API — no audio files.
 * The AudioContext is created lazily on the first beep (autoplay policy).
 */

type AudioContextConstructor = typeof AudioContext

const getAudioContextClass = (): AudioContextConstructor | undefined => {
  if (typeof window === 'undefined') return undefined
  return (
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: AudioContextConstructor }).webkitAudioContext
  )
}

export interface Beeper {
  beep: (freq: number) => void
}

export const createBeeper = (decayS = 0.13): Beeper => {
  let ctx: AudioContext | null = null
  return {
    beep(freq: number) {
      try {
        const Ctx = getAudioContextClass()
        if (!Ctx) return
        ctx = ctx ?? new Ctx()
        if (ctx.state === 'suspended') void ctx.resume()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'square'
        osc.frequency.value = freq
        gain.gain.value = 0.04
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decayS)
        osc.stop(ctx.currentTime + decayS + 0.01)
      } catch {
        // Audio is a nice-to-have; never let it break the page.
      }
    },
  }
}
