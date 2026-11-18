import collection from "../collection.config.js";

/* Where this guide's material comes from. There is one group, because there
   is one kind of source: people who grow durian at Teuk Chhou, asked
   directly. The orchard's owners asked on 12 October 2026 not to be named;
   they are credited as the curator's parents, and the neighbour as he asked. No publication, news report, trade standard, or website is cited
   anywhere on this site, and none should be added — see AGENTS.md. */

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
        note: "The words the growers use in the field, given directly: the knock test, ripe and unripe and overripe, the dry season, dropped and cut fruit, grafting, orchard, grower, middleman, farming community, and the spoken forms of the variety names. The Khmer edition uses these words wherever the translation needs a field term.",
      },
    ],
  },
];

/* What travels with the interviews, and is repeated on the entries that lean
   hardest on each caution. Kept here so the four of them stay worded the
   same way in every place they appear. */
export const cautions = [
  "Prices are peak-season farm-gate figures and can fall by roughly half in a tight market.",
  "Tree counts are the growers' own estimates. They keep no exact tally, since trees die and are replanted continuously.",
  "This is one orchard of about two hectares, with one neighbour's account set beside it. Nothing here is a sample of Kampot, of Teuk Chhou, or of anywhere else.",
  "The growers asked that the location of the farm's water source not be published, and it is not.",
];

/* Photograph credits. Most were taken by the compiler at the orchard or
   nearby. `generated`: not a photograph at all — an AI-generated image, and
   the credit and caption say so (owner, 18 November 2026). `family`: a family
   photograph used with permission (none at present). `enhanced`: the
   picture was upscaled with AI (owner, 12 October 2026). `kampot: false`:
   no claim about where it was taken. */
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
    generated: true,
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
    generated: true,
  },
  {
    file: "opened-on-leaf.jpg",
    caption: "An opened durian on a banana leaf, one lobe lifted out",
    generated: true,
  },
  {
    file: "fruit-stall.jpg",
    caption: "A durian lifted by its stem from a stall pile",
    author: collection.curator,
    kampot: false,
    enhanced: true,
  },
];

export const method =
  "The family who own and work the orchard at Teuk Chhou, asked directly, with one neighbour beside them, and the Khmer they use in the field.";

/* Both editions. The Khmer one carries its own groups, cautions, method
   line and photo captions; anything it leaves out shows in English. */
