import { FaPlus } from "react-icons/fa6";
import { useState } from "react";

interface AddItemProps {
  onAdd: (text: string) => void;
  placeholder: string;
  className?: string;
}

export function AddItem({ onAdd, placeholder, className = "" }: AddItemProps) {
  const [inputText, setInputText] = useState("");

  const handleAdd = () => {
    if (inputText.trim() !== "") {
      onAdd(inputText.trim());
      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className={`todo-item ${className}`}>
      <button className="add-icon" onClick={handleAdd}>
        <FaPlus size={14} />
      </button>
      <input
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}