import React from "react";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  return (

    <footer className="w-full border-t border-white/10 bg-bg-surface/30 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
    
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-gradient tracking-tight">
              CollegeEvents
            </h2>
            <p className="text-text-muted text-sm leading-relaxed">
              Your central hub for campus hackathons, technical workshops, and
              fests. Never miss an opportunity to build and grow.
            </p>
        
            <div className="flex items-center  justify-center space-x-4">
            
           
          
<div className="flex items-center gap-3 pt-2">
  <SocialIcon 
    src="./public/instagram.png" 
    alt="Instagram" 
    href="https://instagram.com" 
  />
  <SocialIcon 
    src="./public/linkedin.png" 
    alt="LinkedIn" 
    href="https://linkedin.com" 
  />
  <SocialIcon 
    src="./public/github.png" 
    alt="GitHub" 
    href="https://github.com" 
  />
  <SocialIcon 
    src="./public/twitter.png" 
    alt="Twitter" 
    href="https://twitter.com" 
  />
  <SocialIcon 
    src="./public/youtube.png" 
    alt="YouTube" 
    href="https://youtube.com" 
  />
</div>
            </div>
          </div>

       
          <div>
            <h3 className="text-white font-bold mb-4">Explore</h3>
            <ul className="space-y-3">
              <FooterLink text="All Events" />
              <FooterLink text="Upcoming Hackathons" />
              <FooterLink text="Technical Workshops" />
              <FooterLink text="Campus Ambassadors" />
            </ul>
          </div>

   
          <div>
            <h3 className="text-white font-bold mb-4">Support & Legal</h3>
            <ul className="space-y-3">
              <FooterLink text="Help Center / FAQ" />
              <FooterLink text="Terms of Service" />
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Code of Conduct" />
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Get in Touch</h3>
            <p className="text-text-muted text-sm mb-4">
              Have a question or want to host an event on our platform? We'd
              love to hear from you.
            </p>
            <a
              href="mailto:support@collegeevents.com"
              className="inline-flex items-center gap-2 text-brand-accent hover:text-white transition-colors text-sm font-medium"
            >
              <Mail size={16} />
              support@collegeevents.com
            </a>
          </div>
        </div>


        <div className="w-full h-[1px] bg-white/10 mt-12 mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>
            © {new Date().getFullYear()} CollegeEvents. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with{" "}
            <Heart
              size={14}
              className="text-red-500 hover:scale-110 transition-transform"
            />{" "}
            by Team WING
          </p>
        </div>
      </div>
    </footer>
  );
}

// Component to render a footer icon and link
function FooterLink({ text, href = "#" }) {
  return (
    <li>
      <a
        href={href}
        className="text-text-muted hover:text-brand-accent transition-colors text-sm"
      >
        {text}
      </a>
    </li>
  );
}

function SocialIcon({ src, href = "#" }) {
  return (
    <a
      href={href}
      className="w-10 h-10 p-1  bg-white/40  rounded flex items-center justify-center text-text-muted hover:bg-brand-accent hover:text-white hover:shadow-glow-primary transition-all duration-300"
    >
      <img src={src} />
    </a>
  );
}
