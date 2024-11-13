import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import damiaD from "../assets/img/damia-D.png";
import damiaSofa from "../assets/img/sofa.png";
import miniLogoMeta from "../assets/img/Meta-M-logo.svg";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";

export default function LoginIdpLinkConfirm(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;
    // header config
    const [headerTitle, setHeaderTitle] = useState<string | undefined>(undefined);
    const [headerText, setHeaderText] = useState<string | undefined>(undefined);
    const [companyLogo, setCompanyLogo] = useState<string | undefined>(undefined);
    const [companyMiniLogo, setCompanyMiniLogo] = useState<string | undefined>(undefined);
    const [companyD, setCompanyD] = useState<string | undefined>(undefined);
    const [companySofa, setCompanySofa] = useState<string | undefined>(undefined);

    useEffect(() => {
        const t = kcContext.themeName;
        switch (t) {
            case "meta":
                setHeaderTitle(" ");
                setHeaderText("");
                setCompanyLogo("");
                setCompanyMiniLogo(miniLogoMeta);
                setCompanyD("");
                setCompanySofa("");
                break;

            case "damia-group":
                setHeaderTitle(" ");
                setHeaderText("");
                setCompanyLogo("");
                setCompanyMiniLogo("");
                setCompanyD(damiaD);
                setCompanySofa(damiaSofa);
                break;

            default:
                break;
        }
    }, [kcContext.themeName]);

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template
            headerTitle={headerTitle}
            headerText={headerText}
            companyLogo={companyLogo}
            companyMiniLogo={companyMiniLogo}
            companyD={companyD}
            companySofa={companySofa}
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerNode={msg("confirmLinkIdpTitle")}
        >
            <form id="kc-register-form" action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")} style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
                    <Button variant="contained" id="updateProfile" value="updateProfile" name="submitAction" className="loginBtn" type="submit">
                        {msg("confirmLinkIdpReviewProfile")}
                    </Button>
                    <Button variant="contained" id="linkAccount" value="linkAccount" name="submitAction" className="loginBtn" type="submit">
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                    {/* <button
                        type="submit"
                        className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        name="submitAction"
                        id="updateProfile"
                        value="updateProfile"
                    >
                        {msg("confirmLinkIdpReviewProfile")}
                    </button>
                    <button
                        type="submit"
                        className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                        name="submitAction"
                        id="linkAccount"
                        value="linkAccount"
                    >
                        {msg("confirmLinkIdpContinue", idpAlias)}
                    </button> */}
                </div>
            </form>
        </Template>
    );
}
