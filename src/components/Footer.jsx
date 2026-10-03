import { Zap } from 'lucide-react';
import { BRAND_NAME } from '../constants.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>{BRAND_NAME}</strong> © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
      </div>
      <div className="footer-right">
        <span>Scout Criteria</span>
        <span>Live Stream</span>
        <span className="engine-ready">
          <Zap size={14} /> Engine Ready
        </span>
      </div>
    </footer>
  );
}
