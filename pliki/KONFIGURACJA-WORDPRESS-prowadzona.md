# 🌐 Prowadzona konfiguracja: Claude ↔ WordPress. Wrzuć mnie do czatu

> **Dla użytkownika:** nie musisz nic z tego pliku rozumieć ani wykonywać samodzielnie.
> Po prostu wrzuć ten plik (albo wklej jego treść) do Claude Code i napisz:
> **„Przeprowadź mnie przez to"**. Claude zajmie się resztą i poprowadzi Cię krok po kroku.
>
> Warunek wstępny: masz już za sobą podłączenie Claude do GitHuba (skarbiec pobrany na
> komputer). Jeśli nie, najpierw zrób tamtą instrukcję (`KONFIGURACJA-CLAUDE-CODE-prowadzona.md`).

---

## 📌 INSTRUKCJA DLA CLAUDE (czytasz to Ty, Claude, nie użytkownik)

Twoim zadaniem jest **przeprowadzić nietechniczną osobę** przez podłączenie Ciebie do jej
strony WordPress na **wersji testowej (staging)**, tak żeby dało się z czatu:
- **czytać i edytować treści** (posty, strony, produkty) przez REST API,
- **wgrywać zmiany motywu** (wygląd: PHP/CSS) przez FTP.

Końcowy efekt: użytkownik mówi „zmień nagłówek na stronie / podmień kolor / dopisz treść",
a Ty robisz to bezpośrednio na stronie testowej.

Wszystkie narzędzia są w repo `skarbiec`, w folderze **`strona-internetowa/tools/`**. Ty
uruchamiasz skrypty, a użytkownik tylko zdobywa dane dostępowe z paneli (bo tylko człowiek
ma do nich login).

### Zasady prowadzenia (trzymaj się ich bezwzględnie)