const english = { sourceGroups, cautions, method, photoCredits };
const FAMILY_KM = "គ្រួសារ​របស់​អ្នក​ចងក្រង";
const khmer = {
  sourceGroups: [
    {
      heading: "ការ​សម្ភាសន៍",
      items: [
        {
          name: "ការ​សម្ភាសន៍​ជាមួយ​ម្ចាស់​ចម្ការ",
          note: "គ្រួសារ​ធ្វើចម្ការ​ធុរេន​ជំនាន់​ទីពីរ​នៅ​ទឹកឈូ — ឪពុក​ម្តាយ​របស់​អ្នក​ចងក្រង — ជា​ម្ចាស់ និង​ជា​អ្នកធ្វើ​ដី​ពីរ​ហិកតា​នេះ ហើយ​ស្ទើរតែ​អ្វី⁠ៗ​ទាំងអស់​ក្នុង​មគ្គុទ្ទេសក៍​នេះ ពួកគាត់​ជា​អ្នក​ប្រាប់​ផ្ទាល់⁠។ ពួកគាត់​សុំ​មិន​ឲ្យ​ដាក់ឈ្មោះ⁠៖ តួលេខ​ជា​សាធារណៈ ប៉ុន្តែ​គ្រួសារ​មិនមែនទេ⁠។ ការ​សម្ភាសន៍​គ្រប​ដណ្តប់​អំពី⁠៖ របៀប​មើល​ថា​ផ្លែ​ទុំ​ឬនៅ — ការ​ហើម​នៃ​ទង​ធុរេន ពណ៌​ចុង​បន្លា សំឡេង​នៃ​ការ​គោះ​មើល និង​ដំបង​គោះ; ច្បាប់​ហាម​បាញ់ថ្នាំ​លើ​ស្លឹក​ពេល​ដើម​កំពុង​ចេញផ្កា និង​ប្រចៀវ និង​មេអំបៅ​យប់​ដែល​ជួយ​លម្អងផ្កា; ចំនួន​ថ្ងៃ​ពី​ពេល​ស្បៃ​ផ្កា​ជ្រុះ​រហូតដល់​ប្រមូល​ផល​សម្រាប់​ពូជ​ទាំងបួន ដែល​ជា​តួលេខ​ដែល​គម្រោង​នេះ​មិនដែល​ឃើញ​គេ​សរសេរ​នៅកន្លែង​ណា​ទេ; រសជាតិ ប្រភេទ​រង និង​តម្រូវការ​ផ្សាំ​របស់​ឪខាក់; រយៈពេល​ប្រមូល​ផល និង​ល្បឿន​នៃ​ការ​ខូច​របស់​សដុងកិត ហើយ​ហេតុអ្វី​វា​កាន់តែ​កម្រ​ដាំ និង​កម្រ​លក់; ការ​មកដល់​កំពត​របស់​មនថង និង​ហេតុអ្វី​គេ​ដាំ​វា; ការ​ត​ស្ទូង​ម៉ូសាំងឃីង​ក្នុង​ឆ្នាំ ២០២១ អត្រា​បរាជ័យ និង​ផ្លែ​ដំបូង​ក្នុង​ឆ្នាំ ២០២៦; របៀប​ដែលគេ​ប្តូរ​ស្លាក​ផ្លែ​ក្លែងក្លាយ និង​គម្លាត​តម្លៃ​ពី​មាត់​ចម្ការ​ដល់​តូប​លក់រាយ; ភាពរាំងស្ងួត​ឆ្នាំ ២០២៤ លម្អិត និង​ទឹកជំនន់​ឆ្នាំ ២០១៤; អ្វី​ដែល​សម្លាប់​ដើម​ធុរេន — ជំងឺ​ស្អុយ​ឫស សត្វល្អិត ខ្យល់ព្យុះ — និង​របៀប​បាញ់ថ្នាំ និង​ដាក់ជី; ឆ្នាំ​ការងារ​នៃ​ចម្ការ​ម្តង​មួយ​ខែ⁠ៗ; ភាពរាំងស្ងួត​ឆ្នាំ ២០២៤ នៅ​ចម្ការ​អ្នកជិតខាង និង​ការ​ងើបឡើង​វិញ​ចាប់តាំងពី​ពេលនោះ; និង​កម្មវិធី​នាំចេញ តាម​ការ​មើល​ពី​ចម្ការ​ពីរ​ហិកតា​ដែល​នៅ​ក្រៅ​វា ដែល​ផ្លែ​របស់​វា​ទៅដល់​អ្នកនាំ​ចេញ​តែ​តាមរយៈ​ឈ្មួញ​កណ្តាល​ដែល​ទិញ​វា​ប៉ុណ្ណោះ រួម​ទាំង​អ្វី​ដែល​វិញ្ញាបនបត្រ​ត្រូវតែ​ផ្តល់​ឲ្យ​ទើបសម​នឹង​ចំណាយ និង​អ្វី​ដែល​កើតឡើង​ចំពោះ​អ្នកជិតខាង​ដែល​បាន​ចុះ​កិច្ចសន្យា​ជាមួយ​ឈ្មួញ⁠។",
        },
        {
          name: "ការ​សម្ភាសន៍​ជាមួយ​អ្នក​ដាំ​ជិតខាង​ម្នាក់​នៅ​ទឹកឈូ",
          note: "អ្នកជិតខាង​ម្នាក់​នៅ​ទឹកឈូ ដែល​បាន​កាប់​ដើម​ពូជ​ដើម​ចោល ដើម្បី​ដាំ​មនថង​កាលពី​ម្ភៃ​ឆ្នាំមុន ហើយ​សុំ​ឲ្យ​រៀបរាប់​អំពី​គាត់​បែបនេះ ជំនួស​ឲ្យ​ការ​ដាក់ឈ្មោះ⁠។ គាត់​ធ្វើចម្ការ​បី​ហិកតា ភាគច្រើន​ជា​មនថង មាន​ឪខាក់​ខ្លះ⁠។ ការ​រៀបរាប់​របស់​គាត់​មាននៅ​ក្នុង​អត្ថបទ​បី⁠៖ ហេតុអ្វី​គាត់​កាប់​ដើម​សដុងកិត​ចុងក្រោយ​របស់​គាត់ ឆ្នាំ ២០២៤ ធ្វើឲ្យ​ចម្ការ​ដែល​អណ្តូង​រីងស្ងួត​ខាតបង់​អ្វីខ្លះ និង​តម្លៃ​ដែល​ឈ្មួញ​កណ្តាល​ម្នាក់​បាន​បង់​ឲ្យ​គាត់​ក្នុង​ឆ្នាំ ២០២៦⁠។",
        },
        {
          name: "ពាក្យ​ចម្ការ​ជា​ភាសាខ្មែរ",
          note: "ពាក្យ​ដែល​អ្នក​ដាំ​ប្រើ​នៅក្នុង​ចម្ការ ដែល​ពួកគាត់​ប្រាប់​ផ្ទាល់⁠៖ ការ​គោះ​មើល ទុំ ខ្ចី និង​ជ្រុល​ទុំ រដូវប្រាំង ធុរេន​ជ្រុះ និង​ធុរេន​កាត់ ការ​ផ្សាំ ចម្ការ អ្នកចម្ការ ឈ្មួញ​កណ្តាល សហគមន៍​កសិកម្ម និង​ឈ្មោះ​ពូជ​តាម​ការ​និយាយ⁠។ កំណែ​ភាសាខ្មែរ​នេះ​ប្រើពាក្យ​ទាំងនេះ​នៅកន្លែង​ដែល​ការបកប្រែ​ត្រូវការ​ពាក្យ​ចម្ការ⁠។",
        },
      ],
    },
  ],
  cautions: [
    "តម្លៃ​ទាំងអស់ គឺជា​តម្លៃ​មាត់​ចម្ការ​ក្នុង​រដូវ​ខ្ពស់​បំផុត ហើយ​អាច​ធ្លាក់ចុះ​ប្រហែល​ពាក់កណ្តាល នៅពេល​ទីផ្សារ​តឹង⁠។",
    "ចំនួន​ដើម​ធុរេន គឺជា​ការ​ប៉ាន់ស្មាន​របស់​អ្នក​ដាំ​ខ្លួនឯង⁠។ ពួកគាត់​មិនរាប់​ច្បាស់លាស់​ទេ ព្រោះ​ដើម​ខ្លះ​ងាប់ ហើយ​ត្រូវ​ដាំ​ជំនួស​ជាប្រចាំ⁠។",
    "នេះ​គឺជា​ចម្ការ​មួយ ទំហំ​ប្រហែល​ពីរ​ហិកតា ដោយមាន​ការ​រៀបរាប់​របស់​អ្នកជិតខាង​ម្នាក់​នៅ​ក្បែរ⁠។ គ្មានអ្វី​នៅ​ទីនេះ​ជា​គំរូ​តំណាង​ឲ្យ​ខេត្ត​កំពត ទឹកឈូ ឬ​កន្លែងណា​មួយផ្សេងទៀត​ទេ⁠។",
    "អ្នក​ដាំ​បាន​ស្នើសុំ​មិន​ឲ្យ​ផ្សព្វផ្សាយ​ទីតាំង​ប្រភព​ទឹក​របស់​ចម្ការ ហើយ​យើង​មិនបាន​ផ្សព្វផ្សាយ​ទេ⁠។",
  ],
  method: "គ្រួសារ​ដែល​ជា​ម្ចាស់ និង​ជា​អ្នកធ្វើ​ចម្ការ​នៅ​ទឹកឈូ ដែល​បាន​សួរ​ផ្ទាល់ ដោយមាន​អ្នកជិតខាង​ម្នាក់​នៅ​ក្បែរ និង​ពាក្យ​ខ្មែរ​ដែល​ពួកគាត់​ប្រើ​នៅក្នុង​ចម្ការ⁠។",
  photoCredits: photoCredits.map((credit) => ({
    ...credit,
    caption: {
      "ov-khak-opened.jpg": "ផ្លែ​ធុរេន​ដែល​បាន​បក កាន់​នៅ​ក្រោម​ដើម​ដែល​កំពុង​មាន​ផ្លែ",
      "tree-in-fruit.jpg": "ដើម​ធុរេន​មាន​ផ្លែ​ចាស់ មែក​ត្រូវ​បាន​ចង​ទ្រ",
      "harvest-ready-to-sell.jpg": "ផល​ដែល​ប្រមូល​បាន ដាក់រាយ​លើ​តង់ ត្រៀម​សម្រាប់​អ្នកទិញ",
      "durian-flower.jpg": "ផ្កា​ធុរេន​ថត​ជិត⁠ៗ រីក​នៅពេល​យប់​សម្រាប់​សត្វ​ដែល​ជួយ​លម្អង",
      "sadong-kit.jpg": "ផ្លែ​សដុងកិត​មួយ​នៅ​លើ​ដើម ក្នុង​ចម្ការ​របស់​គ្រួសារ​ផ្ទាល់",
      "drought-damage-tree.jpg": "ដើម​ធុរេន​រងគ្រោះ​ភាពរាំងស្ងួត ស្លឹក​ឡើងត្នោត ហើយ​ជ្រុះ",
      "teuk-chou-scenic.jpg": "ទន្លេ​ទឹកឈូ​ពេល​ព្រលប់ មាន​ភ្នំ​នៅ​ពីក្រោយ",
      "what-kills-a-durian-tree.jpg": "ដើម​ធុរេន​កំពុង​ងាប់ ស្លឹក​ឡើងត្នោត​នៅ​លើ​មែក",
      "musang-king-opened.jpg": "ផ្លែ​ធុរេន​ដែល​បាន​បក សាច់​ពណ៌លឿង​ចាស់​បី​ក្លែប",
      "opened-on-leaf.jpg": "ផ្លែ​ធុរេន​ដែល​បាន​បក​លើ​ស្លឹកចេក លើក​ក្លែប​មួយ​ចេញ​មក",
      "fruit-stall.jpg": "ផ្លែ​ធុរេន​មួយ​ដែល​លើក​តាម​ទង​ពី​គំនរ​នៅ​តូប",
    }[credit.file] ?? credit.caption,
    author: credit.family ? FAMILY_KM : credit.author,
  })),
};

export function sourcesFor(lang) {
  return lang === "km" ? { ...english, ...khmer } : english;
}
