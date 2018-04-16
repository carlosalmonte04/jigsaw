import React, { Component } from "react";
import { connect } from "react-redux";
import { Icons } from "../../assets";
import { setActivePictureId, addCommentToPicture } from "../../actions";
import {
  getPictureComments,
  getBorderColor,
  makeCommentAppReady
} from "../../helpers";

class UnconnectedPictureLightBox extends Component {
  state = {
    commentsData: [],
    commentText: ""
  };

  async componentWillReceiveProps(nextProps) {
    const { activePicture } = this.props;
    const { activePicture: nextActivePicture } = nextProps;
    if (activePicture !== nextActivePicture && nextActivePicture) {
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

  scrollCommentsConainerToBottom = () => {
    this.commentsContainer = document.getElementById("comments-container");
    this.commentsContainer.scrollTop = this.commentsContainer.scrollHeight;
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

  onOverlayClick = ({ target: { className } }) => {
    if (className === "picture-lightbox-container") {
      this.props.setActivePictureId("");
      if (this.pictureCardEl && this.pictureCardCopyEl) {
        this.pictureCardEl.className = `picture-card-container`;
        this.pictureCardCopyEl.className = `picture-card-copy-container`;
      }
    }
  };

  renderComment = commentData => {
    return (
      <div key={commentData.id} className="comment-element">
        <div className="comment">
          <p className="comment-text">{commentData.comment}</p>
          <div className="lighbox-comment-info">
            <p className="comment-author">{commentData.author}</p>
            <div className="lightbox-picture-likes">
              <span className="comment-points link">reply</span>
              <img
                src={Icons.grayHeart}
                alt="points"
                className="smallest-picture-icon"
              />
              <p className="comment-points">{commentData.points}</p>
            </div>
          </div>
        </div>
        {commentData.children.map(this.renderComment)}
      </div>
    );
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

    this.setState({
      commentsData: [...this.state.commentsData, newComment],
      commentText: ""
    });

    if (this.commentsContainer) {
      this.commentsContainer.scrollTop = this.commentsContainer.scrollHeight;
    }
  };

  render() {
    if (this.props.activePicture) {
      const {
        activeImageId,
        images,
        title,
        commentCount,
        tag,
        points
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
          <div
            className="image-container"
            style={{
              border: `${getBorderColor(this.props.pictureIdx)} solid 8px`,
              background: `url(${imageToShow}`,
              backgroundSize: "cover"
            }}
          >
            <div className="picture-container">
              <img src={`${imageToShow}`} className="image" alt={`${title}`} />
            </div>
            <div className="picture-info-lightbox">
              <div className="picture-info-lightbox-element">
                <h2 className="lightbox-title">{title}</h2>
              </div>
              <div className="lightbox-comments">
                <div className="comments-header">
                  <h4>Comments</h4>
                  <p>{commentCount}</p>
                </div>
                <div id="comments-container" className="comments-container">
                  {this.state.commentsData.map(this.renderComment)}
                </div>
                <div className="lightbox-comment-input-container">
                  <form onSubmit={this.onCommentSubmit}>
                    <input
                      className="lighbox-commnent-input"
                      placeholder="Add comment"
                      onChange={this.onCommentTextChange}
                      value={this.state.commentText}
                    />
                    <span
                      className="add-comment-btn"
                      onClick={this.onCommentSubmit}
                    >
                      add
                    </span>
                  </form>
                </div>
              </div>
              <div className="lightbox-picture-data">
                <div className="tags">
                  {tag.map(tagData => (
                    <span key={tagData.name} className="tag">
                      {tagData.display_name}
                    </span>
                  ))}
                </div>
                <div className="lightbox-picture-likes">
                  <img
                    src={Icons.grayHeart}
                    alt="points"
                    className="likes-icon"
                  />
                  <p className="likes-text">{points}</p>
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
  addCommentToPicture
})(UnconnectedPictureLightBox);
