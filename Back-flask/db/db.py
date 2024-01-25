import pyodbc


class Config:
    server = '192.168.'
    database = 'samdbb2'
    username = ''
    password = ''

# Construct the connection string
    connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'

# Establish the connection
    connection = pyodbc.connect(connection_string)
