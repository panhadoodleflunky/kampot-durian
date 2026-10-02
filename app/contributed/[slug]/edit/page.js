import SiteNav from "../../../../components/SiteNav.js";
import SiteFooter from "../../../../components/SiteFooter.js";
import SectionLabel from "../../../../components/SectionLabel.js";
import EditEntryForm from "../../../../components/EditEntryForm.js";

export const metadata = {
  title: "Edit a note — Kampot Durian",
  robots: { index: false },
};

/* A shell, like the field-note edit page: the contributions update policy
   decides who may save. */
export default async function EditCommunityNote({ params }) {
  const { slug } = await params;

  return (
    <>
      <SiteNav current="/contributed" />

      <header className="page-head">
        <div className="inner">
          <SectionLabel no="01">Community Notes</SectionLabel>
          <h1 className="headline-sm">Edit your note.</h1>
        </div>
      </header>

      <main className="section" id="edit">
        <div className="inner reading">
          <EditEntryForm table="contributions" basePath="/contributed" slug={slug} />
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
