import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import AuthForm from "../../components/AuthForm.js";

export const metadata = {
  title: "Sign up — Kampot Durian",
  description: "Create an account to contribute to the Kampot Durian field guide.",
  robots: { index: false },
};

export default function Signup() {
  return (
    <>
      <SiteNav current="/signup" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Contributors</SectionLabel>
          <h1 className="headline-sm">Sign up.</h1>
          <p className="sub">
            An email address and a password, and nothing else is asked for. The
            guide is a record of testimony from named people, so an account
            here is a name that will sit beside what it contributes.
          </p>
        </div>
      </header>

      <main className="section" id="signup">
        <div className="inner reading">
          <AuthForm mode="signup" />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
