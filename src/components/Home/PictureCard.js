import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Slider from "react-slick";
import LinesEllipsis from "react-lines-ellipsis";
import { getCroppedPictureTitle } from "../../helpers";
import { setActivePictureId } from "../../actions";
import { Icons, Colors } from "../../assets";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true,
  prevArrow: <button>prev</button>,
  nextArrow: <button>next</button>
};

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
      commentsCount,
      id,
      points,
      nsfw,
      images
    },
    setActivePictureId,
    borderColor
  } = props;

  const imagesEls = Object.values(images).map(({ link }) => (
    <div style={{ width: "calc(25vw)", height: "calc(25vw)" }}>
      <img
        key={link}
        src={`${link}`}
        className="picture-card"
        alt={`${getCroppedPictureTitle(title)}`}
      />
    </div>
  ));

  const coverImage =
    picture.images[coverImageId] && picture.images[coverImageId].link;
  const firstImage =
    images[Object.keys(images)[0]] && images[Object.keys(images)[0]].link;
  const googleImagePlaceholder =
    "http://americanconstruction.net/wp-content/uploads/2015/10/upload-empty.png";

  /* 
    cover images appear to be
    inconsistent from imgur.
    1. get assigned cover from clean picture objects
    2. or manually get first image in image array
    3. or give up and just use a placeholder image from google
  */
  const coverImageUrl = coverImage || firstImage || googleImagePlaceholder;

  const onPictureClick = ({ target: { className } }) => {
    if (className.includes("slick-arrow")) {
      return;
    }
    document.body.className = "overflow-y-hidden";
    setActivePictureId(picture.id);
  };

  /*
    picture card copy sitting on top
    of original to be animated to lightbox
    TODO: not implemented yet
  */
  const renderPictureCardCopy = () => (
    <div
      id={`${id}-picture-card-copy`}
      className="picture-card-copy-container"
      style={{
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
        onClick={onPictureClick}
      >
        <Slider {...sliderSettings}>{imagesEls}</Slider>
        <div
          className="picture-info-container"
          // style={{ borderTop: `solid ${borderColor} 8px` }}
        >
          <div className="picture-info-column-container">
            <div className="picture-card-title">
              <LinesEllipsis
                text={title}
                maxLine="2"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </div>
            <div className="picture-card-bottom-info">
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
                <p className="">{commentsCount}</p>
              </div>
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

UnconnectedPictureCard.propTypes = {
  picture: PropTypes.object,
  setActivePictureId: PropTypes.func,
  borderColor: PropTypes.string
};

UnconnectedPictureCard.defaultProps = {
  picture: {
    cover: "",
    title: "",
    commentsCount: 0,
    id: "",
    points: 0,
    nsfw: false,
    images: {}
  },
  setActivePictureId: () => {},
  borderColor: Colors.lightBlue
};
