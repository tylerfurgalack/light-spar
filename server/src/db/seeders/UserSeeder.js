import { User } from "../../models/index.js";

class UserSeeder {
  static async seed() {
    const usersData = [
      {
        email: "tyler@gmail.com",
        username: "Tyler",
        password: "123",
        weight: "185",
        location: "Boston, MA, USA",
        description: `Im a 6'7 striker who trains in Muay Thai and boxing look for light sparring and exchanging knowledge.`,
        image: "https://light-spar-development.s3.amazonaws.com/1700158460683",
      },
      {
        email: "ironmike@gmail.com",
        username: "Mike Tyson",
        password: "IronMikeTyson",
        weight: "220",
        location: "New York, NY, USA",
        description: "Everyone has a plan 'till they get punched in the mouth.",
        image: "https://light-spar-development.s3.amazonaws.com/tyson.jpeg",
      },
      {
        email: "stamp@gmail.com",
        username: "Stamp Fairtex",
        password: "yoyoyo",
        weight: "115",
        location: "Bangkok, Thailand",
        description:
          "I just want to show the world that even in a field that is dominated by men, that women like us can shine and make a name for ourselves",
        image: "https://light-spar-development.s3.amazonaws.com/stamp.jpeg",
      },
      {
        email: "ippo@gmail.com",
        username: "Ippo Makunouchi",
        password: "konnichiwa",
        weight: "126",
        location: "Tokyo, Japan",
        description:
          "Not everyone who works hard is rewarded. But! All those who succeed have worked hard!",
        image: "https://light-spar-development.s3.amazonaws.com/ippo.jpeg",
      },
      {
        email: "foppiano@gmail.com",
        username: "Shayna Foppiano",
        password: "ProElite",
        weight: "140",
        location: "Boston, MA, USA",
        description: "Pro Boxer training out of Boston area looking to sharpen my skill.",
        image: "https://light-spar-development.s3.amazonaws.com/shayna.jpeg",
      },
      {
        email: "marvelous@gmail.com",
        username: "Marvin Hagler",
        password: "password",
        weight: "160",
        location: "Brockton, MA, USA",
        description:
          "It's difficult to get up and do roadwork at five in the morning when you're sleeping in silk sheets.",
        image: "https://light-spar-development.s3.amazonaws.com/marvelous.jpeg",
      },
      {
        email: "rodtang@gmail.com",
        username: "Rodtang",
        password: "theironman",
        weight: "134",
        location: "Bangkok, Thailand",
        description: "Indestructible at my worst, unstoppable at my best",
        image: "https://light-spar-development.s3.amazonaws.com/rodtang.jpeg",
      },
      {
        email: "theGoat@gmail.com",
        username: "Muhammad Ali",
        password: "thegreatest",
        weight: "236",
        location: "Louisville, KY, USA",
        description: "Float like a butterfly sting like a bee",
        image: "https://light-spar-development.s3.amazonaws.com/ali.jpeg",
      },
      {
        email: "glassjoe@gmail.com",
        username: "Glass Joe",
        password: "1stfight",
        weight: "110",
        location: "Boston, MA, USA",
        description: "Watch the jaw!! Don't hit my jaw!",
        image: "https://light-spar-development.s3.amazonaws.com/glassjoe.png",
      },
      {
        email: "mac@gmail.com",
        username: "Little Mac",
        password: "jabjabjab",
        weight: "107",
        location: "Boston, MA, USA",
        description: "Piece of cake!",
        image: "https://light-spar-development.s3.amazonaws.com/littlemac.png",
      },
      {
        email: "bobby@gmail.com",
        username: "Bobby Flynn",
        password: "bobby",
        weight: "171",
        location: "Boston, MA, USA",
        description: "MMA fighter looking for all kinds of sparring!",
        image: "https://light-spar-development.s3.amazonaws.com/bobby.jpeg",
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
