import Moment from 'react-moment';

const Education = ({ educationArray }) => {

    console.log(educationArray)

    const DisplayEducation = educationArray.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td className="hide-sm">
                <Moment date={edu.from} format="YYYY/MM/DD"/> - {
                    edu.to === '' ? (' Now') : (<Moment date={edu.to} format="YYYY/MM/DD"/>)
                }
            </td>
            <td>
                <button className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))

    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th> School </th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayEducation}
                </tbody>
            </table>
        </>
    )
}

export default Education