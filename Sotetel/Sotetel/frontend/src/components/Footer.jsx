import { useNavigate } from "react-router-dom";
import logo from "/assets/logo.png";

function Footer({ grayBackground = false }) {
  const navigate = useNavigate();

  return (
    <footer
      className={`${
        grayBackground ? 'bg-gray-200' : 'bg-white'
      } text-black text-sm mt-20 pt-10 pb-4 px-4`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-center items-start gap-6 text-center md:text-left">
        {/* Contact & Logo */}
        <div className="flex flex-col items-center md:items-start font-medium text-sm w-full md:w-1/3">
          <img src={logo} alt="SOTETEL Logo" className="w-24 mb-2" />
          <p>Rue des entrepreneurs, Z.I Charguia II</p>
          <p>Aéroport 1080 Tunis</p>
          <p>
            Email :{" "}
            <a
              href="mailto:contact@sotetel.com.tn"
              className="hover:underline font-semibold"
            >
              contact@sotetel.com.tn
            </a>
          </p>
          <p>Tel : +(216) 71 135 100</p>
          <p>Fax : +(216) 71 940 584</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start font-medium text-sm w-full md:w-1/3">
          <h3 className="font-bold text-base mb-1">Liens rapides</h3>
          <button onClick={() => navigate("/APropos")} className="hover:text-blue-400 mb-1">
            À propos
          </button>
          <button onClick={() => navigate("/client/services")} className="hover:text-blue-400 mb-1">
            Nos services
          </button>
          <button onClick={() => navigate("/contact")} className="hover:text-blue-400 mb-1">
            Contact
          </button>
          <button onClick={() => navigate("/actualites")} className="hover:text-blue-400">
            Actualités
          </button>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start font-medium text-sm w-full md:w-1/3">
          <h3 className="font-bold text-base mb-1">Suivez-nous</h3>
          <div className="flex gap-3 text-xl justify-center md:justify-start">
            <a
              href="https://x.com/sotetelcom"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <i className="bi bi-twitter-x" />
            </a>
            <a
              href="https://www.facebook.com/SotetelSmartEnabler/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <i className="bi bi-facebook" />
            </a>
            <a
              href="https://tn.linkedin.com/company/sotetel"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400"
            >
              <i className="bi bi-linkedin" />
            </a>
            <a
              href="https://www.youtube.com/@sotetel890"
              target="_blank"
              rel="noreferrer"
              className="hover:text-red-400"
            >
              <i className="bi bi-youtube" />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-black/10 pt-3 text-center text-xs text-black/60 font-medium">
        © {new Date().getFullYear()} SOTETEL. Tous droits réservés.
      </div>
    </footer>
  );
}

export default Footer;
