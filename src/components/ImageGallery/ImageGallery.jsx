import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import React from 'react'

export const ImageGallery = ({images=[]}) => {
  return (
      <ul className="ImageGallery">
          {images.map(image => (
            <ImageGalleryItem key={image.id}
              {...image}              
              >
            </ImageGalleryItem>
			))}
      </ul>
  )
}
