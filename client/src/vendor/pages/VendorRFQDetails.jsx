import { Download, FileText, LayoutGrid, ChevronRight } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './VendorRFQDetails.css';

const rfqDetails = {
  'RFQ-2026-001': {
    id: 'RFQ-2026-001',
    title: 'Office Furniture Procurement',
    category: 'Furniture',
    description: 'Requirement of office furniture for new branch setup.',
    deadline: '25 May 2026, 11:59 PM',
    status: 'Active',
    attachment: 'RFQ_Document.pdf',
    assignedBy: 'Procurement Officer',
    assignedOn: '12 May 2026',
    paymentTerms: '30 Days',
    deliveryLocation: 'Mumbai, Maharashtra',
    items: [
      { item: 'Office Table', description: 'Standard office table', quantity: '10' },
      { item: 'Office Chair', description: 'Ergonomic chair', quantity: '20' },
      { item: 'Filing Cabinet', description: '3 Drawer filing cabinet', quantity: '5' },
      { item: 'Office Desk Set', description: 'Complete desk set', quantity: '5' },
    ],
  },
};

const VendorRFQDetails = () => {
  const { rfqId } = useParams();
  const navigate = useNavigate();
  const rfq = rfqDetails[rfqId] || rfqDetails['RFQ-2026-001'];

  return (
    <div className="vendor-rfq-details-page">
      <header className="vendor-rfq-details-header">
        <div>
          <h1>3. RFQ Details</h1>
          <nav className="vendor-rfq-details-breadcrumb" aria-label="Breadcrumb">
            <Link to="/vendor/rfqs/assigned">RFQs</Link>
            <ChevronRight size={14} />
            <Link to="/vendor/rfqs/assigned">Assigned RFQs</Link>
            <ChevronRight size={14} />
            <span>{rfq.id}</span>
          </nav>
        </div>

        <div className="vendor-rfq-details-topbar">
          <div className="vendor-rfq-details-notification">
            <span />
          </div>
          <div className="vendor-rfq-details-user">
            <div className="vendor-rfq-details-avatar">AU</div>
            <div>
              <strong>Acme Supplies</strong>
              <span>Vendor</span>
            </div>
          </div>
        </div>
      </header>

      <section className="vendor-rfq-details-grid">
        <article className="vendor-rfq-details-card">
          <h2>RFQ Information</h2>
          <dl className="vendor-rfq-details-list">
            <div><dt>RFQ ID</dt><dd>{rfq.id}</dd></div>
            <div><dt>Title</dt><dd>{rfq.title}</dd></div>
            <div><dt>Category</dt><dd>{rfq.category}</dd></div>
            <div><dt>Description</dt><dd>{rfq.description}</dd></div>
            <div><dt>Deadline</dt><dd>{rfq.deadline}</dd></div>
            <div><dt>Status</dt><dd><span className="vendor-rfq-status-pill">{rfq.status}</span></dd></div>
          </dl>
        </article>

        <article className="vendor-rfq-details-card">
          <h2>Items Required</h2>
          <div className="vendor-rfq-items-table-wrap">
            <table className="vendor-rfq-items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Description</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {rfq.items.map((item) => (
                  <tr key={item.item}>
                    <td>{item.item}</td>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="vendor-rfq-details-card">
          <h2>Additional Information</h2>
          <dl className="vendor-rfq-details-list">
            <div>
              <dt>Attachment</dt>
              <dd>
                <a className="vendor-rfq-attachment" href="#" onClick={(event) => event.preventDefault()}>
                  <FileText size={16} />
                  <span>{rfq.attachment}</span>
                  <Download size={16} />
                </a>
              </dd>
            </div>
            <div><dt>Assigned By</dt><dd>{rfq.assignedBy}</dd></div>
            <div><dt>Assigned On</dt><dd>{rfq.assignedOn}</dd></div>
            <div><dt>Payment Terms</dt><dd>{rfq.paymentTerms}</dd></div>
            <div><dt>Delivery Location</dt><dd>{rfq.deliveryLocation}</dd></div>
          </dl>
        </article>
      </section>

      <div className="vendor-rfq-details-actions">
        <button type="button" className="vendor-rfq-secondary" onClick={() => navigate('/vendor/rfqs/assigned')}>
          Back to RFQs
        </button>
        <button type="button" className="vendor-rfq-primary">
          Submit Quotation
        </button>
      </div>
    </div>
  );
};

export default VendorRFQDetails;
