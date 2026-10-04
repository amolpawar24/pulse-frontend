import { useRef, useState } from "react";

import type {
  ChangeEvent,
  FormEvent,
  KeyboardEvent,
} from "react";

type MessageInputProps = {
  onSend: (content: string) => void;
};

const MessageInput = ({
  onSend,
}: MessageInputProps) => {
  const [value, setValue] = useState("");

  const textareaRef =
    useRef<HTMLTextAreaElement | null>(null);

  const handleSend = () => {
    const content = value.trim();

    if (!content) {
      return;
    }

    onSend(content);

    setValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    handleSend();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const nextValue = event.target.value;

    setValue(nextValue);

    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "auto";

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      140
    )}px`;
  };

  return (
    <form
      className="message-input"
      onSubmit={handleSubmit}
    >
      <div className="message-input__box">
        <button
          type="button"
          className="message-input__action"
          aria-label="Add attachment"
        >
          +
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          rows={1}
          maxLength={5000}
          placeholder="Write a message..."
          aria-label="Message"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button
          type="submit"
          className="message-input__send"
          aria-label="Send message"
          disabled={!value.trim()}
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M21.5 3.5 10 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="m21.5 3.5-5.7 17-5.8-5.5L4.5 9.5l17-6Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="message-input__hint">
        <span>Enter to send</span>

        <span>
          Shift + Enter for a new line
        </span>
      </div>
    </form>
  );
};

export default MessageInput;