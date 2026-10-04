import PulseMark from "../../../components/PulseStatus/PulseMark";

type User = {
  id: number;
  name: string;
  email: string;
  is_online?: boolean;
};

type ChatHeaderProps = {
  user: User;
  isOnline: boolean;
  onBack: () => void;
};

const getInitials = (name?: string) => {
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const ChatHeader = ({
  user,
  isOnline,
  onBack,
}: ChatHeaderProps) => {
  return (
    <header className="chat-header">
      <div className="chat-header__left">
        <button
          type="button"
          className="chat-header__back"
          aria-label="Back to conversations"
          onClick={onBack}
        >
          <span>‹</span>
        </button>

        <div className="chat-header__avatar">
          {getInitials(user.name)}

          {isOnline && (
            <span className="chat-header__pulse">
              <PulseMark size="xs" />
            </span>
          )}
        </div>

        <div className="chat-header__info">
          <h2>{user.name}</h2>

          <span
            className={
              isOnline
                ? "chat-header__online"
                : "chat-header__offline"
            }
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>

      <div className="chat-header__actions">
        <button
          type="button"
          className="chat-header__action"
          aria-label="Search conversation"
        >
          ⌕
        </button>

        <button
          type="button"
          className="chat-header__action"
          aria-label="More options"
        >
          •••
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;