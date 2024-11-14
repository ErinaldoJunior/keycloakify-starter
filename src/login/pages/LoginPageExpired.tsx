import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import damiaD from "../assets/img/damia-D.png";
import damiaSofa from "../assets/img/sofa.png";
import miniLogoMeta from "../assets/img/Meta-M-logo.svg";
import { useState, useEffect } from "react";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

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
            headerNode={msg("pageExpiredTitle")}
        >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                <p id="instruction1" className="instruction">
                    {msg("pageExpiredMsg1")}
                    <a style={{ marginLeft: "4px" }} id="loginRestartLink" href={url.loginRestartFlowUrl}>
                        click here.
                    </a>
                </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                <p id="instruction1" className="instruction">
                    {msg("pageExpiredMsg2")}
                    <a style={{ marginLeft: "4px" }} className="Body1" id="loginContinueLink" href={url.loginAction}>
                        click here.
                    </a>
                </p>
            </div>
            {/* <p id="instruction1" className="instruction">
                {msg("pageExpiredMsg1")}
                <a id="loginRestartLink" href={url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </a>{" "}
                .<br />
                {msg("pageExpiredMsg2")}{" "}
                <a id="loginContinueLink" href={url.loginAction}>
                    {msg("doClickHere")}
                </a>{" "}
                .
            </p> */}
        </Template>
    );
}
