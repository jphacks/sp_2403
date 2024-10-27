from fastapi import FastAPI
from maniae_api import ManiaeAPI

app = FastAPI()

@app.get("/")
async def index():
  return {"message": "Hello World"}

@app.get("/get_route")
async def get_json(start: str, goal: str, time: str):
  return ManiaeAPI().route_json(start=start,goal=goal, time=time)
