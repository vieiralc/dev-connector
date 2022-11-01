import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/actions/post/addPost';

const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addPost(text));
  };
  return (
    <div className='post-form'>
      <div className='bg-primary p'>
        <h3>Say Something...</h3>
      </div>
      <form className='form my-1' onSubmit={(e) => submitForm(e)}>
        <textarea
          name='text'
          value={text}
          cols='30'
          rows='5'
          placeholder='Create a post'
          required
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  );
};

export default PostForm;
