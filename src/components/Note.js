import React, { useState } from "react";
import "../styles/Note.css";

const Note = ({ id, text, x, y, color, onDragStart, onTextChange, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(text);

  const handleMouseDown = (e) => {
    // Prevenir a propagação para evitar conflitos com o drag
    e.stopPropagation();
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onTextChange(id, noteText);
  };

  const handleChange = (e) => {
    setNoteText(e.target.value);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div
      className="note"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color,
      }}
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDoubleClick={handleDoubleClick}
    >
      <div className="note-header">
        <div className="drag-handle" onMouseDown={handleMouseDown}>⋮⋮</div>
        <button className="delete-btn" onClick={handleDelete}>✕</button>
      </div>
      
      {isEditing ? (
        <textarea
          className="note-textarea"
          value={noteText}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div className="note-content">{noteText}</div>
      )}
    </div>
  );
};

export default Note;
