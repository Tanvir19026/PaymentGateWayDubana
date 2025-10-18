import {
  FaFacebookF,
  FaLinkedinIn,
  FaLocationArrow,
  FaMailBulk,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import LogoSection from "../LogoSection/LogoSection";

const Footer = () => {
  return (
    <footer className="bg-[#012077] text-white mt-[10vh] w-full py-8 px-6 md:px-10 lg:px-16">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Logo + Description */}
        <div className="flex-1">
          <LogoSection variant="footer" />
          <p className="text-sm mt-5 w-full md:w-[80%] leading-relaxed">
            Connecting Innovation, Culture, and Community – Uniting
            Bangladeshi-American tech professionals to foster creativity,
            celebrate our heritage, and build meaningful connections that drive
            personal and professional growth.
          </p>
        </div>

        {/* Social Media Section */}
        <div className="flex-1 lg:text-right">
          <p className="font-semibold text-lg">Social Media</p>
          <div className="flex flex-wrap justify-start lg:justify-end items-center gap-4 mt-5">
            <FaFacebookF className="rounded-md p-2 text-xl bg-[#012077] border border-white w-[36px] h-[36px] hover:bg-white hover:text-[#012077] transition-all duration-300" />
            <FaLinkedinIn className="rounded-md p-2 text-xl bg-[#012077] border border-white w-[36px] h-[36px] hover:bg-white hover:text-[#012077] transition-all duration-300" />
            <FaYoutube className="rounded-md p-2 text-xl bg-[#012077] border border-white w-[36px] h-[36px] hover:bg-white hover:text-[#012077] transition-all duration-300" />
            <FaTwitter className="rounded-md p-2 text-xl bg-[#012077] border border-white w-[36px] h-[36px] hover:bg-white hover:text-[#012077] transition-all duration-300" />
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="mt-8 border-b border-white pb-4 flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-4 text-sm text-center sm:text-left">
        <div className="flex items-center gap-2">
          <FaPhoneAlt />
          <p>+8801600180756</p>
        </div>
        <div className="flex items-center gap-2">
          <FaMailBulk />
          <p>tanvirrafi1999@gmail.com</p>
        </div>
        <div className="flex items-center gap-2">
          <FaLocationArrow />
          <p>Muktagacha, Mymensingh</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-5 text-center text-sm opacity-90">
        <p>© 2025 Dubana. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
