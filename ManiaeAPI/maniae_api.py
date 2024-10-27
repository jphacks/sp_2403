import json
import requests
from bs4 import BeautifulSoup

class ManiaeAPI:

    def __init__(self):
        pass

    # def send_request(self,start,goal,time):
    def make_json_file(self, start, goal):
        routes = self.get_route(start,goal)
        json_data = self.get_json_data(routes)
        self.output_file(json_data)

    def get_json_data(self, routes):
        json_data = {}
        for route_index,route in enumerate(routes):
            stations = self.get_stations(route)
            transports = self.get_transports(route)
            route_name = "route" + str(route_index + 1) # 仮
            json_data[route_name] = self.merge_data(stations, transports)
        return json_data

    def get_route(self, start, goal):
        # url = "https://transit.yahoo.co.jp/search/result?from={0}&to={1}&type=4&y={2}&m={3}&d={4}&hh={5}&m1={6}&m2={7}".format(start,goal)
        url = "https://transit.yahoo.co.jp/search/result?from={0}&to={1}".format(start, goal)
        res = requests.get(url)
        print(f'status:{res.status_code}')

        soup = BeautifulSoup(res.text, 'html.parser')
        return soup.find_all(class_="routeDetail")

    def get_stations(self, route):
        stations = []
        for station in route.find_all(class_="station"):
            data = {}
            data['kind'] = "station"
            data['station'] = station.find("a").text
            if len(stations) == 0:
                data['departure'] = station.find(class_="time").text
            elif len(stations) == len(route.find_all(class_="station")) - 1:
                data['arrival'] = station.find(class_="time").text
            else:
                data['arrival'] = station.find_all(class_="time")[0].find_all("li")[0].text[:-1]
                data['departure'] = station.find_all(class_="time")[0].find_all("li")[1].text[:-1]
            stations.append(data)
        return stations

    def get_transports(self, route):
        transports = []
        for tp in route.find_all(class_="transport"):
            data = {}
            data['kind'] = "transport"
            data['transport'] = tp.text
            transports.append(data)
        return transports

    def merge_data(self, stations, transports):
        merged_data = []
        for i in range(0, len(transports)):
            merged_data.append(stations[i])
            merged_data.append(transports[i])
        merged_data.append(stations[-1])
        return merged_data

    def output_file(self, json_data):
        file = open('./output.json', 'w', encoding='utf-8')
        json.dump(json_data, file, ensure_ascii=False)