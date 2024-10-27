from fastapi import FastAPI
from maniae_api import ManiaeAPI

app = FastAPI()

@app.get("/")
async def index():
  return {"message": "Hello World"}

@app.get("/get_route")
async def get_route(start: str, goal: str, time: str):
  return ManiaeAPI().route_json(start=start,goal=goal, time=time)
  # return {"message": "This is sample response"}

from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)