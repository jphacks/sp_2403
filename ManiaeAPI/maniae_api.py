import json
import requests
from bs4 import BeautifulSoup

class ManiaeAPI:

    def __init__(self):
        pass

    # def send_request(self,start,goal,time):
    def send_request(self, start, goal):
        # ここの時間でGooラボAPI使って成型しようかな
        # url = "https://transit.yahoo.co.jp/search/result?from={0}&to={1}&type=4&y={2}&m={3}&d={4}&hh={5}&m1={6}&m2={7}".format(start,goal)
        url = "https://transit.yahoo.co.jp/search/result?from={0}&to={1}".format(start,goal)
        res = requests.get(url)
        print(f'status:{res.status_code}')

        soup = BeautifulSoup(res.text,'html.parser')
        routes = soup.find_all(class_="routeDetail")

        json_data = {}
        for i,route in enumerate(routes):
            stations = []
            for station in route.find_all(class_="station"):
            # for station in route.children:
                data = {}
                data["station"] = station.find("a").text
                if len(station.find(class_="time")) == 1:
                    data["departure"] = station.find(class_="time").text
                elif len(station.find(class_="time")) == 2:
                    data["arrival"] = station.find_all(class_="time")[0].find_all("li")[0].text[:-1]
                    data["departure"] = station.find_all(class_="time")[0].find_all("li")[1].text[:-1]
                stations.append(data)
            route_index = "route" + str(i + 1)
            json_data[route_index] = stations

        file = open('./output.json', 'w', encoding='utf-8')
        json.dump(json_data, file, ensure_ascii=False)
