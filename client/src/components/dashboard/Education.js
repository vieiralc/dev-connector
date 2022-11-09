import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profile/deleteEducation';
import { DATE_FORMAT } from '../../constants/constants';

const Education = ({ educationArray }) => {
  const dispatch = useDispatch();

  const DisplayEducation = educationArray.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td className='hide-sm'>
        <Moment date={edu.from} format={DATE_FORMAT} /> -{' '}
        {edu.to === '' ? ' Now' : <Moment date={edu.to} format={DATE_FORMAT} />}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => dispatch(deleteEducation(edu._id))}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th> School </th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{DisplayEducation}</tbody>
      </table>
    </>
  );
};

export default Education;
