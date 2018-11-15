import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteEducation } from '../../actions/profileActions'

class Education extends Component {
    
    onDelete(id) {
        this.props.deleteEducation(id)
    }

    render() {

        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>
                    { edu.from } - { edu.to == '' ? 'Now' : edu.to} 
                </td>
                <td>
                    <button onClick={this.onDelete.bind(this, edu._id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        ))

        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>
                </table>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, { deleteEducation })(Education )