// Banner.js
import React from "react";

const Banner = ({ bannerListDto }) => {
  return (
    <div className="banner_container">
      {bannerListDto.length === 1 ? (
        <div className="single-banner">
          <img
            className="banner_img"
            src={bannerListDto[0].imgUrl}
            alt={`banner_img_${bannerListDto[0].subCategory}`}
          />
        </div>
      ) : (
        <div className="banners">
          {bannerListDto.map((banner, index) => (
            <div className="banner" key={index}>
              <img
                className="banner_img"
                src={banner.imgUrl}
                alt={`banner_img_${banner.subCategory}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banner;
