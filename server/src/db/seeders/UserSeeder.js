import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "tyler@gmail.com",
        username: "Tyler",
        password: "123",
        weight: "185",
        location: "Boston MA",
        description: `Im a 6'7 striker who trains in Muay Thai and boxing look for light sparring and exchanging knowledge.`,
      },
      {
        email: "ironmike@gmail.com",
        username: "Mike Tyson",
        password: "IronMikeTyson",
        weight: "220",
        location: "Catskill NY",
        description: "Everyone has a plan 'till they get punched in the mouth.",
      },
      {
        email: "stamp@gmail.com",
        username: "Stamp Fairtex",
        password: "yoyoyo",
        weight: "115",
        location: "Bangkok",
        description:
          "I just want to show the world that even in a field that is dominated by men, that women like us can shine and make a name for ourselves",
      },
      {
        email: "ippo@gmail.com",
        username: "Ippo Makunouchi",
        password: "konnichiwa",
        weight: "126",
        location: "Tokyo",
        description:
          "Not everyone who works hard is rewarded. But! All those who succeed have worked hard!",
      },
      {
        email: "foppiano@gmail.com",
        username: "Shayna Foppiano",
        password: "ProElite",
        weight: "140",
        location: "Everett, MA",
        description: "Pro Boxer training out of Boston area looking to sharpen my skill.",
      },
      {
        email: "marvelous@gmail.com",
        username: "Marvin Hagler",
        password: "password",
        weight: "160",
        location: "Brockton, MA",
        description:
          "It's difficult to get up and do roadwork at five in the morning when you're sleeping in silk sheets.",
      },
      {
        email: "rodtang@gmail.com",
        username: "Rodtang",
        password: "theironman",
        weight: "134",
        location: "Bangkok",
        description: "Indestructible at my worst, unstoppable at my best",
      },
      {
        email: "theGoat@gmail.com",
        username: "Muhammad Ali",
        password: "thegreatest",
        weight: "236",
        location: "Louisville, KY",
        description: "Float like a butterfly sting like a bee",
      },
    ];

    for (const user of usersData) {
      const currentUser = await User.query().findOne({
        email: user.email,
      });
      if (!currentUser) {
        await User.query().insert(user);
      }
    }
  }
}

export default UserSeeder;
