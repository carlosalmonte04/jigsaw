/* jslint radix: false */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination, PageItem, PageLink } from "mdbreact";
import { TweenMax } from "gsap";
import { PictureCard, PictureLightBox } from "./";
import {
  setPictures,
  animateToPictures,
  setActivePage,
  decrementActivePage,
  incrementActivePage,
  setMorePictures
} from "../../actions";
import { Img } from "../../assets";
import {
  getPictures,
  makePicturesAppReady,
  getBorderColor
} from "../../helpers";

const arrayOf12Elements = Array.apply(null, {
  length: 12
}).map(Number.call, Number);

class UnconnectedHome extends Component {
  state = {
    isAppReady: false,
    loading: false,
    searchQuery: "",
    nsfw: false,
    sortBy: "time",
    imgurPage: 0
  };

  componentDidMount() {
    this.pictureCardsWrapper = document.getElementById("picture-cards-wrapper");
    this.setState({
      isAppReady: true
    });
  }

  async componentDidUpdate(prevProps) {
    const { activePage: prevActivePage } = prevProps;
    const { activePage, totalPages, totalResults } = this.props;

    if (prevActivePage !== activePage && activePage >= totalPages - 1) {
      const { data: picturesData } = await getPictures({
        searchQuery: this.state.searchQuery,
        sort: this.state.sortBy,
        page: this.state.imgurPage + 1
      });
      const appReadyPictures = makePicturesAppReady({
        picturesData,
        prevTotalPages: totalPages,
        prevTotalResults: totalResults
      });

      this.props.setMorePictures(appReadyPictures);

      this.setState({
        imgurPage: this.state.imgurPage + 1
      });
    }
  }

  onNsfwCheck = () => {
    this.setState(
      {
        nsfw: !this.state.nsfw
      },
      this.filterNswf
    );
  };

  onInputTextChange = ({ target: { value: searchQuery } }) => {
    this.setState({ searchQuery });
  };

  onSubmit = async e => {
    if (e) {
      e.preventDefault();
    }

    this.setState({
      loading: true
    });

    const { data: picturesData } = await getPictures({
      searchQuery: this.state.searchQuery,
      sort: this.state.sortBy
    });
    const appReadyPictures = makePicturesAppReady({
      picturesData
    });

    this.props.setPictures(appReadyPictures);

    this.fadeInPictureCards();

    this.setState({
      loading: false
    });

    if (this.pictureCardsWrapper) {
      setTimeout(
        () =>
          this.pictureCardsWrapper.scrollIntoView({
            behavior: "smooth",
            block: "start"
          }),
        100
      );
    }
  };

  onPageNumberClick = ({ target: { text: pageNumber } }) => {
    const parsedInt = parseInt(pageNumber, 10);
    if (parsedInt) {
      this.props.setActivePage(parsedInt);
    }
  };

  onSortByClick = ({ target: { id: sortBy } }) => {
    if (this.state.searchQuery) {
      this.setState({
        loading: true
      });
      this.setState({ sortBy }, this.onSubmit);
    }
    this.setState({ sortBy });
  };

  fadeInPictureCards = () => {
    const pictureCardEls = document.getElementsByClassName(
      "picture-card-container"
    );
    setTimeout(
      () =>
        TweenMax.staggerFromTo(
          pictureCardEls,
          0.1,
          { opacity: 0, transform: `translateY(10px)` },
          { opacity: 1, transform: `translateY(0px)` },
          0.1
        ),
      100
    );
  };

  renderPagination = () => {
    const fakePagesArr = Array.apply(null, {
      length: this.props.totalPages
    }).map(Number.call, Number);

    return (
      <Pagination className="pagination-circle pg-teal">
        <PageItem
          disabled={this.props.activePage <= 1}
          onClick={this.props.decrementActivePage}
        >
          <PageLink className="page-link" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </PageLink>
        </PageItem>
        {fakePagesArr.map(pageNumber => (
          <PageItem
            key={pageNumber}
            active={pageNumber + 1 === this.props.activePage}
            onClick={this.onPageNumberClick}
          >
            <PageLink className="page-link">{pageNumber + 1}</PageLink>
          </PageItem>
        ))}
        <PageItem
          disabled={this.props.activePage >= this.props.totalPages}
          onClick={this.props.incrementActivePage}
        >
          <PageLink className="page-link">&raquo;</PageLink>
        </PageItem>
      </Pagination>
    );
  };

