from src.database.database import SessionLocal
from src.database.models import ActivityLog

def log_activity(
    user_id,
    action
):

    db = SessionLocal()

    activity = ActivityLog(
        user_id=user_id,
        action=action
    )

    db.add(activity)

    db.commit()

    db.close()