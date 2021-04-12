import Head from "next/head";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import withAuth from "../components/withAuth";
import config from "../config/config";

const Profile1 = ({ token }) => {
  const URL = `${config.URL}/student2`;
  const [user, setUser] = useState({});
  const [student, setStudent] = useState("");
  const [fname, setFname] = useState("");
  const [surname, setSurname] = useState("");
  const [major, setMajor] = useState("");
  const [GPA, setGPA] = useState(0);

  useEffect(() => {
    students();
  }, []);

  const students = async () => {
    try {
      // console.log('token: ', token)
      const users = await axios.get(`${config.URL}/student2`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('user: ', users.data)
      setUser(users.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getStudent = async () => {
    let student = await axios.get(`${URL}/student2`);
    setStudent({
      fname: student.data.fname,
      surname: student.data.surname,
      major: student.data.major,
      GPA: student.data.GPA,
    });
  };
  const addStudent = async (fname, surname, major, GPA) => {
    let student = await axios.post(URL, { fname, surname, major, GPA });
    setstudent(student.data);
    // mutate(URL);
  };

  const deleteStudent = async (id) => {
    let student = await axios.delete(`${URL}/${id}`);
    setstudent(student.data);
    // mutate(URL);
  };

  const updateStudent = async (id) => {
    let student = await axios.put(`${URL}/${id}`, {
      fname,
      surname,
      major,
      GPA,
    });
    setstudent(student.data);
    // mutate(URL);
  };
 const printStudents = (student) => {
    console.log("student: ", student);
    if (student && student.length)
      return student.map((student, index) => (
        <li key={index}>
          {student ? student.fname : "-"} :{student ? student.surname : "-"} :
          {student ? student.major : "-"} :{student ? student.GPA : 0}
          <button onClick={() => getStudent(student.id)}>Get</button>
          <button onClick={() => updateStudent(student.id)}>Update</button>
          <button onClick={() => deleteStudent(student.id)}>Delete</button>
        </li>
      ));
    else {
      <h2>No Student</h2>;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Student</title>
      </Head>
      <div className={styles.container}>
        <Navbar />
        <h1>Student</h1>
        <ul>
          name:{student.fname} <br></br>
          <br></br>
          surname:{student.surname} <br></br>
          <br></br>
          major:{student.major}
          <br></br>
          <br></br>
          GPA:{student.GPA}
        </ul>
        <ul>{printStudents()}</ul>

        <div>
          <input
            placeholder="name"
            type="text"
            onChange={(e) => setFname(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <input
            type="text"
            placeholder="surname"
            onChange={(e) => setSurname(e.target.value)}
          ></input>
          <br></br>
          <br></br>

          <input
            type="text"
            placeholder="major"
            onChange={(e) => setMajor(e.target.value)}
          ></input>
          <br></br>
          <br></br>

          <input
            type="text"
            placeholder="gpa"
            onChange={(e) => setGPA(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <button onClick={() => addStudent(fname, surname, major, GPA)}>
            Add
          </button>
          <br></br>
        </div>
      </div>
    </Layout>
  );
};

export default withAuth(Profile1);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
