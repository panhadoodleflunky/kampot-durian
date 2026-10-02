import SiteNav from "../../../../components/SiteNav.js";
import SiteFooter from "../../../../components/SiteFooter.js";
import SectionLabel from "../../../../components/SectionLabel.js";
import EditEntryForm from "../../../../components/EditEntryForm.js";

export const metadata = {
  title: "Edit an entry — Kampot Durian",
  robots: { index: false },
};

/* A shell only. Who may edit is decided in the browser for the form and by
   the update policy in the database for the save — nothing here reads a
   session, so nothing here can be trusted to. */
export default async function EditEntry({ params }) {
  const { slug } = await params;

  return (
    <>
      <SiteNav current="/field-notes" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Contributors</SectionLabel>
          <h1 className="headline-sm">Edit an entry.</h1>
        </div>
      </header>

      <main className="section" id="edit">
        <div className="inner reading">
          <EditEntryForm slug={slug} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
