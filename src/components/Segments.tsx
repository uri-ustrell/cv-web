import type { TextSegment } from '@/content/types'

/** Renders a run of copy segments with optional accent color / inline link. */
export const Segments = ({ segments }: { segments: TextSegment[] }) => (
  <>
    {segments.map((segment, i) => {
      // Static build-time content: position identifies a segment.
      const key = `seg-${i}-${segment.text.slice(0, 12)}`
      if (segment.href) {
        return (
          <a key={key} href={segment.href}>
            {segment.text}
          </a>
        )
      }
      if (segment.accent) {
        return (
          <span key={key} className={`accent-${segment.accent}`}>
            {segment.text}
          </span>
        )
      }
      return <span key={key}>{segment.text}</span>
    })}
  </>
)
