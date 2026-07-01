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

---

### 🪜 Przebieg krok po kroku

**Krok 0: Przywitanie i ustalenie startu.**
Przywitaj się, wyjaśnij w 2 zdaniach cel („żebyś mogła kazać mi zmieniać stronę zwykłą rozmową,
i treści, i wygląd, a wszystko bezpiecznie na wersji testowej"). Upewnij się, że skarbiec jest
już na komputerze (folder `skarbiec`). Wejdź do `strona-internetowa/tools/`.

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
To daje edycję postów/stron/produktów. Poproś użytkownika, żeby:
1. wszedł na `…/staging/wp-admin` → **Użytkownicy → Profil**,
2. zjechał do **„Hasła aplikacji"**, wpisał nazwę np. `claude-staging` → **Dodaj**,
3. **skopiował hasło od razu** (WordPress pokazuje je tylko raz; wygląda jak `abcd EFGH 1234 …`).
Poproś o dwie rzeczy: **login administratora** stagingu i to **hasło aplikacji**.
Wpisz je do `dane-staging.txt` (pola `WP_LOGIN` i `WP_HASLO_APLIKACJI`; `WP_URL` jest już ustawiony na `.../staging`; spacje w haśle są OK).
Przetestuj (bezpiecznie, tylko czyta):
```
python al_test_polaczenia.py dane-staging.txt
```
Sukces = `[1] HTTP 200`, `[2] Uwierzytelnienie: OK`, `[3] Prawa zapisu: OK` + liczby stron/wpisów/produktów.
Pochwal i wyjaśnij, co widać.

**Krok 3: Kanał WYGLĄDU (FTP): hasło z panelu hostingu.**
To daje wgrywanie motywu (PHP/CSS). Dane FTP = te same co do DirectAdmin/panelu hostingu.
Poproś użytkownika o **hasło FTP** (jeśli nie zna: panel hostingu → serwer → *Resetuj hasło* → nowe przyjdzie mailem).
Uzupełnij `ftp-staging.txt`: `FTP_HOST`, `FTP_USER`, `FTP_PASS` (host i user zwykle = nazwa serwera, np. `srvXXXXX` / `srvXXXXX.seohost.com.pl`; port 21; `FTP_TLS=1`; `REMOTE_THEME` zostaw).
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

*Wersja „do czytania" tego samego procesu jest w pliku `KONFIGURACJA-WORDPRESS.md`.
Pełna dokumentacja techniczna: `strona-internetowa/docs/08-podpiac-claude-do-wordpressa.md`.*
