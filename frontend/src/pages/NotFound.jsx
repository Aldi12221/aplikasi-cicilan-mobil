import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <main>
    <div className="d-flex align-items-center justify-content-center vh-100 vw-100 bg-dark text-white position-relative overflow-hidden">
      {/* Background Animasi */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.15) 10%, transparent 10%)",
          backgroundSize: "50px 50px",
          animation: "moveBg 12s linear infinite",
          zIndex: 0,
        }}
      ></div>

      {/* Konten 404 */}
      <div className="text-center position-relative" style={{ zIndex: 1 }}>
        <h1 className="display-1 fw-bold animate-pulse">404</h1>
        <p className="fs-4 mb-4">Oops! Halaman yang kamu cari tidak ditemukan.</p>
        <Link to="/" className="btn btn-light btn-lg fw-bold shadow">
          ← Kembali ke Beranda
        </Link>
      </div>
    </div>
    </main>
  );
}

// Tambahkan animasi langsung ke CSS di runtime
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes moveBg {
  from { transform: translate(0, 0); }
  to { transform: translate(50px, 50px); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes animate-pulse {
  0%, 100% { text-shadow: 0 0 20px rgba(255,255,255,0.8); }
  50% { text-shadow: 0 0 40px rgba(255,255,255,1); }
}
`, styleSheet.cssRules.length);
