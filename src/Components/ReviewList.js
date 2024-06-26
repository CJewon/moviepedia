import React, { useState } from "react";
import "./ReviewList.css";
import Rating from "./Rating";
import ReviewForm from "./ReviewForm";
import { useLocale } from "./contexts/LocaleContext";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete, onEdit }) {
  const locale = useLocale();

  const handleDeleteClick = () => onDelete(item.id);

  const handleEditClick = () => {
    onEdit(item.id);
  };

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <Rating value={item.rating}></Rating>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <p>현재 언어 : {locale}</p>
        <button onClick={handleEditClick}>수정</button>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

export default function ReviewList({
  items,
  onDelete,
  onUpdate,
  onUpdateSuccess,
}) {
  const [editingId, setEditingId] = useState(null);

  const handleCancel = () => setEditingId(null);

  return (
    <ul>
      {items.map((item) => {
        if (item.id === editingId) {
          const { id, imgUrl, title, rating, content } = item;
          const initialValues = { title, rating, content };

          const handleSubmit = (formData) => onUpdate(id, formData);

          const handleSubmitSuccess = (review) => {
            onUpdateSuccess(review);
            setEditingId(null);
          };
          return (
            <li key={item.id}>
              <ReviewForm
                initialValues={initialValues}
                initialPreview={imgUrl}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
                onSubmitSuccess={handleSubmitSuccess}
              ></ReviewForm>
            </li>
          );
        }
        return (
          <li key={item.id}>
            <ReviewListItem
              item={item}
              onDelete={onDelete}
              onEdit={setEditingId}
            ></ReviewListItem>
          </li>
        );
      })}
    </ul>
  );
}
