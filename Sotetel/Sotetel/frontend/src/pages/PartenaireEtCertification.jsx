import { useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';  
import { useLocation } from "react-router-dom";

export default function PartenaireEtCertification() {
  const location = useLocation();
  const showUI = false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const partners = [
    "/assets/partners/tt.png",
    "/assets/partners/nexans.png",
    "/assets/partners/tmi.png",
    "/assets/partners/bws.png",
    "/assets/partners/soroubat.png",
    "/assets/partners/cisco.png",
    "/assets/partners/huawei.png",
    "/assets/partners/hp.png",
    "/assets/partners/vmware.png",
    "/assets/partners/dell.png",
    "/assets/partners/grandstream.png",
  ];

  const certifications = [
    "/assets/certs/ccie.png",
    "/assets/certs/ccnp-1.png",
    "/assets/certs/ccnp-2.png",
    "/assets/certs/ccnp-3.png",
    "/assets/certs/ccdp.png",
    "/assets/certs/ccna-security.png",
    "/assets/certs/ccna-wireless.png",
    "/assets/certs/ccda.png",
    "/assets/certs/huawei.png",
    "/assets/certs/hp-business.png",
    "/assets/certs/vmware.png",
    "/assets/certs/iso-27001.png",
    "/assets/certs/lightning.png",
    "/assets/certs/safety.png",
    "/assets/certs/eco.png",
    "/assets/certs/security.png",
    "/assets/certs/haccp.png",
    "/assets/certs/tspm.png",
    "/assets/certs/pim.png",
    "/assets/certs/iso-9001.png",
  ];

  return (
    <>
      <Navbar showUI={showUI} />

      <div className="animate-fancy-in">
        {/* Secondary Navbar */}
      <section
        className="relative h-60 flex items-center justify-start px-10 mt-16"
        style={{
          backgroundImage: "url('/assets/about-banner.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white/70 p-4 rounded-lg ml-32">
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">À propos</h1>
          <nav className="text-sm text-black space-x-2">
            <a href="/client" className="underline text-black hover:text-red-600">Accueil</a>
            <span>›</span>
            <a href="/client" className="underline text-black hover:text-red-600">Sotetel</a>
            <span>›</span>
            <a href="/PartenaireEtCertification" className="underline text-black hover:text-red-600">Partenaire＆Certification</a>
          </nav>
        </div>
      </section>

       
        {/* Partners */}
        <section className="py-12 animate-fancy-in delay-100">
          <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Partenaires</h2>
          <div className="mx-auto max-w-5xl grid grid-cols-4 gap-x-6 gap-y-6 justify-items-center">
            {partners.map((logo, idx) => (
              <div
                key={idx}
                className="w-24 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all"
              >
                <img
                  src={logo}
                  alt={`Partner ${idx + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="py-12 animate-fancy-in delay-200">
          <h2 className="text-3xl font-bold text-red-600 mb-8 text-center">Certifications ▪</h2>
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid grid-cols-4 gap-px bg-gray-250">
              {certifications.map((src, index) => (
                <div
                  key={index}
                  className="bg-white flex items-center justify-center h-32"
                >
                  <img
                    src={src}
                    alt={`Cert ${index + 1}`}
                    className="max-h-28 max-w-full object-contain p-2 grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
                 <Footer />
      </div>
    </>
  );
}
