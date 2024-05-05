import "./emptyList.css";

export default function EmptyList({ title, children }) {
  return (
    <div className="empty__container">
      <div className="empty__results">
        <h2>Oops!</h2>
        <h3>{title}</h3>
        <div className="empty__message">{children}</div>
      </div>
    </div>
  );
}
