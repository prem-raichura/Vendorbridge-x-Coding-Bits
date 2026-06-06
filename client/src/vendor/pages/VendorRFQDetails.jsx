import { useState, useEffect } from 'react';
import { Download, FileText, ChevronRight, Loader2, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { getRfqById, submitQuotation } from '../features/bids/services/vendorRfqService';
import './VendorRFQDetails.css';

const VendorRFQDetails = () => {
  const { rfqId } = useParams();
  const navigate = useNavigate();
  const [rfq, setRfq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ total_amount: '', notes: '', delivery_days: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchRfq = async () => {
      try {
        const data = await getRfqById(rfqId);
        setRfq(data.data);
      } catch (err) {
        setError(err.message || 'Failed to load RFQ details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchRfq();
  }, [rfqId]);

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    if (!quoteForm.total_amount) {
      toast.error('Please enter a total amount');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitQuotation(rfqId, quoteForm);
      toast.success('Quotation submitted successfully!');
      setShowQuoteModal(false);
      setQuoteForm({ total_amount: '', notes: '', delivery_days: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to submit quotation');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="vendor-rfq-details-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#6366f1' }} />
      </div>
    );
  }

  if (error || !rfq) {
    return (
      <div className="vendor-rfq-details-page" style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#ef4444' }}>{error || 'RFQ not found'}</p>
        <button type="button" className="vendor-rfq-secondary" onClick={() => navigate('/vendor/rfqs/assigned')} style={{ marginTop: '1rem' }}>
          Back to RFQs
        </button>
      </div>
    );
  }

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
            <span>RFQ-{rfq.rfq_id}</span>
          </nav>
        </div>
      </header>

      <section className="vendor-rfq-details-grid">
        <article className="vendor-rfq-details-card">
          <h2>RFQ Information</h2>
          <dl className="vendor-rfq-details-list">
            <div><dt>RFQ ID</dt><dd>RFQ-{rfq.rfq_id}</dd></div>
            <div><dt>Title</dt><dd>{rfq.rfq_title}</dd></div>
            <div><dt>Category</dt><dd>{rfq.rfq_category || '—'}</dd></div>
            <div><dt>Description</dt><dd>{rfq.rfq_description || '—'}</dd></div>
            <div><dt>Deadline</dt><dd>{rfq.rfq_deadline ? new Date(rfq.rfq_deadline).toLocaleDateString() : '—'}</dd></div>
            <div><dt>Status</dt><dd><span className="vendor-rfq-status-pill">{rfq.rfq_status || 'Pending'}</span></dd></div>
          </dl>
        </article>

        {rfq.items && Array.isArray(rfq.items) && rfq.items.length > 0 && (
          <article className="vendor-rfq-details-card">
            <h2>Items Required</h2>
            <div className="vendor-rfq-items-table-wrap">
              <table className="vendor-rfq-items-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  {rfq.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name || item.item}</td>
                      <td>{item.qty || item.quantity}</td>
                      <td>{item.unit || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        )}

        <article className="vendor-rfq-details-card">
          <h2>Additional Information</h2>
          <dl className="vendor-rfq-details-list">
            <div><dt>Created By</dt><dd>{rfq.user ? `${rfq.user.first_name} ${rfq.user.last_name}` : '—'}</dd></div>
            <div><dt>Contact</dt><dd>{rfq.user?.email || '—'}</dd></div>
          </dl>
        </article>
      </section>

      <div className="vendor-rfq-details-actions">
        <button type="button" className="vendor-rfq-secondary" onClick={() => navigate('/vendor/rfqs/assigned')}>
          Back to RFQs
        </button>
        <button type="button" className="vendor-rfq-primary" onClick={() => setShowQuoteModal(true)}>
          Submit Quotation
        </button>
      </div>

      {/* Submit Quotation Modal */}
      {showQuoteModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '480px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b', margin: 0 }}>Submit Quotation</h2>
              <button onClick={() => setShowQuoteModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                <X size={20} color="#64748b" />
              </button>
            </div>
            <form onSubmit={handleSubmitQuote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                  Total Amount (₹) *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={quoteForm.total_amount}
                  onChange={e => setQuoteForm(p => ({ ...p, total_amount: e.target.value }))}
                  style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none' }}
                  placeholder="e.g. 50000"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                  Delivery Days
                </label>
                <input
                  type="number"
                  min="1"
                  value={quoteForm.delivery_days}
                  onChange={e => setQuoteForm(p => ({ ...p, delivery_days: e.target.value }))}
                  style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none' }}
                  placeholder="e.g. 14"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: '#374151', marginBottom: '0.5rem' }}>
                  Notes / Terms
                </label>
                <textarea
                  rows={3}
                  value={quoteForm.notes}
                  onChange={e => setQuoteForm(p => ({ ...p, notes: e.target.value }))}
                  style={{ width: '100%', border: '1px solid #e2e8f0', borderRadius: '0.75rem', padding: '0.75rem 1rem', fontSize: '0.875rem', outline: 'none', resize: 'none' }}
                  placeholder="Any terms, conditions, or additional info..."
                />
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setShowQuoteModal(false)} className="vendor-rfq-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="vendor-rfq-primary" disabled={isSubmitting} style={{ flex: 1, opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorRFQDetails;
