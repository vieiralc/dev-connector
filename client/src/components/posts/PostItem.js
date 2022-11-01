import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { DATE_FORMAT } from '../../constants/constants';
import { likePostAction, removeLike } from '../../redux/actions/post/post';
import { deletePost } from '../../redux/actions/post/deletePost';

const PostItem = ({
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='User Profile Picture' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment format={DATE_FORMAT} date={date} />
        </p>
        <button
          type='button'
          onClick={() => dispatch(likePostAction(_id))}
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-up'></i>{' '}
          {likes.length > 0 ? <span>{likes.length}</span> : null}
        </button>
        <button
          type='button'
          onClick={() => dispatch(removeLike(_id))}
          className='btn btn-light'
        >
          <i className='fas fa-thumbs-down'></i>
        </button>
        <Link to={`/post/${_id}`} className='btn btn-primary'>
          Discussion{' '}
          {comments.length > 0 ? (
            <span className='comment-count'>{comments.length}</span>
          ) : null}
        </Link>
        {!auth.loading && user === auth.user._id ? (
          <button
            type='button'
            onClick={() => dispatch(deletePost(_id))}
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default PostItem;
