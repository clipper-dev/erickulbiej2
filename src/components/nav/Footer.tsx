import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 bg-gray-900 flex flex-col items-center">
      <div className="w-full max-w-screen-lg  flex flex-col">        
        <p className="text-white text-lg font-semibold">Copyright Eric Kulbiej, {currentYear}</p>
        <p className="text-zinc-400">Made with ❤ in Szczecin, PL</p>
      </div>
    </footer>
  );
}

export default Footer;
