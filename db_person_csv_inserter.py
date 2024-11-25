import pandas as pd
import mysql.connector
import sys

def formatGraveId(id, sectorNumber):
    return f"{sectorNumber}/{str(id).zfill(3)}"

csv_file = sys.argv[1]  
sectorNumber = sys.argv[2]
personArray = pd.read_csv(csv_file)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",  
    database="cmentarz"  
)

mycursor = mydb.cursor()

sql = """
INSERT INTO persons (
    full_name, birth_year, birth_month, birth_day, 
    death_year, death_month, death_day, grave_id
) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);
"""

for index, row in personArray.iterrows():
    val = (
        row['full_name'],      
        row['birth_year'],     
        row['birth_month'],    
        row['birth_day'],      
        row['death_year'],     
        row['death_month'],    
        row['death_day'],      
        formatGraveId(row['grave_id'], sectorNumber)
    )
    mycursor.execute(sql, val)

mydb.commit()

mycursor.close()
mydb.close()
