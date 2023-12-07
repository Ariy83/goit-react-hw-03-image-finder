import React from 'react'

export const ImageGalleryItem = ({webformatURL, tags}) => {
  return (
    <li className="ImageGalleryItem">
      <img className='ImageGalleryItem-image' src={webformatURL} alt={tags} />
    </li>
  )
}
