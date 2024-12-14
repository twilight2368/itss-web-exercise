import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { IoHome } from "react-icons/io5";
import { useTranslation } from "react-i18next";
export default function BreadcrumbMain() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { t } = useTranslation();
  const handleClick = (event, href) => {
    event.preventDefault();
    navigate(href);
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <div>
        <IoHome />
      </div>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={to} color="black">
            {t(`links.${value}`)}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="inherit"
            href={to}
            onClick={(e) => handleClick(e, to)}
            key={to}
          >
            {t(`links.${value}`)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
