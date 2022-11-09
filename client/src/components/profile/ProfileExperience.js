import Moment from 'react-moment';
import { DATE_FORMAT } from '../../constants/constants';

const ProfileExperience = ({ experiences }) => {
  return (
    <section className='profile-exp bg-white p-2'>
      <h2 className='text-primary'>Experience</h2>
      {experiences.length > 0 ? (
        experiences.map((exp) => (
          <div key={exp._id}>
            <h3 className='text-dark'>{exp?.company}</h3>
            <p>
              <Moment format={DATE_FORMAT} date={exp?.from} /> -{' '}
              {!exp?.to ? (
                ' Now'
              ) : (
                <Moment format={DATE_FORMAT} date={exp.to} />
              )}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            <p>
              <strong>Description: </strong>
              {exp.description}
            </p>
          </div>
        ))
      ) : (
        <p>No experience credentials</p>
      )}
    </section>
  );
};

export default ProfileExperience;
