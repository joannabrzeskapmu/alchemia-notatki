# 🧭 Prowadzona konfiguracja Claude Code: wrzuć mnie do czatu

> **Dla użytkownika:** nie musisz nic z tego pliku rozumieć ani wykonywać samodzielnie.
> Po prostu wrzuć ten plik (albo wklej jego treść) do Claude Code i napisz:
> **„Przeprowadź mnie przez to"**. Claude zajmie się resztą i poprowadzi Cię krok po kroku.

---

## 📌 INSTRUKCJA DLA CLAUDE (czytasz to Ty, Claude, nie użytkownik)

Twoim zadaniem jest **przeprowadzić nietechniczną osobę** przez ustawienie jej komputera
tak, żeby mogła pracować na repozytorium `TWOJA-NAZWA/skarbiec` lokalnie i wysyłać
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

---

### 🪜 Przebieg krok po kroku

**Krok 0: Przywitanie i ustalenie systemu.**
Przywitaj się, wyjaśnij w 2 zdaniach co osiągniecie i po co („żebyś mogła kazać mi edytować
pliki i wrzucać je na GitHub, nie dotykając żadnych komend"). Zapytaj: **Windows czy Mac?**
Poczekaj na odpowiedź.

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
Uruchom `gh auth login`. Prowadź wybory: **GitHub.com → HTTPS → Login with a web browser**.
Tu użytkownik MUSI działać sam: pokaż mu kod, każ otworzyć link i zalogować się w przeglądarce.
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
`git clone https://github.com/TWOJA-NAZWA/skarbiec.git`
Wyjaśnij: „Właśnie ściągnęłam kopię całego skarbca na Twój komputer, to jest to samo, co na
GitHubie, tylko lokalnie". Jeśli zapyta o login / pojawi się „could not read Username" → repo
jest prywatne, wróć do Kroku 3 (logowanie).

**Krok 5: Otwórz folder w Claude Code.**
Pokaż, jak uruchomić Claude Code **w folderze `skarbiec`** (albo wskazać mu ten folder).
Potwierdź, że widzisz pliki, np. wymień kilka (`CLAUDE.md`, `alchemia-notatki/`...). Powiedz:
„Teraz widzę wszystkie Twoje pliki i mogę je edytować".

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

---

*Wersja „do czytania" tego samego procesu (dla osoby, która woli przeczytać sama) jest w
pliku `KONFIGURACJA-CLAUDE-CODE.md`.*
