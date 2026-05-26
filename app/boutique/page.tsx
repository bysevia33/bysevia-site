import Image from "next/image";
import DynamicBackground from "@/components/DynamicBackground";

export default function BoutiquePage() {
  return (
    <main
      className="min-h-screen pt-24 pb-20 relative"
      style={{
        background: "linear-gradient(180deg, #0D1B3E 0%, #061020 100%)",
      }}
    >
      <DynamicBackground />
      <div style={{ position: "relative", zIndex: 10 }}>
      {/* Header */}
      <div className="text-center px-4 mb-16">
        <h1
          className="font-cinzel text-3xl md:text-4xl font-black glow-cyan mb-4"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
        >
          MON UNIVERS CRÉATIF
        </h1>
        <p
          className="font-cinzel text-lg glow-or"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#C9A84C" }}
        >
          Art Numérique &amp; Peintures Originales
        </p>
        <div
          className="mx-auto mt-4 h-px w-48"
          style={{ background: "linear-gradient(to right, transparent, #00B4D8, transparent)" }}
        />
      </div>

      {/* Two Sections */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* NFT Section */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(135deg, rgba(0,180,216,0.08), rgba(13,27,62,0.95))",
            border: "1px solid rgba(0,180,216,0.4)",
            boxShadow: "0 0 40px rgba(0,180,216,0.1)",
          }}
        >
          <div className="relative w-full" style={{ height: "500px" }}>
            <Image
              src="/MONDES BYSEVIA/PERSONNAGES/SAHALI.PNG"
              alt="SAHALI NFT"
              fill
              className="object-cover object-top"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 30%, rgba(13,27,62,0.75) 60%, rgba(13,27,62,0.97) 100%)",
              }}
            />
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full font-cinzel text-xs font-bold"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                background: "rgba(0,180,216,0.3)",
                border: "1px solid rgba(0,180,216,0.6)",
                color: "#F0F4FF",
                backdropFilter: "blur(8px)",
              }}
            >
              NFT
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
              <h2
                className="font-cinzel text-2xl font-black glow-cyan mb-3"
                style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
              >
                NFT BY SEVIA
              </h2>
              <p className="text-sm leading-relaxed mb-6 opacity-90" style={{ color: "#F0F4FF" }}>
                Possédez une partie de l&apos;univers féerique en NFT sur OpenSea. Chaque œuvre
                numérique est unique, créée par l&apos;artiste Séverine BIRS. Des personnages féeriques
                aux paysages bioluminescents, plongez dans la magie numérique.
              </p>
              <a
                href="https://opensea.io/fr/BySevIA"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow flex items-center justify-center gap-3 px-8 py-4 rounded-full font-cinzel font-bold tracking-widest text-sm transition-all hover:scale-105"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  background: "linear-gradient(135deg, rgba(0,180,216,0.2), rgba(0,180,216,0.05))",
                  border: "1px solid rgba(0,180,216,0.5)",
                  color: "#F0F4FF",
                }}
              >
              <svg width="20" height="20" viewBox="0 0 90 90" fill="#F0F4FF">
                <path d="M45 0C20.151 0 0 20.151 0 45C0 69.849 20.151 90 45 90C69.849 90 90 69.849 90 45C90 20.151 69.858 0 45 0ZM22.203 46.512L22.392 46.206L34.101 27.891C34.272 27.63 34.677 27.657 34.803 27.945C36.756 32.262 38.439 37.782 37.656 41.175C37.323 42.57 36.396 44.46 35.352 46.206C35.217 46.458 35.073 46.71 34.911 46.953C34.839 47.061 34.713 47.124 34.578 47.124H22.545C22.221 47.124 22.032 46.773 22.203 46.512ZM74.376 52.812C74.376 52.983 74.277 53.127 74.133 53.19C73.224 53.577 70.119 55.008 68.832 56.799C65.538 61.38 63.027 67.932 57.402 67.932H33.948C25.632 67.932 18.9 61.173 18.9 52.83V52.56C18.9 52.344 19.08 52.164 19.305 52.164H32.373C32.634 52.164 32.823 52.407 32.805 52.659C32.706 53.505 32.868 54.378 33.273 55.17C34.047 56.745 35.658 57.726 37.395 57.726H43.866V52.677H37.467C37.143 52.677 36.945 52.308 37.134 52.047C37.206 51.939 37.278 51.831 37.368 51.705C37.971 50.841 38.835 49.491 39.699 47.97C40.284 46.944 40.851 45.846 41.31 44.748C41.4 44.55 41.472 44.343 41.553 44.145C41.679 43.794 41.805 43.461 41.895 43.137C41.985 42.858 42.066 42.57 42.138 42.3C42.354 41.364 42.444 40.374 42.444 39.348C42.444 38.943 42.426 38.52 42.39 38.124C42.372 37.683 42.318 37.242 42.264 36.801C42.228 36.414 42.156 36.027 42.084 35.631C41.985 35.046 41.859 34.461 41.715 33.876L41.661 33.651C41.553 33.246 41.454 32.868 41.328 32.472C40.968 31.203 40.545 29.97 40.095 28.818C39.933 28.377 39.753 27.963 39.573 27.549C39.303 26.91 39.033 26.325 38.772 25.794C38.637 25.533 38.52 25.29 38.403 25.038C38.268 24.759 38.133 24.489 37.998 24.228C37.908 24.039 37.8 23.868 37.728 23.697L36.963 22.338C36.855 22.149 37.035 21.924 37.242 21.978L41.967 23.238H41.985C41.994 23.238 41.994 23.238 42.003 23.238L42.615 23.409L43.290 23.598L43.560 23.670V20.574C43.560 19.089 44.748 17.892 46.215 17.892C46.944 17.892 47.601 18.198 48.060 18.678C48.519 19.158 48.798 19.818 48.798 20.574V25.083L49.284 25.218C49.320 25.236 49.356 25.263 49.383 25.290C49.491 25.371 49.644 25.497 49.833 25.641C49.977 25.758 50.130 25.902 50.328 26.046C50.715 26.352 51.192 26.739 51.714 27.198C51.849 27.315 51.975 27.432 52.083 27.549C52.713 28.116 53.415 28.782 54.099 29.511C54.288 29.700 54.468 29.898 54.657 30.105C54.846 30.312 55.044 30.519 55.224 30.726C55.458 31.014 55.710 31.311 55.926 31.617C56.034 31.770 56.160 31.932 56.268 32.085C56.556 32.490 56.808 32.913 57.060 33.327C57.168 33.525 57.285 33.732 57.384 33.930C57.672 34.497 57.924 35.073 58.113 35.649C58.176 35.820 58.221 36.000 58.266 36.171V36.207C58.410 36.756 58.473 37.332 58.473 37.908C58.473 38.430 58.410 38.952 58.293 39.456C58.185 39.978 58.005 40.482 57.780 40.968C57.348 41.985 56.718 42.939 55.908 43.785C55.665 44.046 55.404 44.298 55.125 44.532C54.846 44.775 54.567 44.991 54.270 45.189C53.919 45.423 53.550 45.621 53.181 45.792C52.812 45.963 52.425 46.098 52.020 46.188V46.215C51.867 46.251 51.714 46.260 51.570 46.260H48.798V52.677H52.065C52.335 52.677 52.605 52.587 52.839 52.434C53.604 51.912 55.530 50.526 56.394 48.939C56.448 48.831 56.511 48.732 56.574 48.624L56.673 48.561H56.700L67.311 50.580C67.644 50.643 67.770 51.039 67.527 51.261L66.960 51.780C66.798 51.939 66.645 52.083 66.474 52.236C66.204 52.470 65.898 52.704 65.592 52.947C65.421 53.082 65.241 53.208 65.061 53.352L64.350 53.892C64.170 54.018 63.999 54.153 63.819 54.288C63.639 54.414 63.459 54.549 63.279 54.675C63.099 54.801 62.919 54.927 62.739 55.044C62.424 55.251 62.109 55.449 61.794 55.629C61.128 56.025 60.453 56.394 59.769 56.763C59.445 56.943 59.112 57.114 58.788 57.267C58.464 57.420 58.131 57.555 57.798 57.681C57.474 57.807 57.141 57.924 56.799 58.032C56.457 58.140 56.115 58.248 55.764 58.320C55.278 58.428 54.792 58.500 54.306 58.536C53.964 58.554 53.613 58.572 53.271 58.563C53.073 58.563 52.875 58.554 52.677 58.527H52.605C52.290 58.491 51.975 58.428 51.660 58.347V63.828H43.866V58.320H43.155C42.966 58.320 42.777 58.311 42.597 58.284C42.201 58.230 41.814 58.122 41.454 57.969C41.085 57.807 40.734 57.618 40.419 57.375C39.762 56.898 39.195 56.259 38.808 55.476C38.412 54.693 38.205 53.829 38.205 52.938V52.677H25.713C25.677 52.677 25.641 52.677 25.605 52.668C25.479 52.641 25.362 52.578 25.281 52.479C25.191 52.371 25.146 52.236 25.155 52.101V46.035C25.155 45.810 25.299 45.621 25.515 45.558L34.218 43.146C34.218 43.146 34.218 43.146 34.227 43.137C34.641 43.020 35.019 42.876 35.388 42.696C35.748 42.516 36.099 42.318 36.423 42.084C36.918 41.724 37.350 41.283 37.701 40.779C37.881 40.527 38.043 40.257 38.178 39.978C38.430 39.456 38.592 38.907 38.664 38.340C38.709 38.007 38.718 37.665 38.709 37.332C38.700 37.008 38.655 36.684 38.574 36.378C38.484 36.063 38.358 35.757 38.196 35.469C38.034 35.181 37.854 34.920 37.647 34.677C37.449 34.443 37.224 34.218 36.981 34.020C36.738 33.822 36.477 33.651 36.198 33.507C35.928 33.363 35.640 33.246 35.343 33.165C35.064 33.084 34.767 33.039 34.470 33.039C34.281 33.039 34.101 33.057 33.921 33.093L30.816 33.867C30.528 33.939 30.240 34.038 29.970 34.155C29.700 34.272 29.448 34.416 29.205 34.578C28.962 34.740 28.737 34.920 28.530 35.127C28.323 35.325 28.134 35.541 27.963 35.775C27.801 36.000 27.648 36.243 27.522 36.495C27.396 36.747 27.288 37.008 27.207 37.287C27.126 37.566 27.072 37.854 27.045 38.142C27.018 38.430 27.027 38.727 27.054 39.015C27.081 39.303 27.135 39.591 27.225 39.861C27.315 40.131 27.432 40.392 27.558 40.644C27.693 40.896 27.855 41.139 28.026 41.364C28.197 41.589 28.395 41.796 28.602 41.994C28.809 42.183 29.034 42.354 29.268 42.507C29.502 42.660 29.745 42.795 30.006 42.903C30.258 43.011 30.528 43.101 30.798 43.164L32.814 43.623L22.761 46.377C22.455 46.467 22.176 46.269 22.203 45.954V46.512Z" />
              </svg>
              EXPLORER sur OpenSea
              </a>
            </div>
          </div>
        </div>

        {/* Paintings Section */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(135deg, rgba(232,160,191,0.08), rgba(13,27,62,0.95))",
            border: "1px solid rgba(232,160,191,0.4)",
            boxShadow: "0 0 40px rgba(232,160,191,0.1)",
          }}
        >
          <div className="relative w-full" style={{ height: "500px" }}>
            <Image
              src="/PEINTURES/SAUVAGE.jpg"
              alt="SAUVAGE — Œuvre originale de Séverine BIRS"
              fill
              className="object-cover object-center"
              unoptimized
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, transparent 30%, rgba(13,27,62,0.75) 60%, rgba(13,27,62,0.97) 100%)",
              }}
            />
            <div
              className="absolute top-4 right-4 px-3 py-1 rounded-full font-cinzel text-xs font-bold"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                background: "rgba(232,160,191,0.3)",
                border: "1px solid rgba(232,160,191,0.6)",
                color: "#F0F4FF",
                backdropFilter: "blur(8px)",
              }}
            >
              ORIGINAL
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col">
              <h2
                className="font-cinzel text-2xl font-black glow-rose mb-3"
                style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
              >
                ŒUVRES ORIGINALES
              </h2>
              <p className="text-sm leading-relaxed mb-6 opacity-90" style={{ color: "#F0F4FF" }}>
                Découvrez les œuvres originales de Séverine BIRS sur ArtMajeur. Chaque toile est
                une pièce unique, entre art naïf et art contemporain — un univers de couleurs vives,
                de rêve et de positivité, inspiré par les voyages et la joie de vivre.
              </p>
              <a
                href="https://www.artmajeur.com/severine-birs"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-or flex items-center justify-center gap-3 px-8 py-4 rounded-full font-cinzel font-bold tracking-widest text-sm transition-all hover:scale-105"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  background: "linear-gradient(135deg, rgba(232,160,191,0.2), rgba(232,160,191,0.05))",
                  border: "1px solid rgba(232,160,191,0.5)",
                  color: "#F0F4FF",
                }}
              >
                🎨 DÉCOUVRIR sur ArtMajeur
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Extra info */}
      <div className="max-w-4xl mx-auto px-4 mt-16 text-center">
        <p
          className="font-cinzel text-sm opacity-60 tracking-wider"
          style={{ fontFamily: "var(--font-cinzel), serif", color: "#F0F4FF" }}
        >
          Toutes les œuvres sont créées par Séverine BIRS, artiste de l&apos;univers By SevIA
        </p>
      </div>
      </div>
    </main>
  );
}
