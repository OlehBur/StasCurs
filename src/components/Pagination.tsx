import React from 'react';
import './Pagination.css';

interface Props {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}

const Pagination: React.FC<Props> = ({ page, totalPages, onPage }) => {
  if (totalPages <= 1) return null;

  const pages: (number | '...')[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="pagination">
      <button className="pag-btn" disabled={page === 1} onClick={() => onPage(page - 1)}>‹</button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dots-${i}`} className="pag-dots">…</span>
        ) : (
          <button
            key={p}
            className={`pag-btn ${p === page ? 'active' : ''}`}
            onClick={() => onPage(p as number)}
          >
            {p}
          </button>
        )
      )}
      <button className="pag-btn" disabled={page === totalPages} onClick={() => onPage(page + 1)}>›</button>
    </div>
  );
};

export default Pagination;
