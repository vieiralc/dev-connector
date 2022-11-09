import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGithubRepos } from '../../redux/actions/profile/getProfiles';
import Spinner from '../layout/Spinner';

const ProfileGithub = ({ username }) => {
  const dispatch = useDispatch();
  const repos = useSelector((state) => state.profile.repos);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, []);

  if (loading || repos.length === 0) {
    return <Spinner />;
  }

  return (
    <section className='profile-github'>
      <h2 className='text-primary my-1'>Github Repos</h2>
      {repos.map((repo, i) => (
        <div key={i} className='repo bg-white p-1 my-1'>
          <div>
            <h4>
              <a href={repo.html_url} target='_blank'>
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div>
            <ul>
              <li className='badge badge-primary p-1'>
                {' '}
                Stars: {repo.stargazers_count}{' '}
              </li>
              <li className='badge badge-dark p-1'>
                {' '}
                Watchers: {repo.watchers_count}{' '}
              </li>
              <li className='badge badge-light p-1'>
                {' '}
                Forks: {repo.forks_count}{' '}
              </li>
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProfileGithub;