  renderPictures = picturesOnView => (
    <div className="picture-cards-container">
      {picturesOnView
        .filter(picture => (!this.state.nsfw ? !picture.nsfw : true))
        .map((picture, index) => (
          <PictureCard
            key={picture.id}
            picture={picture}
            borderColor={getBorderColor(index)}
          />
        ))}
    </div>
  );

  renderLoadingState = () => {
    return (
      <div className="picture-cards-container">
        {arrayOf12Elements.map(number => <PictureCard key={number} loading />)}
      </div>
    );
  };

  render() {
    const { searchQuery, isAppReady, loading } = this.state;
    const { picturesOnView, nsfwResultsCount } = this.props;

    return (
      <div
        className={`home-container ${isAppReady ? "start" : ""} ${
          animateToPictures ? "animate" : ""
        }`}
      >
        <img src={Img.logo} alt="logo" className="main-logo" />
        <form className="form-container">
          <div className={`main-input-container`}>
            <input
              type="text"
              className={`search-input`}
              placeholder="Search"
              onFocus={this.onInputFocus}
              onSubmit={this.onSubmit}
              onChange={this.onInputTextChange}
              value={searchQuery}
            />
            <div className="nsfw-checkbox-container">
              <input
                type="checkbox"
                className="nsfw-checkbox"
                checked={this.state.nsfw}
                tabIndex={0}
              />
              <span
                className="check-label"
                onClick={this.onNsfwCheck}
                onKeyPress={this.onNsfwCheck}
                tabIndex={0}
                role="button"
              >
                nsfw
              </span>
            </div>
          </div>
          {nsfwResultsCount ? (
            <span className="nsfw-results-info">
              {nsfwResultsCount} nsfw pictures within results.
            </span>
          ) : null}
          <button
            className="search-btn"
            onClick={this.onSubmit}
            onKeyPress={this.onSubmit}
            tabIndex={0}
          >
            Search
          </button>
        </form>
        <div className="sort-by">
          <h4>sort by:</h4>
          <div>
            <input
              readOnly
              type="radio"
              className="radio"
              name="parser-type"
              checked={this.state.sortBy === "time"}
            />
            <p
              id="time"
              className="check-label pad16 blue-label"
              onClick={this.onSortByClick}
            >
              most recent
            </p>
          </div>
          <div>
            <input
              readOnly
              type="radio"
              className="radio"
              name="parser-type"
              checked={this.state.sortBy === "viral"}
            />
            <p
              id="viral"
              className="check-label pad16 blue-label"
              onClick={this.onSortByClick}
            >
              viral
            </p>
          </div>
          <div>
            <input
              readOnly
              type="radio"
              className="radio"
              name="parser-type"
              checked={this.state.sortBy === "top"}
            />
            <p
              id="top"
              className="check-label pad16 blue-label"
              onClick={this.onSortByClick}
            >
              top
            </p>
          </div>
        </div>
        <div id="picture-cards-wrapper">
          {loading
            ? this.renderLoadingState()
            : this.renderPictures(picturesOnView)}
        </div>
        {picturesOnView.length ? this.renderPagination() : null}
        <PictureLightBox />
        <div />
      </div>
    );
  }
}

const mapStateToProps = ({
  pictures: { pageToPictures, activePage, totalPages, nsfwResultsCount }
}) => {
  const picturesOnView = pageToPictures[activePage] || [];

  return {
    picturesOnView,
    animateToPictures,
    activePage,
    totalPages,
    nsfwResultsCount
  };
};

export const Home = connect(mapStateToProps, {
  setPictures,
  animateToPictures,
  setActivePage,
  decrementActivePage,
  incrementActivePage,
  setMorePictures
})(UnconnectedHome);
