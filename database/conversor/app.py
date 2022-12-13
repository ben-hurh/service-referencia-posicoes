import mysql.connector
import requests
from bancodedados_mysql import BancoDeDadosMySql
from rich.progress import track

BASE_URL = 'http://localhost:3336'
bd_mysql = None
requests.adapters.DEFAULT_RETRIES = 100


def local_converter():
    endpoint = '/references'
    list_locals = bd_mysql.buscar('select * from cidades_referencias_1 where active = 1')
    for row in track(list_locals.fetchall(), 'Locals Converter...'):
        json = {
            'id_local': row['cd_cidade'],
            'name': row['ds_cidade'],
            'latitude': row['vl_latitude'],
            'longitude': row['vl_longitude'],
            'uf': row['ds_uf'],
            'id_customer': row['cd_clifor']
        }
        headers = {}
        response = requests.post(
            f'{BASE_URL}{endpoint}', headers=headers, json=json)


bd_mysql = BancoDeDadosMySql()
local_converter()
