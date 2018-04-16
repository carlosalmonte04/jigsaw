import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLightbox extends Component {
  constructor(props) {
    this.state = {
      images: pictureOnView.images,
      imgLink: ""
    };
  }

  render() {
    const { pictureOnView } = this.props;
    return (
      <div className="lightbox-containe">
        <div className="lightbox-back-navigator" />
        <div className="picture-container">
          <div className="image-container">
            <img src={pictureOnView.link} />
          </div>
          <div className="picture-info">
            <div className="picture-comments">
              <p>hello</p>
            </div>
            <div className="picture-bottom" />
          </div>
        </div>
        <div className="lightbox-forward-navigator" />
      </div>
    );
  }
}

const mapStateToProps = ({ pictures: { pictureOnView } }) => ({
  pictureOnView
});

export const Lightbox = connect(mapStateToProps)(UnconnectedLightbox);
