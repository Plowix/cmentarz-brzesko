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
        
        try:
            date_obj = datetime.strptime(date_str, "%d.%m.%Y")
            return date_obj.day, date_obj.month, date_obj.year
        except ValueError:
            pass
        try:
            date_obj = datetime.strptime(date_str, "%d/%m/%Y")
            return date_obj.day, date_obj.month, date_obj.year
        except ValueError:
            pass
        try:
            date_obj = datetime.strptime(date_str, "%m.%d.%Y")
            return date_obj.day, date_obj.month, date_obj.year
        except ValueError:
            pass
        date_obj = datetime.strptime(date_str, "%m/%d/%Y")
        return date_obj.day, date_obj.month, date_obj.year

    except ValueError:
        # Jeśli wszystko inne zawiedzie
        return "00", "00", "0000"

df = pd.read_csv(sys.argv[1], dtype={'grave_id': str})
df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)

df['grave_id'] = df['grave_id'].fillna(method='ffill')

df['grave_id'] = df['grave_id'].astype(str).str.replace('.0', '', regex=False)

def build_full_name(row):
    first = row['first_name']
    last = row['last_name']
    
    if pd.isna(first) or first.lower() == "nieznany" or first.lower() == "nieznane" or first.lower() == "nieznana":
        return str(last).strip() if not pd.isna(last) else ''
    elif pd.isna(last) or last.lower() == "nieznany" or last.lower() == "nieznane":
        return str(first).strip() if not pd.isna(first) else ''
    else:
        return f"{first} {last}".strip()

df['full_name'] = df.apply(build_full_name, axis=1)

# Usuń wiersze z pustym full_name
df = df[df['full_name'].str.strip() != '']


df['birth_day'], df['birth_month'], df['birth_year'] = zip(*df['birth_date'].map(process_date))
df['death_day'], df['death_month'], df['death_year'] = zip(*df['death_date'].map(process_date))

df.drop(columns=['first_name', 'last_name', 'birth_date', 'death_date'], inplace=True)

df.to_csv("output.csv", index=False)

print(df)

