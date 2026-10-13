/* The photographs, keyed by the path the `entries` table stores in
   `photo_url`. The table holds the path only (the Session 11 worksheet chose
   that, and flagged the cost); the size next/image needs and the alt and
   caption prose live here.
   A new photograph needs a line here as well as its file in public/.
   `km` holds the Khmer edition's alt and caption (lib/entries.js picks it). */
const photos = {
  "/durian-flower.jpg": {
    src: "/durian-flower.jpg",
    width: 728,
    height: 724,
    alt: "A cluster of pale green-white durian flowers in close-up, their long stamens hanging down",
    caption:
      "Durian flowers. The growers observe bats working them at night, and hawk moths alongside.",
    km: {
      alt: "ផ្កាធូរេនពណ៌បៃតងស្លេកលាយស មួយចង្កោមថតជិតៗ កេសរវែងៗសំយុងចុះ",
      caption: "ផ្កាធូរេន។ អ្នកដាំសង្កេតឃើញសត្វប្រចៀវមកស៊ីទឹកដមផ្កានៅពេលយប់ និងមេអំបៅយប់ផងដែរ។",
    },
  },
  "/tree-in-fruit.jpg": {
    src: "/tree-in-fruit.jpg",
    width: 1536,
    height: 2048,
    alt: "A durian tree hung with dozens of mature spiked fruit, its branches braced with support lines",
    caption: "Fruit carried on the branch, the limbs braced with lines against the weight.",
    km: {
      alt: "ដើមធូរេនមានផ្លែចាស់ៗរាប់សិប មែកត្រូវបានចងទ្រដោយខ្សែ",
      caption: "ផ្លែនៅលើមែក មែកត្រូវបានចងខ្សែទប់ទម្ងន់។",
    },
  },
  "/ov-khak-opened.jpg": {
    src: "/ov-khak-opened.jpg",
    width: 960,
    height: 1280,
    alt: "A hand holding an opened durian half, thick pale-yellow flesh in the shell, a whole fruit hanging on the tree behind",
    caption: "An opened fruit, held beneath a tree still carrying its own.",
    km: {
      alt: "ដៃកាន់ផ្លែធូរេនបកពាក់កណ្តាល សាច់ក្រាស់ពណ៌លឿងស្លេកនៅក្នុងសំបក មានផ្លែមួយទៀតព្យួរលើដើមនៅខាងក្រោយ",
      caption: "ផ្លែដែលបានបក កាន់នៅក្រោមដើមដែលនៅមានផ្លែរបស់វា។",
    },
  },
  "/sadong-kit.jpg": {
    src: "/sadong-kit.jpg",
    width: 1280,
    height: 960,
    alt: "A single Sadong Kit fruit hanging from a branch against a blue sky, another fruit visible behind it",
    caption: "A Sadong Kit fruit on the tree, in the growers' own orchard.",
    km: {
      alt: "ផ្លែសដុងកិតមួយព្យួរពីមែក នៅលើផ្ទៃមេឃពណ៌ខៀវ មានផ្លែមួយទៀតនៅខាងក្រោយ",
      caption: "ផ្លែសដុងកិតមួយនៅលើដើម ក្នុងចម្ការរបស់អ្នកដាំផ្ទាល់។",
    },
  },
  "/drought-damage-tree.jpg": {
    src: "/drought-damage-tree.jpg",
    width: 1280,
    height: 960,
    alt: "A durian tree with browned, wilting leaves dropping from its branches after drought stress",
    caption: "A drought-stressed tree, its leaves browned and dropping.",
    km: {
      alt: "ដើមធូរេនមានស្លឹកឡើងត្នោត ស្រពោន ហើយជ្រុះពីមែក ក្រោយរងភាពរាំងស្ងួត",
      caption: "ដើមឈើរងគ្រោះភាពរាំងស្ងួត ស្លឹកឡើងត្នោត ហើយជ្រុះ។",
    },
  },
  "/harvest-ready-to-sell.jpg": {
    src: "/harvest-ready-to-sell.jpg",
    width: 2048,
    height: 1536,
    alt: "Several hundred harvested durians laid out on tarpaulins between the trees, a pickup truck waiting behind them",
    caption:
      "A season's harvest laid out between the trees, stems trimmed, the truck waiting.",
    km: {
      alt: "ផ្លែធូរេនដែលប្រមូលបានរាប់រយផ្លែ ដាក់រាយលើតង់នៅចន្លោះដើមឈើ មានឡានដឹកទំនិញរង់ចាំនៅខាងក្រោយ",
      caption: "ផលពេញមួយរដូវ ដាក់រាយនៅចន្លោះដើមឈើ ទងត្រូវបានកាត់តម្រឹម ហើយឡានកំពុងរង់ចាំ។",
    },
  },
  "/musang-king-opened.jpg": {
    src: "/musang-king-opened.jpg",
    width: 902,
    height: 818,
    alt: "An opened durian seen from above, three lobes of deep yellow flesh in the white inner husk",
    caption: "An opened fruit, its flesh deep yellow. Photograph by the curator's family.",
    km: {
      alt: "ផ្លែធូរេនដែលបានបក មើលពីលើ សាច់ពណ៌លឿងចាស់បីក្លែប នៅក្នុងសំបកខាងក្នុងពណ៌ស",
      caption: "ផ្លែដែលបានបក សាច់ពណ៌លឿងចាស់។ រូបថតដោយគ្រួសាររបស់អ្នកចងក្រង។",
    },
  },
  "/opened-on-leaf.jpg": {
    src: "/opened-on-leaf.jpg",
    width: 1224,
    height: 864,
    alt: "An opened durian on a banana leaf, its stem still attached, one lobe of flesh lifted out in front",
    caption: "An opened fruit on a banana leaf, the stem still on. Photograph by the curator's family.",
    km: {
      alt: "ផ្លែធូរេនដែលបានបកលើស្លឹកចេក ទងនៅជាប់ ក្លែបសាច់មួយត្រូវបានលើកមកដាក់ខាងមុខ",
      caption: "ផ្លែដែលបានបកលើស្លឹកចេក ទងនៅជាប់។ រូបថតដោយគ្រួសាររបស់អ្នកចងក្រង។",
    },
  },
  "/fruit-stall.jpg": {
    src: "/fruit-stall.jpg",
    width: 1308,
    height: 816,
    alt: "A hand lifting a durian by its stem from a heaped stall, the cut stems of the others marked red",
    caption: "A fruit lifted by its stem from a stall pile. Photograph by the curator's family.",
    km: {
      alt: "ដៃលើកផ្លែធូរេនតាមទងពីគំនរនៅតូប ទងនៃផ្លែផ្សេងទៀតដែលកាត់ហើយ ត្រូវបានគូសពណ៌ក្រហម",
      caption: "ផ្លែមួយដែលលើកតាមទងពីគំនរនៅតូប។ រូបថតដោយគ្រួសាររបស់អ្នកចងក្រង។",
    },
  },
};

export default photos;
