// GOLDEN LADLE RUSH — the entrypoint for make.fun best-cooking-game-20261125-0137.
// Node 22, standard library only. It copies game/ and screenshots/
// from beside this file to /output and writes /output/dossier.json,
// the summary the judge reads, with the vendored make.fun library.
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-game.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's own caps: refuse to write an entry the gate would
// refuse, instead of handing in something invalid. These mirror the
// competition gate (993 files / 48 MiB for game/, 256 KiB per
// screenshot, 1 MiB for game/index.html), so a local failure is
// caught here rather than at judging time.
function fail(message) {
  throw new Error('GOLDEN LADLE RUSH entry refused: ' + message);
}

function countGameEntries(dir) {
  let count = 0;
  let bytes = 0;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const st = statSync(path);
    count++;
    if (st.isDirectory()) {
      const sub = countGameEntries(path);
      count += sub.count;
      bytes += sub.bytes;
    } else {
      bytes += st.size;
    }
  }
  return { count, bytes };
}

const shotsDir = join(here, 'screenshots');
if (existsSync(shotsDir)) {
  const shots = readdirSync(shotsDir).filter((n) => !n.startsWith('.'));
  if (shots.length < 3 || shots.length > 4) fail('need 3 or 4 screenshots, found ' + shots.length);
  for (const name of shots) {
    const size = statSync(join(shotsDir, name)).size;
    if (size > 262144) fail('screenshot ' + name + ' is ' + size + ' bytes, over the 256 KiB cap');
  }
}
const gameStats = countGameEntries(join(here, 'game'));
if (gameStats.count > 993) fail('game/ holds ' + gameStats.count + ' entries, over the 993 cap');
if (gameStats.bytes > 50331648) fail('game/ is ' + gameStats.bytes + ' bytes, over the 48 MiB cap');
const indexSize = statSync(join(here, 'game', 'index.html')).size;
if (indexSize > 1048576) fail('game/index.html is ' + indexSize + ' bytes, over the 1 MiB cap');

mkdirSync(out, { recursive: true });
cpSync(join(here, 'game'), join(out, 'game'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    game_max_files: 993,
    game_max_bytes: 50331648,
    game_path_max_bytes: 1000,
  }),
);
