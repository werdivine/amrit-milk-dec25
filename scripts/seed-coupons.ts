import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const coupons = [
    { code: "IBS20", type: "percentage", value: 20, description: "IBS Special 20% Off" },
    { code: "CMS25", type: "percentage", value: 25, description: "CMS Special 25% Off" },
    { code: "FRIENDS30", type: "percentage", value: 30, description: "Friends 30% Off" },
    { code: "AMRIT5", type: "percentage", value: 5, description: "Amrit 5% Off" },
    { code: "AMRIT10", type: "percentage", value: 10, description: "Amrit 10% Off" },
    { code: "AMRIT15", type: "percentage", value: 15, description: "Amrit 15% Off" },
    { code: "AMRIT20", type: "percentage", value: 20, description: "Amrit 20% Off" },
    { code: "GAGAN30", type: "percentage", value: 30, description: "Gagan 30% Off" },
];

async function main() {
    console.log("Seeding coupons...");

    for (const c of coupons) {
        try {
            await prisma.coupon.upsert({
                where: { code: c.code },
                update: {
                    type: c.type,
                    value: c.value,
                    description: c.description,
                    isActive: true,
                },
                create: {
                    code: c.code,
                    type: c.type,
                    value: c.value,
                    description: c.description,
                    isActive: true,
                    minOrderValue: 0,
                },
            });
            console.log(`Seeded ${c.code}`);
        } catch (e) {
            console.error(`Error seeding ${c.code}:`, e);
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
