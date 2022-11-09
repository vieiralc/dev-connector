import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { DATE_FORMAT } from '../../constants/constants';
import { deleteComment } from '../../redux/actions/post/deleteComment';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
}) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='User profile picture' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{text}</p>
        <p className='post-date'>
          Posted on <Moment date={date} format={DATE_FORMAT} />
        </p>
        {!authState.loading && user === authState.user._id ? (
          <button
            onClick={() => dispatch(deleteComment(postId, _id))}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i> Delete Comment
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CommentItem;
