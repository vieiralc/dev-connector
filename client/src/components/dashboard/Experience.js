import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../redux/actions/profile/deleteExperience';
import { DATE_FORMAT } from '../../constants/constants';

const Experience = ({ experiences }) => {
  const dispatch = useDispatch();
  const DisplayExperiences = experiences.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td className='hide-sm'>
        <Moment date={exp.from} format={DATE_FORMAT} /> -{' '}
        {exp.to === '' ? ' Now' : <Moment date={exp.to} format={DATE_FORMAT} />}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => dispatch(deleteExperience(exp._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th> Company </th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{DisplayExperiences}</tbody>
      </table>
    </>
  );
};

export default Experience;
