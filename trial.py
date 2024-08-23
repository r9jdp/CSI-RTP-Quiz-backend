
from fastapi import FastAPI

from tortoise import Tortoise

from models import Submission


app = FastAPI()

@app.on_event("startup")
async def startup_event():
    await Tortoise.init(
        db_url="sqlite://db.sqlite3",
        modules={"models": ["models"]}
    )
    await Tortoise.generate_schemas()

@app.on_event("shutdown")
async def shutdown_event():
    await Tortoise.close_connections()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/submit/")
async def submit(email: str, score: int):
    submission = await Submission.create(email=email, score=score)
    return {"id": submission.db_id}

@app.get("/submissions/")
async def submissions():
    return await Submission.all().values()

