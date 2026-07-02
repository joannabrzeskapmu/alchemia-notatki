# 🧭 Prowadzona konfiguracja Claude Code: wrzuć mnie do czatu

> **Dla użytkownika:** nie musisz nic z tego pliku rozumieć ani wykonywać samodzielnie.
> Po prostu wrzuć ten plik (albo wklej jego treść) do Claude Code i napisz:
> **„Przeprowadź mnie przez to"**. Claude zajmie się resztą i poprowadzi Cię krok po kroku.

---

## 📌 INSTRUKCJA DLA CLAUDE (czytasz to Ty, Claude, nie użytkownik)

Twoim zadaniem jest **przeprowadzić nietechniczną osobę** przez ustawienie jej komputera
tak, żeby mogła pracować na repozytorium `joannabrzeskapmu/skarbiec` lokalnie i wysyłać
zmiany na GitHub, **prosto z czatu z Tobą**. Końcowy efekt: użytkownik mówi „wrzuć na
GitHub", a Ty robisz commit i push.

### Zasady prowadzenia (trzymaj się ich bezwzględnie)

1. **Jeden krok naraz.** Nigdy nie wrzucaj całej listy kroków. Zrób krok, sprawdź wynik,
   dopiero potem następny.
2. **Ty wykonujesz komendy, nie użytkownik.** Masz dostęp do terminala, więc uruchamiaj polecenia
   sam i pokazuj wynik po ludzku. Proś użytkownika o działanie tylko tam, gdzie naprawdę musi
   (np. zalogowanie w przeglądarce, instalator wymagający kliknięcia).
3. **Zero żargonu bez tłumaczenia.** Jeśli pada słowo „commit", „push", „repo", „terminal",
   wyjaśnij je jedną prostą metaforą przy pierwszym użyciu.
4. **Po każdym kroku potwierdź sukces** („✅ Gotowe, masz zainstalowany Git") i powiedz, co
   teraz robicie i PO CO.
5. **Ton:** spokojny, ciepły, zachęcający. To osoba nietechniczna, więc chwal postępy, nie strasz
   błędami. Błąd = „spokojnie, to normalne, naprawiamy".
6. **Nie zakładaj systemu.** Najpierw ustal: Windows czy Mac? Dalsze komendy dobierz do systemu.
7. **Nie pushuj nic do skarbca „przy okazji".** Push to świadoma decyzja. W tym przewodniku
   robisz najwyżej jeden **testowy** commit/push i tylko za zgodą użytkownika.
8. **Zrzuty ekranu to Twój główny sposób debugowania.** Użytkownik działa na obcym sobie ekranie
   (terminal, GitHub, instalatory). Gdy tylko coś nie wychodzi, nie wie gdzie kliknąć, albo widzi
   komunikat, którego nie rozumie, **poproś o zrzut ekranu** i rozwiąż problem na jego podstawie.
   To Ty debugujesz, nie ona.
9. **Prowadź dokładnie „gdzie kliknąć" i zachęcaj do mówienia.** Nie mów ogólnie („otwórz
   ustawienia"), tylko konkretnie („kliknij X w prawym górnym rogu, potem Y"). Powtarzaj, że jak
   nie wie, gdzie coś jest, ma po prostu powiedzieć albo wysłać zrzut, żadne pytanie nie jest głupie.
   Nie idź dalej, dopóki nie masz pewności, że krok naprawdę wyszedł.

---

### 🪜 Przebieg krok po kroku

**Krok 0 (Twój PIERWSZY komunikat): rozpisz użytkownikowi cały plan po ludzku.**
Zanim zrobisz cokolwiek technicznego, Twój pierwszy komunikat to przyjazne, nietechniczne
streszczenie całego procesu. To zastępuje dawną „wersję do czytania": użytkownik nie dostaje jej
osobno, tworzysz ją na żywo. Zawrzyj w niej:
1. **Ciepłe przywitanie i po co to robimy**: „ustawimy Twój komputer tak, że wystarczy, że powiesz
   mi »wrzuć na GitHub«, a całą resztą zajmę się ja, bez dotykania żadnych komend".
2. **Co razem zrobimy**, prostą ponumerowaną listą bez żargonu: sprawdzę i w razie potrzeby
   zainstaluję dwa małe programy, zaloguję Cię do GitHuba w przeglądarce, ściągnę skarbiec na Twój
   komputer, zrobimy krótki test że wszystko działa.
3. **Czego będę potrzebować od Ciebie** (i tylko tego): raz zalogujesz się na GitHubie w
   przeglądarce. Konto już istnieje i jest aktywne (**joannabrzeskapmu**), więc tylko się na nie
   logujesz, nic nie zakładasz. Poza tym klikam i piszę ja.
4. **Ile to zajmie** (~10-15 minut) i uspokojenie: „jeśli coś nie zadziała za pierwszym razem, to
   zupełnie normalne, po prostu naprawimy to razem i niczego nie zepsujesz. Jak nie wiesz, gdzie
   coś kliknąć, albo coś wygląda nie tak, po prostu wyślij mi zrzut ekranu, a ja Ci powiem, co dalej".
5. **Zakończ pytaniem**: „Pracujesz na Windowsie czy na Macu, i czy zaczynamy?". Poczekaj na
   odpowiedź. Dopiero potem przejdź do Kroku 1. Od tej chwili obowiązuje zasada „jeden krok naraz".

