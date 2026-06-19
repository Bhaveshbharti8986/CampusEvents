import React from 'react';
import { Download, Award } from 'lucide-react';

export default function Certificates() {
  const certificates = [
    { id: 1, title: 'React UI Masterclass', date: 'Sept 10, 2026', verified: true },
    { id: 2, title: 'Annual Cultural Fest Organizer', date: 'Aug 22, 2026', verified: true },
    { id: 3, title: 'Intro to Machine Learning', date: 'July 05, 2026', verified: true },
  ];

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <Award size={32} className="text-brand-accent" />
        <h1 className="text-3xl font-bold text-white">Certificate Vault</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="glass-panel-interactive p-6 rounded-2xl flex flex-col items-center text-center group">
            {/* Certificate Graphic Placeholder */}
            <div className="w-full h-40 border-2 border-brand-primary/30 rounded-lg mb-6 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary to-brand-accent"></div>
              <Award size={40} className="text-brand-primary mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
              <span className="text-brand-accent text-xs font-mono tracking-widest">VERIFIED</span>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
            <p className="text-text-muted text-sm mb-6">Issued: {cert.date}</p>
            
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-all font-semibold mt-auto">
              <Download size={18} />
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}