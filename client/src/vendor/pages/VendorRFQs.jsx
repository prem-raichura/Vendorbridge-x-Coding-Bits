import {
  Eye,
  Filter,
  LayoutGrid,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './VendorRFQs.css';

const rfqsByStatus = {
  assigned: {
    title: 'Assigned RFQs',
    description: 'List of RFQs assigned to your organization.',
    countLabel: '2. Assigned RFQs',
    rows: [
      { id: 'RFQ-2026-001', title: 'Office Furniture Procurement', category: 'Furniture', deadline: '25 May 2026', status: 'Active' },
      { id: 'RFQ-2026-002', title: 'IT Equipment', category: 'Electronics', deadline: '28 May 2026', status: 'Active' },
      { id: 'RFQ-2026-003', title: 'Stationery Items', category: 'Office Supplies', deadline: '30 May 2026', status: 'Active' },
      { id: 'RFQ-2026-004', title: 'Network Devices', category: 'IT Hardware', deadline: '02 Jun 2026', status: 'Active' },
      { id: 'RFQ-2026-005', title: 'Printer & Accessories', category: 'IT Hardware', deadline: '05 Jun 2026', status: 'Closed' },
    ],
  },
  active: {
    title: 'Active RFQs',
    description: 'RFQs that are currently open for response.',
    countLabel: 'Active RFQs',
    rows: [
      { id: 'RFQ-2026-001', title: 'Office Furniture Procurement', category: 'Furniture', deadline: '25 May 2026', status: 'Active' },
      { id: 'RFQ-2026-002', title: 'IT Equipment', category: 'Electronics', deadline: '28 May 2026', status: 'Active' },
      { id: 'RFQ-2026-003', title: 'Stationery Items', category: 'Office Supplies', deadline: '30 May 2026', status: 'Active' },
    ],
  },
  closed: {
    title: 'Closed RFQs',
    description: 'RFQs that are already completed or expired.',
    countLabel: 'Closed RFQs',
    rows: [
      { id: 'RFQ-2026-004', title: 'Network Devices', category: 'IT Hardware', deadline: '02 Jun 2026', status: 'Closed' },
      { id: 'RFQ-2026-005', title: 'Printer & Accessories', category: 'IT Hardware', deadline: '05 Jun 2026', status: 'Closed' },
    ],
  },
};

const VendorRFQs = ({ status = 'assigned' }) => {
  const navigate = useNavigate();
  const view = rfqsByStatus[status] || rfqsByStatus.assigned;

  return (
    <div className="vendor-rfqs-page">
      <header className="vendor-rfqs-header">
        <div>
          <p className="vendor-rfqs-kicker">2. {view.countLabel}</p>
          <h1>{view.title}</h1>
          <p>{view.description}</p>
        </div>

        <div className="vendor-rfqs-topbar">
          <div className="vendor-rfqs-notification">
            <span />
          </div>
          <div className="vendor-rfqs-user">
            <div className="vendor-rfqs-avatar">AU</div>
            <div>
              <strong>Acme Supplies</strong>
              <span>Vendor</span>
            </div>
          </div>
        </div>
      </header>

      <section className="vendor-rfqs-controls" aria-label="RFQ filters">
        <label className="vendor-rfqs-search">
          <Search size={18} />
          <input type="text" placeholder="Search by RFQ title or ID..." />
        </label>

        <label className="vendor-rfqs-select">
          <span>All Status</span>
          <select defaultValue="all">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </label>

        <label className="vendor-rfqs-select">
          <span>All Categories</span>
          <select defaultValue="all">
            <option value="all">All Categories</option>
            <option value="furniture">Furniture</option>
            <option value="electronics">Electronics</option>
            <option value="office">Office Supplies</option>
            <option value="it">IT Hardware</option>
          </select>
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
              {view.rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td>{row.category}</td>
                  <td>{row.deadline}</td>
                  <td>
                    <span className={`vendor-rfqs-status ${row.status.toLowerCase()}`}>
                      {row.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="vendor-rfqs-action"
                      onClick={() => navigate(`/vendor/rfqs/${row.id}`)}
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="vendor-rfqs-footer">
          <p>Showing 1 to {view.rows.length} of {view.rows.length} entries</p>

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
