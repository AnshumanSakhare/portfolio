"""
SQLite persistence layer for chat sessions and messages.
Uses aiosqlite for non-blocking async I/O compatible with FastAPI.
"""
import aiosqlite
from datetime import datetime

DB_PATH = "chat_history.db"


async def init_db() -> None:
    """Create tables if they don't exist yet."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_sessions (
                id          TEXT PRIMARY KEY,
                created_at  TEXT NOT NULL
            )
            """
        )
        await db.execute(
            """
            CREATE TABLE IF NOT EXISTS chat_messages (
                id          INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id  TEXT    NOT NULL,
                role        TEXT    NOT NULL,
                content     TEXT    NOT NULL,
                created_at  TEXT    NOT NULL,
                FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
            )
            """
        )
        await db.commit()


async def save_message(session_id: str, role: str, content: str) -> None:
    """Ensure the session row exists, then insert the message."""
    now = datetime.utcnow().isoformat()
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT OR IGNORE INTO chat_sessions (id, created_at) VALUES (?, ?)",
            (session_id, now),
        )
        await db.execute(
            """
            INSERT INTO chat_messages (session_id, role, content, created_at)
            VALUES (?, ?, ?, ?)
            """,
            (session_id, role, content, now),
        )
        await db.commit()


async def get_messages(session_id: str) -> list[dict]:
    """Return all messages for a session ordered by insertion time."""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """
            SELECT role, content, created_at
            FROM chat_messages
            WHERE session_id = ?
            ORDER BY id
            """,
            (session_id,),
        ) as cursor:
            rows = await cursor.fetchall()
            return [
                {
                    "role": row["role"],
                    "content": row["content"],
                    "created_at": row["created_at"],
                }
                for row in rows
            ]


async def clear_messages(session_id: str) -> None:
    """Delete all messages and the session record."""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "DELETE FROM chat_messages WHERE session_id = ?", (session_id,)
        )
        await db.execute(
            "DELETE FROM chat_sessions WHERE id = ?", (session_id,)
        )
        await db.commit()
