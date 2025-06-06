import React, { useState } from "react";
import "./ReviewForm.css";
import FileInput from "./FileInput";
import RatingInput from "./RatingInput";
import useAsync from "./hooks/useAsync";
import useTranslate from "./hooks/useTranslate";

const INITIAL_VALUES = {
  title: "",
  rating: 0,
  content: "",
  imgFile: null,
};

export default function ReviewForm({
  initialValues = INITIAL_VALUES,
  initialPreview,
  onSubmit,
  onSubmitSuccess,
  onCancel,
}) {
  const t = useTranslate();
  const [isSubmitting, submittingError, onSubmitAsync] = useAsync(onSubmit);
  const [values, setValues] = useState(initialValues);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("rating", values.rating);
    formData.append("content", values.content);
    formData.append("imgFile", values.imgFile);

    let result = await onSubmitAsync(formData);
    if (!result) return;
    setValues(INITIAL_VALUES);
    const { review } = result;
    onSubmitSuccess(review);
  };

  return (
    <form className="ReviewForm">
      <FileInput
        name="imgFile"
        value={values.imgFile}
        initialPreview={initialPreview}
        onChange={handleChange}
      ></FileInput>
      <input name="title" value={values.title} onChange={handleInputChange} />
      <RatingInput
        name="rating"
        value={values.rating}
        onChange={handleChange}
      />
      <textarea
        name="content"
        value={values.content}
        onChange={handleInputChange}
      ></textarea>
      {onCancel && <button onClick={onCancel}>{t("cancel button")}</button>}
      <button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
        {t("confirm button")}
      </button>
      {submittingError?.message && <div>{submittingError.message}</div>}
    </form>
  );
}
