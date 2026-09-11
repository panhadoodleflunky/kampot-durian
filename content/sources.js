import collection from "../collection.config.js";

/* Where this guide's material comes from. There is one group, because there
   is one kind of source: the two people who grow durian at Teuk Chhou, asked
   directly. No publication, news report, trade standard, or website is cited
   anywhere on this site, and none should be added — see AGENTS.md.

   Photo credits mirror public/credits.json. */

export const sourceGroups = [
  {
    heading: "The interviews",
    items: [
      {
        name: "Interview with Rasmey and Vanny",
        note: "Rasmey and Vanny own and work the two hectares at Teuk Chhou, and everything in this guide was given by them directly. It covers how a fruit is read for ripeness — the stem-joint swelling, the thorn-tip colour, the knock-test sound and the tapping stick behind it; the rule against spraying into the canopy while the trees are in flower; the days from petal drop to harvest for all four varieties, a figure this project has not found written down anywhere; the flavour, sub-types and grafting requirement of Ov Khak; the harvest window and spoilage rate of Sadong Kit, and why it has become rare to grow and sell; Monthong's arrival in Kampot and why it was planted; the 2021 Musang King top-working and its failure rate; the mechanics of counterfeit relabelling and the farm-gate-to-retail price spread; the 2024 drought in detail and the 2014 flood; the orchard year month by month; and the export programme as it looks from a two-hectare farm with no part in it.",
      },
      {
        name: "Khmer field vocabulary",
        note: "The words Rasmey and Vanny use in the field, given directly: the knock test, ripe and unripe and overripe, the dry season, dropped and cut fruit, grafting, orchard, grower, middleman, farming community, and the spoken forms of the variety names. This edition is in English and does not print the Khmer itself. The terms are recorded in full and will carry the Khmer edition, where they belong in the growers' own script rather than in translation.",
      },
    ],
  },
];

/* What travels with the interviews, and is repeated on the entries that lean
   hardest on each caution. Kept here so the three of them stay worded the
   same way in every place they appear. */
export const cautions = [
  "Prices are peak-season farm-gate figures and can fall by roughly half in a tight market.",
  "Tree counts are the growers' own estimates. They keep no exact tally, since trees die and are replanted continuously.",
  "This is one orchard of about two hectares. Nothing here is a sample of Kampot, of Teuk Chhou, or of anywhere else.",
  "The growers asked that the location of the farm's water source not be published, and it is not.",
];

/* Photograph credits. Every image on this site was taken by the compiler, at
   the orchard or nearby — primary material, like the interviews. */
export const photoCredits = [
  {
    file: "ov-khak-opened.jpg",
    caption: "An opened durian held beneath a fruiting tree",
    author: collection.curator,
  },
  {
    file: "tree-in-fruit.jpg",
    caption: "A durian tree carrying mature fruit, branches braced",
    author: collection.curator,
  },
  {
    file: "harvest-ready-to-sell.jpg",
    caption: "Harvest laid out on tarpaulins, ready for the buyer",
    author: collection.curator,
  },
  {
    file: "durian-flower.jpg",
    caption: "Durian flowers in close-up, open at night for their pollinators",
    author: collection.curator,
  },
  {
    file: "sadong-kit.jpg",
    caption: "A Sadong Kit fruit on the tree, in the family's own orchard",
    author: collection.curator,
  },
  {
    file: "drought-damage-tree.jpg",
    caption: "A drought-stressed durian tree, its leaves browned and dropping",
    author: collection.curator,
  },
  {
    file: "teuk-chou-scenic.jpg",
    caption: "The Teuk Chhou river at dusk, with the hills behind it",
    author: collection.curator,
  },
];

export const method =
  "Rasmey and Vanny, who own and work the orchard at Teuk Chhou, asked directly, and the Khmer they use in the field.";