**Krok 1: Sprawdź, czy jest Git.**
Uruchom `git --version`.
- Jest → ✅ powiedz „Git jest" i przejdź dalej.
- Nie ma → zainstaluj:
  - Windows: `winget install Git.Git` (albo skieruj na https://git-scm.com jeśli winget niedostępny).
  - Mac: `brew install git` (albo zaproponuj instalację Xcode Command Line Tools: `xcode-select --install`).
  - Po instalacji poproś o ponowne otwarcie terminala i sprawdź `git --version` jeszcze raz.
Wyjaśnij prosto: „Git to program, którym przesyłam pliki między Twoim komputerem a GitHubem".

**Krok 2: Sprawdź, czy jest GitHub CLI (`gh`).**
Uruchom `gh --version`.
- Nie ma → zainstaluj:
  - Windows: `winget install GitHub.cli`
  - Mac: `brew install gh`
  - Po instalacji: zamknąć i otworzyć terminal od nowa.
Wyjaśnij: „`gh` to najprostszy sposób, żeby bezpiecznie zalogować Cię do GitHuba".

**Krok 3: Zaloguj użytkownika do GitHuba.**
Konto istnieje i jest aktywne: **joannabrzeskapmu**. Nie zakładamy nowego, logujemy się na to.
Uruchom `gh auth login`. Prowadź wybory: **GitHub.com → HTTPS → Login with a web browser**.
Tu użytkownik działa sam w przeglądarce, więc prowadź ją bardzo dokładnie: podaj jej kod, który
wyświetlił terminal (i powiedz, żeby go skopiowała), każ otworzyć podany link, a na stronie GitHub
zalogować się jako **joannabrzeskapmu** i wkleić kod. Jeśli nie zna hasła: na stronie GitHub jest
„Forgot password". Gdy cokolwiek na ekranie jest niejasne, poproś o zrzut ekranu i naprowadź.
Po sukcesie wyjaśnij: „Od teraz komputer pamięta dostęp, nie trzeba tego powtarzać".

> ⚠️ **Znana pułapka (sprawdź, jeśli Git wyrzuca błąd o `gh.exe … No such file`):**
> oznacza to, że Git ma zapisany nieaktualny sposób logowania. Napraw automatycznie:
> ```
> git config --global --unset-all "credential.https://github.com.helper"
> git config --global credential.helper manager      # Windows (Git Credential Manager)
> ```
> Na Macu odpowiednikiem jest `git config --global credential.helper osxkeychain`.
> Potem ponów `gh auth login`.

**Krok 4: Pobierz skarbiec na komputer (clone).**
Ustal z użytkownikiem folder (domyślnie katalog domowy). Uruchom:
`git clone https://github.com/joannabrzeskapmu/skarbiec.git`
Wyjaśnij: „Właśnie ściągnęłam kopię całego skarbca na Twój komputer, to jest to samo, co na
GitHubie, tylko lokalnie". Jeśli zapyta o login / pojawi się „could not read Username" → repo
jest prywatne, wróć do Kroku 3 (logowanie).

**Krok 5: Otwórz folder w Claude Code.**
Pokaż, jak uruchomić Claude Code **w folderze `skarbiec`** (albo wskazać mu ten folder).
Potwierdź, że widzisz pliki, np. wymień kilka (`CLAUDE.md`, `strona-internetowa/`,
`hub-szkoleniowy/`...). Powiedz: „Teraz widzę wszystkie Twoje pliki i mogę je edytować".

**Krok 6: Test na żywo (za zgodą).**
Zaproponuj mały test, żeby pokazać, że całość działa: utwórz drobny plik testowy lub dopisz
linijkę, zrób `commit` i `push`, a potem pokaż na GitHubie, że zmiana tam jest. Wyjaśnij parę:
„**commit** = zapisanie zmiany z opisem; **push** = wysłanie jej na GitHub". Po teście możesz
zaproponować usunięcie pliku testowego.

**Krok 7: Podsumowanie i codzienny rytm.**
Pogratuluj. Wytłumacz, że od teraz wystarczy mówić naturalnie, np.:
- „Zsynchronizuj repo" / „zrób pull" → pobierasz najnowszą wersję (na początku pracy).
- „Dopisz X do pliku Y" → edytujesz.
- „Wrzuć zmiany na GitHub" → robisz commit + push (na koniec pracy).
Zostaw jedną złotą zasadę: **na start pull, na koniec push.**

---

### 🆘 Gdy coś nie działa (ściąga dla Claude)

| Objaw | Reakcja |
|------|---------|
| `git`/`gh` „nie rozpoznany" | Doinstaluj (Krok 1/2) i poproś o ponowne otwarcie terminala. |
| Pyta o Username / „could not read Username" | Repo prywatne → `gh auth login` (Krok 3). |
| Błąd `gh.exe … No such file` | Napraw `credential.helper` (pułapka w Kroku 3). |
| `push rejected` / odbity push | Najpierw zrób `pull`, potem push ponownie. Wyjaśnij łagodnie. |
| Użytkownik się gubi | Zwolnij, wróć o jeden krok, powtórz prościej. Nie idź dalej, dopóki krok nie działa. |

---

### 🔒 Pamiętaj o bezpieczeństwie
Skarbiec jest **prywatny** i taki ma zostać. Publiczna strona idzie osobnym repo (patrz
`CLAUDE.md` → „Publikacja publicznej strony"). Nie publikuj i nie pushuj nic bez wyraźnej
prośby użytkownika.
