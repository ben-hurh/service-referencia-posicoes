import mysql.connector

class BancoDeDadosMySql():
    def __init__(self):
        self.db = None
        self.conectar()
        
    def conectar(self):        
        self.db = mysql.connector.connect(host='192.168.1.114', user='root', passwd='03072003', db='integra', buffered=True)

    def desconectar(self):
        self.db.close()

    def executar_comando(self, comando):
        curExecute = self.db.cursor(dictionary=True)
        curExecute.execute(comando)
        return curExecute

    def buscar(self, comando):
        curExecute = self.db.cursor(dictionary=True)
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
