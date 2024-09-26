import React from 'react'
import BannerCarousel from '../../modules/promotion/components/BannerCarousel'
import ActiveMovies from '../../modules/shows/components/ActiveMovies/ActiveMovies'

const page = () => {
  return (
    <div>
      <BannerCarousel/>
      <ActiveMovies/>
    </div>
  )
}

export default page