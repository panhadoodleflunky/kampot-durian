import SiteNav from "../../components/SiteNav.js";
import SiteFooter from "../../components/SiteFooter.js";
import SectionLabel from "../../components/SectionLabel.js";
import AccountPanel from "../../components/AccountPanel.js";

export const metadata = {
  title: "Your account — Kampot Durian",
  robots: { index: false },
};

export default function Account() {
  return (
    <>
      <SiteNav current="/account" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Contributors</SectionLabel>
          <h1 className="headline-sm">Your account.</h1>
        </div>
      </header>

      <main className="section" id="account">
        <div className="inner reading">
          <AccountPanel />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
