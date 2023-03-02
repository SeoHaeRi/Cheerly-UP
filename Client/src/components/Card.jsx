import '../static/Card.css';
import { useNavigate } from 'react-router-dom';

export const Card = ({ board_id, title, content, username, date }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card-wrapper"
      onClick={() => {
        navigate(`/board/${board_id}`);
      }}
    >
      <div className="card-body-text">
        <div className="card-body-text-title">{title}</div>
        <div className="card-body-text-content">{content}</div>
      </div>

      <div className="card-footer">
        <div className="username">{username}</div>
        <div className="date">{date}</div>
      </div>
    </div>
  );
};
