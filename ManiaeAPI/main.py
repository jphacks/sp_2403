from fastapi import FastAPI
from maniae_api import ManiaeAPI

app = FastAPI()

@app.get("/")
async def index():
  return {"message": "Hello World"}

@app.get("/get_route")
async def get_json(start: str, goal: str, time: str):
  return ManiaeAPI().json_route_data(start=start,goal=goal, time=time)
  # return ManiaeAPI().json_route_data(start="大谷地",goal="千歳", time="2024-10-25T09:25:30")