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

Moduł 1 Sesji 1 nie jest nagraniem. Zamiast tego użytkownik pobiera gotową instrukcję i
wrzuca ją do Claude. Pliki linkowane ze strony przyciskami „⬇ Pobierz":

| Plik | Rola |
|------|------|
| `KONFIGURACJA-CLAUDE-CODE-prowadzona.md` | **Główny**: instrukcja „dla Claude" (wrzucasz do czatu, piszesz „przeprowadź mnie przez to", Claude prowadzi krok po kroku). |
| `KONFIGURACJA-CLAUDE-CODE.md` | Wersja „do czytania" tego samego procesu (dla kogoś, kto woli przejść sam). |

> Oba pliki to kopie tych z korzenia skarbca, trzymane też tutaj, żeby działały jako
> pobieranie ze strony (ścieżki względne). Gdy zmienisz oryginał w korzeniu, zaktualizuj kopie.

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
