# Jak podpiąć Claude Code do tego repo (edycja i push z czatu)

Ten plik tłumaczy **krok po kroku**, jak ustawić komputer tak, żeby Claude Code mógł
pracować na tym skarbcu **lokalnie**, czyli czytać pliki, edytować je i **wysyłać zmiany
na GitHub (push)** bez wychodzenia z czatu.

> **Po co to:** raz to ustawiasz, a potem po prostu mówisz w czacie „dopisz to i wrzuć na
> GitHub", a Claude sam zrobi commit i push. Nie musisz dotykać żadnych komend ani
> wchodzić ręcznie na stronę GitHuba.

---

## 🧩 Jak to działa w skrócie

Są **dwa miejsca** z tymi samymi plikami:

- **GitHub** (w chmurze): `github.com/TWOJA-NAZWA/skarbiec`. Tu mieszka „oficjalna" wersja.
- **Twój komputer** (lokalnie): kopia repo w folderze na dysku. Tu pracuje Claude.

Praca wygląda tak: GitHub → *clone* (pobranie kopii) → Claude edytuje lokalnie →
*commit* (zapis zmiany) → *push* (wysłanie zmian z powrotem na GitHub).

```
GitHub  ──clone──►  Twój komputer  ──(Claude edytuje)──►  commit  ──push──►  GitHub
```

---

## ✅ Co musisz mieć (jednorazowo)

1. **Git**: program, którym Claude robi clone / commit / push.
   Sprawdź w terminalu: `git --version`. Jak nie ma → zainstaluj z https://git-scm.com.
2. **GitHub CLI (`gh`)**: najprostszy sposób na zalogowanie się do GitHuba.
   Instalacja na Windows (w PowerShell): `winget install GitHub.cli`
   *(po instalacji zamknij i otwórz terminal od nowa, żeby `gh` był widoczny).*
3. **Dostęp do repo**: Twoje konto GitHub musi mieć dostęp do `TWOJA-NAZWA/skarbiec`
   (to repo jest **prywatne**, więc bez zalogowania nic nie pobierzesz).

---

## 🔑 Krok 1: Zaloguj się do GitHuba (raz)

W terminalu:

```powershell
gh auth login
```

Wybierz: **GitHub.com** → **HTTPS** → **zaloguj przez przeglądarkę**. Po zalogowaniu Git
zapamięta dostęp na stałe (w Menedżerze poświadczeń Windows), nie będziesz tego robić
za każdym razem.

> **Ważne, pułapka, która już raz wystąpiła:** jeśli `git` przy próbie pobrania repo
> wyrzuca błąd typu *„'…\GitHub CLI\gh.exe' … No such file or directory"*, to znaczy, że
> Git ma zapisany **nieaktualny sposób logowania** (wskazuje na program, którego już nie ma).
> Naprawa: ustaw poprawny menedżer haseł Windowsa:
>
> ```powershell
> git config --global --unset-all "credential.https://github.com.helper"
> git config --global credential.helper manager
> ```
>
> Potem ponów `gh auth login`.

---

## 📥 Krok 2: Pobierz repo na komputer (clone)

Wybierz folder, w którym ma leżeć kopia (np. `C:\Users\TwojaNazwa`), i w terminalu:

```powershell
git clone https://github.com/TWOJA-NAZWA/skarbiec.git
```

Powstanie folder `skarbiec\` z wszystkimi plikami. **To wystarczy zrobić raz.**

---

## 💬 Krok 3: Otwórz folder w Claude Code

Uruchom Claude Code **w folderze repo** (albo wskaż mu ten folder). Od tej chwili Claude:

- widzi i czyta wszystkie pliki skarbca,
- może je edytować i tworzyć nowe,
- może robić commit i push prosto na GitHub.

Claude na starcie sam przeczyta `CLAUDE.md` w roocie, czyli zna już zasady i kontekst projektu.

---

## 🚀 Krok 4: Codzienna praca (to, co naprawdę robisz)

Już nic nie musisz pamiętać z komend. Po prostu mów w czacie naturalnie, np.:

- *„Dopisz do README sekcję o cenniku."*
- *„Zmień nagłówek na stronie sesji 2 i zapisz."*
- *„Wrzuć te zmiany na GitHub."* → Claude zrobi `commit` + `push`.
- *„Pobierz najnowszą wersję z GitHuba."* → Claude zrobi `pull` (przyda się, gdy ktoś inny
  coś zmienił).

Dobry nawyk: na początku sesji poproś **„zsynchronizuj repo / zrób pull"**, a na końcu
**„wrzuć zmiany na GitHub"**. Dzięki temu kopia na komputerze i na GitHubie zawsze się zgadzają.

---

## 🆘 Szybka ściąga (gdyby coś nie działało)

| Problem | Co zrobić |
|--------|-----------|
| `git` nie rozpoznawany | Zainstaluj Git: https://git-scm.com, otwórz terminal od nowa |
| `gh` nie rozpoznawany | `winget install GitHub.cli`, potem zamknij i otwórz terminal |
| Pyta o login / „could not read Username" | `gh auth login` (repo jest prywatne, trzeba być zalogowanym) |
| Błąd o `gh.exe … No such file` | Patrz pułapka w **Kroku 1** (napraw `credential.helper`) |
| „push rejected" / push odbity | Najpierw `pull` (poproś Claude o pobranie zmian), potem push ponownie |

---

## 🔒 Zasada bezpieczeństwa

To repo jest **prywatne** i takie ma zostać (mogą tu trafiać dane wewnętrzne i klientek).
Publiczna strona idzie przez osobne publiczne repo, szczegóły w `CLAUDE.md` (sekcja
„Publikacja publicznej strony"). **Push do skarbca to świadoma decyzja.** Claude wrzuca
zmiany na GitHub, gdy go o to poprosisz, a nie sam z siebie.
