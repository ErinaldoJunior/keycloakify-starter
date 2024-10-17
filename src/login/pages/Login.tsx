import { useState, useEffect, useReducer } from "react";
import { kcSanitize } from "keycloakify/lib/kcSanitize";
import { assert } from "keycloakify/tools/assert";
import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { getKcClsx, type KcClsx } from "keycloakify/login/lib/kcClsx";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Eye, EyeOff, CircleAlert } from "lucide-react";
import { IconButton } from "@mui/material";
import "../assets/css/global.css";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const { social, realm, url, usernameHidden, login, auth, registrationDisabled, messagesPerField } = kcContext;

    const { msg, msgStr } = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    // header config
    const [companyName, setCompanyName] = useState<string | undefined>(undefined);
    const [companyText, setCompanyText] = useState<string | undefined>(undefined);
    const [companyLogo, setCompanyLogo] = useState<string | undefined>(undefined);
    const [companyMiniLogo, setCompanyMiniLogo] = useState<string | undefined>(undefined);
    const [companyD, setCompanyD] = useState<string | undefined>(undefined);
    const [companySofa, setCompanySofa] = useState<string | undefined>(undefined);

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        const t = kcContext.themeName;
        switch (t) {
            case "meta":
                setCompanyName("We Are Meta!");
                setCompanyText("Manage tour support requests like a Rhino! 💪");
                setCompanyLogo("/public/assets/img/logo-meta_2024_2.png");
                setCompanyMiniLogo("/public/assets/img/Meta-M-logo.svg");
                setCompanyD("");
                setCompanySofa("");
                break;

            case "damia-group":
                setCompanyName("Damia Group!");
                setCompanyText("Manage your support requests in a breeze! 😎");
                setCompanyLogo("/public/assets/img/logo-damia.png");
                setCompanyMiniLogo("");
                setCompanyD("/public/assets/img/damia-D.png");
                setCompanySofa("/public/assets/img/sofa.png");
                break;

            default:
                break;
        }
    }, [kcContext.themeName]);

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            companyName={companyName}
            companyText={companyText}
            companyLogo={companyLogo}
            companyMiniLogo={companyMiniLogo}
            companyD={companyD}
            companySofa={companySofa}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            displayMessage={!messagesPerField.existsError("username", "password")}
            headerNode={msg("loginAccountTitle")}
            displayInfo={realm.password && realm.registrationAllowed && !registrationDisabled}
            infoNode={
                <div id="kc-registration-container">
                    <div id="kc-registration">
                        <span className="Body2">
                            {msg("noAccount")}{" "}
                            <a tabIndex={8} href={url.registrationUrl}>
                                {msg("doRegister")}
                            </a>
                        </span>
                    </div>
                </div>
            }
            socialProvidersNode={
                <>
                    {realm.password && social?.providers !== undefined && social.providers.length !== 0 && (
                        <div id="kc-social-providers" className={kcClsx("kcFormSocialAccountSectionClass")}>
                            <hr />
                            <h2>{msg("identity-provider-login-label")}</h2>
                            <ul className={kcClsx("kcFormSocialAccountListClass", social.providers.length > 3 && "kcFormSocialAccountListGridClass")}>
                                {social.providers.map((...[p, , providers]) => (
                                    <li key={p.alias}>
                                        <a
                                            id={`social-${p.alias}`}
                                            className={kcClsx(
                                                "kcFormSocialAccountListButtonClass",
                                                providers.length > 3 && "kcFormSocialAccountGridItem"
                                            )}
                                            type="button"
                                            href={p.loginUrl}
                                        >
                                            {p.iconClasses && <i className={clsx(kcClsx("kcCommonLogoIdP"), p.iconClasses)} aria-hidden="true"></i>}
                                            <span
                                                className={clsx(kcClsx("kcFormSocialAccountNameClass"), p.iconClasses && "kc-social-icon-text")}
                                                dangerouslySetInnerHTML={{ __html: kcSanitize(p.displayName) }}
                                            ></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            }
        >
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    {realm.password && (
                        <form
                            id="kc-form-login"
                            onSubmit={() => {
                                setIsLoginButtonDisabled(true);
                                return true;
                            }}
                            action={url.loginAction}
                            method="post"
                        >
                            {!usernameHidden && (
                                <div className={kcClsx("kcFormGroupClass")}>
                                    <label htmlFor="username" className="Input-label-text">
                                        {/* {!realm.loginWithEmailAllowed
                                            ? msg("username")
                                            : !realm.registrationEmailAsUsername
                                              ? msg("usernameOrEmail")
                                              : msg("email")} */}
                                        Email address
                                    </label>
                                    <TextField
                                        tabIndex={2}
                                        id="username"
                                        className="inputLogin"
                                        name="username"
                                        defaultValue={login.username ?? ""}
                                        type="text"
                                        placeholder="example@email.com"
                                        autoFocus
                                        autoComplete="username"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                        error={messagesPerField.existsError("username", "password")}
                                    />
                                </div>
                            )}

                            <div className={kcClsx("kcFormGroupClass")}>
                                <label htmlFor="password" className="Input-label-text">
                                    {msg("password")}
                                </label>
                                <OutlinedInput
                                    tabIndex={3}
                                    id="password"
                                    className="inputLogin"
                                    name="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    error={messagesPerField.existsError("username", "password")}
                                    endAdornment={
                                        messagesPerField.existsError("username", "password") ? (
                                            <InputAdornment position="end">
                                                <IconButton edge="end" disabled>
                                                    <CircleAlert color="red" width={16} />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    onMouseUp={handleMouseUpPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <EyeOff color="#353232" width={16} /> : <Eye color="#353232" width={16} />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }
                                />
                                {/* <input
                                        tabIndex={3}
                                        id="password"
                                        className={kcClsx("kcInputClass")}
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={messagesPerField.existsError("username", "password")}
                                    /> */}
                                {usernameHidden && messagesPerField.existsError("username", "password") && (
                                    <span
                                        id="input-error"
                                        className={kcClsx("kcInputErrorMessageClass")}
                                        aria-live="polite"
                                        dangerouslySetInnerHTML={{
                                            __html: kcSanitize(messagesPerField.getFirstError("username", "password"))
                                        }}
                                    />
                                )}
                            </div>

                            <div className={kcClsx("kcFormGroupClass", "kcFormSettingClass")}>
                                <div id="kc-form-options">
                                    {realm.rememberMe && !usernameHidden && (
                                        <div className="checkbox">
                                            <label>
                                                <input
                                                    tabIndex={5}
                                                    id="rememberMe"
                                                    name="rememberMe"
                                                    type="checkbox"
                                                    defaultChecked={!!login.rememberMe}
                                                />{" "}
                                                <span className="rememberText">{msg("rememberMe")}</span>
                                            </label>
                                        </div>
                                    )}
                                </div>
                                <div className={kcClsx("kcFormOptionsWrapperClass")}>
                                    {realm.resetPasswordAllowed && (
                                        <span className="Body2">
                                            <a tabIndex={6} href={url.loginResetCredentialsUrl}>
                                                {msg("doForgotPassword")}
                                            </a>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div id="kc-form-buttons" className={kcClsx("kcFormGroupClass")}>
                                <input type="hidden" id="id-hidden-input" name="credentialId" value={auth.selectedCredential} />
                                {/* <input
                                    tabIndex={7}
                                    disabled={isLoginButtonDisabled}
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonBlockClass", "kcButtonLargeClass")}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                    value="Login"
                                /> */}
                                <Button
                                    variant="contained"
                                    tabIndex={7}
                                    className="loginBtn"
                                    disabled={isLoginButtonDisabled}
                                    name="login"
                                    id="kc-login"
                                    type="submit"
                                >
                                    Login
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </Template>
    );
}

function PasswordWrapper(props: { kcClsx: KcClsx; i18n: I18n; passwordInputId: string; children: JSX.Element }) {
    const { kcClsx, i18n, passwordInputId, children } = props;

    const { msgStr } = i18n;

    const [isPasswordRevealed, toggleIsPasswordRevealed] = useReducer((isPasswordRevealed: boolean) => !isPasswordRevealed, false);

    useEffect(() => {
        const passwordInputElement = document.getElementById(passwordInputId);

        assert(passwordInputElement instanceof HTMLInputElement);

        passwordInputElement.type = isPasswordRevealed ? "text" : "password";
    }, [isPasswordRevealed]);

    return (
        <div className={kcClsx("kcInputGroup")}>
            {children}
            {/* <button
                type="button"
                className={kcClsx("kcFormPasswordVisibilityButtonClass")}
                aria-label={msgStr(isPasswordRevealed ? "hidePassword" : "showPassword")}
                aria-controls={passwordInputId}
                onClick={toggleIsPasswordRevealed}
            >
                <i className={kcClsx(isPasswordRevealed ? "kcFormPasswordVisibilityIconHide" : "kcFormPasswordVisibilityIconShow")} aria-hidden />
            </button> */}
        </div>
    );
}
