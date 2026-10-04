import { useMemo, useState } from "react";

import PulseMark from "../../../components/PulseStatus/PulseMark";

type User = {
  id: number;
  name: string;
  email: string;
  is_online?: boolean;
};

type SidebarProps = {
  me: User | null;
  users: User[];
  onlineIds: number[];
  activeUserId: number | null;
  onSelect: (userId: number) => void;
  onLogout: () => void;
};

const getInitials = (name?: string) => {
  if (!name) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) =>
      part.charAt(0).toUpperCase()
    )
    .join("");
};

const Sidebar = ({
  me,
  users,
  onlineIds,
  activeUserId,
  onSelect,
  onLogout,
}: SidebarProps) => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] =
    useState(false);

  const filteredUsers = useMemo(() => {
    const value = search
      .trim()
      .toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(value) ||
        user.email
          .toLowerCase()
          .includes(value)
    );
  }, [users, search]);

  const onlineCount = users.filter(
    (user) =>
      onlineIds.includes(user.id) ||
      Boolean(user.is_online)
  ).length;

  return (
    <aside className="chat-sidebar">
      {/* ============================================================
          SIDEBAR HEADER
      ============================================================ */}

      <div className="chat-sidebar__top">
        <div className="chat-sidebar__brand">
          <div className="chat-sidebar__brand-mark">
            <PulseMark size="md" />
          </div>

          <div className="chat-sidebar__brand-text">
            <strong>Pulse</strong>

            <span>
              Messages
            </span>
          </div>
        </div>

        <button
          type="button"
          className={`chat-sidebar__menu-button ${
            menuOpen
              ? "chat-sidebar__menu-button--open"
              : ""
          }`}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() =>
            setMenuOpen(
              (value) => !value
            )
          }
        >
          <span />
          <span />
          <span />
        </button>

        {menuOpen && (
          <div
            className="chat-sidebar__menu"
            role="menu"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onLogout();
              }}
            >
              <span className="chat-sidebar__menu-icon">
                <PulseMark size="xs" />
              </span>

              <span>
                Sign out
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ============================================================
          SEARCH
      ============================================================ */}

      <div className="chat-sidebar__search">
        <span
          className="chat-sidebar__search-icon"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              cx="11"
              cy="11"
              r="6.5"
              stroke="currentColor"
              strokeWidth="1.8"
            />

            <path
              d="M16 16L21 21"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <input
          type="text"
          value={search}
          placeholder="Search people..."
          aria-label="Search people"
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
        />

        {search && (
          <button
            type="button"
            className="chat-sidebar__search-clear"
            aria-label="Clear search"
            onClick={() =>
              setSearch("")
            }
          >
            ×
          </button>
        )}
      </div>

      {/* ============================================================
          CONVERSATIONS HEADER
      ============================================================ */}

      <div className="chat-sidebar__section">
        <div className="chat-sidebar__section-header">
          <div className="chat-sidebar__section-title">
            <span>
              Conversations
            </span>

            {filteredUsers.length > 0 && (
              <strong>
                {filteredUsers.length}
              </strong>
            )}
          </div>

          {onlineCount > 0 && (
            <div className="chat-sidebar__online-summary">
              <PulseMark size="xs" />

              <span>
                {onlineCount} online
              </span>
            </div>
          )}
        </div>

        {/* ==========================================================
            USERS
        ========================================================== */}

        <div className="chat-sidebar__users">
          {filteredUsers.length === 0 ? (
            <div className="chat-sidebar__empty">
              <div className="chat-sidebar__empty-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="6.5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M16 16L21 21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <strong>
                No people found
              </strong>

              <span>
                Try another name or
                email.
              </span>
            </div>
          ) : (
            filteredUsers.map(
              (user) => {
                const isActive =
                  user.id ===
                  activeUserId;

                const isOnline =
                  onlineIds.includes(
                    user.id
                  ) ||
                  Boolean(
                    user.is_online
                  );

                return (
                  <button
                    type="button"
                    key={user.id}
                    className={[
                      "chat-user",
                      isActive
                        ? "chat-user--active"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() =>
                      onSelect(
                        user.id
                      )
                    }
                  >
                    {/* ==================================================
                        AVATAR
                    ================================================== */}

                    <div className="chat-user__avatar">
                      <span className="chat-user__initials">
                        {getInitials(
                          user.name
                        )}
                      </span>

                      {isOnline && (
                        <span className="chat-user__pulse">
                          <PulseMark
                            size="xs"
                          />
                        </span>
                      )}
                    </div>

                    {/* ==================================================
                        CONTENT
                    ================================================== */}

                    <div className="chat-user__content">
                      <div className="chat-user__name">
                        <span>
                          {user.name}
                        </span>
                      </div>

                      <div className="chat-user__email">
                        {isOnline
                          ? "Active now"
                          : user.email}
                      </div>
                    </div>

                    {/* ==================================================
                        ACTIVE INDICATOR
                    ================================================== */}

                    <span
                      className="chat-user__arrow"
                      aria-hidden="true"
                    >
                      {isActive
                        ? (
                            <PulseMark
                              size="xs"
                            />
                          )
                        : "›"}
                    </span>
                  </button>
                );
              }
            )
          )}
        </div>
      </div>

      {/* ============================================================
          ACCOUNT
      ============================================================ */}

      {me && (
        <div className="chat-sidebar__account">
          <div className="chat-account">
            <div className="chat-account__avatar">
              <span>
                {getInitials(
                  me.name
                )}
              </span>

              <span className="chat-account__pulse">
                <PulseMark size="xs" />
              </span>
            </div>

            <div className="chat-account__info">
              <strong>
                {me.name}
              </strong>

              <span>
                {me.email}
              </span>
            </div>

            <button
              type="button"
              className={`chat-account__button ${
                menuOpen
                  ? "chat-account__button--open"
                  : ""
              }`}
              aria-label="Account menu"
              aria-expanded={menuOpen}
              onClick={() =>
                setMenuOpen(
                  (value) => !value
                )
              }
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;