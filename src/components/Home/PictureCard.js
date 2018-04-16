import React from "react";
import { connect } from "react-redux";
import { setActivePictureId } from "../../actions";
import { Icons } from "../../assets";

export const UnconnectedPictureCard = props => {
  if (props.loading) {
    return (
      <div className="card-wrapper">
        <div className="picture-card-container">
          <div className="picture-card-loading" />
        </div>
      </div>
    );
  }

  const {
    picture,
    picture: {
      cover: coverImageId,
      title,
      commentCount,
      id,
      points,
      nsfw,
      images
    },
    setActivePictureId,
    borderColor
  } = props;

  const coverImage =
    picture.images[coverImageId] && picture.images[coverImageId].link;
  const firstImage =
    images[Object.keys(images)[0]] && images[Object.keys(images)[0]].link;
  const googleImagePlaceholder =
    "http://americanconstruction.net/wp-content/uploads/2015/10/upload-empty.png";

  /* 
    cover images appear to be
    inconsistent from imgur.
    1. get assigned cover from clean picture objs
    2. or manually get first image in image array
    3. or give up and just use a placeholder image from google
  */
  const coverImageUrl = coverImage || firstImage || googleImagePlaceholder;

  const onPictureClick = () => {
    setActivePictureId(picture.id);
  };

  /*
    picture card copy sitting on top
    of original to be animated to lightbox
  */
  const renderPictureCardCopy = () => (
    <div
      id={`${id}-picture-card-copy`}
      className="picture-card-copy-container"
      style={{
        border: `8px ${nsfw ? "dashed" : "solid"} ${borderColor}`,
        borderRight: "none"
      }}
    >
      <img
        src={`${coverImageUrl || images[Object.keys(images)[0]].link}`}
        className="picture-card-copy"
        alt={`${title}`}
      />
    </div>
  );

  return (
    <div className="card-wrapper">
      <div
        id={`${id}-picture-card`}
        className="picture-card-container"
        role="link"
        style={{ border: `8px ${nsfw ? "dashed" : "solid"} ${borderColor}` }}
        onClick={onPictureClick}
      >
        <img
          src={`${coverImageUrl}`}
          className="picture-card"
          alt={`${title}`}
        />
        <div className="picture-title">
          <h2>{title}</h2>
        </div>
        <div
          className="picture-info-container"
          // style={{ borderTop: `solid ${borderColor} 8px` }}
        >
          <div className="picture-info">
            <div className="picture-info-element">
              <img
                src={Icons.grayHeart}
                alt="points"
                className="small-picture-icon"
              />
              <p>{points}</p>
            </div>
            <div className="picture-info-element">
              <img
                src={Icons.grayComment}
                alt="comments"
                className="small-picture-icon"
              />
              <p className="">{commentCount}</p>
            </div>
          </div>
        </div>
      </div>
      {renderPictureCardCopy()}
    </div>
  );
};
export const PictureCard = connect(null, { setActivePictureId })(
  UnconnectedPictureCard
);
export {};
