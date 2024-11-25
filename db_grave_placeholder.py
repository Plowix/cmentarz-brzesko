import sys
import mysql.connector

# W argumentach podajesz sektor, najwyższy numer grobu i początkowe koordynaty
def padZeros(number, targetLength):
    while len(number) < targetLength:
        number = "0" + number
    return number

def coordsToPoint(coords):
    return f'POINT({coords[0]} {coords[1]})'

diff = 0.00003
sectorNumber = str(sys.argv[1])
coords = [float(sys.argv[3]), float(sys.argv[4])]  

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="cmentarz"
)

mycursor = mydb.cursor()
for i in range(1, int(sys.argv[2]) + 1):
    sql = """
    INSERT INTO graves (id, photo_path, location)
    VALUES (%s, %s, ST_GeomFromText(%s));
    """
    val = (
        f"{sectorNumber}/{padZeros(str(i), 3)}",
        "/images/graves/grave_1001.jpg",
        coordsToPoint(coords)
    )
    mycursor.execute(sql, val)
    coords[1] += diff 

mydb.commit()
print(mycursor.rowcount, "record(s) inserted")
