/* The Field Notes, in catalogue order.
   Shape is defined in entry-sketch.md.

   `body` is an array of paragraphs, not one string. Entries run long, and a
   single block of six hundred words is not readable on a phone; the entry
   page renders one <p> per element.

   Every claim here comes from the orchard's owners at Teuk Chhou, the
   curator's parents, asked directly — with one neighbouring grower's account
   on three entries — together with the Khmer field vocabulary
   they use there. The record is in content/sources.js.

   `image` is null on the entries with no photograph yet. Those carry
   `imageWanted` instead — a note on what to shoot, rendered in place on the
   entry page while running `next dev` and never in a production build. When
   the photograph exists, add it to content/photos.js, point `image` at it,
   and delete the `imageWanted` line. Monthong and the counterfeit entry have
   neither, on purpose: both turn on the fruit itself, there is no fruit in
   the off-season, and a picture of anything else would be filler.

   khmerName is empty throughout this edition. The site is English-only for
   now; the growers' Khmer terms are held for the Khmer edition and recorded in
   full in PROJECT.md §8. The field and its rendering are kept so that
   restoring them is a data edit. */

/* Short labels for the entry sidebar. Who the claim came from, and nothing
   about how the asking was organised — the interview is one body of testimony
   from the two people who own the orchard, and the guide credits it that way
   on every entry. What it covered is set out on the Sources page. */
import photos from "./photos.js";

const INTERVIEW = { text: "Interview with the orchard's owners, the curator's parents" };
const NEIGHBOUR = { text: "Interview with a neighbouring grower at Teuk Chhou" };
const VOCAB = { text: "Khmer field vocabulary" };

