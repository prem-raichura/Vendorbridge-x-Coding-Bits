import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <main className="landing">
      <header className="topbar">
        <div className="shell topbar-inner">
          <Link className="brand" to="/" aria-label="VendorBridge home">
            <span className="brand-mark" aria-hidden="true">
              VB
            </span>
            <span className="brand-name">VendorBridge</span>
          </Link>
        </div>
      </header>

      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Vendor procurement portal</p>
            <h1>VendorBridge: Streamlining Procurement from Vendor Onboarding to Invoice Generation</h1>
            <p className="lead">
              VendorBridge unifies procurement operations by connecting vendors, RFQs, quotations, approvals, purchase orders, and invoices in one place.
            </p>

            <div className="hero-actions">
              <Link className="button primary" to="/login">
                Get started
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="scene-shell">
              <div className="scene-grid" />
              <div className="scene-orb scene-orb-left" />
              <div className="scene-orb scene-orb-right" />

              <div className="glass-card hero-card">
                <div className="hero-card-top">
                  <div className="hero-avatar">
                    <span>VB</span>
                  </div>
                  <div>
                    <p className="hero-card-name">VendorBridge</p>
                    <p className="hero-card-role">Procurement workflow</p>
                  </div>
                </div>

                <div className="hero-card-metrics">
                  <div>
                    <span>RFQs</span>
                    <strong>48</strong>
                  </div>
                  <div>
                    <span>Quotes</span>
                    <strong>24.8k</strong>
                  </div>
                  <div>
                    <span>Approvals</span>
                    <strong>15+</strong>
                  </div>
                </div>

                <div className="hero-chart">
                  <div className="hero-chart-line" />
                  <span className="chart-node chart-node-a" />
                  <span className="chart-node chart-node-b" />
                  <span className="chart-node chart-node-c" />
                </div>
              </div>

              <div className="glass-card feature-card feature-card-a">
                <div className="feature-kicker">Featured RFQ</div>
                <div className="feature-title">Office furniture package</div>
                <div className="feature-meta">Live tracking</div>
              </div>

              <div className="glass-card feature-card feature-card-b">
                <div className="feature-kicker">Vendor update</div>
                <div className="feature-title">Bid received and ready</div>
                <div className="feature-meta">Pending review</div>
              </div>

              <div className="status-badge status-badge-top">+12.8%</div>
              <div className="status-badge status-badge-bottom">Approval</div>
              <div className="dark-orb" />
              <div className="mini-ribbon" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
