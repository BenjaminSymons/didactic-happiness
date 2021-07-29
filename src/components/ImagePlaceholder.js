import React from 'react'

export default function ImagePlaceholder({
  imageText,
  altText,
  w,
  h,
  ...props
}) {
  return (
    <div
      role="img"
      alt={altText}
      className={`bg-gray-400 aspect-w-${w} aspect-h-${h} `}
    >
      <div className="flex flex-col items-center justify-center text-gray-500">
        <span className="font-bold">{imageText}</span>
        {imageText && <span className="text-xs text-current">Placeholder</span>}
      </div>
    </div>
  )
}
