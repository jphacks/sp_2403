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
        for route_index,route in enumerate(routes):
            # for element_index,element in enumerate(route.contents):
            #     if not 'class' in element.attrs:
            #         continue
            #     data = {}
            #     if element.attrs['class'] == ['station']:
            #         data['kind'] = "station"
            #         data['station'] = element.find("a").text
            #         if sum(1 for e in elements if "station" in e.values()) == 0:
            #             data['departure'] = element.find(class_="time").text
            #         elif sum(1 for e in elements if "station" in e.values()) == len(route.find_all(class_="station")) - 1:
            #             data['arrival'] = element.find(class_="time").text
            #         else:
            #             print(sum(1 for e in elements if "station" in e.values()))
            #             data['arrival'] = element.find_all(class_="time")[0].find_all("li")[0].text[:-1]
            #             data['departure'] = element.find_all(class_="time")[0].find_all("li")[1].text[:-1]
            #     elif element.attrs['class'] == ['fareSection']:
            #         if len(element.find_all(class_="station")) > 0:
            #             station_data
            #         data['kind'] = "fareSection"
            #         data['transport'] = element.find(class_="transport").text
            #     elif element.attrs['class'] == ['access', 'walk']:
            #         data['kind'] = "walk"
            #     elements.append(data)
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
            transports = []
            for tp in route.find_all(class_="transport"):
                data = {}
                data['kind'] = "transport"
                data['transport'] = tp.text
                transports.append(data)
            route_number = "route" + str(route_index + 1)
            json_data[route_number] = []
            for i in range(0,len(transports)):
                json_data[route_number].append(stations[i])
                json_data[route_number].append(transports[i])
            json_data[route_number].append(stations[-1])

        file = open('./output.json', 'w', encoding='utf-8')
        json.dump(json_data, file, ensure_ascii=False)
