/**
 * Industries – Local Packing ("Parking Lot") + FLIP
 * Fixed init timing: runs after includes injection + DOM ready.
 */

(() => {
  function initIndustriesParking() {
    const grid = document.querySelector('[data-ind-grid="true"]');
    if (!grid) return;

    // prevent double init
    if (grid.dataset.indInit === "1") return;
    grid.dataset.indInit = "1";

    const tiles = Array.from(grid.querySelectorAll(".ind-tile[data-industry]"));
    if (tiles.length !== 8) return;

    const BOARD_W = 12;
    const BOARD_H = 6;

    const INTERVAL_MS = 5200;
    const USER_PAUSE_MS = 12000;

    let activeE = 1;
    let timer = null;
    let userPausedUntil = 0;
    let hoverPaused = false;

    const idToTile = new Map(tiles.map((t) => [Number(t.dataset.industry), t]));

    // ---------- roles (1E + 5M + 2S) ----------
    function buildRoles(eId) {
      const ids = [1, 2, 3, 4, 5, 6, 7, 8].filter((x) => x !== eId);
      return {
        E: eId,
        M: ids.slice(0, 5), // M1..M5
        S: ids.slice(5, 7), // S1..S2
      };
    }

    // ---------- sizes ----------
    const SIZE = {
      E: { w: 6, h: 4 },
      M: { w: 4, h: 2 },
      S: { w: 2, h: 2 },
    };

    // ---------- packing helpers ----------
    function makeBoard() {
      const grid = Array.from({ length: BOARD_H }, () =>
        Array.from({ length: BOARD_W }, () => 0)
      );
      return grid;
    }

    function canPlace(board, x, y, w, h) {
      if (x < 0 || y < 0 || x + w > BOARD_W || y + h > BOARD_H) return false;
      for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
          if (board[yy][xx]) return false;
        }
      }
      return true;
    }

    function place(board, x, y, w, h, val) {
      for (let yy = y; yy < y + h; yy++) {
        for (let xx = x; xx < x + w; xx++) {
          board[yy][xx] = val;
        }
      }
    }

    function firstFit(board, w, h) {
      for (let y = 0; y < BOARD_H; y++) {
        for (let x = 0; x < BOARD_W; x++) {
          if (canPlace(board, x, y, w, h)) return { x, y };
        }
      }
      return null;
    }

    function pack(roles) {
      const board = makeBoard();
      const positions = new Map(); // industryId -> {x,y,w,h,slot}

      // Pack order: E first, then Ms, then Ss
      const items = [
        { id: roles.E, slot: "E", ...SIZE.E },
        ...roles.M.map((id, i) => ({ id, slot: `M${i + 1}`, ...SIZE.M })),
        ...roles.S.map((id, i) => ({ id, slot: `S${i + 1}`, ...SIZE.S })),
      ];

      for (const it of items) {
        const pos = firstFit(board, it.w, it.h);
        if (!pos) return null;
        place(board, pos.x, pos.y, it.w, it.h, it.id);
        positions.set(it.id, { ...pos, w: it.w, h: it.h, slot: it.slot });
      }

      return positions;
    }

    // ---------- FLIP apply ----------
    function captureRects() {
      const map = new Map();
      tiles.forEach((tile) => map.set(tile, tile.getBoundingClientRect()));
      return map;
    }

    function applyLayout(roles) {
      const packed = pack(roles);
      if (!packed) return;

      const first = captureRects();

      // assign positions + slot + expanded state
      packed.forEach((p, id) => {
        const tile = idToTile.get(id);
        if (!tile) return;

        tile.dataset.slot = p.slot;

        tile.style.gridColumnStart = String(p.x + 1);
        tile.style.gridColumnEnd = String(p.x + 1 + p.w);
        tile.style.gridRowStart = String(p.y + 1);
        tile.style.gridRowEnd = String(p.y + 1 + p.h);

        const btn = tile.querySelector(".ind-card");
        const isE = p.slot === "E";

        if (btn) btn.setAttribute("aria-expanded", String(isE));

        const compact = tile.querySelector(".ind-compact");
        const elab = tile.querySelector(".ind-elab");

        if (compact) compact.setAttribute("aria-hidden", String(isE));
        if (elab) elab.setAttribute("aria-hidden", String(!isE));
      });

      const last = captureRects();

      tiles.forEach((tile) => {
        const a = first.get(tile);
        const b = last.get(tile);
        if (!a || !b) return;

        const dx = a.left - b.left;
        const dy = a.top - b.top;
        const sx = a.width / b.width;
        const sy = a.height / b.height;

        tile.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(${sx}, ${sy})` },
            { transform: "translate(0,0) scale(1,1)" },
          ],
          { duration: 520, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }
        );
      });
    }

    // ---------- auto loop ----------
    function startAuto() {
      stopAuto();
      timer = window.setInterval(() => {
        if (hoverPaused) return;
        if (Date.now() < userPausedUntil) return;
        const next = activeE % 8 + 1;
        activeE = next;
        applyLayout(buildRoles(activeE));
      }, INTERVAL_MS);
    }

    function stopAuto() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    // ---------- interactions ----------
    function pauseForUser() {
      userPausedUntil = Date.now() + USER_PAUSE_MS;
    }

    tiles.forEach((tile) => {
      const btn = tile.querySelector('[data-ind-action="expand"]');
      if (!btn) return;

      btn.addEventListener("click", () => {
        const id = Number(tile.dataset.industry);
        if (!id) return;
        activeE = id;
        pauseForUser();
        applyLayout(buildRoles(activeE));
      });

      tile.addEventListener("mouseenter", () => (hoverPaused = true));
      tile.addEventListener("mouseleave", () => (hoverPaused = false));
    });

    // init
    applyLayout(buildRoles(activeE));
    startAuto();
  }

  // Run when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initIndustriesParking);
  } else {
    initIndustriesParking();
  }

  // ✅ FIX: includes:loaded is dispatched on document, not window
  document.addEventListener("includes:loaded", () => {
    // run after the injected HTML has actually painted
    requestAnimationFrame(() => initIndustriesParking());
  });
})();