import { Link } from "react-router-dom";

export function ErrorPage() {
  return (
    <div>
      404 | Not found | <Link to="/">Home</Link>
    </div>
  );
}
