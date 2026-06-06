import {
  FileText,
  FileCheck2,
  CircleCheckBig,
  Ban,
  ShoppingCart,
  MessageSquareText,
  ArrowRight,
  PackageSearch,
  Clock3,
} from 'lucide-react';
import './VendorDashboard.css';

const stats = [
  { title: 'Assigned RFQs', value: '12', icon: FileText, tone: 'blue' },
  { title: 'Active RFQs', value: '7', icon: PackageSearch, tone: 'amber' },
  { title: 'Closed RFQs', value: '5', icon: CircleCheckBig, tone: 'violet' },
  { title: 'Submitted Quotations', value: '8', icon: FileCheck2, tone: 'green' },
  { title: 'Approved Quotations', value: '3', icon: CircleCheckBig, tone: 'mint' },
  { title: 'Rejected Quotations', value: '2', icon: Ban, tone: 'red' },
  { title: 'Purchase Orders', value: '6', icon: ShoppingCart, tone: 'indigo' },
  { title: 'Active POs', value: '4', icon: FileText, tone: 'sky' },
];

const activities = [
  {
    icon: PackageSearch,
    title: 'New RFQ assigned: Office Furniture',
    time: '12 May 2026, 10:30 AM',
  },
  {
    icon: MessageSquareText,
    title: 'Quotation submitted for RFQ-2026-001',
    time: '11 May 2026, 03:20 PM',
  },
  {
    icon: Clock3,
    title: 'PO received: PO-2026-004',
    time: '10 May 2026, 11:45 AM',
  },
];

const VendorDashboard = () => {
  return (
    <div className="vendor-dashboard">
      <section className="vendor-hero">
        <div>
          <p className="vendor-hero-kicker">1. Dashboard</p>
          <h1>Welcome back, Acme Supplies Pvt. Ltd.</h1>
          <p>Here&apos;s an overview of your procurement activities.</p>
        </div>
      </section>

      <section className="vendor-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className="vendor-stat-card" key={stat.title}>
              <div className={`vendor-stat-icon ${stat.tone}`}>
                <Icon size={26} />
              </div>
              <div className="vendor-stat-copy">
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
                <small>View Details</small>
              </div>
            </article>
          );
        })}
      </section>

      <section className="vendor-grid">
        <article className="vendor-panel">
          <div className="vendor-panel-head">
            <h2>RFQ Status Overview</h2>
          </div>
          <div className="vendor-donut-wrap">
            <div className="vendor-donut" aria-hidden="true">
              <div className="vendor-donut-inner">
                <span>Total</span>
                <strong>12</strong>
                <small>RFQs</small>
              </div>
            </div>

            <div className="vendor-legend">
              <div><span className="dot active" />Active <strong>7 (58%)</strong></div>
              <div><span className="dot closed" />Closed <strong>5 (42%)</strong></div>
              <div><span className="dot draft" />Draft <strong>0 (0%)</strong></div>
              <div><span className="dot cancelled" />Cancelled <strong>0 (0%)</strong></div>
            </div>
          </div>
        </article>

        <article className="vendor-panel">
          <div className="vendor-panel-head">
            <h2>Recent Activities</h2>
            <button type="button" className="vendor-link-btn">View All</button>
          </div>

          <div className="vendor-activity-list">
            {activities.map((item) => {
              const Icon = item.icon;
              return (
                <div className="vendor-activity" key={item.title}>
                  <div className="vendor-activity-icon">
                    <Icon size={18} />
                  </div>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <aside className="vendor-panel vendor-actions">
          <div className="vendor-panel-head">
            <h2>Quick Actions</h2>
          </div>

          <div className="vendor-action-list">
            <button type="button" className="vendor-action-btn green">
              <FileText size={18} />
              <span>View Assigned RFQs</span>
              <ArrowRight size={16} />
            </button>
            <button type="button" className="vendor-action-btn mint">
              <FileCheck2 size={18} />
              <span>Submit Quotation</span>
              <ArrowRight size={16} />
            </button>
            <button type="button" className="vendor-action-btn blue">
              <ShoppingCart size={18} />
              <span>View Purchase Orders</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default VendorDashboard;
