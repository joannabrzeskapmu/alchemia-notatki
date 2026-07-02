# hub-szkoleniowy

Rozbudowany, **wielostronicowy hub szkoleniowy**, pisany „dla klienta": każde pojęcie
wyjaśnione na miejscu, uporządkowane moduły i osobny słowniczek. Treść nawiązuje 1:1 do
nagrań (każdy moduł = jeden filmik), z **placeholderami na wideo** do podmiany po nagraniu.

> To bogatsza, samodzielna wersja notatek ze szkoleń. Folder `alchemia-notatki/` w skarbcu
> pozostaje źródłem **publicznej** strony na GitHub Pages. Ten hub jest niezależny i ma
> własną strukturę (patrz niżej).

## Struktura

| Plik / folder | Co to |
|------|-------|
| `index.html` | Hub: punkt startowy, kafle do sesji, produktu i słowniczka |
| `sesja-1.html` | **Sesja 1: Claude, GitHub i skarbiec wiedzy** (7 modułów; Moduł 1 = podpięcie Claude do GitHuba, **bez wideo**, 3 kroki z instrukcją do pobrania) |
| `sesja-2.html` | **Sesja 2: Strona internetowa przez Claude** (6 modułów; Moduł 1 = bezpośrednie połączenie z WordPressem) |
| `system-contentu.html` | Produkt: „maszynka do contentu": brand voice, filary, szablony, skille, zasady |
| `slowniczek.html` | Słowniczek ~40 pojęć (alfabetycznie, z linkami między hasłami) |
| `styles.css` | Wspólny arkusz stylów (Fraunces + Inter, paleta szampańsko-złota, `.reveal`) |
| `app.js` | Drobne wzmocnienia UX (reveal przy scrollu, aktywny link w nawigacji) |
| `pliki/` | Materiały do pobrania ze strony (patrz niżej) |

## Pliki do pobrania (`pliki/`)

Moduł 1 Sesji 1 (GitHub) i Moduł 1 Sesji 2 (WordPress) nie są nagraniami. Zamiast tego
użytkownik pobiera gotową instrukcję i wrzuca ją do Claude, pisząc „przeprowadź mnie przez to".
Pliki linkowane ze strony przyciskami „⬇ Pobierz":

| Plik | Rola |
|------|------|
| `KONFIGURACJA-CLAUDE-CODE-prowadzona.md` | Sesja 1: podłączenie Claude do GitHuba. Instrukcja „dla Claude", który prowadzi użytkownika krok po kroku. Jej pierwszy komunikat to rozpisanie całego planu po ludzku. |
| `KONFIGURACJA-WORDPRESS-prowadzona.md` | Sesja 2: podłączenie Claude do WordPressa (REST + FTP). Analogicznie: Claude prowadzi, zaczyna od rozpisania planu. |

> Zrezygnowaliśmy z osobnych „wersji do czytania": nikt ich realnie nie czytał, a ich rolę
> przejął pierwszy komunikat Claude'a (rozpisuje cały proces zanim zacznie). Plik GitHub ma też
> kopię w korzeniu skarbca (`KONFIGURACJA-CLAUDE-CODE-prowadzona.md`) trzymaną w synchronizacji;
> plik WordPress żyje tylko tutaj. Zmieniasz jeden, zaktualizuj drugi.

## Konwencja

Zgodny z językiem wizualnym skarbca (paleta szampańsko-złota, Fraunces + Inter, animacje
`.reveal`, pływający nav); patrz `../CLAUDE.md` → „Konwencja designu HTML".

## Podgląd lokalny

Statyczne pliki: wystarczy dowolny serwer HTTP, np.:

```
python -m http.server 5281 --directory hub-szkoleniowy
```

a potem `http://localhost:5281`.

## Do zrobienia

- [ ] Podmienić placeholdery `.video` na osadzone nagrania w pozostałych modułach (Moduł 1 Sesji 1 już bez wideo).
