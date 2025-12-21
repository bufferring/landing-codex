import React, { memo } from 'react'
import defaultPhoto from '@/assets/campo.webp'

type AvatarPhotoProps = {
  src?: string
  alt?: string
  size?: number | string // number -> px, string -> css size
  className?: string
  rounded?: boolean
  loading?: 'lazy' | 'eager'
  onErrorSrc?: string
  style?: React.CSSProperties
}

function AvatarPhoto({
  src = defaultPhoto,
  alt = 'Avatar',
  size = 280,
  className = '',
  rounded = true,
  loading = 'lazy',
  onErrorSrc = defaultPhoto,
  style = {},
}: AvatarPhotoProps) {
  const sizeStyle =
    typeof size === 'number'
      ? { width: `${size}px`, height: `${size}px` }
      : { width: size, height: size }

  return (
    <div
      className={`relative flex items-center justify-end ${className}`}
      style={{ lineHeight: 0 }}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        style={{
          objectFit: 'cover',
          display: 'block',
          ...sizeStyle,
          borderRadius: rounded ? 12 : 0,
          ...style,
        }}
        onError={(e) => {
          const t = e.currentTarget as HTMLImageElement
          if (t.src !== onErrorSrc) t.src = onErrorSrc
        }}
      />
    </div>
  )
}

export default memo(AvatarPhoto)
