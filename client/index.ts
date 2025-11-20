// SilverBullet V2 client-side plugin: copycell

export function client() {
  console.log("[copycell] client script loaded");

  document.addEventListener("mouseover", (e) => {
    const td = (e.target as HTMLElement).closest("td");
    if (!td) return;

    if (td.querySelector(".copycell-btn")) return;

    const btn = document.createElement("button");
    btn.className = "copycell-btn";
    btn.textContent = "📋";
    btn.onclick = (ev) => {
      ev.stopPropagation();
      navigator.clipboard.writeText(td.innerText.trim());
    };

    td.appendChild(btn);
  });
}
