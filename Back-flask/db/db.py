import pyodbc


class Config:
    server = '192.168.1.201'
    database = 'samdbb2'
    username = 'sa'
    password = 'sam$123'

# Construct the connection string
    connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

# Establish the connection
    connection = pyodbc.connect(connection_string)