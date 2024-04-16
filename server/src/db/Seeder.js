/* eslint-disable no-console */
import { connection } from "../boot.js";
import UserSeeder from "./seeders/UserSeeder.js";
import ChatsSeeder from "./seeders/ChatsSeeder.js";
import MessagesSeeder from "./seeders/MessagesSeeder.js";

class Seeder {
  static async seed() {
    // include individual seed commands here

    console.log("seeding users...");
    await UserSeeder.seed();

    console.log("seeding chats...");
    await ChatsSeeder.seed();

    console.log("seeding messages...");
    await MessagesSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
