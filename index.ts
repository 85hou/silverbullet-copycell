// SilverBullet Plug: copycell
// Adds a 📋 hover-copy button to all <td> elements in the rendered page.

import { Plug } from "silverbullet";

export const copycell: Plug = {
  name: "copycell",

  hooks: {
    pageLoaded() {
      injectStyle();
      enableCopyButtons();
    },
    pageChanged() {
      enableCopyButtons();
    }
  }
};

function injectStyle() {
  if (document.getElementById("copycell-style")) return;

  const style = document.createElement("style");
  style.id = "copycell-style";
  style.textContent = `
    td {
      position: relative;
    }
    .copycell-btn {
      display: none;
      position: absolute;
      right: 4px;
      top: 2px;
      cursor: pointer;
      opacity: 0.6;
      font-size: 12px;
      user-select: none;
      background: none;
      border: none;
    }
    td:hover .copycell-btn {
      display: inline;
    }
    .copycell-btn:hover {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
}

function enableCopyButtons() {
  const tds = Array.from(document.querySelectorAll("td"));

  for (const td of tds) {
    if (td.querySelector(".copycell-btn")) continue;

    const btn = document.createElement("button");
    btn.className = "copycell-btn";
    btn.textContent = "📋";

    btn.onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(td.innerText.trim());
    };

    td.appendChild(btn);
  }
}
