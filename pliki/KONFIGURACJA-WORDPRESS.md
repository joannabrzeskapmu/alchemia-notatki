# Jak podpiąć Claude do WordPressa (edycja treści i wyglądu z czatu)

Ten plik tłumaczy **krok po kroku**, jak połączyć Claude z Twoją stroną WordPress na
**wersji testowej (staging)**, żeby dało się z czatu:
- **czytać i edytować treści**: posty, strony, produkty (przez REST API),
- **wgrywać zmiany wyglądu**: logo, kolory, czcionki, układ (przez FTP).

> **Po co to:** raz to ustawiasz, a potem mówisz w czacie „zmień nagłówek", „podmień kolor",
> „dopisz sekcję", a Claude robi to bezpośrednio na stronie testowej. Bez ręcznego klikania w panelu.
>
> **Zanim zaczniesz:** Claude musi być już połączony z GitHubem, a skarbiec pobrany na komputer
> (patrz `KONFIGURACJA-CLAUDE-CODE.md`). Potrzebny też **Python 3**. Skrypty używają tylko jego
> standardowych bibliotek, nic nie instalujesz dodatkowo.

---

## 🧩 Jak to działa w skrócie

Do strony prowadzą **dwie osobne „bramki"**, każda do czego innego:

| Bramka | Do czego służy | Plik z danymi |
|--------|----------------|---------------|
| **REST API** | treści: posty, strony, produkty | `tools/dane-staging.txt` |
| **FTP** | wygląd: motyw (PHP/CSS), logo, kolory | `tools/ftp-staging.txt` |

Wszystkie narzędzia są w skarbcu, w folderze **`strona-internetowa/tools/`**. Claude uruchamia
je sam, a Ty tylko dostarczasz **dane dostępowe z paneli** (bo tylko Ty masz do nich login).

```
Panel WP  ──hasło aplikacji──►  REST  ──►  treści (posty, strony, produkty)
Panel hostingu  ──hasło FTP──►  FTP   ──►  wygląd (motyw: kolory, czcionki, układ)
```

---

## ✅ Co musisz mieć (jednorazowo)

1. **Skarbiec na komputerze** (z instrukcji GitHub) + **Python 3** (`python --version`).
2. **Dostęp administratora do wp-admin** stagingu (`…/staging/wp-admin`).
3. **Dostęp do panelu hostingu** (do zdobycia/zresetowania hasła FTP).

---

## 🗂️ Krok 1: Pliki konfiguracyjne z szablonów

W folderze `strona-internetowa/tools/` kopiujemy wzory (oryginały bez `.example` są w `.gitignore`):

```bash
cp dane-staging.example.txt dane-staging.txt
cp ftp-staging.example.txt   ftp-staging.txt
```

Możesz sprawdzić, że git ich nie widzi: `git check-ignore dane-staging.txt ftp-staging.txt`.
Jeśli wypisze obie nazwy, hasła na pewno nie trafią do repo.

---

## 📝 Krok 2: Treści (REST), hasło aplikacji ze stagingu

1. Wejdź na **`…/staging/wp-admin`** → **Użytkownicy → Profil**.
2. Zjedź do **„Hasła aplikacji"**, wpisz nazwę (np. `claude-staging`) → **Dodaj**.
3. WordPress pokaże hasło **tylko raz** (np. `abcd EFGH 1234 wxyz`), więc **skopiuj je od razu**.
4. Otwórz `tools/dane-staging.txt` i uzupełnij:
   - `WP_URL`: jest już ustawiony na adres stagingu,
   - `WP_LOGIN`: Twój login administratora (użyj dokładnie takiego, jakim się logujesz),
   - `WP_HASLO_APLIKACJI`: hasło z punktu 3 (spacje w środku są OK).
5. Test (bezpieczny, tylko czyta, nic nie zmienia):
   ```bash
   python al_test_polaczenia.py dane-staging.txt
   ```
   Sukces = `HTTP 200`, `Uwierzytelnienie: OK`, `Prawa zapisu: OK` i liczby stron/wpisów/produktów.

> **Hasło aplikacji ≠ hasło do logowania.** To osobne, odwoływalne hasło tylko dla programu.
> Cofniesz je w każdej chwili: Profil → Hasła aplikacji → *Cofnij*.

---

## 🎨 Krok 3: Wygląd (FTP), hasło z panelu hostingu

1. Zdobądź **hasło FTP** (to samo co do DirectAdmin/panelu). Nie znasz? W panelu hostingu:
   serwer → *Resetuj hasło* → nowe przyjdzie mailem.
2. Otwórz `tools/ftp-staging.txt` i uzupełnij:
   - `FTP_HOST` i `FTP_USER`: zwykle nazwa serwera (np. `srvXXXXX.seohost.com.pl` / `srvXXXXX`),
   - `FTP_PASS`: hasło z punktu 1,
   - `FTP_PORT=21`, `FTP_TLS=1`, `REMOTE_THEME`: zostaw bez zmian.
3. Test (tylko listuje pliki, niczego nie wgrywa):
   ```bash
   python al_sync.py explore
   ```
   Sukces = widać listing katalogów serwera i katalog motywu na stagingu.

---

## 🚀 Krok 4: Codzienna praca (to, co naprawdę robisz)

Nie musisz pamiętać komend. Mówisz w czacie naturalnie:

- *„Dopisz sekcję o cenniku na stronie zabiegi."* → Claude edytuje treść przez REST.
- *„Podmień kolor akcentu na cieplejszy i zmień czcionkę nagłówków."* → Claude zmienia motyw…
- *…i wgrywa to na stronę:* `python al_sync.py css` (same style) / `file <plik>` / `push-all` (cały motyw).
- *„Pokaż, co jest na stronie."* → `python wp_inwentaryzacja.py`, `python al_produkty.py dane-staging.txt`.

Nie widać zmiany? To zwykle **cache**: odśwież `Ctrl/Cmd + Shift + R` i daj serwerowi chwilę.

---

## 🆘 Szybka ściąga (gdyby coś nie działało)

| Problem | Co zrobić |
|--------|-----------|
| `python` nie rozpoznawany | Zainstaluj Pythona (`winget install Python.Python.3.13`), otwórz terminal od nowa |
| REST: `HTTP 401/403` | Złe hasło aplikacji lub login, wygeneruj hasło od nowa, sprawdź `WP_LOGIN` (bywa z `@`) |
| REST: brak połączenia | Sprawdź `WP_URL` (adres stagingu, `https`, bez literówek) |
| `al_opinia`/`al_faq` → 404 | Normalne: te typy nie są w REST; nie blokuje edycji stron/postów |
| FTP nie łączy / zrywa | Hosting przyblokowany po wielu próbach, ponów za chwilę; sprawdź host/login/hasło |
| „Nie widać zmiany" | Cache: `Ctrl/Cmd + Shift + R`; serwer też ma własną pamięć podręczną |

---

## 🔒 Zasady bezpieczeństwa

- **Hasła zostają na Twoim komputerze**, nigdy w repo. W skarbcu są tylko wzory `*.example.txt`.
- **Hasło aplikacji jest odwoływalne** (Profil → Hasła aplikacji → Cofnij); hasło FTP resetujesz w panelu hostingu.
- **Wgrywanie działa tylko na staging**: skrypt ma bezpiecznik na ścieżkę `staging`. Żywą stronę
  (go-live) ruszamy świadomie i wspólnie, **nigdy** przez opcję „synchronizuj do produkcji"
  z wtyczki kopii (nadpisałoby zamówienia i dane kursantek).
