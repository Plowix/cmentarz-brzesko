import pandas as pd
from pyproj import Transformer

# Funkcja do zamiany współrzędnych na format POINT
def coordsToPoint(lon, lat):
    return f'POINT({lon} {lat})'

# Inicjalizacja transformacji z PL2000 (EPSG:2177) do WGS84 (EPSG:4326)
transformer = Transformer.from_crs("EPSG:2177", "EPSG:4326", always_xy=True)

# Ścieżka do pliku CSV
csv_path = 'sektor1.csv'

# Wczytanie danych z CSV
df = pd.read_csv(csv_path)

# Przetwarzanie wierszy z pliku CSV
for _, row in df.iterrows():
    try:
        grave_number = int(row["Nr"])

        # Zamiana X i Y na float
        x = float(row["Y"])  # Zamiana Y na X (X = Y z pliku CSV)
        y = float(row["X"])  # Zamiana X na Y (Y = X z pliku CSV)

        # Konwersja współrzędnych z PUWG 2000 (EPSG:2177) na WGS84 (EPSG:4326)
        lon, lat = transformer.transform(x, y)

        # Wygenerowanie formatu POINT dla MySQL
        point = coordsToPoint(lon, lat)

        # Wyświetlenie wynikowego POINT
        print(f"{grave_number}: {point} (Lon: {lon}, Lat: {lat})")

    except Exception as e:
        print(f"Błąd przy przetwarzaniu grobu {row['Nr']}: {e}")
