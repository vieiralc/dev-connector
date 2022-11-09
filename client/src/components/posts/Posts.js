import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/post/post';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostForm from './PostForm';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <h1 className='large text-primary'>Posts</h1>
      <p className='leading'>
        <i className='fas fa-user'></i> Welcome to the community
      </p>
      <PostForm />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
