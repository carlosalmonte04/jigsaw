import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { Icons } from "../../assets";
import {
  setActivePictureId,
  addCommentToPicture,
  incrementCommentsCount
} from "../../actions";
import {
  getPictureComments,
  getBorderColor,
  makeCommentAppReady,
  formatDate
} from "../../helpers";

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: true
};

class UnconnectedPictureLightBox extends Component {
  constructor(props) {
    super(props);

    this.imagesEls = null;

    this.state = {
      commentsData: [],
      commentText: "",
      imagesEls: null
    };
  }

  async componentWillReceiveProps(nextProps) {
    const { activePicture } = this.props;
    const { activePicture: nextActivePicture } = nextProps;
    if (activePicture !== nextActivePicture && nextActivePicture) {
      const imagesEls = Object.values(
        (nextActivePicture && nextActivePicture.images) || {}
      ).map(({ link }) => (
        <div key={link} className="picture-container">
          <img src={`${link}`} className="image" alt={`${link}`} />
        </div>
      ));

      this.setState({
        imagesEls
      });

      this.animatePictureCardElToLightBox(nextActivePicture.id);
    }

    if (nextProps.activePicture && nextProps.activePicture.id) {
      const { data: commentsData } = await getPictureComments(
        nextProps.activePicture.id
      );

      if (this.commentsContainer) {
        this.commentsContainer.scrollTop = this.commentsContainer.scrollHeight;
      }

      this.setState(
        {
          commentsData
        },
        this.scrollCommentsConainerToBottom
      );
    }
  }

  onOverlayClick = ({ target: { className } }) => {
    if (className === "picture-lightbox-container") {
      this.props.setActivePictureId("");
      document.body.className = "";
      if (this.pictureCardEl && this.pictureCardCopyEl) {
        this.pictureCardEl.className = `picture-card-container`;
        this.pictureCardCopyEl.className = `picture-card-copy-container`;
      }
    }
  };

  onCommentTextChange = e => {
    e.preventDefault();
    const { target: { value: commentText } } = e;
    this.setState({
      commentText
    });
  };

  onCommentSubmit = e => {
    e.preventDefault();
    const newComment = makeCommentAppReady({
      pictureId: this.props.activePictureId,
      commentText: this.state.commentText
    });

    this.props.incrementCommentsCount({
      pictureData: this.props.activePicture
    });

    this.setState({
      commentsData: [...this.state.commentsData, newComment],
      commentText: ""
    });

    if (this.commentsContainer) {
      this.commentsContainer.scrollTop = this.commentsContainer.scrollHeight;
    }
  };

  scrollCommentsConainerToBottom = () => {
    this.commentsContainer = document.getElementById("comments-container");
    if (this.commentsContainer) {
      this.commentsContainer.scrollTop = this.commentsContainer.scrollHeight;
    }
  };

  animatePictureCardElToLightBox = pictureId => {
    this.pictureCardEl = document.getElementById(`${pictureId}-picture-card`);
    this.pictureCardCopyEl = document.getElementById(
      `${pictureId}-picture-card-copy`
    );
    if (this.pictureCardEl && this.pictureCardCopyEl) {
      this.pictureCardEl.className = `${this.pictureCardEl.className} hide`;
      this.pictureCardCopyEl.className = `${
        this.pictureCardCopyEl.className
      } animate-in`;
    }
  };

  renderComment = commentData => {
    return (
      <div key={commentData.id} className="comment-element">
        <div className="comment">
          <div className="lighbox-comment-info">
            <p className="comment-author">
              <span>{commentData.author}</span>
              <span>{formatDate(commentData.datetime)}</span>
            </p>
          </div>
          <p className="comment-text">{commentData.comment}</p>
          <div className="lightbox-comment-likes">
            <img
              src={Icons.grayHeart}
              alt="points"
              className="smallest-picture-icon"
            />
            <p className="comment-points">{commentData.points}</p>
          </div>
        </div>
        {commentData.children.map(this.renderComment)}
      </div>
    );
  };

  renderLoadingState = () => <div />;

  renderEmptyState = () => (
    <div>
      <p>No comments yet. Be the first one to comment!</p>
    </div>
  );

  renderComments = () =>
    this.state.commentsData.length
      ? this.state.commentsData.map(this.renderComment)
      : this.renderEmptyState();

  render() {
    if (this.props.activePicture) {
      const {
        activeImageId,
        images,
        title,
        commentsCount,
        tag,
        points,
        description,
        views
      } = this.props.activePicture;

      const coverImage = images[activeImageId] && images[activeImageId].link;
      const firstImage =
        images[Object.keys(images)[0]] && images[Object.keys(images)[0]].link;
      const googleImagePlaceholder =
        "http://americanconstruction.net/wp-content/uploads/2015/10/upload-empty.png";

      const imageToShow = coverImage || firstImage || googleImagePlaceholder;

      return (
        <div
          className="picture-lightbox-container"
          onClick={this.onOverlayClick}
        >
          <div className="image-container">
            <div className="lightbox-title-container">
              <h2 className="lightbox-title">{title}</h2>
            </div>
            <Slider {...sliderSettings}>{this.state.imagesEls}</Slider>
            <div className="lightbox-description-container">
              <p>{description || "No description"}</p>
            </div>
            <div className="picture-info-lightbox">
              <div className="lighbox-primary-info">
                <div className="lightbox-picture-basic-info">
                  <img
                    src={Icons.grayHeart}
                    alt="points"
                    className="likes-icon"
                  />
                  <p className="likes-text">{points}</p>
                </div>
                <div className="lightbox-picture-basic-info">
                  <img
                    src={Icons.grayEye}
                    alt="points"
                    className="views-icon"
                  />
                  <p className="likes-text">{views}</p>
                </div>
              </div>
              <div className="lightbox-comment-input-container">
                <form onSubmit={this.onCommentSubmit}>
                  <textarea
                    className="lighbox-commnent-input"
                    placeholder="Write a comment"
                    onChange={this.onCommentTextChange}
                    value={this.state.commentText}
                  />
                  <button
                    className="add-comment-btn"
                    onClick={this.onCommentSubmit}
                  >
                    add
                  </button>
                </form>
              </div>
              <div className="lightbox-comments">
                <div className="comments-header">
                  <h4>{commentsCount} Comments</h4>
                </div>
                <div id="comments-container" className="comments-container">
                  {this.state.loading
                    ? this.renderLoadingState()
                    : this.renderComments()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  }
}

const mapStateToProps = ({
  pictures: { activePictureId, picturesData, idToIndex }
}) => {
  const pictureIdx = idToIndex[activePictureId];
  const activePicture = picturesData[pictureIdx];

  return {
    activePicture,
    pictureIdx
  };
};
export const PictureLightBox = connect(mapStateToProps, {
  setActivePictureId,
  addCommentToPicture,
  incrementCommentsCount
})(UnconnectedPictureLightBox);
