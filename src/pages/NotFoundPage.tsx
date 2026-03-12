import { Link } from 'react-router-dom';
import '../styles/App.css';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-message">Page not found</p>
      <Link to="/" className="not-found-link">Back to home</Link>
    </div>
  );
};

export default NotFoundPage;
