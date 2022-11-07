import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../redux/actions/post/addComment';

const CommentForm = ({ postId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  return (
    <div className='post-form' style={{ marginTop: '2rem' }}>
      <div className='my-bg-primary p'>
        <h3>Leave a comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment(postId, { text }));
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a comment'
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ marginTop: '1rem' }}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default CommentForm;
