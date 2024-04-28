import { useRef } from "react";

const ListWrap = ({ renderListFn, className }) => {
  const listRef = useRef(null);

  return (
    <div className={`list-wrap ${className}`}>
      <span className="click-guide">CLICK ME!</span>
      <div className="row list" ref={listRef}>
        {renderListFn()}
      </div>
      <div className="row scroll-wrap">
        <button
          className="scroll-btn prev"
          onClick={() =>
            listRef.current.scrollBy({
              left: -(window.innerWidth / 2),
              behavior: "smooth",
            })
          }
        >
          &#60;
        </button>
        <button
          className="scroll-btn next"
          onClick={() =>
            listRef.current.scrollBy({
              left: window.innerWidth / 2,
              behavior: "smooth",
            })
          }
        >
          &#62;
        </button>
      </div>
    </div>
  );
};

export default ListWrap;
