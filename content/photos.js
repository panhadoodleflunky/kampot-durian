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
      alt: "ផ្កា​ធុរេន​ពណ៌បៃតង​ស្លេក​លាយស មួយ​ចង្កោម​ថត​ជិត⁠ៗ កេសរ​វែង⁠ៗ​សំយុង​ចុះ",
      caption: "ផ្កា​ធុរេន⁠។ អ្នក​ដាំ​សង្កេតឃើញ​ប្រចៀវ​មក​លើ​ផ្កា​នៅពេល​យប់ ព្រមទាំង​មេអំបៅ​យប់​ផង​ដែរ⁠។",
    },
  },
  "/tree-in-fruit.jpg": {
    src: "/tree-in-fruit.jpg",
    width: 1536,
    height: 2048,
    alt: "A durian tree hung with dozens of mature spiked fruit, its branches braced with support lines",
    caption: "Fruit carried on the branch, the limbs braced with lines against the weight.",
    km: {
      alt: "ដើម​ធុរេន​មាន​ផ្លែ​ចាស់⁠ៗ​រាប់​សិប មែក​ត្រូវ​បាន​ចង​ទ្រដោយ​ខ្សែ",
      caption: "ផ្លែ​នៅ​លើ​មែក មែក​ត្រូវ​បាន​ចងខ្សែ​ទប់​ទម្ងន់⁠។",
    },
  },
  "/ov-khak-opened.jpg": {
    src: "/ov-khak-opened.jpg",
    width: 960,
    height: 1280,
    alt: "A hand holding an opened durian half, thick pale-yellow flesh in the shell, a whole fruit hanging on the tree behind",
    caption: "An opened fruit, held beneath a tree still carrying its own.",
    km: {
      alt: "ដៃ​កាន់​ផ្លែ​ធុរេន​បក​ពាក់កណ្តាល សាច់​ក្រាស់​ពណ៌លឿង​ស្លេក​នៅក្នុង​សំបក មាន​ផ្លែ​មួយទៀត​ព្យួរ​លើ​ដើម​នៅ​ខាងក្រោយ",
      caption: "ផ្លែ​ដែល​បាន​បក កាន់​នៅ​ក្រោម​ដើម​ដែល​នៅ​មាន​ផ្លែ​របស់​វា⁠។",
    },
  },
  "/sadong-kit.jpg": {
    src: "/sadong-kit.jpg",
    width: 1280,
    height: 960,
    alt: "A single Sadong Kit fruit hanging from a branch against a blue sky, another fruit visible behind it",
    caption: "A Sadong Kit fruit on the tree, in the growers' own orchard.",
    km: {
      alt: "ផ្លែ​សដុងកិត​មួយ​ព្យួរ​ពី​មែក នៅ​លើ​ផ្ទៃមេឃ​ពណ៌ខៀវ មាន​ផ្លែ​មួយទៀត​នៅ​ខាងក្រោយ",
      caption: "ផ្លែ​សដុងកិត​មួយ​នៅ​លើ​ដើម ក្នុង​ចម្ការ​របស់​អ្នក​ដាំ​ផ្ទាល់⁠។",
    },
  },
  "/drought-damage-tree.jpg": {
    src: "/drought-damage-tree.jpg",
    width: 1280,
    height: 960,
    alt: "A durian tree with browned, wilting leaves dropping from its branches after drought stress",
    caption: "A drought-stressed tree, its leaves browned and dropping.",
    km: {
      alt: "ដើម​ធុរេន​មាន​ស្លឹក​ឡើងត្នោត ស្រពោន ហើយ​ជ្រុះ​ពី​មែក ក្រោយ​រង​ភាពរាំងស្ងួត",
      caption: "ដើមឈើ​រងគ្រោះ​ភាពរាំងស្ងួត ស្លឹក​ឡើងត្នោត ហើយ​ជ្រុះ⁠។",
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
      alt: "ផ្លែ​ធុរេន​ដែល​ប្រមូល​បាន​រាប់​រយ​ផ្លែ ដាក់រាយ​លើ​តង់​នៅចន្លោះ​ដើមឈើ មាន​ឡាន​ដឹកទំនិញ​រង់ចាំ​នៅ​ខាងក្រោយ",
      caption: "ផល​ពេញ​មួយ​រដូវ ដាក់រាយ​នៅចន្លោះ​ដើមឈើ ទង​ត្រូវ​បាន​កាត់តម្រឹម ហើយ​ឡាន​កំពុង​រង់ចាំ⁠។",
    },
  },
  "/musang-king-opened.jpg": {
    src: "/musang-king-opened.jpg",
    width: 902,
    height: 818,
    alt: "An opened durian seen from above, three lobes of deep yellow flesh in the white inner husk",
    caption: "An opened fruit, its flesh deep yellow. Photograph by the curator's family.",
    km: {
      alt: "ផ្លែ​ធុរេន​ដែល​បាន​បក មើល​ពីលើ សាច់​ពណ៌លឿង​ចាស់​បី​ក្លែប នៅក្នុង​សំបក​ខាងក្នុង​ពណ៌ស",
      caption: "ផ្លែ​ដែល​បាន​បក សាច់​ពណ៌លឿង​ចាស់⁠។ រូបថត​ដោយ​គ្រួសារ​របស់​អ្នក​ចងក្រង⁠។",
    },
  },
  "/opened-on-leaf.jpg": {
    src: "/opened-on-leaf.jpg",
    width: 1224,
    height: 864,
    alt: "An opened durian on a banana leaf, its stem still attached, one lobe of flesh lifted out in front",
    caption: "An opened fruit on a banana leaf, the stem still on. Photograph by the curator's family.",
    km: {
      alt: "ផ្លែ​ធុរេន​ដែល​បាន​បក​លើ​ស្លឹកចេក ទង​នៅ​ជាប់ ក្លែប​សាច់​មួយ​ត្រូវ​បាន​លើក​មក​ដាក់​ខាងមុខ",
      caption: "ផ្លែ​ដែល​បាន​បក​លើ​ស្លឹកចេក ទង​នៅ​ជាប់⁠។ រូបថត​ដោយ​គ្រួសារ​របស់​អ្នក​ចងក្រង⁠។",
    },
  },
  "/fruit-stall.jpg": {
    src: "/fruit-stall.jpg",
    width: 1308,
    height: 816,
    alt: "A hand lifting a durian by its stem from a heaped stall, the cut stems of the others marked red",
    caption: "A fruit lifted by its stem from a stall pile. Photograph by the curator's family.",
    km: {
      alt: "ដៃ​លើក​ផ្លែ​ធុរេន​តាម​ទង​ពី​គំនរ​នៅ​តូប ទង​នៃ​ផ្លែ​ផ្សេងទៀត​ដែលកាត់​ហើយ ត្រូវ​បាន​គូស​ពណ៌ក្រហម",
      caption: "ផ្លែ​មួយ​ដែល​លើក​តាម​ទង​ពី​គំនរ​នៅ​តូប⁠។ រូបថត​ដោយ​គ្រួសារ​របស់​អ្នក​ចងក្រង⁠។",
    },
  },
};

export default photos;
