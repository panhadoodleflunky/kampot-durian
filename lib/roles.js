/* The curator's role lives in app_metadata, which a user cannot change
   (user_metadata they can). The browser reads it only to choose a shelf and
   to show buttons; if someone fakes it, the policies check the same claim in
   the database and refuse them.

   Since Sprint 3 (22 October 2026) the curator reviews community notes but
   no longer rewrites them: the brief says a reviewer approves entries and
   doesn't edit them. Who may review is the `reviewers` table, asked live
   through is_reviewer(); this file only decides which buttons to show. */
export const isCurator = (user) => user?.app_metadata?.role === "curator";

/* Only a row's owner may edit it, or (on the site) delete it. The curator
   takes someone else's published note down instead of deleting it, so its
   author keeps their work (owner, 25 November 2026). The database's delete
   policy still lets the curator delete any note; the site no longer offers
   the button. */
export const canEdit = (user, owner) => Boolean(user) && user.id === owner;