1. **Jeden krok naraz.** Zrób krok → sprawdź wynik → dopiero potem następny. Nigdy nie wrzucaj całej listy.
2. **Ty wykonujesz komendy, nie użytkownik.** Masz terminal, więc uruchamiaj skrypty sam i tłumacz wynik po ludzku. Użytkownika proś tylko o to, czego naprawdę musi dostarczyć: **dane z paneli** (login WP, hasło aplikacji, hasło FTP).
3. **Zero żargonu bez tłumaczenia.** „REST", „FTP", „staging", „hasło aplikacji": wyjaśnij jedną prostą metaforą przy pierwszym użyciu (patrz Sesja 2, Moduł 1).
4. **Po każdym kroku potwierdź sukces** („✅ REST działa, widzę 19 stron") i powiedz, co teraz robicie i PO CO.
5. **Ton:** spokojny, ciepły, zachęcający. Błąd = „spokojnie, to normalne, naprawiamy".
6. **Sekrety nigdy nie wchodzą do gita.** Pliki z hasłami (`dane-staging.txt`, `ftp-staging.txt`) są w `.gitignore`. Potwierdź to komendą `git check-ignore`. Nie commituj ich nigdy.
7. **Tylko staging.** Wszystko robimy na wersji testowej. Produkcji (żywej strony) w tym przewodniku NIE dotykamy.
8. **Zrzuty ekranu to Twój główny sposób debugowania.** Użytkownik porusza się po panelach, których
   nie zna (wp-admin, panel hostingu). Gdy nie wie, gdzie kliknąć, nie może czegoś znaleźć, albo widzi
   komunikat błędu, **poproś o zrzut ekranu** i naprowadź na jego podstawie. To Ty rozwiązujesz problem.
9. **Prowadź dokładnie „gdzie kliknąć" i zachęcaj do mówienia.** Zamiast ogólników podawaj konkretną
   ścieżkę („w menu po lewej kliknij X, potem Y, zjedź na sam dół"). Powtarzaj, że jak nie wie, gdzie
   coś jest, ma po prostu powiedzieć albo wysłać zrzut, żadne pytanie nie jest głupie.

---

### 🪜 Przebieg krok po kroku

**Krok 0 (Twój PIERWSZY komunikat): rozpisz użytkownikowi cały plan po ludzku.**
Zanim zrobisz cokolwiek technicznego, Twój pierwszy komunikat to przyjazne, nietechniczne
streszczenie całego procesu. To zastępuje dawną „wersję do czytania": tworzysz ją na żywo, a
użytkownik nie dostaje osobnego pliku. Zawrzyj w niej:
1. **Ciepłe przywitanie i po co to**: „połączę się z Twoją stroną testową tak, żebyś mogła kazać
   mi zmieniać i treści, i wygląd zwykłą rozmową, bez klikania w panelu".
2. **Jak to działa w jednym zdaniu**: do strony prowadzą **dwie osobne bramki**, jedna do treści
   (posty, strony, produkty), druga do wyglądu (kolory, czcionki, układ). Ustawimy obie.
3. **Co razem zrobimy**, prostą listą: przygotuję pliki na hasła, poprosisz WordPressa o „hasło
   aplikacji" i mi je podasz, zdobędziesz lub zresetujesz hasło FTP w panelu hostingu, przetestuję
   obie bramki, a na koniec (za Twoją zgodą) zrobimy drobną zmianę na próbę.
4. **Czego będę potrzebować od Ciebie** (i tylko tego): **dostęp do wp-admin stagingu** oraz
   **dostęp do panelu hostingu** (po hasło FTP). Hasła podajesz Ty, bo tylko Ty masz do nich login;
   zostają na Twoim komputerze, nigdy w repo.
5. **Warunek wstępny**: jestem już połączony z GitHubem, a skarbiec jest na komputerze (jeśli nie,
   najpierw robimy tamtą instrukcję). Pythona 3 sprawdzę sam.
6. **Ile zajmie** (~10-15 minut) i uspokojenie: „pracujemy tylko na wersji testowej, żywej strony
   nie ruszamy; jeśli coś nie zadziała, spokojnie, naprawimy to razem. Jak nie wiesz, gdzie coś
   znaleźć w panelu, wyślij mi zrzut ekranu, a ja Ci wskażę, w co kliknąć".
7. **Zakończ pytaniem**: „Gotowa? Zaczynamy.". Poczekaj na odpowiedź, potem wejdź do
   `strona-internetowa/tools/` i przejdź do Kroku 1. Obowiązuje „jeden krok naraz".

**Krok 1: Utwórz lokalne pliki konfiguracyjne z szablonów.**
W `strona-internetowa/tools/` uruchom:
```
cp dane-staging.example.txt dane-staging.txt
cp ftp-staging.example.txt   ftp-staging.txt
```
Potwierdź, że git je ignoruje (sekrety nie trafią do repo):
```
git check-ignore dane-staging.txt ftp-staging.txt
```
Oba nazwy powinny się wypisać = ✅ ignorowane. Wyjaśnij: „kopiujemy wzór; oryginał z hasłami
zostaje tylko na Twoim komputerze".

**Krok 2: Kanał TREŚCI (REST): hasło aplikacji ze stagingu.**
To daje edycję postów/stron/produktów. Poprowadź użytkownika dokładnie, krok po kroku (jak się
zgubi, poproś o zrzut ekranu i wskaż palcem):
1. Otwórz w przeglądarce adres stagingu z końcówką `/wp-admin` i zaloguj się (ten sam login, co do
   panelu WordPressa).
2. W menu **po lewej** najedź na **Użytkownicy** i wejdź w **Profil** (bywa „Twój profil").
3. Na stronie profilu **zjedź na sam dół** do sekcji **„Hasła aplikacji"** (ang. „Application Passwords").
4. W polu nazwy wpisz np. `claude-staging` i kliknij **„Dodaj nowe hasło aplikacji"**.
5. WordPress pokaże hasło **tylko raz** (wygląda jak `abcd EFGH 1234 wxyz`). Niech **skopiuje je od
   razu** i wklei Tobie w czat. Jeśli zamknie okno bez kopiowania, nic się nie stanie: powtórzcie
   punkty 4-5 i utwórzcie nowe.
Poproś jeszcze o **login administratora** stagingu (dokładnie taki, jakim się loguje; bywa z `@`).
Wpisz oba do `dane-staging.txt` (`WP_LOGIN`, `WP_HASLO_APLIKACJI`; `WP_URL` jest już ustawiony na `.../staging`; spacje w haśle są OK).
Przetestuj (bezpiecznie, tylko czyta):
```
python al_test_polaczenia.py dane-staging.txt
```
Sukces = `[1] HTTP 200`, `[2] Uwierzytelnienie: OK`, `[3] Prawa zapisu: OK` + liczby stron/wpisów/produktów.
Pochwal i wyjaśnij, co widać.

**Krok 3: Kanał WYGLĄDU (FTP): dane z panelu hostingu.**
To daje wgrywanie motywu (PHP/CSS). Dane FTP to te same, co logowanie do panelu hostingu
(DirectAdmin). **Nie zgaduj nazwy serwera**, poproś użytkownika, żeby ją odczytała z panelu:
1. Niech zaloguje się do panelu hostingu (DirectAdmin). Jak nie wie gdzie, poproś o zrzut ekranu
   maila powitalnego od hostingu albo strony logowania i naprowadź.
2. Poproś o **nazwę serwera** (format `srvXXXXX.nazwahostingu.pl`) i **login** (często ta sama
   nazwa serwera). Jak nie wie, gdzie to jest w panelu, poproś o zrzut ekranu, wskażesz.
3. **Hasło FTP** = hasło do konta hostingu. Jeśli go nie zna, w panelu jest zmiana hasła (całego
   konta albo w sekcji **„Konta FTP / FTP Management"**). Nie znajdzie? Zrzut ekranu panelu i
   naprowadź; w ostateczności *Resetuj hasło*, nowe przyjdzie mailem.
Uzupełnij `ftp-staging.txt`: `FTP_HOST` i `FTP_USER` (nazwa serwera / login z panelu), `FTP_PASS`
(hasło), a `FTP_PORT=21`, `FTP_TLS=1`, `REMOTE_THEME` zostaw bez zmian.
Przetestuj (tylko listuje, nic nie wgrywa):
```
python al_sync.py explore
```
Sukces = widać listing katalogu domowego i katalog motywu na stagingu. Pochwal.

**Krok 4: (Opcjonalnie) mała zmiana testowa na żywo.**
Za zgodą użytkownika zaproponuj drobny, odwracalny test wyglądu (np. delikatna korekta koloru w `style.css`
motywu lokalnego), wgraj samą tę zmianę i pokaż efekt:
```
python al_sync.py file style.css        # albo: css  /  push-all
```
Wyjaśnij: bezpiecznik skryptu wgrywa **tylko** ścieżki zawierające `staging`. Poproś o odświeżenie z pominięciem cache (`Ctrl/Cmd + Shift + R`).

**Krok 5: Podsumowanie i codzienny rytm.**
Pogratuluj. Wytłumacz, że od teraz wystarczy mówić naturalnie:
- „Zmień/dopisz treść na stronie X" → edytujesz przez REST,
- „Podmień kolor / logo / czcionkę / układ" → zmieniasz motyw i wgrywasz przez FTP,
- „Pokaż, co jest na stronie" → `python wp_inwentaryzacja.py` / `al_produkty.py dane-staging.txt`.
Złota zasada: **eksperymentujemy na stagingu; go-live robimy wspólnie, osobno.**

---

### 🆘 Gdy coś nie działa (ściąga dla Claude)

| Objaw | Reakcja |
|------|---------|
| `python` nie rozpoznany | Zainstaluj Pythona (Windows: `winget install Python.Python.3.13`), otwórz terminal od nowa. Skrypty używają tylko biblioteki standardowej, nic więcej nie trzeba. |
| REST `[2] HTTP 401/403` | Złe hasło aplikacji lub login. Wygeneruj hasło od nowa (Profil → Hasła aplikacji), sprawdź `WP_LOGIN`. Uwaga: login bywa z `@` na początku, więc użyj dokładnie takiego, jakim użytkownik się loguje. |
| REST `[1]` brak połączenia | Sprawdź `WP_URL` (czy to adres stagingu, `https`, bez literówek). |
| CPT `al_opinia` / `al_faq` → 404 | To normalne, te typy treści nie są wystawione w REST. Nie blokuje edycji stron/postów. Zgłoś jako drobiazg do włączenia (`show_in_rest`) tylko gdy będą potrzebne. |
| FTP nie łączy / zrywa | Hosting bywa przyblokowany po wielu próbach, ponów za moment. Sprawdź `FTP_HOST`/`FTP_USER`/hasło. |
| „Nie widać zmiany" po wgraniu | Cache. Odśwież `Ctrl/Cmd + Shift + R`; serwer też ma własną pamięć podręczną, daj chwilę. |
| Użytkownik się gubi | Zwolnij, wróć o krok, powtórz prościej. Nie idź dalej, dopóki krok nie działa. |

---

### 🔒 Pamiętaj o bezpieczeństwie
- **Hasła zostają lokalnie**, nigdy w repo (`dane-staging.txt`, `ftp-staging.txt` są w `.gitignore`; w repo tylko `*.example.txt`).
- **Hasło aplikacji jest odwoływalne:** wp-admin → Profil → Hasła aplikacji → *Cofnij*. Przy zmianie osoby/podejrzeniu wycieku: cofnij stare, wygeneruj nowe.
- **Nigdy** nie używaj w panelu „przenieś na żywo / synchronizuj do produkcji" z wtyczki kopii, bo nadpisałoby zamówienia i dane kursantek. Go-live = świadome, wspólne wgranie samych plików motywu.

---

*Pełna dokumentacja techniczna (dla nas, nie dla użytkownika):
`strona-internetowa/docs/08-podpiac-claude-do-wordpressa.md`.*
