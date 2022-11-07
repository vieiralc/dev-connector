import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getPost } from '../../redux/actions/post/getPost';
import { Link, useParams } from 'react-router-dom';
import PostItem from '../posts/PostItem';
//import CommentFeed from './CommentFeed';
//import PostItem from '../posts/PostItem';
//import CommentForm from './CommentForm';

const Post = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.post.loading);
  const post = useSelector((state) => state.post.post);

  useEffect(() => {
    dispatch(getPost(postId));
  }, []);

  if (post === null || loading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />;
    </div>
  );
};

export default Post;
