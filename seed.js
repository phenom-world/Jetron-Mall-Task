const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const products = [];
  for (let i = 1; i <= 20; i++) {
    products.push({
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 100) + 1,
      quantity: Math.floor(Math.random() * 10) + 1,
      description: `This is product ${i}.`,
      category: `Category ${Math.floor(Math.random() * 5) + 1}`,
      image: `https://picsum.photos/200/300?random=${i}`,
    });
  }

  await prisma.product.createMany({
    data: products,
  });

  console.log("Seeding complete!");
  process.exit();
}

seed();
