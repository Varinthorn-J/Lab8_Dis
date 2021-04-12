import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR, { mutate } from "swr";

const URL = `http://localhost/api/student`;
const fetcher = (URL) => axios.get(URL).then((res) => res.data);

export default function student() {
  const [student, setStudent] = useState("");
  const [fname, setFname] = useState("");
  const [surname, setSurname] = useState("");
  const [major, setMajor] = useState("");
  const [GPA, setGPA] = useState(0);

  const { data, error } = useSWR(URL, fetcher);
  if (!data) return <div>Loading...</div>;
  console.log("Home", data);

  const getStudent = async (id) => {
    let student = await axios.get(`${URL}/${id}`);
    setStudent({
      fname: student.data.fname,
      surname: student.data.surname,
      major: student.data.major,
      GPA: student.data.GPA,
    });
  };

  const addStudent = async (fname, surname, major, GPA) => {
    let student = await axios.post(URL, { fname, surname, major, GPA });
    //setstudent(student.data)
    mutate(URL);
  };

  const deleteStudent = async (id) => {
    let student = await axios.delete(`${URL}/${id}`);
    //setstudent(student.data)
    mutate(URL);
  };

  const updateStudent = async (id) => {
    let student = await axios.put(`${URL}/${id}`, {
      fname,
      surname,
      major,
      GPA,
    });
    //setstudent(student.data)
    mutate(URL);
  };

  const printstudent = (student) => {
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
    <div>
      {" "}
      Hello
      <ul>{printstudent(data.list)} </ul>
      <ul>
        name: {student.fname} : surname: {student.surname} : major:{" "}
        {student.major} : GPA: {student.GPA}
      </ul>
      <div>
        <h2>Add Student</h2>
        Name :{" "}
        <input type="text" onChange={(e) => setFname(e.target.value)}></input>
        SurName :{" "}
        <input type="text" onChange={(e) => setSurname(e.target.value)}></input>
        Major :{" "}
        <input type="text" onChange={(e) => setMajor(e.target.value)}></input>
        GPA :{" "}
        <input type="text" onChange={(e) => setGPA(e.target.value)}></input>
        <button onClick={() => addStudent(fname, surname, major, GPA)}>
          Add
        </button>
      </div>
    </div>
  );
}
