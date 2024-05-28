import React, { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";

export default function ReviewForm() {
  const [values, setValues] = useState({
    title: "",
    rating: 0,
    content: "",
    imgFile: null,
  });

  const handleChange = (name, value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <form className="ReviewForm">
      <FileInput
        name="imgFile"
        value={values.imgFile}
        onChange={handleChange}
      ></FileInput>
      <input name="title" value={values.title} onChange={handleInputChange} />
      <input
        name="rating"
        type="number"
        value={values.rating}
        onChange={handleInputChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      <button type="submit" onClick={handleSubmit}>
        확인
      </button>
    </form>
  );
}
