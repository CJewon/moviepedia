import "./Rating.css";

const RATINGS = [1, 2, 3, 4, 5];

function Star({ selected = false, rating, onSelect, onHover }) {
  const className = `Rating-star ${selected ? "selected" : ""}`;

  const handleClick = onSelect ? () => onSelect(rating) : undefined;

  const handleMouseOver = onHover ? () => onHover(rating) : undefined;

  return (
    <span
      className={className}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
    >
      ★
    </span>
  );
}

function Rating({ className, value = 0, onSelect, onHover, onMouseOut }) {
  return (
    <div className={className} onMouseOut={onMouseOut}>
      {RATINGS.map((rating) => {
        return (
          <Star
            key={rating}
            selected={value >= rating}
            rating={rating}
            onSelect={onSelect}
            onHover={onHover}
          ></Star>
        );
      })}
    </div>
  );
}

export default Rating;
