import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

function Navbar({ showUI }) {
  const navigate = useNavigate();
  const [sotetelOpen, setSotetelOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setSotetelOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setSotetelOpen(false), 200);
  };

  const handleNavigateToAnchor = (hash) => {
    navigate(`/APropos${hash}`);
    setSotetelOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Contact Bar */}
      <div
        className={`hidden md:flex items-center justify-between bg-[#2551d7] text-white text-sm py-2.5 px-4 transition-transform duration-300 ${
          showUI ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center gap-4">
          <a href="mailto:contact@sotetel.com.tn" className="flex items-center hover:underline">
            <i className="bi bi-envelope mr-1" />
            contact@sotetel.com.tn
          </a>
          <span className="flex items-center">
            <i className="bi bi-phone mr-1" /> +216 71 135 100
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://x.com/sotetelcom" className="hover:text-blue-400"><i className="bi bi-twitter-x" /></a>
          <a href="https://www.facebook.com/SotetelSmartEnabler/" className="hover:text-blue-400"><i className="bi bi-facebook" /></a>
          <a href="https://tn.linkedin.com/company/sotetel" className="hover:text-blue-400"><i className="bi bi-linkedin" /></a>
          <a href="https://www.youtube.com/@sotetel890" className="hover:text-blue-200"><i className="bi bi-youtube"></i></a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={`bg-white shadow transition-all duration-300 px-6 ${showUI ? 'py-4' : 'py-2 translate-y-[-40px]'}`}>
        <div className="container mx-auto flex justify-between items-center">
          <div onClick={() => navigate('/client')} className="cursor-pointer flex items-center gap-2">
            <img src="/assets/logo.png" alt="Sotetel Logo" className="h-12 w-auto object-contain" />
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-800 relative">
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="hover:text-blue-600 transition font-bold">Sotetel</button>
              <div
                className={`absolute top-full left-0 mt-2 w-72 bg-white shadow-md rounded-md py-2 z-50 border transform transition-all duration-300 ${
                  sotetelOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}
              >
                <div
                  onClick={() => {
                    navigate('/APropos');
                    setSotetelOpen(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition font-semibold"
                >
                  À propos
                </div>
                {[
                  { label: 'Dates clés et historique', path: '/DateEtHistorique' },
                  { label: 'Mission, vision et valeurs', path: '/missions-valeurs' },
                  { label: 'Partenaires & certifications', path: '/PartenaireEtCertification' },
                  { label: 'Sotetel à l’international',    path: '/sotetelalinternation' },
                  { label: 'Engagement éthique et qualité', path: '/engagement-ethique-et-qualite' },
                  { label: 'Actualités', path:'/actualites' },
                  
                ].map((item) => (
                  <div
                    key={item.label}
                    onClick={() => {
                      if (item.path) {
                        navigate(item.path);
                      } else if (item.hash) {
                        handleNavigateToAnchor(item.hash);
                      }
                      setSotetelOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition"
                  >
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <button onClick={() => navigate('/client/services')} className="hover:text-blue-600 transition font-bold">
  Nos services
</button>
            {/* Contact */}
<button onClick={() => navigate('/contact')} className="hover:text-blue-600 transition font-bold">
  Contact
</button>
            <button
             onClick={() => navigate('/auth/clientlogin')}


              className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-full transition"
            >
              Connexion
            </button>
            <button
              onClick={() => navigate('/auth/clientregister')}

              className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full transition"
            >
              S'inscrire
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
