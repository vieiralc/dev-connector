import Moment from 'react-moment';

const Experience = ({ experiences }) => {

    const DisplayExperiences = experiences.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td className="hide-sm">
                <Moment date={exp.from} format="YYYY/MM/DD"/> - {
                    exp.to === '' ? (' Now') : (<Moment date={exp.to} format="YYYY/MM/DD"/>)
                }
            </td>
            <td>
                <button className='btn btn-danger'>Delete</button>
            </td>
        </tr>
    ))

    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th> Company </th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {DisplayExperiences}
                </tbody>
            </table>
        </>
    )
}

export default Experience