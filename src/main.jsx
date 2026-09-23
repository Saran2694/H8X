import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("H8X Runtime Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: '#05060a', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'sans-serif' }}>
          <div style={{ border: '1px solid #ff1e38', borderRadius: '12px', padding: '2rem', maxWidth: '600px', backgroundColor: '#0c0e14', boxShadow: '0 0 30px rgba(255,30,56,0.4)', textAlign: 'center' }}>
            <h1 style={{ color: '#ff1e38', fontSize: '1.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '0.1em' }}>SYSTEM RECOVERY</h1>
            <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{this.state.error?.toString()}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ backgroundColor: '#ff1e38', color: '#fff', border: 'none', padding: '0.75rem 2rem', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer', letterSpacing: '0.1em' }}
            >
              RELOAD SYSTEM
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
