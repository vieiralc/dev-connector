import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addEducation } from '../../redux/actions/profile/addEducation';
import { useDispatch } from 'react-redux';

const AddEducation = () => {
  const [formData, setFormData] = useState({
    degree: '',
    school: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(addEducation(formData, navigate));
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => submitForm(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={formData.school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={formData.degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Field of Study'
            name='fieldofstudy'
            value={formData.fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={formData.from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              checked={formData.current}
              value={formData.current}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  current: !formData.current,
                  to: '',
                });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current
          </p>
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            disabled={toDateDisabled}
            value={formData.to}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
            value={formData.description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary my-1'>
          Save
        </button>
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddEducation;
