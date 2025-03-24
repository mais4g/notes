import React, { useState, useEffect } from "react";
import Note from "./Note";
import "../styles/Board.css"; // Vamos criar este arquivo de estilo

const Board = () => {
  // Estado para armazenar as notas
  const [notes, setNotes] = useState([
    { id: "1", text: "Bem-vindo ao app de notas!", x: 50, y: 50, color: "#fef3c7" },
    { id: "2", text: "Arraste as notas para organizá-las", x: 150, y: 150, color: "#e0f2fe" },
  ]);
  
  // Estado para controlar qual nota está sendo arrastada
  const [, setActiveId] = useState(null);

  // Função para iniciar o arrasto
  const handleDragStart = (e, id) => {
    setActiveId(id);
    e.dataTransfer.setData("text/plain", id);
  };

  // Função para permitir o drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Função para processar o drop
  const handleDrop = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    
    // Calcular a nova posição considerando o offset do Board
    const boardRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - boardRect.left - 50; // 50 é metade da largura da nota
    const y = e.clientY - boardRect.top - 20;  // 20 é aproximadamente metade da altura do cabeçalho
    
    // Atualizar a posição da nota
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, x, y } : note
      )
    );
    
    setActiveId(null);
  };

  // Função para adicionar uma nova nota
  const addNewNote = () => {
    const newId = Date.now().toString();
    // Gerar uma cor aleatória para a nova nota
    const colors = ["#fef3c7", "#e0f2fe", "#f3e8ff", "#dcfce7", "#fee2e2"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    setNotes([
      ...notes,
      {
        id: newId,
        text: "Nova nota",
        x: Math.random() * (window.innerWidth - 200), // Posição aleatória
        y: Math.random() * (window.innerHeight - 200), // Posição aleatória
        color: randomColor,
      },
    ]);
  };

  // Função para atualizar o texto da nota
  const updateNoteText = (id, newText) => {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, text: newText } : note))
    );
  };

  // Função para deletar uma nota
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Salvar notas no localStorage sempre que forem atualizadas
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // Carregar notas do localStorage ao iniciar
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  return (
    <div 
      className="board"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {notes.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          text={note.text}
          x={note.x}
          y={note.y}
          color={note.color}
          onDragStart={handleDragStart}
          onTextChange={updateNoteText}
          onDelete={deleteNote}
        />
      ))}
      
      <button className="add-note-btn" onClick={addNewNote}>
        + Adicionar Nota
      </button>
    </div>
  );
};

export default Board;
