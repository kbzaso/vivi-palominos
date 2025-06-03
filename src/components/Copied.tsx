import { Check, Send } from "lucide-react";
import React, { useState } from "react";

export default function Copied(props: { value: string }) {
  const { value } = props;

  const [showSooner, setShowSooner] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowSooner(true);
    setTimeout(() => setShowSooner(false), 2000);
    navigator.clipboard.writeText(value);
  };

  return (
    <div>
      {showSooner ? (
          <span className="text-sm px-2 py-1 text-[var(--color-night)] rounded-md flex text-center">
            ¡Copiado! <Check size={20} />
          </span>
      ) : (
          <button
            onClick={handleClick}
            className="text-lg underline cursor-pointer flex gap-2 hover:text-[var(--color-sky)] global-focus rounded-xs text-gray-500"
          >
            <Send /> {value}
          </button>
      )}
    </div>
  );
}
