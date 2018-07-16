import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }
  render() {
    const education = this.props.education
      .sort((a, b) => {
        return new Date(b.from).getTime() - new Date(a.from).getTime();
      })
      .map(exp => (
        <tr key={exp._id}>
          <td>{exp.school}</td>
          <td>{exp.degree}</td>
          <td>
            <Moment parse="YYYY-MM-DD" format="MM/DD/YYYY">
              {exp.from}
            </Moment>{" "}
            -{" "}
            {exp.to === null ? (
              "Now"
            ) : (
              <Moment parse="YYYY-MM-DD" format="MM/DD/YYYY">
                {exp.to}
              </Moment>
            )}
          </td>
          <td>
            <button
              onClick={this.onDeleteClick.bind(this, exp._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      ));
    return (
      <div>
        <h4 className="mb-4">Education Credentials</h4>
        {this.props.education.length === 0 ? (
          "No Education"
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>School</th>
                <th>Degree</th>
                <th>Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{education}</tbody>
          </table>
        )}
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteEducation }
)(Education);
