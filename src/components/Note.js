import React from "react";
import "../styles/Note.css";

const Note = ({ id, text, x, y, color, font, onDragStart, onDelete }) => {
  return (
    <div
      className="note"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color,
        fontFamily: font,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
    >
      <div className="note-header">
        <button className="delete-btn" onClick={() => onDelete(id)}>
          ✕
        </button>
      </div>
      <div className="note-content">{text}</div>
    </div>
  );
};

export default Note;
