# pip install psycopg2
import psycopg2
from psycopg2.extras import RealDictCursor


class BancoDeDadosPG():
    def __init__(self):
        self.db = None
        self.conectar()

    def conectar(self):
        self.db = psycopg2.connect(host='192.168.1.202', user='postgres',
                                   password='12345678', dbname='cheche', port='5432')  # , sslmode='require'
        self.db.autocommit = True

    def desconectar(self):
        self.db.close()

    def executar_comando(self, comando):
        curExecute = self.db.cursor(cursor_factory=RealDictCursor)
        curExecute.execute(comando)
        return curExecute

    def buscar(self, comando):
        curExecute = self.db.cursor(cursor_factory=RealDictCursor)
        curExecute.execute(comando)
        return curExecute

    def fechar_cursor(self, cursor):
        cursor.close()

    def fetch_all(self, cursor):
        return cursor.fetchall()

    def fetch_one(self, cursor):
        return cursor.fetchone()

    def last_row_id(self, cursor):
        return cursor.lastrowid

    def row_count(self, cursor):
        return cursor.rowcount
