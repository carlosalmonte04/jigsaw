import React from "react";
import PropTypes from "prop-types";

export const HomeInput = ({
  searchQuery,
  sortByValue,
  nsfw,
  nsfwResultsCount,
  onSortByClick,
  onInputFocus,
  onSubmit,
  onInputTextChange,
  onNsfwCheck
}) => (
  <div className="input-wrapper">
    <form className="form-container">
      <div className={`main-input-container`}>
        <input
          type="text"
          className={`search-input`}
          placeholder="Search"
          onFocus={onInputFocus}
          onSubmit={onSubmit}
          onChange={onInputTextChange}
          value={searchQuery}
        />
        <div className="nsfw-checkbox-container">
          <input
            type="checkbox"
            className="nsfw-checkbox"
            checked={nsfw}
            tabIndex={0}
          />
          <span
            className="check-label"
            onClick={onNsfwCheck}
            onKeyPress={onNsfwCheck}
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
        onClick={onSubmit}
        onKeyPress={onSubmit}
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
          checked={sortByValue === "time"}
        />
        <p
          id="time"
          className="check-label pad16 blue-label"
          onClick={onSortByClick}
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
          checked={sortByValue === "viral"}
        />
        <p
          id="viral"
          className="check-label pad16 blue-label"
          onClick={onSortByClick}
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
          checked={sortByValue === "top"}
        />
        <p
          id="top"
          className="check-label pad16 blue-label"
          onClick={onSortByClick}
        >
          top
        </p>
      </div>
    </div>
  </div>
);

HomeInput.propTypes = {
  searchQuery: PropTypes.string,
  sortByValue: PropTypes.string,
  nsfw: PropTypes.bool,
  nsfwResultsCount: PropTypes.number,
  onSortByClick: PropTypes.func,
  onInputFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  onInputTextChange: PropTypes.func,
  onNsfwCheck: PropTypes.func
};

HomeInput.defaultProps = {
  searchQuery: "",
  sortByValue: "",
  nsfw: false,
  nsfwResultsCount: 0,
  onSortByClick: () => {},
  onInputFocus: () => {},
  onSubmit: () => {},
  onInputTextChange: () => {},
  onNsfwCheck: () => {}
};
