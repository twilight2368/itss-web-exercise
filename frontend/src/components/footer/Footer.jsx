import { useTranslation } from "react-i18next";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Logo from "../logo/Logo";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="w-full py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Placeholder */}
          <div className="col-span-1">
            {/* Logo Component will go here */}
            <div className="h-16 w-full flex items-center justify-center">
              <Logo />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-bold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-600">
                  {t("footer.home")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  {t("footer.about")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  {t("footer.services")}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600">
                  {t("footer.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-bold mb-4">{t("footer.contactUs")}</h4>
            <div className="space-y-2">
              <p>{t("footer.email")}: support@regress.com</p>
              <p>{t("footer.phone")}: +1 (555) 123-4567</p>
              <p>{t("footer.address")}: 123 Fitness Street, Wellness City</p>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h4 className="font-bold mb-4">{t("footer.followUs")}</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-600">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-blue-600">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-blue-600">
                <FaInstagram />
              </a>
              <a href="#" className="text-2xl hover:text-blue-600">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-sm mb-3">
            © {new Date().getFullYear()} Regress.{" "}
            {t("footer.allRightsReserved")}
          </p>
          <p className="text-sm">
            <span>Dev by</span>
            <a href="https://github.com/twilight2368" target="_blank">
              🚀Twilight2368
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
