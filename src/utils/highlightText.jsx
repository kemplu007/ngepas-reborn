
/*==================================================
 NGEPAS REBORN
 Project : Ngepas Reborn
 File    : highlightText.js
 Module  : Utils
==================================================*/

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function highlightText(text, keyword) {
  if (!keyword.trim()) return text;

  const regex = new RegExp(`(${escapeRegExp(keyword)})`, "gi");

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === keyword.toLowerCase() ? (
      <mark
        key={index}
        className="rounded bg-emerald-100 px-1 font-semibold text-emerald-700"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}