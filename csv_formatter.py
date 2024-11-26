import pandas as pd
from datetime import datetime
import sys

# konwertruje csv z danymi o pochowanych z pliku podanego w pierwszym argumencie do output.csv

def process_date(date_str):
    if isinstance(date_str, float) and pd.isna(date_str): 
        return "00", "00", "0000"
    
    if isinstance(date_str, str) and (date_str == "Nieznana" or date_str == "UZUPEŁNIĆ" or not date_str):
        return "00", "00", "0000"
    
    try:
        if "r." in date_str:
            return "00", "00", date_str[:-2].strip()
        
        date_obj = datetime.strptime(date_str, "%d.%m.%Y")
        return date_obj.day, date_obj.month, date_obj.year
    except ValueError:
        try:
            date_obj = datetime.strptime(date_str, "%m/%d/%Y")
            return date_obj.day, date_obj.month, date_obj.year
        except ValueError:
            
            return "00", "00", "0000"

df = pd.read_csv(sys.argv[1])

df = df[~df['first_name'].isin(["Nieznany", "DO WYPEŁNIENIA"])]

df['full_name'] = df['first_name'].fillna('') + " " + df['last_name'].fillna('')
df['birth_day'], df['birth_month'], df['birth_year'] = zip(*df['birth_date'].map(process_date))
df['death_day'], df['death_month'], df['death_year'] = zip(*df['death_date'].map(process_date))

df.drop(columns=['first_name', 'last_name', 'birth_date', 'death_date'], inplace=True)


df.to_csv("output.csv", index=False)

print(df)
