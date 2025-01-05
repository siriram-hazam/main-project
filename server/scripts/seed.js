import { readFileSync } from "fs";
import path from "path";
import axios from "axios";
import prisma from "../db/db.config.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkIfDataExists() {
  const userCount = await prisma.user_account.count();
  return userCount > 0;
}

async function checkIfSuperadminExists() {
  const superadminCount = await prisma.user_account.count({
    where: { role: "superadmin" },
  });
  return superadminCount > 0;
}

async function seedSuperadmin() {
  try {
    const response = await axios.post("http://backend:3001/api/user/", {
      username: "siriram",
      password: "123456",
      fullname: "Siriram Hazam",
      email: "siriram.work@gmail.com",
      role: "superadmin",
      company_id: 0,
    });

    console.log("Superadmin seeded successfully 🌱 :", response.data);
  } catch (error) {
    console.error(
      "Error seeding superadmin:",
      error.response ? error.response.data : error.message
    );
  }
}

async function main() {
  const hasData = await checkIfDataExists();

  if (hasData) {
    console.log("Data already exists, skipping seed 🌱");
    return;
  }

  try {
    const sqlFile = readFileSync(path.join(__dirname, "seed.sql"), "utf8");
    const sqlCommands = sqlFile.split(/;\s*$/m);
    for (const command of sqlCommands) {
      if (command.trim()) {
        await prisma.$executeRawUnsafe(command);
      }
    }
    console.log("Database has been seeded 🌱");

    const superadminExists = await checkIfSuperadminExists();
    if (!superadminExists) {
      await seedSuperadmin();
    } else {
      console.log("Superadmin already exists, skipping seed 🌱");
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
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
