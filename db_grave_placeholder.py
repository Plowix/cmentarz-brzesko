import pandas as pd
from pyproj import Proj, transform
import mysql.connector

# Definicja układów odniesienia
puwg2000 = Proj("+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +units=m +no_defs")
wgs84 = Proj("+proj=longlat +datum=WGS84 +no_defs")

# Funkcja do konwersji współrzędnych z PUWG2000 na WGS84
def convert_puwg2000_to_wgs84(x, y):
    try:
        lon, lat = transform(puwg2000, wgs84, x, y)
        return lat, lon  # Kolejność: lat, lon (zgodne z WGS84)
    except Exception as e:
        raise ValueError(f"Nie udało się przekształcić współrzędnych: {e}")

# Funkcja do generowania grave_id w formacie 1/001, 1/002 itd.
def generate_grave_id(index):
    return f"5/{index:03d}"

# Funkcja do zamiany współrzędnych na format POINT
def coords_to_point(lon, lat):
    return f'POINT({lon} {lat})'

# Funkcja do dodawania grobu do bazy danych
def add_grave_to_database(grave_id, lon, lat):
    try:
        # Połączenie z bazą danych MySQL
        conn = mysql.connector.connect(
            host="localhost",
            user="root",  # Używamy użytkownika root
            password="",  # Puste hasło
            database="cmentarz"  # Baza danych 'cmentarz'
        )
        cursor = conn.cursor()

        # Zapytanie do bazy danych
        location = coords_to_point(lat, lon)

        # Wstawienie nowego grobu
        insert_query = "INSERT INTO graves (id, location) VALUES (%s, ST_GeomFromText(%s, 4326))"
        cursor.execute(insert_query, (grave_id, location))
        conn.commit()
        print(f"Grób {grave_id} został dodany.")

    except mysql.connector.Error as e:
        print(f"Błąd w połączeniu z bazą danych: {e}")
    finally:
        if conn.is_connected():
            cursor.close()
            conn.close()

# Wczytanie danych z pliku CSV
def process_graves_from_csv(file_path):
    df = pd.read_csv(file_path)

    for _, row in df.iterrows():
        # Generujemy grave_id na podstawie kolumny "Nr"
        grave_id = generate_grave_id(int(row["Nr"]))
        x = row["Y"]  # Wartość X z pliku (wschód-zachód)
        y = row["X"]  # Wartość Y z pliku (północ-południe)

        # Przekształcamy współrzędne z PUWG2000 na WGS84
        lat, lon = convert_puwg2000_to_wgs84(x, y)
        print(str(lat) + " " + str(lon))

        if lon is not None and lat is not None:
            # Dodanie grobu do bazy danych
            add_grave_to_database(grave_id, lon, lat)
        else:
            print(f"Nie udało się przekształcić współrzędnych grobu {grave_id}")


# Ścieżka do pliku CSV z danymi
csv_path = 'sektor5.csv'  # Zmienna ścieżka do pliku CSV

# Przetwarzamy dane z pliku CSV
process_graves_from_csv(csv_path)
