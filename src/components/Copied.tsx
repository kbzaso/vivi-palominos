import { Check, Send } from "lucide-react";
import React, { useState } from "react";

export default function Copied(props: { value: string }) {
  const { value } = props;
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      return;
    }

    const apply = () => setCopied(true);
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => unknown;
    };
    if (doc.startViewTransition) {
      doc.startViewTransition(apply);
    } else {
      apply();
    }

    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={copied ? "Email copiado al portapapeles" : `Copiar email ${value}`}
      className="text-lg underline cursor-pointer flex gap-2 items-center hover:text-[var(--color-sky)] global-focus rounded-xs text-gray-700 link-soft"
    >
      <span aria-hidden="true" className="flex items-center gap-2">
        {copied ? <Check size={20} /> : <Send size={20} />}
        <span>{copied ? "¡Copiado!" : value}</span>
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email copiado al portapapeles" : ""}
      </span>
    </button>
  );
}
