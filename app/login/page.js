import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import AuthForm from "../../components/AuthForm.js";

export const metadata = {
  title: "Log in — Kampot Durian",
  description: "Log in to the Kampot Durian field guide.",
  robots: { index: false },
};

export default function Login() {
  return (
    <>
      <a className="skip" href="#login">Skip to the form</a>
      <SiteNav current="/login" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Contributors</SectionLabel>
          <h1 className="headline-sm">Log in.</h1>
          <p className="sub">
            An account is for contributing to the guide. Reading it needs
            nothing — every entry stays open to anyone who arrives.
          </p>
        </div>
      </header>

      <main className="section" id="login">
        <div className="inner reading">
          <AuthForm mode="login" />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
