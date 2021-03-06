import React from "react";
import { useTranslation } from "react-i18next";
import { LINK_SEPARATOR } from "../../src/utils/constants/applicationConstants";
import withSeparator from "../../src/utils/functions/withSeparator";
import ExternalLink from "../misc/ExternalLink";
import InternalLink from "../misc/InternalLink";

const Legal = () => {
  const { t } = useTranslation();

  return (
    <>
      <p>
        {withSeparator(
          [
            <InternalLink href="/imprint">
              <a>{t("footer.imprint")}</a>
            </InternalLink>,
            <InternalLink href="/privacy">
              <a>{t("footer.privacy")}</a>
            </InternalLink>,
            <InternalLink href="/terms">
              <a>{t("footer.terms")}</a>
            </InternalLink>,
            <InternalLink href="/cookies">
              <a> {t("cookies.manageCookies")}</a>
            </InternalLink>,
          ],
          LINK_SEPARATOR
        )}
      </p>
      <p>
        {withSeparator(
          [
            <>
              © 2020 - {new Date().getFullYear()} Lukas Weidich, Joyce Marvin
              Rafflenbeul
            </>,
            <>
              {t("footer.publisher") + " "}
              <ExternalLink href="https://quikk.de">QUIKK</ExternalLink>
            </>,
            <ExternalLink href="https://quikk.de/kontakt">
              {t("footer.contact")}
            </ExternalLink>,
          ],
          LINK_SEPARATOR
        )}
      </p>
    </>
  );
};

export default Legal;
