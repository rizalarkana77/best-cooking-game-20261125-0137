# Golden Ladle Rush 🍳

[![best-cooking-game-20261125-0137](https://make.fun/badge/best-cooking-game-20261125-0137.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137)
[![rank](https://make.fun/badge/rizalarkana77/best-cooking-game-20261125-0137/rank.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137)
[![reward](https://make.fun/badge/rizalarkana77/best-cooking-game-20261125-0137/reward.svg)](https://make.fun/bounty/best-cooking-game-20261125-0137)

A complete, original timed order cooking game that runs in a desktop browser
from static files — no network requests, no build step, mouse + keyboard.

## The game

**Golden Ladle Rush** — the lunch rush is on! Orders fly in on the board and
you have one 2:30 shift to serve as many dishes as you can before each
customer's patience runs out.

- **Order board** — up to 3 tickets at once, each with its recipe, point value
  and a patience bar that drains in real time. An expired order walks out
  (−15 points).
- **Cook** — raw patty and egg go into one of 2 stove pans. Click when golden
  to plate them; leave them too long and they burn (−5 to toss).
- **Chop** — lettuce and tomato go to the chopping board. Two clicks to chop,
  then click again to plate.
- **Assemble** — bun and cheese go straight on the plate. Build the exact
  recipe, then hit **SERVE** (or `Space`). A wrong dish costs 25 points; a
  perfect match earns the dish value plus a patience bonus.
- **Combo** — consecutive perfect serves multiply your score up to ×2.
- **Shift timer** — 150 seconds. When it hits zero, your final score, dishes
  served, best combo and accuracy are tallied on the results screen.

Four recipes to master: **Sunny Stack** (90), **Garden Melt** (120),
**Ember Burger** (140) and **Sunrise Special** (130).

## How to play

| Action | Mouse | Keyboard |
| --- | --- | --- |
| Add an ingredient | Click a counter bin | `1`–`6` |
| Plate a cooked / chopped item | Click the glowing pan / board | — |
| Remove one plate ingredient | Click it on the plate | — |
| Serve the dish | Click **SERVE DISH** | `Space` |
| Clear the plate | — | `T` |
| Restart the shift | ↻ Restart button | `R` |
| Mute sounds | 🔊 button | `M` |

Sounds are synthesized live with WebAudio — no audio files, no network.

## Run it

```sh
# play in a browser (any static server, or just open the file)
node serve.ts            # serves game/ on http://localhost:8080
# or
python3 -m http.server   # from game/
```

Then open `game/index.html`. The game is a single self-contained HTML file:
all art is CSS + text glyphs, all sound is synthesized, and it makes zero
network requests.

## Build the entry

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, stdlib only) copies `game/` and `screenshots/` to the
output directory and writes `dossier.json` with the vendored make.fun
library (`vendor/makefun-game.ts`, copied unchanged from the kit). Running it
twice produces byte-identical output.

## Screenshots

Real renders of the game's own code in headless Chromium (1280×720):

1. `1-title.jpg` — title screen and how to play
2. `2-mid.jpg` — mid-shift: three orders on the board, egg in the pan,
   tomato on the board, Ember Burger mid-assembly on the plate
3. `3-serve.jpg` — a completed Sunny Stack matching its ticket, ready to serve
4. `4-end.jpg` — shift-over results: 865 points, 8 dishes, best combo ×4

## Originality

Golden Ladle Rush is an original game: its own name, rules, recipes, art and
sounds. It is not a copy of any commercial cooking game.
