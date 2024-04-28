import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsList: [],
    commentsCount: 0,
  }

  updateNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  updateCommentInput = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const commentBackgroundColor =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    if (nameInput !== '' && commentInput !== '') {
      const newComment = {
        id: uuidv4(),
        name: nameInput,
        comment: commentInput,
        isLiked: false,
        commentBackgroundColor,
      }
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        commentsCount: prevState.commentsCount + 1,
        nameInput: '',
        commentInput: '',
      }))
    }
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  deleteComment = id => {
    const {commentsList} = this.state
    this.setState(prevState => ({
      commentsList: commentsList.filter(eachComment => eachComment.id !== id),
      commentsCount: prevState.commentsCount - 1,
    }))
  }

  render() {
    const {nameInput, commentInput, commentsList, commentsCount} = this.state
    return (
      <div className="bg-container">
        <h1 className="heading">Comments</h1>
        <div className="input-container">
          <form className="form-container" onSubmit={this.onAddComment}>
            <p className="paragraph">Say something about 4.0 Technologies</p>
            <input
              type="text"
              className="user-input"
              value={nameInput}
              placeholder="Your Name"
              onChange={this.updateNameInput}
            />
            <br />
            <textarea
              className="user-input"
              rows="6"
              placeholder="Your Comment"
              value={commentInput}
              onChange={this.updateCommentInput}
            />
            <br />
            <button className="add-button" type="submit">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            className="image"
            alt="comments"
          />
        </div>
        <hr />
        <div className="comment-container">
          <div className="comment-count">
            <p className="count">{commentsCount}</p>
            <p className="text">Comments</p>
          </div>
          <ul className="list-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toggleLike={this.toggleLike}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
