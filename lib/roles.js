/* The curator's role lives in app_metadata, which a user cannot change
   (user_metadata they can). The browser reads it only to choose a shelf and
   to show buttons; if someone fakes it, the policies check the same claim in
   the database and refuse them. The curator is also the site's admin: they
   may edit or delete anyone's community note (policies added 13 October
   2026). */
export const isCurator = (user) => user?.app_metadata?.role === "curator";

/* May this user edit or delete this row? Its owner may, and so may the
   curator. */
export const canManage = (user, owner) => Boolean(user) && (user.id === owner || isCurator(user));
