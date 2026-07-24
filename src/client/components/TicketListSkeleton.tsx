export function TicketListSkeleton() {
  return (
    <div className="ticket-list" aria-busy="true" aria-label="Loading tickets">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-row">
            <div className="skeleton skeleton-title" />
            <div className="skeleton skeleton-badge" />
            <div className="skeleton skeleton-badge" />
          </div>
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line short" />
          <div className="skeleton-row skeleton-footer">
            <div className="skeleton skeleton-meta" />
            <div className="skeleton skeleton-link" />
          </div>
        </div>
      ))}
    </div>
  );
}
