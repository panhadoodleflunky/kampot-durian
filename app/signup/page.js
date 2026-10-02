import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import SignupForm from "../../components/SignupForm.js";

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
            An account lets you add notes to Community Notes, under your
            name, and edit or delete them later. The Field Notes stay the
            orchard&rsquo;s own. Your email and birthdate are never shown.
          </p>
        </div>
      </header>

      <main className="section" id="signup">
        <div className="inner reading">
          <SignupForm />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
