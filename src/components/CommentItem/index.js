import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {id, name, comment, isLiked, commentBackgroundColor} = commentDetails
  const imageUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const addStyle = isLiked ? 'add-style' : ''

  const onClickLike = () => {
    toggleLike(id)
  }

  const onClickDelete = () => {
    deleteComment(id)
  }

  return (
    <li>
      <div className="name-container">
        <p className={`logo ${commentBackgroundColor}`}>{name[0]}</p>
        <p className="name">{name}</p>
        <p className="time">{formatDistanceToNow(new Date())}</p>
      </div>
      <p className="comment">{comment}</p>
      <div className="icon-container">
        <div>
          <button
            className="icon-button like-container"
            type="button"
            onClick={onClickLike}
          >
            <img src={imageUrl} className="icon" alt="like" />
            <p className={`like ${addStyle}`}>Like</p>
          </button>
        </div>
        <button
          className="icon-button"
          type="button"
          data-testid="delete"
          onClick={onClickDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="icon"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
