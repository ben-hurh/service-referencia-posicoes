import multiprocessing
import mysql.connector
import requests
from datetime import datetime
from bancodedados_mysql import BancoDeDadosMySql

USER_INTEGRACAO = '20021522000187'
PASSWORD_INTEGRACAO = '1234'
# BASE_URL = 'http://192.168.1.202:3336'
BASE_URL = 'http://localhost:3336'
QUANTIDADE_PROCESSOS = 50
bd_mysql = None
token = ''

requests.adapters.DEFAULT_RETRIES = 100

def converter_locais():
  print('\nConvertendo Locais')
  endpoint = '/references'
  cursor_locais = bd_mysql.buscar('select * from cidades_referencias_1')
  for row in cursor_locais.fetchall():
    payload = {
        'id_local': row['cd_cidade'],
        'name': row['ds_cidade'],
        'latitude': row['vl_latitude'],
        'longitude': row['vl_longitude'],
        'uf': row['ds_uf'],
        'id_customer': row['cd_clifor']
    }
    heders = {}
    response = requests.post(BASE_URL+endpoint, headers=heders, json=payload)
bd_mysql = BancoDeDadosMySql()
converter_locais()