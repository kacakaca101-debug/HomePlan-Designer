# HomePlan Designer

Webová aplikace pro návrh rodinného domu: půdorys, střecha se střešními okny a solárními panely, exteriér, 3D prohlídka, rozpočet a harmonogram stavby.

Jde o samostatnou verzi bez vazby na Claude. Je to instalovatelná webová aplikace (PWA) a po prvním otevření funguje i bez internetu.

## Zveřejnění na GitHub Pages

1. Na GitHubu založte nový repozitář, třeba `homeplan`. Může být veřejný.
2. V repozitáři zvolte **Add file → Upload files**. Přetáhněte tam **obsah** této složky, tedy `index.html`, `sw.js`, `manifest.webmanifest` a složky `icons`, `fonts`, `vendor` a `screenshots`. Pak potvrďte **Commit changes**.
3. Otevřete **Settings → Pages**. U **Source** nastavte **Deploy from a branch**, vyberte větev `main` a složku `/ (root)` a uložte.
4. Za minutu nebo dvě poběží aplikace na adrese `https://<váš-účet>.github.io/<repozitář>/`.

## Instalace jako aplikace

- **Počítač (Chrome, Edge):** v adresním řádku klikněte na ikonu instalace, případně v menu zvolte **Instalovat HomePlan Designer**.
- **Android (Chrome):** v menu ⋮ zvolte **Přidat na plochu** nebo **Instalovat aplikaci**.
- **iPhone a iPad (Safari):** klepněte na **Sdílet** a pak na **Přidat na plochu**.

## Kde jsou uložená data

Projekty a jejich verze se ukládají do úložiště prohlížeče (local storage) v tom zařízení, kde s aplikací pracujete. Na server se nic neposílá. Každý, kdo aplikaci používá, má vlastní projekty.

- Projekty se mezi zařízeními samy nepřenášejí. K přenosu i k záloze slouží **Projekty a verze → Zálohovat všechny projekty** (vznikne jeden soubor JSON) a **Obnovit ze zálohy…**.
- Když v prohlížeči vymažete data webu, projekty zmizí. Zálohujte proto pravidelně.
- Jednotlivý projekt jde vyexportovat i načíst přes **Export JSON** a **Import JSON**.

## Aktualizace aplikace

Nahrajte do repozitáře nový `index.html` a v souboru `sw.js` zvyšte číslo v řádku `const VERSION = "homeplan-v…"`. Uživatelům se nová verze načte při dalším spuštění s internetem.

## Licence použitých knihoven

- three.js r170 (3D zobrazení): licence MIT, viz `vendor/three/LICENSE`.
- Písmo IBM Plex Sans a IBM Plex Mono: licence SIL Open Font License 1.1, viz `fonts/LICENSE-IBM-Plex.txt`.
- Aplikace obsahuje knihovnu React (licence MIT, upozornění je přímo v `index.html`).
