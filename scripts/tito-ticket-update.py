import json
import os
import sys
import urllib.request
from datetime import date

# Load .env file if present (no external dependencies needed)
env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, _, value = line.partition("=")
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                if key not in os.environ:
                    os.environ[key] = value


def get_env(key: str) -> str:
    value = os.environ.get(key)
    if not value:
        print(f"Error: missing required environment variable: {key}", file=sys.stderr)
        print(f"Add it to your .env file or export it before running.", file=sys.stderr)
        sys.exit(1)
    return value


TITO_API_KEY = get_env("TITO_API_KEY")
TITO_ACCOUNT_SLUG = get_env("TITO_ACCOUNT_SLUG")
TITO_EVENT_SLUG = get_env("TITO_EVENT_SLUG")
DISCORD_WEBHOOK_URL = get_env("DISCORD_WEBHOOK_URL")

TITO_BASE = "https://api.tito.io/v3"
TITO_HEADERS = {
    "Authorization": f"Bearer {TITO_API_KEY}",
    "Accept": "application/json",
}


def tito_get(path: str) -> dict:
    req = urllib.request.Request(f"{TITO_BASE}/{path}", headers=TITO_HEADERS)
    with urllib.request.urlopen(req) as res:
        return json.loads(res.read())


def fetch_tito_data() -> dict:
    event_data = tito_get(f"{TITO_ACCOUNT_SLUG}/{TITO_EVENT_SLUG}")
    releases_data = tito_get(f"{TITO_ACCOUNT_SLUG}/{TITO_EVENT_SLUG}/releases")
    return {
        "title": event_data["event"]["title"],
        "total": event_data["event"]["registrations_count"],
        "releases": releases_data["releases"],
    }


def format_message(data: dict) -> str:
    today = date.today().strftime("%A, %-d %B %Y")
    lines = [
        f"Ticket update for {data['title']} — {today}",
        "",
        f"Total registrations: {data['total']}",
        "",
        "Breakdown by ticket type:",
    ]
    for r in data["releases"]:
        capacity = f" / {r['quantity']}" if r.get("quantity") else ""
        lines.append(f"  - {r['title']}: {r['tickets_count']}{capacity}")
    return "\n".join(lines)


def post_to_discord(message: str) -> None:
    payload = json.dumps({"content": message}).encode()
    req = urllib.request.Request(
        DISCORD_WEBHOOK_URL,
        data=payload,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as res:
        if res.status not in (200, 204):
            print(f"Discord webhook returned unexpected status: {res.status}", file=sys.stderr)
            sys.exit(1)


def main() -> None:
    print("Fetching Tito ticket data...")
    data = fetch_tito_data()
    print(f"Event: {data['title']}")
    print(f"Total registrations: {data['total']}")

    message = format_message(data)
    print(f"\nMessage preview:\n{message}\n")

    print("Posting to Discord...")
    post_to_discord(message)
    print("Done.")


if __name__ == "__main__":
    main()
