import './History.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function History(){
    let navigate = useNavigate();

    const goToGrave = (id) => {
        navigate('/?id='+encodeURIComponent(id));
    }

    return(
        <main>
            <div className="history-entry">
                <h2>Witold Runge</h2>
                <button 
                    onClick={()=>goToGrave("5/029")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1882-1952</h4>
                <p>Urodził się 5 lipca 1882 roku w Tarnowie. Lekarz powiatowy w Rohatynie, a od 1945 roku także lekarz powiatowy w Brzesku. W latach 1945–1946 pełnił funkcję lekarza szkolnego w brzeskim gimnazjum i liceum. Zmarł w Brzesku 28 lipca 1952 roku.</p>
            </div>
            <div className="history-entry">
                <h2>ks. Ignacy Kubasiewicz</h2>
                <button 
                    onClick={()=>goToGrave("1/027")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1841-1881</h4>
                <p>Urodził się w 1841 roku w Nowym Sączu. Wikariusz w parafiach w Czchowie, Kętach, Myślenicach, Zakliczynie i Szczurowej. W latach 1873–1881 był proboszczem parafii św. Jakuba w Brzesku. Zmarł 15 października 1881 roku.</p>
            </div>
            <div className="history-entry">
                <h2>ks. Maciej Pająk</h2>
                <button 
                    onClick={()=>goToGrave("5/020")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1818-1903</h4>
                <p>Rezydent parafii św. Jakuba w Brzesku w latach 1877–1903. Podczas swojej posługi opiekował się drewnianym kościółkiem św. Ducha, który spłonął w 1904 roku. Pełnił funkcję administratora parafii w latach 1881–1882.</p>
            </div>
            <div className="history-entry">
                <h2>ks. Jan Głąb</h2>
                <button 
                    onClick={()=>goToGrave("1/030")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1887-1917</h4>
                <p>Urodził się 2 lutego 1887 roku w Szczurowej. Od 1 września 1916 roku pełnił funkcję katechety w szkole ludowej oraz prefekta w gimnazjum w Brzesku.</p>
            </div>
            <div className="history-entry">
                <h2>ks. Jan Błazej Zachara</h2>
                <h4>1893-1968</h4>
                <p>Urodził się i wychował na Brzezowcu. Ukończył gimnazjum w Bochni oraz studia teologiczne we Lwowie. Kapłan archidiecezji lwowskiej, kapelan wojskowy w stopniu podpułkownika. Po zakończeniu służby powrócił w rodzinne strony.</p>
            </div>
            <div className="history-entry">
                <h2>ks. Paweł Wieczorek</h2>
                <button 
                    onClick={()=>goToGrave("1/029")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1883-1964</h4>
                <p>Urodził się 7 lipca 1883 roku w Bieńkowicach (parafia Cerekiew). W 1918 roku rozpoczął posługę w parafii św. Jakuba w Brzesku, gdzie przez wiele lat był wikariuszem i bliskim współpracownikiem ks. Jakuba Stosura. W 1940 roku został aresztowany przez Gestapo i osadzony w więzieniu w Tarnowie. Po wojnie kontynuował działalność duszpasterską, pisał teksty religijne, sztuki teatralne, dramaty, komedie oraz wiersze. Publikował artykuły w czasopismach katolickich. Zmarł 4 października 1964 roku.</p>
            </div>
            <div className="history-entry">
                <h2>ks. Jan Fortuna</h2>
                <button 
                    onClick={()=>goToGrave("1/110")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1889-1983</h4>
                <p>Urodził się 6 grudnia 1889 roku w Brzesku. Ukończył gimnazjum w Bochni oraz studia teologiczne w Tarnowie. Święcenia kapłańskie przyjął w 1912 roku. Pracował jako katecheta. Fundator kościoła pod wezwaniem Ducha Świętego w Brzesku, wzniesionego na miejscu drewnianej świątyni, która spłonęła w 1904 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Artur Sumiński</h2>
                <button 
                    onClick={()=>goToGrave("5/189")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1834-1886</h4>
                <p>Urodził się 19 lipca 1834 roku w powiecie lipnowskim. Uczestnik powstania styczniowego, hrabia herbu Kościesza. Administrator dóbr ziemskich w Słotwinie (obecnie część Brzeska). Ojciec Zofii Jadwigi Goetz Okocimskiej, działaczki społecznej i religijnej. Zmarł 19 listopada 1886 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Jan Janoszek</h2>
                <button 
                    onClick={()=>goToGrave("5/147")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>zm. 1889</h4>
                <p>Lekarz chirurg, burmistrz Brzeska. Zmarł 31 maja 1889 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Wilhelm Janoszek</h2>
                <button 
                    onClick={()=>goToGrave("5/105")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1843-1889</h4>
                <p>Aptekarz, właściciel apteki „Pod Białym Orłem” w Brzesku. Radny miejski i powiatowy. Zmarł 2 września 1889 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Franciszek Bernacki</h2>
                <button 
                    onClick={()=>goToGrave("5/010")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1849-1918</h4>
                <p>Lekarz miejski, burmistrz Brzeska, działacz społeczny. Budowniczy budynku, w którym obecnie mieści się Sąd Rejonowy. Zmarł 11 września 1918 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Jan Władysław Brzeski</h2>
                <h4>1878-1942</h4>
                <p>Urodził się w Jaśle w 1878 roku. Ukończył gimnazjum w Jaśle oraz studia medyczne w Krakowie. Lekarz, trzykrotny burmistrz Brzeska (od 1927 roku), zaangażowany w rozwój miasta – m.in. w budowę łaźni miejskiej i ośrodka zdrowia. Honorowy obywatel Brzeska. Prezes Towarzystwa Gimnastycznego „Sokół”, organizator życia kulturalnego. Po wybuchu II wojny światowej zorganizował szpital dla ofiar bombardowania. Aresztowany przez gestapo, zginął w Auschwitz w 1942 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Szymon Bernadzikowski</h2>
                <button 
                    onClick={()=>goToGrave("5/004")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1856-1936</h4>
                <p>Urodził się 20 października 1856 roku w Lipnicy Murowanej. Absolwent Wydziału Lekarskiego Uniwersytetu Jagiellońskiego. W 1895 roku został wybrany posłem do Sejmu Krajowego Galicji z ramienia Polskiego Stronnictwa Ludowego, mandat sprawował przez trzy kadencje. W 1911 roku stanął na czele resortu zdrowia w Wydziale Krajowym, organizując szpitale i tworząc miejsca pracy dla lekarzy na wsiach oraz w małych miasteczkach. W 1914 roku otrzymał tytuł honorowego obywatela Brzeska. Po I wojnie światowej powrócił do Brzeska, gdzie do końca życia prowadził praktykę lekarską i angażował się w działalność społeczną. Zmarł 3 września 1936 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Ryszard Mayer</h2>
                <button 
                    onClick={()=>goToGrave("5/022")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1872-1920</h4>
                <p>Urodził się 17 września 1872 roku. Kasjer w browarze, działacz społeczny, inicjator szkolnictwa średniego w Brzesku. Komendant Obwodowej Straży Pożarnej. Zmarł 17 października 1920 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Wilhelm Dadlez</h2>
                <button 
                    onClick={()=>goToGrave("2/203")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1853–1923</h4>
                <p>Adwokat Sądu Krajowego w Krakowie. Aktywny działacz społeczny. W latach 1889–1895 był członkiem Wydziału Towarzystwa Szkoły Ludowej, organizacji promującej edukację i czytelnictwo w Galicji. W latach 1919–1920 był członkiem zarządu głównego Organizacji Obrony Narodowej.</p>
            </div>
            <div className="history-entry">
                <h2>Józef Jędrzejczyk</h2>
                <button 
                    onClick={()=>goToGrave("5/164")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1896-1960</h4>
                <p>Woźny brzeskiego gimnazjum. Przed wkroczeniem Niemców do Brzeska zabezpieczył i ukrył część wyposażenia oraz zbiorów szkolnych.</p>
            </div>
            <div className="history-entry">
                <h2>Franciszek Soja</h2>
                <button 
                    onClick={()=>goToGrave("1/079")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1865-1947</h4>
                <p>Urodził się 29 września 1865 roku w Brzesku. Stolarz. W latach 1934–1939 pełnił funkcję burmistrza Brzeska. Był również starszym Cechu oraz aktywnym działaczem społecznym. Odznaczony Srebrnym Krzyżem Zasługi za osiągnięcia w pracy społecznej oraz porządkowo-sanitarnej. Otrzymał list pochwalny Ministra Przemysłu i Handlu za wybitne zasługi w 64-letniej pracy w rzemiośle. Zmarł 17 maja 1947 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Feliks Firlet</h2>
                <button 
                    onClick={()=>goToGrave("3/149")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1887-1960</h4>
                <p>Urodził się 7 grudnia 1887 roku w Szeligach koło Warszawy. Ceniony mistrz kowalstwa artystycznego. Pełnił funkcję starszego Cechu oraz aktywnie uczestniczył w życiu społecznym miasta. Za zasługi dla rzemiosła odznaczony m.in. Honorową Odznaką Rzemiosła oraz Srebrnym Krzyżem Zasługi. Zmarł 19 maja 1960 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Czesław Goos</h2>
                <button 
                    onClick={()=>goToGrave("5/062")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1917–1944</h4>
                <p>Urodził się 12 lutego 1917 roku w Brzezowcu. Był absolwentem gimnazjum w Brzesku oraz aktywnym harcerzem. Wraz z bratem Władysławem prowadził restaurację w Brzesku, która służyła jako punkt kontaktowy dla Armii Krajowej. Został zatrzymany przez patrol niemieckiej żandarmerii. Podczas próby ucieczki został zastrzelony. Zginął 17 czerwca 1944 roku w wieku 27 lat.</p>
            </div>
            <div className="history-entry">
                <h2>Jan Skrobotowicz</h2>
                <button 
                    onClick={()=>goToGrave("5/120")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1875-1953</h4>
                <p>Urodził się 25 listopada 1875 roku. Naczelnik Towarzystwa Gimnastycznego „Sokół” w Brzesku. Zmarł 9 września 1953 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Antoni Wolny</h2>
                <button 
                    onClick={()=>goToGrave("3/001")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1868-1938</h4>
                <p>Wynalazca kawy produkowanej z fig, żyta i prażonych żołędzi. Przedsiębiorca, właściciel fabryki kawy oraz młynu. Założyciel biblioteki i kółka rolniczego na Słotwinie. Działacz Towarzystwa Gimnastycznego „Sokół”. Zmarł 23 stycznia 1938 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Stanisław Czamarski</h2>
                <button 
                    onClick={()=>goToGrave("1/001")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1856–1934</h4>
                <p>Urodził się 20 lutego 1856 roku. Pułkownik Wojska Polskiego, działacz społeczny, opiekun cmentarza wojennego. Zmarł 7 lipca 1934 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Tomasz Sroka</h2>
                <button 
                    onClick={()=>goToGrave("3/055")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1883-1961</h4>
                <p>Zasłużony działacz Towarzystwa Gimnastycznego „Sokół”. Inspektor Państwowego Zakładu Ubezpieczeń w Brzesku. Łowczy powiatowy. Zmarł 16 listopada 1961 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Stanisława Wojciechowska</h2>
                <button 
                    onClick={()=>goToGrave("5/086")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1826-1863</h4>
                <p>Urodziła się w Dobrocieszu. Poetka, matka Ludwika Solskiego. Miejsce jej pochówku nie jest znane. Na cmentarzu w Brzesku znajduje się tablica upamiętniająca jej życie.</p>
            </div>
            <div className="history-entry">
                <h2>Józef Nowotny</h2>
                <button 
                    onClick={()=>goToGrave("5/088")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1877-1946</h4>
                <p>Urodził się 4 października 1877 roku. Właściciel cyrku o nazwie „Cyrk Józefiego”, treser koni. Zmarł 18 kwietnia 1946 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Maria Dziadosz</h2>
                <button 
                    onClick={()=>goToGrave("5/071")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1910-1993</h4>
                <p>Urodziła się we Lwowie 20 stycznia 1910 roku. Absolwentka Wydziału Architektury Politechniki Lwowskiej. Pracowała jako architekt powiatowy. Zaprojektowała kościół w Niedźwiedzy oraz rozbudowę kościoła na Słotwinie w Brzesku. Zmarła 6 listopada 1993 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Janina Głuch</h2>
                <button 
                    onClick={()=>goToGrave("5/127")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1913-2009</h4>
                <p>Urodziła się 22 stycznia 1913 roku. Była cenioną fotografką z Brzeska, właścicielką zakładu „Foto Janina”. Przed wojną należała do Towarzystwa Gimnastycznego „Sokół” w Brzesku i współinicjowała jego reaktywację w 1998 roku. Działaczka Cechu Rzemiosł w Brzesku. Inicjatorka budowy Domu Rzemiosła. W 1989 roku została uhonorowana Medalem 600-lecia Miasta Brzeska. Zmarła 26 września 2009 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Maria Sroka</h2>
                <button 
                    onClick={()=>goToGrave("3/055")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1892-1983</h4>
                <p>Urodziła się 10 lutego 1892 roku w Bochni. Od 1916 roku prowadziła znane atelier fotograficzne w Brzesku, które działało nieprzerwanie przez 53 lata. Przez wiele lat pełniła funkcję starszego Cechu Rzemiosł Różnych w Brzesku, przyczyniając się do budowy Domu Rzemiosła (1963). Działała również w Izbie Rzemieślniczej w Krakowie, Radzie Narodowej oraz Stronnictwie Demokratycznym. Odznaczona m.in. Krzyżem Kawalerskim Orderu Odrodzenia Polski. Zmarła 31 maja 1983 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Jerzy Maria Peters</h2>
                <h4>1918-1979</h4>
                <p>Urodził się 15 maja 1918 roku. Polski aktor i malarz związany z Brzeskiem. Podczas II wojny światowej dwukrotnie wywieziony na przymusowe roboty do Niemiec i Austrii. Po wojnie występował w teatrach w Tarnowie, Krakowie, Częstochowie i Kielcach. Zmarł 13 listopada 1979 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Maria Wlazłowska-Epstein</h2>
                <h4>1911–1971</h4>
                <p>Urodziła się 12 sierpnia 1911 roku w Urzejowicach. Absolwentka krakowskiej Akademii Sztuk Pięknych oraz pedagogiki na Uniwersytecie Jagiellońskim. Po II wojnie światowej pracowała jako nauczycielka rysunku w Brzesku i Szczurowej. W 1946 roku osiedliła się w Gdyni, gdzie aktywnie uczestniczyła w tworzeniu środowiska plastycznego Wybrzeża. Zmarła 11 marca 1971 roku w Gdyni.</p>
            </div>
            <div className="history-entry">
                <h2>Leon Szombara</h2>
                <button 
                    onClick={()=>goToGrave("1/053")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1929-1969</h4>
                <p>Urodził się 1 października 1929 roku. Muzyk. Zmarł 11 kwietnia 1969 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Walenty Lisieński</h2>
                <button 
                    onClick={()=>goToGrave("1/112")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1831-1889</h4>
                <p>Rzeźbiarz i snycerz, urodzony w Wojniczu w 1831 roku, prowadził w Brzesku warsztat rzeźbiarsko-snycerski. Artysta ten jest znany m.in. jako twórca ołtarza Matki Boskiej w kościele parafialnym pw. Św. Jakuba w Brzesku oraz ambony w kościele w Chełmie koło Bochni.</p>
            </div>
            <div className="history-entry">
                <h2>Franciszek Lisak</h2>
                <h4>1874–1909</h4>
                <p>Urodził się w Jonimach koło Ryglic. Rzeźbiarz i kamieniarz. Tworzył figury religijne oraz nagrobki na lokalnych cmentarzach. Udzielał się społecznie w Lidze Pomocy Przemysłowej. Zmarł 21 czerwca 1909 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Stanisław Rogóż</h2>
                <button 
                    onClick={()=>goToGrave("5/113")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1866-1948</h4>
                <p>Urodził się 24 kwietnia 1866 roku w Borzęcinie. Snycerz i rzeźbiarz. Uczył się m.in. u Franciszka Wyspiańskiego i współpracował z architektem Janem Sas-Zubrzyckim. Prowadził własną pracownię na Brzezowcu. Wykonał m.in. ołtarze i wyposażenie kościołów w Jadownikach, Jasieniu, Maszkienicach, Borzęcinie i Porąbce Uszewskiej. Tworzył ołtarze, ambony, chrzcielnice, feretrony, konfesjonały, stacje drogi krzyżowej, stalle oraz inne sprzęty wyposażenia sakralnego. Zmarł 24 marca 1948 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Józef Niedzielski</h2>
                <button 
                    onClick={()=>goToGrave("2/109")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1877- 1943</h4>
                <p>Kowal artystyczny z Brzeska, autor kunsztownie wykonanych elementów metalowych do Pałacu Goetzów. Ceniony za mistrzostwo w rzemiośle. Zmarł 6 grudnia 1943 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Henryk Szczepka</h2>
                <button 
                    onClick={()=>goToGrave("1/124")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1866-1913</h4>
                <p>Urodził się 9 kwietnia 1866 roku. Był dyrektorem i założycielem szkoły męskiej i przemysłowej w Brzesku. Zmarł 24 października 1913 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Józef Kijak</h2>
                <button 
                    onClick={()=>goToGrave("5/091")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1886-1940</h4>
                <p>Urodził się 29 marca 1886 roku w Borzęcinie. Absolwent Gimnazjum w Tarnowie oraz Uniwersytetu Jagiellońskiego. Od 1919 roku uczył matematyki i fizyki w Gimnazjum w Brzesku. Opiekun drużyny harcerskiej i kółek technicznych, aktywnie zaangażowany w życie społeczne i samorządowe miasta. Zmarł 15 września 1940 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Witold Zajączkowski</h2>
                <button 
                    onClick={()=>goToGrave("2/192")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1889-1955</h4>
                <p>Urodził się 18 listopada 1889 roku. W 1914 roku ukończył polonistykę na Uniwersytecie Jagiellońskim. Wieloletni profesor i dyrektor Gimnazjum oraz Liceum w Brzesku. Podczas okupacji zaangażowany w tajne nauczanie. Zmarł 25 stycznia 1955 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Stanisław Stefański</h2>
                <button 
                    onClick={()=>goToGrave("1/084")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1889-1963</h4>
                <p>Absolwent Uniwersytetu Jagiellońskiego. Polonista i germanista, nauczyciel szkół średnich w Brzesku, Żywcu i Bielsku. Podczas okupacji zaangażowany w tajne nauczanie w Brzesku, Łysej Górze i Porąbce Uszewskiej. Członek Tajnej Komisji Egzaminacyjnej, aktywnie działał na rzecz życia kulturalnego. Odznaczony Złotym Krzyżem Zasługi za działalność wychowawczą i społeczną.</p>
            </div>
            <div className="history-entry">
                <h2>Kazimierz Missona</h2>
                <button 
                    onClick={()=>goToGrave("4/103")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1902-1929</h4>
                <p>Syn Kazimierza i Jadwigi Missonów, uczestnik walk o Lwów, legionista. Absolwent polonistyki na Uniwersytecie Jagiellońskim. Uczył gimnastyki w Gimnazjum w Brzesku. Zmarł 3 lutego 1929 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Józef Zgłobisz</h2>
                <button 
                    onClick={()=>goToGrave("2/121")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1911-1964</h4>
                <p>Urodził się 4 stycznia 1911 roku. Pedagog i muzyk. Ukończył wyższe studia pedagogiczne i muzyczne. Pracował jako sekretarz w brzeskim gimnazjum i liceum, gdzie prowadził również lekcje muzyki oraz szkolny chór. W okresie okupacji był zatrudniony jako sekretarz w inspektoracie szkolnym w Tarnowie. Po wojnie nauczał w liceum ekonomicznym, opiekując się także chórem i zespołem muzycznym w browarze Okocim. Zmarł 2 kwietnia 1964 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Władysława Kuhnert</h2>
                <h4>1908-1999</h4>
                <p>Absolwentka brzeskiego gimnazjum oraz Uniwersytetu Jagiellońskiego. Przez wiele lat pracowała jako nauczycielka historii. Za zasługi w pracy pedagogicznej i działalność społeczną została odznaczona Medalem Komisji Edukacji Narodowej oraz Złotym Krzyżem Polskiego Czerwonego Krzyża.</p>
            </div>
            <div className="history-entry">
                <h2>Stanisława Wawrykiewicz</h2>
                <h4>1904–1981</h4>
                <p>Urodziła się 3 listopada 1904 roku w Brzesku. Ukończyła miejscowe gimnazjum oraz Uniwersytet Jagielloński. Pracowała jako nauczycielka w szkołach powszechnych w Uszwi, Szczurowej, Rudach Rysiu i Maszkienicach, gdzie pełniła także funkcję kierowniczki. Podczas okupacji była zaangażowana w tajne nauczanie. Po wojnie została dyrektorką Szkoły Zawodowej oraz kierowniczką Szkoły Żeńskiej w Brzesku. Od 1951 roku uczyła historii w brzeskim liceum. Odznaczona medalem za długoletnią pracę w oświacie.</p>
            </div>
            <div className="history-entry">
                <h2>Błażej Palej</h2>
                <button 
                    onClick={()=>goToGrave("5/137")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1914-2002</h4>
                <p>Urodził się 11 grudnia 1914 roku. Był nauczycielem geografii w Liceum Ogólnokształcącym i Technikum Ekonomicznym w Brzesku. Uczestniczył w kampanii wrześniowej oraz w walkach o Berlin podczas II wojny światowej. Po wojnie aktywnie działał społecznie, angażując się w działalność Ligi Obrony Kraju, Związku Nauczycielstwa Polskiego oraz Związku Kombatantów. Zmarł 14 grudnia 2002 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Stanisław Klimek</h2>
                <button 
                    onClick={()=>goToGrave("2/001")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1893-1923</h4>
                <p>Urodził się 8 listopada 1893 roku. Był kapitanem Wojska Polskiego, uczestnikiem I wojny światowej oraz wojny polsko-bolszewickiej. Zmarł 23 stycznia 1923 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Józefa Michalewicz</h2>
                <button 
                    onClick={()=>goToGrave("3/109")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1910-1994</h4>
                <p>Absolwentka seminariów nauczycielskich w Kołomyi i Stanisławowie. Pracowała jako nauczycielka w powiecie lwowskim. W czasie wojny została deportowana do Kazachstanu, a po powrocie osiedliła się w Brzesku. Uczyła języka rosyjskiego i gimnastyki w miejscowym gimnazjum i liceum, opiekując się Kołem Przyjaźni Polsko-Radzieckiej. Pracowała również jako dziennikarka w redakcjach „Echa Krakowa” i „Dziennika Polskiego”.</p>
            </div>
            <div className="history-entry">
                <h2>Adam Peters</h2>
                <button 
                    onClick={()=>goToGrave("5/170")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1887-1940</h4>
                <p>Urodził się 2 maja 1887 roku. Był lekarzem powiatowym w Brzesku. Wybudował tam willę, znaną jako „Petersówka”. Zmarł 27 listopada 1940 roku w obozie koncentracyjnym Mauthausen.</p>
            </div>
            <div className="history-entry">
                <h2>Marian Tracz</h2>
                <button 
                    onClick={()=>goToGrave("3/151")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1894-1951</h4>
                <p>Urodził się 16 sierpnia 1894 roku we Lwowie. Był majorem Wojska Polskiego. Służył najpierw w armii austriackiej, a następnie w Wojsku Polskim. Uczestniczył w I wojnie światowej, a także ukończył Szkołę Oficerów Rezerwy. Odznaczony Orderem Virtuti Militari i Krzyżem Walecznych. Zmarł 10 kwietnia 1951 roku.</p>
            </div>
            <div className="history-entry">
                <h2>Irena Pyrek</h2>
                <button 
                    onClick={()=>goToGrave("2/078")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1924-1943</h4>
                <p>Urodziła się 17 października 1924 roku w Wesołowie. Aresztowana przez gestapo za ukrywanie miejsca pobytu męża, członka konspiracji. Brutalnie przesłuchiwana i, będąc w zaawansowanej ciąży, zamordowana 20 sierpnia 1943 roku w Brzesku.</p>
            </div>
            <div className="history-entry">
                <h2>Emil Knotz</h2>
                <button 
                    onClick={()=>goToGrave("3/054")}
                    className="btn btn-outline-secondary show-location-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </button>
                <h4>1894-1965</h4>
                <p>Urodził się 9 lipca 1894 roku. Nauczyciel i społecznik. Po ucieczce przed frontem sowieckim zamieszkał z rodziną w tzw. „Bezardówce” w Brzesku, gdzie zorganizował prywatną szkołę dla młodzieży. Zmarł 1 lipca 1965 roku.</p>
            </div>
        </main>
    )
}

export default History;