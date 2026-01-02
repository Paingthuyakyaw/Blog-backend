import { error } from "node:console";
import { prisma } from "./lib/prisma";
import { faker } from "@faker-js/faker";

const randomUser = () => ({
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: faker.phone.number(),
  image: faker.image.avatar(),
  errorLoginCount: faker.number.int({ min: 0, max: 3 }),
  randToken: faker.string.alphanumeric(10),
  password: faker.internet.password(),
});

const userData = faker.helpers.multiple(randomUser, { count: 10 });

async function main() {
  // Create  new users

  for (const user of userData) {
    const createdUser = await prisma.user.create({
      data: user,
    });
  }
  // Fetch all users with their posts
  const allUsers = await prisma.user.findMany();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