const fieldNotes = [
  {
    slug: "reading-ripeness",
    figNumber: "01",
    title: "Reading Ripeness",
    khmerName: "",
    body: [
      "A durian gives no warning. It ripens on its own clock, and the only way in is to read it. The stem swells where it meets the branch, the thorn tips go from green to yellow-brown, and the seams down the shell open enough to pick out — useful signs, all of them, and none of them final. What settles it is the sound. The tool is thirty centimetres of hardwood wrapped in motorcycle inner tube, because a bare knife handle bruises the thorn tips and the buyer deducts for it, and both hands work at once: one taps the belt of the husk while the other holds the stem and feels what comes back through it. Green answers high and dense. Ready answers hollow, the flesh having pulled off the wall inside. Gone answers dull, with no echo at all. Two things confirm the verdict — the stem joint darkens, weeps a sticky sap and bends without snapping, and the base of the fruit turns from grassy to warm and faintly sulfurous. Ov Khak takes a harder tap than Monthong for it, being thicker in the skin and coarser in the thorn.",
      "None of this comes quickly. The ear takes three seasons to train and never gets perfect; he still misses three to five fruit in a hundred, and a fruit cut early loses half its value on the spot. Some of that error is deliberate, though. Monthong bound for the city is cut early on purpose, at eighty-five percent, and finishes ripening on the road.",
      "The work itself runs to a tight schedule. Cutting starts at five and stops at half past eight, while the stems are stiff and the fruit will not sweat in the basket, and about nine in ten are taken that way. The rest are left to fall into nylon nets slung under the clusters or beds of rice straw laid below the low branches, and eaten at the farm the same day. Whatever is cut too early is simply lost. Warmth and a ripe banana will soften it, but the flesh stays rubbery and never finds its sugar.",
    ],
    sources: [VOCAB, INTERVIEW],
    image: photos["/opened-on-leaf.jpg"],
    tags: ["harvest", "ripeness"],
    status: "published",
  },
  {
    slug: "the-dry-spell",
    figNumber: "02",
    title: "Flowering and the Dry Spell",
    khmerName: "",
    body: [
      "Durian flowers on drought, not rain: ten to fourteen days without it, and the buds come. Rain on the seventh day and the tree gives up, pushing out a flush of young leaves instead of buds, and that wave is gone for the season. When they do arrive the buds look like fish scales — brown-white bumps under branches two to four years old — and they come in two or three waves, fifteen to twenty days apart.",
      "Because the trigger is dryness, the orchard works at making the ground drier. They strip the mulch off the roots so the topsoil dries fast and cut out the water-suckers to put the tree under stress, without the paclobutrazol the big Thai plantations use. It does not always work: in 2016 the heat ran so hard that the trees dropped their leaves and half the farm never bloomed at all. Once the flowers are open the rule reverses and nothing goes into the canopy — no spray, no feed — because it washes the pollen off, burns the stigmas, and drives away the animals doing the work. Roots get water. The canopy is left alone until the fruit sets.",
      "On what does the pollinating, the growers speak for themselves. Bats do most of it; you hear the wings in the dark. Hawk moths work the flowers too, taking nectar and carrying pollen on their bellies, and both count. The bats are down by half since his childhood, the roosts in the limestone hills broken up by quarrying, which is why the fifteen Musang King are pollinated by hand — a brush on a bamboo pole, between seven and nine at night. Even so the arithmetic is brutal. Ten thousand flowers on a mature tree, and fifty to eighty of them become fruit worth selling; then the growers cut that number down again themselves, thinning twice, at ping-pong size and at goose-egg size.",
    ],
    sources: [VOCAB, INTERVIEW],
    image: photos["/durian-flower.jpg"],
    tags: ["flowering", "pollination", "season"],
    status: "published",
  },
  {
    slug: "from-flower-to-fruit",
    figNumber: "03",
    title: "From Flower to Fruit",
    khmerName: "",
    body: [
      "How long a durian takes from flower to harvest is the kind of number that should be in a book, and for Cambodia's varieties it is not. It sits in growers' heads instead. Here it is, from this orchard: Sadong Kit at ninety to a hundred days and the earliest of them, Musang King at a hundred to a hundred and ten, Ov Khak at a hundred and five to a hundred and fifteen, and Monthong last at a hundred and fifteen to a hundred and twenty-five. The count starts the night eighty percent of the petals fall, because nobody is standing there when the flower opens, and since the waves overlap, each one's branches get a different colour of raffia — red, blue, yellow — so the calendar hangs on the tree itself.",
      "The numbers move with the weather. Heat pulls maturity forward five to seven days; cloud and rain through the third month push it back ten. Past day sixty the fruit is safe, and the last twenty days put on a third of its weight as starch turns to sugar and fat. All of which comes from one orchard and one family, with no controls and no second site. It is written down because the alternative was leaving it unwritten.",
    ],
    sources: [INTERVIEW],
    image: photos["/tree-in-fruit.jpg"],
    tags: ["flowering", "harvest", "research gap"],
    status: "published",
  },
  {
    slug: "ov-khak",
    figNumber: "04",
    title: "Ov Khak: The Native Variety",
    khmerName: "",
    body: [
      "Ov Khak is what this orchard is built on — about a hundred of its two hundred and fifteen trees, six of which came with the land in 1994 and still carry heavy; the largest sets eighty to a hundred fruit a year. The flesh is a dark mustard yellow, thick and oily and free of fibre, opening sweet and finishing on a hard aromatic bitterness at the back of the mouth, where Monthong beside it is pale, sweet, firm and mild. The fruit runs two to three and a half kilos, three to five carpels, two big seeds a section — less flesh than Monthong yields, and by their reckoning twice the flavour.",
      "As a tree it earns its place. The native roots hold off the soil fungi that take the Thai varieties, though cut fruit softens inside forty-eight hours, which is as far as it travels. It has to be grafted: seed reverts to wild habit, thin flesh and enormous seeds. Around Teuk Chhou the growers also keep two sub-types nobody else records, one rich and yellow and one pale and thin, and they rate the pale one poorly.",
      "Who buys it explains where it is going. Kampot people, Phnom Penh elders who grew up on it, and buyers who drive out to the farm — while the commercial trade wants uniform Monthong, which is why the variety loses ground each year and survives on smallholdings. In 2025 an ambassador visited a Kampot farm and praised Ov Khak; they saw it on television. It brought the village some pride. It did not move the price at the gate.",
    ],
    sources: [VOCAB, INTERVIEW],
    image: photos["/ov-khak-opened.jpg"],
    tags: ["ov khak", "native variety", "export"],
    status: "published",
  },
  {
    slug: "sadong-kit",
    figNumber: "05",
    title: "Sadong Kit: A Variety Without a Record",
    khmerName: "",
    body: [
      "In more than thirty years, no researcher and no extension officer has come to this orchard to take a sample of Sadong Kit or to write down where its trees stand. They were here before the family was, standing when the land was bought in 1994, which makes them at least thirty-two years old and probably older. There are about fifty of them, against a hundred Ov Khak, fifty Monthong and fifteen Musang King — estimates, all of it, because trees die and get replanted and no exact count holds for a season.",
      "What they produce has never been described in print either, so this is the growers' own account. Deep yellow flesh, thick enough to stick to the roof of the mouth, sweet at first and then a bitterness that stays — burnt caramel, dark roasted coffee — with a faint fermented note that leaves the tongue slightly numb. Monthong is the easy introduction to durian; this is the one people keep when they want difficulty.",
      "It is also a poor commercial fruit, and everyone knows exactly why. The whole block ripens inside seven to ten days, and once off the tree it turns watery and ferments toward sour alcohol in thirty-six to forty-eight hours. It yields thirty to forty percent less per tree than Monthong, and traders will not touch it, so it sells at the gate. When the orchards were replanted after the war the market wanted Monthong, and later Musang King at export prices; Sadong Kit survived here only because the same customers book the whole crop every April, before a fruit is cut. Older people use the full name and younger traders shorten it, and it refers to the short tight cluster of thorns near the stem. The growers give it twenty years in commercial farming and then home gardens — which says more about what was thought worth writing down than about the fruit.",
      "Not every orchard kept it, and a neighbour who did not puts the market's case better than anyone. He grows Monthong and Ov Khak on three hectares nearby, and cut down his last three Sadong Kit in 2008: small yields, and fruit that rots on the back of a motorbike before it reaches the paved road. “It tastes wonderful, but you can't buy fertilizer or pay school fees with wonderful taste. You need volume, and Monthong gives volume.”",
    ],
    sources: [VOCAB, INTERVIEW, NEIGHBOUR],
    image: photos["/sadong-kit.jpg"],
    tags: ["sadong kit", "native variety", "research gap"],
    status: "published",
  },
  {
    slug: "monthong",
    figNumber: "06",
    title: "Monthong: The Golden Pillow",
    khmerName: "",
    body: [
      "Monthong is Thailand's durian, and you can date its arrival here from inside one orchard. Scions crossed the border in numbers around 1997 and 1998, and this family grafted theirs in 2002 — not for the taste, but because traders were offering guaranteed contracts. Phnom Penh wanted a big pale sweet fruit that would survive the truck, and nobody was offering that for the local varieties.",
      "It has been an expensive tenant ever since. It takes twice the water and twice the fungicide of Ov Khak and suffers badly from trunk canker, but it carries far more fruit for it and reaches four to six kilos here. It is cut at eighty-five percent for the city and ninety at the gate, softening four to six days later, and that gap is the whole point of the variety: the fruit ripens on the road. City buyers ask for it by name. His verdict on eating it is shorter — essential, and boring, with no aroma and none of the bitterness. A few neighbours grow Chanee and Kanyao, but Monthong is four-fifths of the Thai trees around here.",
    ],
    sources: [VOCAB, INTERVIEW],
    image: null,
    tags: ["monthong", "variety", "trade"],
    status: "published",
  },
  {
    slug: "musang-king",
    figNumber: "07",
    title: "Musang King: A Recent Introduction",
    khmerName: "",
    body: [
      "Musang King has no history in Kampot. What it has is fifteen trees, top-worked in May 2021 onto the limbs of ten-year-old native rootstock — not planted, but grafted onto what was already standing — from scion wood bought through an importer, out of a Malaysian nursery by way of Vietnam. The method is quick to describe: cut back the branch, split the bark, seat a wedge-cut scion, bind it, and bag it in clear plastic for three weeks until green shows. Thirty percent failed through the first rainy season, and the ones that took set their first fruit in June 2026, three or four to a tree.",
      "Keeping them alive is its own work. The young shoots burn above forty degrees, which April reaches, so the row sits under seventy percent shade netting through the dry season and can be picked out from a distance by the nets and the blue tags at the trunks. The first fruit came out mustard-yellow to orange, rich, creamy and heavily alcoholic, and a little drier than the Malaysian frozen fruit, which the growers put down to the granite gravel in this soil. None of it was sold. The family ate two to judge it and gave the rest to the village chief and the head monk at the temple; 2027 will be the first season any of it goes to market.",
      "They are content with the experiment at fifteen trees and certain it would be wrong at any larger scale. Their reason is not money. If enough growers swap native trees for this one, they say, the flavour that makes Kampot durian its own disappears inside a generation.",
    ],
    sources: [VOCAB, INTERVIEW],
    image: photos["/musang-king-opened.jpg"],
    tags: ["musang king", "grafting", "export"],
    status: "published",
  },
  {
    slug: "a-name-worth-protecting",
    figNumber: "08",
    title: "The Kampot Name and Counterfeit Fruit",
    khmerName: "",
    body: [
      "Durian sells for more under the name Kampot than under almost any other label in Cambodia, and that premium is the whole problem. The route is simple enough: fruit bought cheap at the border, trucked to the stalls on National Road 3, and sold as Teuk Chhou durian at three times what it cost. The growers read a fake off the surface — real fruit from these slopes carries fine mountain dust, uneven thorns and a fresh grey-green stem, where the import arrives too clean with its stem dipped in yellow chemical paste. What it costs them is not the sale. A visitor buys a watery, chemical-smelling fruit on the highway, decides Kampot durian is overrated, and never buys again.",
      "Their own prices give the other end of it. Eighteen thousand riel a kilo for Monthong at the gate, twenty-two for Ov Khak, twenty-five for Sadong Kit, against thirty to thirty-five at a Phnom Penh stall — so the grower keeps about half of what the eater finally pays, and those are peak-season numbers that halve in a tight market. Sixty percent of the crop goes to one Kampot middlewoman, who walks the orchard in April, estimates the weight, pays a fifth down in cash and settles each evening as the fruit is weighed and loaded. Twenty percent goes to visitors at the farm, and twenty percent by bus to Phnom Penh, ordered over Telegram.",
      "They want a protected name and cannot use one, because the paperwork is built for somebody larger. They point at Kampot pepper, which helped the exporters and left the small farms carrying the same costs, and at the local durian association, which exists on paper while every farm still competes with its neighbours at harvest. Until that changes, telling real fruit from relabelled is the buyer's problem, and a question of who they trust.",
    ],
    sources: [VOCAB, INTERVIEW],
    image: null,
    tags: ["market", "counterfeit", "price"],
    status: "published",
  },
  {
    slug: "when-the-rain-doesnt-come",
    figNumber: "09",
    title: "Drought, and the 2024 Season",
    khmerName: "",
    body: [
      "Durian needs a short dry spell to flower, and the dry seasons have been running long. In 2024 the trees went into survival and threw off their own flowers and young fruit to hold water: forty-three degrees in May, the mountain stream gone by late March, leaves wilting by nine every morning. Four mature trees died when their roots dried, a quarter of the season's fruit weight went to early abortion, and the rain that used to arrive in the first week of May did not reach the orchard until mid-June.",
      "So they stopped waiting for rain. Water now comes from a thirty-two-metre well pulled by a three-horsepower diesel pump burning eight to ten litres a day — twelve dollars daily in fuel to water trees — and the level in that well dropped three metres by the height of the season. Rice straw goes down fifteen centimetres deep at the drip-line, held thirty centimetres clear of the trunk so the collar will not rot, and seventy percent shade netting goes over the young trees at fifteen dollars each, worth three or four degrees. One thing failed outright: an anti-transpirant spray that clogged the leaves, brought them down, and cost two hundred dollars.",
      "The deep well is the reason the losses stopped at four trees. The neighbour to the east waters from a shallow dug pond, which was mud by mid-April; he lost more than thirty mature Monthong, the leaves gone, the bark split, and root rot behind it. A second neighbour, who farms three hectares nearby, had a twenty-five-metre well that went dry in late April and a ravine off the ridge that is dry by February in a bad year, so he bought water trucked in from Kampot town — three tankers a week, thirty-five dollars a load — to keep his bearing trees alive. He lost eight trees and almost his whole early fruit set. “2024 almost bankrupted me.” Across the district, by the growers' reckoning, small farms lost anywhere from a tenth to two-fifths of their standing canopy that year.",
      "None of it is shared. Every farm here digs its own pond and drills its own well, and no government or NGO help reached this orchard after 2024. Nor was it the first loss — in 2014 floodwater from the river stood on the low lot for four days, and twelve mature Ov Khak died of root rot inside a month. So late in 2024 the family built the storage they had been saying they needed: eighteen hundred dollars to dig the farm pond two metres deeper and wider, and a reinforced concrete wall along the intake bank so the silt that comes off the mountain in the monsoon cannot fill it back in.",
      "The seasons since have been kinder. In 2025 the rain came back in early May, mild and steady, and the surviving trees flushed new leaf, though the crop ran about a fifth short while they rebuilt. In 2026 it came back to nine-tenths of what the orchard bore before the drought, and the oldest Ov Khak carried more than ninety fruit. The trees that lost limbs in 2024 still hold a thinner canopy than they did. Twenty years is viable, the growers say, but only with real water storage behind it. The district figure above is their estimate, not a count; this guide asked two farms, not the district.",
    ],
    sources: [VOCAB, INTERVIEW, NEIGHBOUR],
    image: photos["/drought-damage-tree.jpg"],
    tags: ["climate", "drought", "irrigation"],
    status: "published",
  },
  {
    slug: "kampots-season",
    figNumber: "10",
    title: "The Orchard Year",
    khmerName: "",
    body: [
      "The durian year starts before the calendar does. Water is cut off through January and February to force the bloom, the trees flower and set in March, and April is thinning, bracing and the heaviest watering of the year — which puts Khmer New Year in the middle of the hardest fortnight on the farm. They work through it. Harvest opens mid-May, peaks in mid-June in one week when a third of the farm comes ripe at once, and is finished by late July. August to October is pruning, manure and drainage, and in November and December the trees rest.",
      "The varieties do not arrive together. Sadong Kit comes first in late May, then Musang King in early June, Ov Khak in mid-June and Monthong last, from late June into July — and the start of it all moves a long way from year to year, as early as 28 April in 2018 and as late as 12 June in the drought year. A day at the peak begins at half past four, walking the rows with a flashlight for whatever fell overnight, then cutting until nine, sorting and weighing and arguing with the middleman until noon, packing bus orders for Phnom Penh through the afternoon, and walking the perimeter at night, because ripe fruit is worth stealing.",
      "The year has its own observances too. Before the first cut in May an altar goes up at the foot of the oldest tree, with incense and food for the Neak Ta, and for a harvest with nobody falling out of a branch; at the end of July the growers eat together, drink rice wine and compare what they took. And it is not only durian. Two hundred poles of Kampot pepper and a dozen mangosteen carry the house through the other half of the year.",
    ],
    sources: [VOCAB, INTERVIEW],
    image: photos["/harvest-ready-to-sell.jpg"],
    tags: ["season", "harvest", "kampot"],
    status: "published",
  },
  {
    slug: "the-china-route",
    figNumber: "11",
    title: "The Export Expansion, Seen from a Smallholding",
    khmerName: "",
    body: [
      "Cambodian durian exports have grown fast, and this orchard has no part in it. The growers are not on the approved list and do not expect to be: it wants a registered pack-house, continuous chemical logging and land held in blocks, none of which a two-hectare farm has, and they put the cost of getting there at five thousand dollars. A fifteen-hectare farm nearby did certify, and had to build concrete mixing sheds and wash stations for the workers and give up traditional manure to do it. A ten-hectare orchard down the road tried in late 2025 and failed its first inspection: its chemical store stood too close to its main irrigation intake, and it could not show three straight years of written spray logs. Inspectors run seminars in village halls; none has walked this soil.",
      "Nobody this orchard actually sells to has ever asked for a certificate. The middlewoman and the Phnom Penh traders judge with their eyes, their hands and a tapping stick; only brokers for Chinese pack-houses ask about chemical logs or a GACC registration number. Asked what the five thousand dollars would have to buy, the growers were exact: a guaranteed contract for eight to ten tonnes of Monthong a season at no less than 22,000 riel a kilo, and thirty percent of the harvest paid in cash before the first fruit is cut. Without a floor on both price and volume, they say, spending it on paperwork for two hectares would be financial suicide.",
      "The brokers came through the village in late 2025 and again in early 2026, pushing exclusive Monthong contracts. This family said no. Two of the larger growers in the village signed with a Sino-Cambodian broker, and how it went is the clearest argument in this entry. The broker paid a fair 21,000 riel a kilo, then rejected nearly a quarter of their harvest for small cosmetic faults in the thorns that any Cambodian trader would have bought, and the rejects had to be sold off locally at 12,000. That is the grade-B price: a neighbour who sells his whole crop to one middleman was paid 17,500 a kilo for grade-A Monthong in 2026, and 12,000 for the small and misshapen.",
      "What the growers can measure from outside has so far gone their way. Gate prices rose a thousand or two thousand riel a kilo once the big farms sent their crop to export and left less for Phnom Penh, and through 2026 Monthong held between 17,000 and 20,000 riel at the gate, the Kampot name still worth a premium at home. They hear that the Phnom Penh wholesale price is beginning to soften as new plantations in Tbong Khmum and Mondulkiri come into bearing, and closer to home investors from the city have been clearing hillside around Teuk Chhou for Monthong and Musang King in monoculture, three to five years off bearing age. When that crop lands they expect Monthong to fall hard, and the farms that kept the local varieties to be better placed. What the export programme looks like from inside is not something this orchard can say. What it can say is what staying out costs, and what happened to the neighbours who went in.",
    ],
    sources: [INTERVIEW, NEIGHBOUR],
    image: photos["/fruit-stall.jpg"],
    tags: ["export", "market", "smallholder"],
    status: "published",
  },
];

export default fieldNotes;

/* The body as one string, for search and for card excerpts. Paragraphs join
   on a space so a phrase spanning a paragraph break still reads as prose. */
export function bodyText(note) {
  return Array.isArray(note.body) ? note.body.join(" ") : note.body || "";
}

/* One entry by slug. Returns undefined for an unknown slug; callers handle it. */
export function getNote(slug) {
  return fieldNotes.find((n) => n.slug === slug);
}

/* The next entry in catalogue order, wrapping at the end so the last entry
   still offers somewhere to go. */
export function getNextNote(slug) {
  const i = fieldNotes.findIndex((n) => n.slug === slug);
  if (i === -1) return undefined;
  return fieldNotes[(i + 1) % fieldNotes.length];
}
