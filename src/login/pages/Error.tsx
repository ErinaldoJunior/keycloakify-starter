import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useEffect, useState } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import damiaD from "../assets/img/damia-D.png";
import damiaSofa from "../assets/img/sofa.png";
import miniLogoMeta from "../assets/img/Meta-M-logo.svg";
import { ChevronLeftIcon } from "lucide-react";

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client, skipLink } = kcContext;

    const { msg } = i18n;

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
                setHeaderTitle("");
                setHeaderText("");
                setCompanyLogo("");
                setCompanyMiniLogo(miniLogoMeta);
                setCompanyD("");
                setCompanySofa("");
                break;

            case "damia-group":
                setHeaderTitle("");
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
            displayMessage={false}
            headerNode={msg("errorTitle")}
        >
            <div id="kc-error-message">
                <p className="instruction" dangerouslySetInnerHTML={{ __html: kcSanitize(message.summary) }} />
                {!skipLink && client !== undefined && client.baseUrl !== undefined && (
                    <p>
                        <a id="backToApplication" href={client.baseUrl} className="backToLoginWrapper">
                            {/* {msg("backToApplication")} */}
                            <ChevronLeftIcon size={18} /> <span className="backToLogin">Back to Application</span>
                        </a>
                    </p>
                )}
            </div>
        </Template>
    );
}
