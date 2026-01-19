import prisma from "../src/config/prisma.js";


async function main() {
  const tagNames = ["YouTube", "WhatsApp", "Social", "Night Data", "Video"];
  const tags = {};

  for (const name of tagNames) {
    const tag = await prisma.bundleTag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    tags[name] = tag;
  }

  const bundlesData = [
    {
      name: "Daily 100MB",
      type: "MIXED",
      price: 10,
      durationDays: 1,
      dataAmountMb: 100,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "Valid 24 hours",
      tagNames: [],
    },
    {
      name: "Daily 500MB Video",
      type: "VIDEO",
      price: 50,
      durationDays: 1,
      dataAmountMb: 500,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "Best for streaming",
      tagNames: ["Video"],
    },
    {
      name: "Daily WhatsApp 50MB",
      type: "WHATSAPP",
      price: 5,
      durationDays: 1,
      dataAmountMb: 50,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "WhatsApp only",
      tagNames: ["WhatsApp"],
    },
    {
      name: "Weekly 1GB",
      type: "MIXED",
      price: 100,
      durationDays: 7,
      dataAmountMb: 1024,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "General use",
      tagNames: [],
    },
    {
      name: "Weekly WhatsApp 200MB",
      type: "WHATSAPP",
      price: 30,
      durationDays: 7,
      dataAmountMb: 200,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "WhatsApp only",
      tagNames: ["WhatsApp"],
    },
    {
      name: "Weekly Social Pack 300MB",
      type: "SOCIAL",
      price: 40,
      durationDays: 7,
      dataAmountMb: 300,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "Facebook, Twitter, Instagram",
      tagNames: ["Social"],
    },
    {
      name: "Monthly 5GB",
      type: "MIXED",
      price: 500,
      durationDays: 30,
      dataAmountMb: 5120,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "General browsing",
      tagNames: [],
    },
    {
      name: "Monthly YouTube 3GB",
      type: "YOUTUBE",
      price: 300,
      durationDays: 30,
      dataAmountMb: 3072,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "YouTube only",
      tagNames: ["YouTube"],
    },
    {
      name: "Night 1GB",
      type: "NIGHT",
      price: 50,
      durationDays: 1,
      dataAmountMb: 1024,
      expiryType: "END_OF_DAY",
      notes: "Valid 11PM–5AM",
      tagNames: ["Night Data"],
    },
    {
      name: "Night 2GB",
      type: "NIGHT",
      price: 80,
      durationDays: 1,
      dataAmountMb: 2048,
      expiryType: "END_OF_DAY",
      notes: "Valid 11PM–5AM",
      tagNames: ["Night Data"],
    },
    {
      name: "Monthly Social 2GB",
      type: "SOCIAL",
      price: 200,
      durationDays: 30,
      dataAmountMb: 2048,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "Social apps only",
      tagNames: ["Social"],
    },
    {
      name: "Monthly WhatsApp 1GB",
      type: "WHATSAPP",
      price: 100,
      durationDays: 30,
      dataAmountMb: 1024,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "WhatsApp only",
      tagNames: ["WhatsApp"],
    },
    {
      name: "Daily 200MB + 50MB Bonus",
      type: "MIXED",
      price: 20,
      durationDays: 1,
      dataAmountMb: 200,
      bonusDataMb: 50,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "Includes bonus data",
      tagNames: [],
    },
    {
      name: "Weekly 500MB + 100SMS",
      type: "MIXED",
      price: 120,
      durationDays: 7,
      dataAmountMb: 500,
      bonusSms: 100,
      expiryType: "HOURS_FROM_ACTIVATION",
      notes: "Includes SMS bonus",
      tagNames: [],
    },
  ];

  for (const b of bundlesData) {
    const createdBundle = await prisma.bundle.create({
      data: {
        name: b.name,
        type: b.type,
        price: b.price,
        durationDays: b.durationDays,
        dataAmountMb: b.dataAmountMb,
        bonusDataMb: b.bonusDataMb,
        bonusSms: b.bonusSms,
        bonusCallsMin: b.bonusCallsMin,
        expiryType: b.expiryType,
        notes: b.notes,
        autoRenew: b.autoRenew || false,
        planRestriction: b.planRestriction,
      },
    });

    for (const tagName of b.tagNames) {
      await prisma.bundleTagMapping.create({
        data: {
          bundleId: createdBundle.id,
          tagId: tags[tagName].id,
        },
      });
    }
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
