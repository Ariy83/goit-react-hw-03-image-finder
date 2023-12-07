import React from 'react'

export const Modal = ({ images=[] }) => {
  const { largeImageURL, tags } = images;

  return (
    <div className="Overlay">
  <div className="Modal">
    <img src={largeImageURL} alt={tags} />
  </div>
</div>
  )
}
