import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import logoMeta from "../assets/img/logo-meta_2024_2.png";
import logoDamia from "../assets/img/logo-damia.png";
import damiaD from "../assets/img/damia-D.png";
import damiaSofa from "../assets/img/sofa.png";
import miniLogoMeta from "../assets/img/Meta-M-logo.svg";
import { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { ChevronLeftIcon, CircleAlert } from "lucide-react";
import Button from "@mui/material/Button";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, { pageId: "login-reset-password.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { url, realm, auth, messagesPerField } = kcContext;

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
                setHeaderTitle("Forgot your password? 🔒");
                setHeaderText("Enter your email and we’ll sent you the instructions to reset your password!");
                setCompanyLogo(logoMeta);
                setCompanyMiniLogo(miniLogoMeta);
                setCompanyD("");
                setCompanySofa("");
                break;

            case "damia-group":
                setHeaderTitle("Forgot your password? 🔒");
                setHeaderText("Enter your email and we’ll sent you the instructions to reset your password!");
                setCompanyLogo(logoDamia);
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
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            headerTitle={headerTitle}
            headerText={headerText}
            companyLogo={companyLogo}
            companyMiniLogo={companyMiniLogo}
            companyD={companyD}
            companySofa={companySofa}
            displayInfo
            displayMessage={!messagesPerField.existsError("username")}
            infoNode={realm.duplicateEmailsAllowed ? msg("emailInstructionUsername") : msg("emailInstruction")}
            headerNode={msg("emailForgotTitle")}
        >
            <form id="kc-reset-password-form" className={kcClsx("kcFormClass")} action={url.loginAction} method="post">
                <div className={kcClsx("kcFormGroupClass")}>
                    <div className={kcClsx("kcLabelWrapperClass")}>
                        <label htmlFor="username" className="Input-label-text">
                            {/* {!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                  ? msg("usernameOrEmail")
                                  : msg("email")} */}
                            Email address
                        </label>
                    </div>
                    <div className={kcClsx("kcInputWrapperClass")}>
                        <OutlinedInput
                            type="text"
                            id="username"
                            name="username"
                            className="inputLogin"
                            autoFocus
                            placeholder="example@email.com"
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                            error={messagesPerField.existsError("username")}
                            endAdornment={
                                messagesPerField.existsError("username", "password") ? (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" disabled>
                                            <CircleAlert color="red" width={16} />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null
                            }
                        />
                        {/* <input
                            type="text"
                            id="username"
                            name="username"
                            className={kcClsx("kcInputClass")}
                            autoFocus
                            defaultValue={auth.attemptedUsername ?? ""}
                            aria-invalid={messagesPerField.existsError("username")}
                        /> */}
                        {messagesPerField.existsError("username") && (
                            <span
                                id="input-error-username"
                                className={kcClsx("kcInputErrorMessageClass")}
                                aria-live="polite"
                                dangerouslySetInnerHTML={{
                                    __html: kcSanitize(messagesPerField.get("username"))
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                    <div id="kc-form-buttons" className={kcClsx("kcFormButtonsClass")}>
                        {/* <input
                            className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                            type="submit"
                            value={msgStr("doSubmit")}
                        /> */}
                        <Button variant="contained" className="loginBtn resetLinkText" type="submit">
                            Send reset link
                        </Button>
                    </div>
                    <div id="kc-form-options" className={kcClsx("kcFormOptionsClass")}>
                        <div className={kcClsx("kcFormOptionsWrapperClass")}>
                            <div>
                                <a href={url.loginUrl} className="backToLoginWrapper">
                                    <ChevronLeftIcon size={18} /> <span className="backToLogin">Back to login</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Template>
    );
}
