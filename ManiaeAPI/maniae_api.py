import json
import requests
from bs4 import BeautifulSoup

class ManiaeAPI:

    def __init__(self):
        pass

    def make_json_file(self, start, goal, time):
        routes = self.get_route(start,goal, time)
        json_data = self.make_json_data(routes)
        self.output_file(json_data)

    def route_json(self, start, goal, time):
        routes = self.get_route(start, goal, time)
        return self.make_json_data(routes)

    def get_route(self, start, goal, time):
        url = self.make_url(start, goal, time)
        res = requests.get(url)
        print(f'status:{res.status_code}')
        soup = BeautifulSoup(res.text, 'html.parser')
        return soup.find_all(class_="routeDetail")

    def make_json_data(self, routes):
        json_data = {}
        for route_index,route in enumerate(routes):
            stations = self.get_stations(route)
            transports = self.get_transports(route)
            route_name = "route" + str(route_index + 1) # 仮
            json_data[route_name] = self.merge_data(stations, transports)
        return json_data

    def make_url(self, start, goal, time):
        standard_time = self.goo_lab(time)
        calender = standard_time.split('T')[0]
        moments = standard_time.split('T')[1]
        year = calender.split('-')[0]
        month = calender.split('-')[1]
        day = calender.split('-')[2]
        hour = moments.split(':')[0]
        m1 = moments.split(':')[1][0]
        m2 = moments.split(':')[1][1]
        url = "https://transit.yahoo.co.jp/search/result?from={0}&to={1}&type=4&y={2}&m={3}&d={4}&hh={5}&m1={6}&m2={7}".format(start,goal,year,month,day,hour,m1,m2)
        return url

    def goo_lab(self, time):
        url = "https://labs.goo.ne.jp/api/chrono"
        post_data = json.dumps({
                "app_id":"cd748588f4c06d762a680b74c68e4abacca3844308f4a2faaea514cb1988d18a",
                "sentence":time
        })
        res = requests.post(url,post_data,headers={"Content-Type": "application/json"})
        goo_lab_data = json.loads(res.text)
        print("time:{0}".format(goo_lab_data['datetime_list'][-1][1]))
        return goo_lab_data['datetime_list'][-1][1]

    def get_stations(self, route):
        stations = []
        for station in route.find_all(class_="station"):
            data = {'kind': "station", 'station': station.find("a").text}
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
            data = {'kind': "transport", 'transport': tp.text}
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