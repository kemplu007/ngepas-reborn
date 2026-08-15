/*==================================================
 NGEPAS REBORN
 File    : SearchInput.jsx
 Module  : UI Foundation
==================================================*/

import { Search, SlidersHorizontal, X } from "lucide-react";

function SearchInput({
  value = "",
  onChange,
  onSubmit,
  onFilter,
  onClear,
  placeholder = "Cari produk terbaik, kategori, atau merek...",
  disabled = false,
  className = "",
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit?.(value);
  };

  const handleClear = () => {
    onClear?.();
    onChange?.("");
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full ${className}`} role="search">
      <Search
        aria-hidden="true"
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--np-color-subtle)]"
      />
      <input
        value={value}
        disabled={disabled}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-[var(--np-control-height-lg)] w-full rounded-np-md border border-[var(--np-color-border)] bg-[var(--np-color-white)] pl-10 pr-24 text-[var(--np-text-small)] text-[var(--np-color-ink)] outline-none transition placeholder:text-[var(--np-color-subtle)] focus:border-[var(--np-color-green-500)] focus:ring-4 focus:ring-[var(--np-color-green-100)] disabled:cursor-not-allowed disabled:bg-[var(--np-color-surface-muted)]"
      />
      <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1">
        {value && onClear && (
          <button
            type="button"
            aria-label="Hapus pencarian"
            onClick={handleClear}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--np-color-muted)] hover:bg-[var(--np-color-surface-muted)] hover:text-[var(--np-color-ink)]"
          >
            <X size={15} />
          </button>
        )}
        {onFilter && (
          <button
            type="button"
            aria-label="Buka filter"
            onClick={onFilter}
            className="inline-flex h-8 w-8 items-center justify-center rounded-np-sm text-[var(--np-color-muted)] hover:bg-[var(--np-color-green-100)] hover:text-[var(--np-color-green-700)]"
          >
            <SlidersHorizontal size={16} />
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchInput;
