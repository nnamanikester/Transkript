import React, { useState, useEffect } from 'react';

import Summary from '../components/Summary';
import Row from '../components/Row';
import { Link } from 'react-router-dom';

function ResultPage({ match }) {
  const [student, setStudent] = useState({});
  const { params } = match;
  const session = student.session;
  const url = match.url.replace('print', 'compute');

  useEffect(() => {
    setStudent(window.getStudentInfoByRegNo(params.session, params.regNo));
  }, [params.regNo, params.session]);

  const handlePrint = e => {
    // window.printToPDF({ name: student.name, regNo: student.regNo });
    return window.print();
  };

  return (
    <div className="result padded-more">
      <div class="hide">
        <span>
          <Link
            to={url}
            style={{
              textDecoration: 'underline',
              color: '#001f3f',
              fontSize: 15
            }}
          >
            Back
          </Link>
        </span>
        <button
          className="btn btn-large btn-primary pull-right"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
      {student.session ? (
        <div className="student-result">
          <div className="student-info">
            <div className="d-flex">
              <h5 className="flex">
                NAME OF STUDENT: {String(student.name).toUpperCase()}
              </h5>
              <h5 className="flex">REG NO: {student.regNo}</h5>
            </div>
            <div className="d-flex">
              <h5 className="flex">MODE OF ENTRY: {student.mode_of_entry}</h5>
              <h5 className="flex">
                STATE OF ORIGIN: {String(student.state).toUpperCase()}
              </h5>
            </div>
          </div>

          <table className="table">
            {session.map((year, i) => {
              return (
                <React.Fragment key={year.id}>
                  <tbody>
                    <tr>
                      <th colSpan="11" className="text-center">
                        {String(year.year).toUpperCase()}
                      </th>
                    </tr>
                    <tr>
                      <th colSpan="5">FIRST SEMESTER</th>
                      <th colSpan="1" />
                      <th colSpan="5">SECOND SEMESTER</th>
                    </tr>
                    <Row year={year} />
                    <tr height={40} />
                  </tbody>
                </React.Fragment>
              );
            })}
          </table>
          {student && student.total ? (
            <div className="d-flex summary-table">
              <div>
                <table>
                  <Summary student={student} />}
                </table>
              </div>
              <div>
                <div className="d-flex">
                  <h5>HOD: </h5>
                  <hr
                    className="flex mx-2"
                    style={{ borderBottom: '1px dotted #000' }}
                  />
                </div>
                <br />
                <div className="d-flex">
                  <h5>SIGNATURE: </h5>
                  <hr
                    className="flex mx-2"
                    style={{ borderBottom: '1px dotted #000' }}
                  />
                </div>
                <br />
                <div className="d-flex">
                  <h5>DATE: </h5>
                  <hr
                    className="flex mx-2"
                    style={{ borderBottom: '1px dotted #000' }}
                  />
                </div>
                <br />
                <div className="text-bold">A=5,B=4,C=3,D=2,F=0</div>
              </div>
            </div>
          ) : (
            <div className="f-16 red-text">
              No result has been uploaded. Kindly input student's result to see
              transcript
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ResultPage;
