import Moment from 'react-moment';
import { DATE_FORMAT } from '../../constants/constants';

const ProfileEducation = ({ educationArray }) => {
    return (
        <section className="profile-edu bg-white p-2">
            <h2 className="text-primary">Education</h2>
            {
                educationArray.length > 0 ? (
                    educationArray.map(edu => (
                        <div key={edu._id}>
                            <h3 className='text-dark'>{edu?.school}</h3>
                            <p>
                                <Moment format={DATE_FORMAT} date={edu?.from}/> - {' '}
                                {!edu?.to ? ' Now' : <Moment format={DATE_FORMAT} date={edu.to}/>}
                            </p>
                            <p>
                                <strong>Degree: </strong>{edu.degree}
                            </p>
                            <p>
                                <strong>Field of study: </strong>{edu.fieldofstudy}
                            </p>
                            <p>
                                <strong>Description: </strong>{edu.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No education credentials</p>
                )
            }
        </section>
    )
}

export default ProfileEducation;