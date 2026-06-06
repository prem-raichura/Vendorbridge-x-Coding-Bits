import { useState, useEffect } from 'react';
import {
  Eye,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAssignedRfqs } from '../features/bids/services/vendorRfqService';
import './VendorRFQs.css';

const statusFilter = {
  assigned: null, // show all
  active: 'ACTIVE',
  closed: 'CLOSED',
};

const statusLabels = {
  assigned: { title: 'Assigned RFQs', description: 'List of RFQs assigned to your organization.', countLabel: 'Assigned RFQs' },
  active: { title: 'Active RFQs', description: 'RFQs that are currently open for response.', countLabel: 'Active RFQs' },
  closed: { title: 'Closed RFQs', description: 'RFQs that are already completed or expired.', countLabel: 'Closed RFQs' },
};

const VendorRFQs = ({ status = 'assigned' }) => {
  const navigate = useNavigate();
  const [allRfqs, setAllRfqs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const view = statusLabels[status] || statusLabels.assigned;

  useEffect(() => {
    const fetchRfqs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getAssignedRfqs();
        setAllRfqs(data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load RFQs');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRfqs();
  }, []);

  const filtered = allRfqs
    .filter(rfq => {
      const filterStatus = statusFilter[status];
      if (!filterStatus) return true; // 'assigned' shows all
      return rfq.rfq_status === filterStatus;
    })
    .filter(rfq =>
      searchTerm === '' ||
      rfq.rfq_title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(rfq.rfq_id).includes(searchTerm)
    );

  return (
    <div className="vendor-rfqs-page">
      <header className="vendor-rfqs-header">
        <div>
          <p className="vendor-rfqs-kicker">2. {view.countLabel}</p>
          <h1>{view.title}</h1>
          <p>{view.description}</p>
        </div>
      </header>

      <section className="vendor-rfqs-controls" aria-label="RFQ filters">
        <label className="vendor-rfqs-search">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by RFQ title or ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </label>

        <button type="button" className="vendor-rfqs-filter-btn">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </section>

      <section className="vendor-rfqs-table-card">
        <div className="vendor-rfqs-table-wrap">
          <table className="vendor-rfqs-table">
            <thead>
              <tr>
                <th>RFQ ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    <Loader2 size={24} className="animate-spin" style={{ margin: '0 auto' }} />
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>{error}</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>
                    No RFQs found.
                  </td>
                </tr>
              ) : (
                filtered.map((row) => (
                  <tr key={row.rfq_id}>
                    <td>RFQ-{row.rfq_id}</td>
                    <td>{row.rfq_title}</td>
                    <td>{row.rfq_category || '—'}</td>
                    <td>{row.rfq_deadline ? new Date(row.rfq_deadline).toLocaleDateString() : '—'}</td>
                    <td>
                      <span className={`vendor-rfqs-status ${(row.rfq_status || '').toLowerCase()}`}>
                        {row.rfq_status || 'Pending'}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="vendor-rfqs-action"
                        onClick={() => navigate(`/vendor/rfqs/${row.rfq_id}`)}
                      >
                        <Eye size={16} />
                        <span>View Details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <footer className="vendor-rfqs-footer">
          <p>Showing {filtered.length} of {allRfqs.length} entries</p>

          <div className="vendor-rfqs-pagination" aria-label="Pagination">
            <button type="button" aria-label="Previous page"><ChevronLeft size={18} /></button>
            <button type="button" className="active">1</button>
            <button type="button" aria-label="Next page"><ChevronRight size={18} /></button>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default VendorRFQs;
