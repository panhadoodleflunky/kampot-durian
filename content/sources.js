import collection from "../collection.config.js";

/* Where this guide's material comes from. There is one group, because there
   is one kind of source: people who grow durian at Teuk Chhou, asked
   directly. The orchard's owners asked on 12 October 2026 not to be named;
   they are credited as the curator's parents, and the neighbour as he asked. No publication, news report, trade standard, or website is cited
   anywhere on this site, and none should be added — see AGENTS.md.

   Photo credits mirror public/credits.json. */

export const sourceGroups = [
  {
    heading: "The interviews",
    items: [
      {
        name: "Interview with the orchard's owners",
        note: "A second-generation durian family at Teuk Chhou — the curator's parents — own and work the two hectares, and almost everything in this guide was given by them directly. They asked not to be named: the numbers are public, the family is not. It covers how a fruit is read for ripeness — the stem-joint swelling, the thorn-tip colour, the knock-test sound and the tapping stick behind it; the rule against spraying into the canopy while the trees are in flower, and the bats and moths that do the pollinating; the days from petal drop to harvest for all four varieties, a figure this project has not found written down anywhere; the flavour, sub-types and grafting requirement of Ov Khak; the harvest window and spoilage rate of Sadong Kit, and why it has become rare to grow and sell; Monthong's arrival in Kampot and why it was planted; the 2021 Musang King top-working, its failure rate and its first fruit in 2026; the mechanics of counterfeit relabelling and the farm-gate-to-retail price spread; the 2024 drought in detail and the 2014 flood; what kills a tree — root rot, pests, storms — and how the trees are sprayed and fed; the orchard year month by month; the 2024 drought on the neighbouring farms and the recovery since; and the export programme as it looks from a two-hectare farm outside it, whose fruit reaches exporters only through the middlemen who buy it, including what certification would have to pay and what happened to the neighbours who signed with a broker.",
      },
      {
        name: "Interview with a neighbouring grower at Teuk Chhou",
        note: "A neighbour in Teuk Chhou who cleared his native trees for Monthong twenty years ago, and asked to be described that way rather than named. He farms three hectares, mostly Monthong with some Ov Khak. His account is on three entries: why he cut down his last Sadong Kit, what 2024 cost a farm whose well went dry, and what a single middleman paid him in 2026.",
      },
      {
        name: "Khmer field vocabulary",
        note: "The words the growers use in the field, given directly: the knock test, ripe and unripe and overripe, the dry season, dropped and cut fruit, grafting, orchard, grower, middleman, farming community, and the spoken forms of the variety names. This edition is in English and prints one Khmer term, on the disease entry. The rest are recorded in full and will carry the Khmer edition, where they belong in the growers' own script rather than in translation.",
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
  "This is one orchard of about two hectares, with one neighbour's account set beside it. Nothing here is a sample of Kampot, of Teuk Chhou, or of anywhere else.",
  "The growers asked that the location of the farm's water source not be published, and it is not.",
];

/* Photograph credits. Most were taken by the compiler at the orchard or
   nearby; the three marked `family` are family photographs, used with
   permission, and are not claimed as taken in Kampot. */
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
  {
    file: "what-kills-a-durian-tree.jpg",
    caption: "A durian tree dying back, its leaves browned on the branch",
    author: collection.curator,
  },
  {
    file: "musang-king-opened.jpg",
    caption: "An opened durian, three lobes of deep yellow flesh",
    author: "the curator's family",
    family: true,
  },
  {
    file: "opened-on-leaf.jpg",
    caption: "An opened durian on a banana leaf, one lobe lifted out",
    author: "the curator's family",
    family: true,
  },
  {
    file: "fruit-stall.jpg",
    caption: "A durian lifted by its stem from a stall pile",
    author: "the curator's family",
    family: true,
  },
];

export const method =
  "The family who own and work the orchard at Teuk Chhou, asked directly, with one neighbour beside them, and the Khmer they use in the field.";

/* Both editions. The Khmer one carries its own groups, cautions, method
   line and photo captions; anything it leaves out shows in English. */
const english = { sourceGroups, cautions, method, photoCredits };
const FAMILY_KM = "គ្រួសាររបស់អ្នកចងក្រង";
const khmer = {
  sourceGroups: [
    {
      heading: "ការសម្ភាសន៍",
      items: [
        {
          name: "ការសម្ភាសន៍ជាមួយម្ចាស់ចម្ការ",
          note: "គ្រួសារធ្វើចម្ការធូរេនជំនាន់ទីពីរនៅទឹកឈូ — ឪពុកម្តាយរបស់អ្នកចងក្រង — ជាម្ចាស់ និងជាអ្នកធ្វើដីពីរហិកតានេះ ហើយស្ទើរតែអ្វីៗទាំងអស់ក្នុងមគ្គុទ្ទេសក៍នេះ ពួកគាត់ជាអ្នកប្រាប់ផ្ទាល់។ ពួកគាត់សុំមិនឲ្យដាក់ឈ្មោះ៖ តួលេខជាសាធារណៈ ប៉ុន្តែគ្រួសារមិនមែនទេ។ ការសម្ភាសន៍គ្របដណ្តប់អំពី៖ របៀបមើលថាផ្លែទុំឬនៅ — ការហើមនៃទងធូរេន ពណ៌ចុងបន្លា សំឡេងនៃការគោះមើល និងដំបងគោះ; ច្បាប់ហាមបាញ់ថ្នាំលើស្លឹកពេលដើមកំពុងចេញផ្កា និងជ្រៀវ និងមេអំបៅយប់ដែលជួយលម្អងផ្កា; ចំនួនថ្ងៃពីពេលស្បៃផ្កាជ្រុះរហូតដល់ប្រមូលផលសម្រាប់ពូជទាំងបួន ដែលជាតួលេខដែលគម្រោងនេះមិនដែលឃើញគេសរសេរនៅកន្លែងណាទេ; រសជាតិ ប្រភេទរង និងតម្រូវការផ្សាំរបស់ឪខាក់; រយៈពេលប្រមូលផល និងល្បឿននៃការខូចរបស់សដុងកិត ហើយហេតុអ្វីវាកាន់តែកម្រដាំ និងកម្រលក់; ការមកដល់កំពតរបស់មនថង និងហេតុអ្វីគេដាំវា; ការតស្ទូងម៉ូសាំងឃីងក្នុងឆ្នាំ ២០២១ អត្រាបរាជ័យ និងផ្លែដំបូងក្នុងឆ្នាំ ២០២៦; របៀបដែលគេប្តូរស្លាកផ្លែក្លែងក្លាយ និងគម្លាតតម្លៃពីមាត់ចម្ការដល់តូបលក់រាយ; ភាពរាំងស្ងួតឆ្នាំ ២០២៤ លម្អិត និងទឹកជំនន់ឆ្នាំ ២០១៤; អ្វីដែលសម្លាប់ដើមធូរេន — ជំងឺស្អុយឫស សត្វល្អិត ខ្យល់ព្យុះ — និងរបៀបបាញ់ថ្នាំ និងដាក់ជី; ឆ្នាំការងារនៃចម្ការម្តងមួយខែៗ; ភាពរាំងស្ងួតឆ្នាំ ២០២៤ នៅចម្ការអ្នកជិតខាង និងការងើបឡើងវិញចាប់តាំងពីពេលនោះ; និងកម្មវិធីនាំចេញ តាមការមើលពីចម្ការពីរហិកតាដែលនៅក្រៅវា ដែលផ្លែរបស់វាទៅដល់អ្នកនាំចេញតែតាមរយៈឈ្មួញកណ្តាលដែលទិញវាប៉ុណ្ណោះ រួមទាំងអ្វីដែលវិញ្ញាបនបត្រត្រូវតែផ្តល់ឲ្យទើបសមនឹងចំណាយ និងអ្វីដែលកើតឡើងចំពោះអ្នកជិតខាងដែលបានចុះកិច្ចសន្យាជាមួយឈ្មួញ។",
        },
        {
          name: "ការសម្ភាសន៍ជាមួយអ្នកដាំជិតខាងម្នាក់នៅទឹកឈូ",
          note: "អ្នកជិតខាងម្នាក់នៅទឹកឈូ ដែលបានកាប់ដើមពូជដើមចោល ដើម្បីដាំមនថងកាលពីម្ភៃឆ្នាំមុន ហើយសុំឲ្យរៀបរាប់អំពីគាត់បែបនេះ ជំនួសឲ្យការដាក់ឈ្មោះ។ គាត់ធ្វើចម្ការបីហិកតា ភាគច្រើនជាមនថង មានឪខាក់ខ្លះ។ ការរៀបរាប់របស់គាត់មាននៅក្នុងអត្ថបទបី៖ ហេតុអ្វីគាត់កាប់ដើមសដុងកិតចុងក្រោយរបស់គាត់ ឆ្នាំ ២០២៤ ធ្វើឲ្យចម្ការដែលអណ្តូងរីងស្ងួតខាតបង់អ្វីខ្លះ និងតម្លៃដែលឈ្មួញកណ្តាលម្នាក់បានបង់ឲ្យគាត់ក្នុងឆ្នាំ ២០២៦។",
        },
        {
          name: "ពាក្យចម្ការជាភាសាខ្មែរ",
          note: "ពាក្យដែលអ្នកដាំប្រើនៅក្នុងចម្ការ ដែលពួកគាត់ប្រាប់ផ្ទាល់៖ ការគោះមើល ទុំ ខ្ចី និងជ្រុលទុំ រដូវប្រាំង ធូរេនជ្រុះ និងធូរេនកាត់ ការផ្សាំ ចម្ការ អ្នកចម្ការ ឈ្មួញកណ្តាល សហគមន៍កសិកម្ម និងឈ្មោះពូជតាមការនិយាយ។ កំណែភាសាខ្មែរនេះប្រើពាក្យទាំងនេះនៅកន្លែងដែលការបកប្រែត្រូវការពាក្យចម្ការ។",
        },
      ],
    },
  ],
  cautions: [
    "តម្លៃទាំងអស់ គឺជាតម្លៃមាត់ចម្ការក្នុងរដូវខ្ពស់បំផុត ហើយអាចធ្លាក់ចុះប្រហែលពាក់កណ្តាល នៅពេលទីផ្សារតឹង។",
    "ចំនួនដើមធូរេន គឺជាការប៉ាន់ស្មានរបស់អ្នកដាំខ្លួនឯង។ ពួកគាត់មិនរាប់ច្បាស់លាស់ទេ ព្រោះដើមខ្លះងាប់ ហើយត្រូវដាំជំនួសជាប្រចាំ។",
    "នេះគឺជាចម្ការមួយ ទំហំប្រហែលពីរហិកតា ដោយមានការរៀបរាប់របស់អ្នកជិតខាងម្នាក់នៅក្បែរ។ គ្មានអ្វីនៅទីនេះជាគំរូតំណាងឲ្យខេត្តកំពត ទឹកឈូ ឬកន្លែងណាមួយផ្សេងទៀតទេ។",
    "អ្នកដាំបានស្នើសុំមិនឲ្យផ្សព្វផ្សាយទីតាំងប្រភពទឹករបស់ចម្ការ ហើយយើងមិនបានផ្សព្វផ្សាយទេ។",
  ],
  method: "គ្រួសារដែលជាម្ចាស់ និងជាអ្នកធ្វើចម្ការនៅទឹកឈូ ដែលបានសួរផ្ទាល់ ដោយមានអ្នកជិតខាងម្នាក់នៅក្បែរ និងពាក្យខ្មែរដែលពួកគាត់ប្រើនៅក្នុងចម្ការ។",
  photoCredits: photoCredits.map((credit) => ({
    ...credit,
    caption: {
      "ov-khak-opened.jpg": "ផ្លែធូរេនដែលបានបក កាន់នៅក្រោមដើមដែលកំពុងមានផ្លែ",
      "tree-in-fruit.jpg": "ដើមធូរេនមានផ្លែចាស់ មែកត្រូវបានចងទ្រ",
      "harvest-ready-to-sell.jpg": "ផលដែលប្រមូលបាន ដាក់រាយលើតង់ ត្រៀមសម្រាប់អ្នកទិញ",
      "durian-flower.jpg": "ផ្កាធូរេនថតជិតៗ រីកនៅពេលយប់សម្រាប់សត្វដែលជួយលម្អង",
      "sadong-kit.jpg": "ផ្លែសដុងកិតមួយនៅលើដើម ក្នុងចម្ការរបស់គ្រួសារផ្ទាល់",
      "drought-damage-tree.jpg": "ដើមធូរេនរងគ្រោះភាពរាំងស្ងួត ស្លឹកឡើងត្នោត ហើយជ្រុះ",
      "teuk-chou-scenic.jpg": "ទន្លេទឹកឈូពេលព្រលប់ មានភ្នំនៅពីក្រោយ",
      "what-kills-a-durian-tree.jpg": "ដើមធូរេនកំពុងងាប់ ស្លឹកឡើងត្នោតនៅលើមែក",
      "musang-king-opened.jpg": "ផ្លែធូរេនដែលបានបក សាច់ពណ៌លឿងចាស់បីក្លែប",
      "opened-on-leaf.jpg": "ផ្លែធូរេនដែលបានបកលើស្លឹកចេក លើកក្លែបមួយចេញមក",
      "fruit-stall.jpg": "ផ្លែធូរេនមួយដែលលើកតាមទងពីគំនរនៅតូប",
    }[credit.file] ?? credit.caption,
    author: credit.family ? FAMILY_KM : credit.author,
  })),
};

export function sourcesFor(lang) {
  return lang === "km" ? { ...english, ...khmer } : english;
}
