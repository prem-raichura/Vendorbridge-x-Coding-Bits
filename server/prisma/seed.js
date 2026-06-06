const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('admin@123', salt);

  const user = await prisma.user.upsert({
    where: { email: 'premraichura007@gmail.com' },
    update: {},
    create: {
      username: 'premraichura',
      email: 'premraichura007@gmail.com',
      password: hashedPassword,
      first_name: 'prem',
      last_name: 'raichura',
      role: 'admin',
    },
  });

  console.log('Successfully seeded user for testing:', user.username);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
