import React from 'react';
import type { ImageAttachment } from '../../types';

interface ImageThumbnailProps {
  image: ImageAttachment;
  maxWidth?: number;
  maxHeight?: number;
}

export function ImageThumbnail({ image, maxWidth = 80, maxHeight = 60 }: ImageThumbnailProps) {
  return (
    <img
      src={image.dataUrl}
      alt={image.alt || 'Cell image'}
      style={{
        maxWidth,
        maxHeight,
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}
