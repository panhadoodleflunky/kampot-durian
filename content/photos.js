/* The photographs, keyed by the path the `entries` table stores in
   `photo_url`. The table holds the path only (the Session 11 worksheet chose
   that, and flagged the cost); the size next/image needs and the alt and
   caption prose live here, so they survive the move off content/field-notes.js.
   A new photograph needs a line here as well as its file in public/. */
const photos = {
  "/durian-flower.jpg": {
    src: "/durian-flower.jpg",
    width: 728,
    height: 724,
    alt: "A cluster of pale green-white durian flowers in close-up, their long stamens hanging down",
    caption:
      "Durian flowers. The growers observe bats working them at night, and hawk moths alongside.",
  },
  "/tree-in-fruit.jpg": {
    src: "/tree-in-fruit.jpg",
    width: 1536,
    height: 2048,
    alt: "A durian tree hung with dozens of mature spiked fruit, its branches braced with support lines",
    caption: "Fruit carried on the branch, the limbs braced with lines against the weight.",
  },
  "/ov-khak-opened.jpg": {
    src: "/ov-khak-opened.jpg",
    width: 960,
    height: 1280,
    alt: "A hand holding an opened durian half, thick pale-yellow flesh in the shell, a whole fruit hanging on the tree behind",
    caption: "An opened fruit, held beneath a tree still carrying its own.",
  },
  "/sadong-kit.jpg": {
    src: "/sadong-kit.jpg",
    width: 1280,
    height: 960,
    alt: "A single Sadong Kit fruit hanging from a branch against a blue sky, another fruit visible behind it",
    caption: "A Sadong Kit fruit on the tree, in the growers' own orchard.",
  },
  "/drought-damage-tree.jpg": {
    src: "/drought-damage-tree.jpg",
    width: 1280,
    height: 960,
    alt: "A durian tree with browned, wilting leaves dropping from its branches after drought stress",
    caption: "A drought-stressed tree, its leaves browned and dropping.",
  },
  "/harvest-ready-to-sell.jpg": {
    src: "/harvest-ready-to-sell.jpg",
    width: 2048,
    height: 1536,
    alt: "Several hundred harvested durians laid out on tarpaulins between the trees, a pickup truck waiting behind them",
    caption:
      "A season's harvest laid out between the trees, stems trimmed, the truck waiting.",
  },
};

export default photos;
