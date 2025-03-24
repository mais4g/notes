import React, { useState } from "react";
import Note from "./Note";
import "../styles/Board.css";

const Board = () => {
  const [notes, setNotes] = useState([]);
  const [selectedColor, setSelectedColor] = useState("#fef3c7");
  const [selectedFont, setSelectedFont] = useState("Arial");

  // Função para adicionar uma nova nota
  const addNewNote = () => {
    const newId = Date.now().toString();
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: newId,
        text: "Nova nota",
        x: Math.random() * 300,
        y: Math.random() * 300,
        color: selectedColor,
        font: selectedFont,
      },
    ]);
  };

  // Função para deletar uma nota
  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  // Função para mover uma nota
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const boardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boardRect.left - 50; // Ajuste para centralizar a nota
    const y = e.clientY - boardRect.top - 20;

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, x, y } : note
      )
    );
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="board" onDragOver={handleDragOver} onDrop={handleDrop}>
      {/* Paleta de cores */}
      <div className="color-picker">
        <span>Escolha uma cor:</span>
        {["#CAC4CE", "#8D86C9", "#725AC1"].map((color) => (
          <button
            key={color}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      {/* Seleção de fontes */}
      <div className="font-picker">
        <span>Escolha uma fonte:</span>
        <select
          value={selectedFont}
          onChange={(e) => setSelectedFont(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Courier New">Courier New</option>
          <option value="Georgia">Georgia</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Verdana">Verdana</option>
        </select>
      </div>

      {/* Renderiza as notas */}
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          x={note.x}
          y={note.y}
          color={note.color}
          font={note.font}
          onDragStart={handleDragStart}
          onDelete={deleteNote}
        />
      ))}

      {/* Botão para adicionar nota */}
      <button className="add-note-btn" onClick={addNewNote}>
        + Adicionar Nota
      </button>
    </div>
  );
};

export default Board;
