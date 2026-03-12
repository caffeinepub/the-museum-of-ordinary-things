import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";


import BlobStorageMixin "blob-storage/Mixin";

actor {

  // ---- Types ----

  public type MoodTag = {
    #nostalgic;
    #funny;
    #bittersweet;
    #love;
    #childhood;
  };

  public type Artifact = {
    id : Nat;
    imageId : Text;
    objectName : Text;
    story : Text;
    moodTag : ?MoodTag;
    contributorName : Text;
    submittedAt : Int;
  };

  // ---- State ----

  stable var nextId : Nat = 20;

  stable var artifacts : [Artifact] = [
    {
      id = 0;
      imageId = "";
      objectName = "Grandmother's Chai Cup";
      story = "Every morning after school, I would sit at my grandmother's kitchen table and she would pour chai into this small, chipped cup. The cup was always too hot to hold, so she taught me to wrap both palms around it and breathe in the steam first. That ritual, the steam, the cardamom, the sound of her slippers on the tile, is the warmest memory I carry. She passed away three years ago. I found this cup in a box of her things and could not bring myself to use it or discard it. It sits on my shelf now, holding all the mornings I did not know would be the last ones.";
      moodTag = ?#nostalgic;
      contributorName = "Priya M.";
      submittedAt = 1_700_000_000_000_000_000;
    },
    {
      id = 1;
      imageId = "";
      objectName = "Last Bus Ticket to Bombay";
      story = "The date stamped on this ticket is September 14th, 2019. I remember buying it in a hurry, barely making the bus, sitting in the last seat as the city I had grown up in began to disappear behind me. I was moving for a new job, a new life. I told myself I would be back in a few months. I have not been back since. The ticket has yellowed at the edges now, but the number is still legible: Seat 22. I remember looking out the window at the last bridge before the highway and thinking this is the moment. This is where one version of my life ends.";
      moodTag = ?#bittersweet;
      contributorName = "Anonymous";
      submittedAt = 1_710_000_000_000_000_000;
    },
    {
      id = 2;
      imageId = "";
      objectName = "Broken Exam Pencil";
      story = "I broke this pencil during my final engineering exam, pressing too hard on the paper because I was so nervous. The tip snapped and rolled across the desk and I almost cried. My neighbor passed me a new one without a word. I passed the exam. I kept the broken pencil as a reminder that some things snap under pressure and that is okay, because often, someone nearby will hand you what you need to continue. I have never met that neighbor again. I do not even remember his face. But I remember the pencil.";
      moodTag = ?#nostalgic;
      contributorName = "Arjun K.";
      submittedAt = 1_715_000_000_000_000_000;
    },
    {
      id = 3;
      imageId = "";
      objectName = "Coffee Cup from a Long Conversation";
      story = "We sat in that cafe for six hours. The coffee had gone cold after the second hour and neither of us ordered more. We were too busy talking, about everything and nothing, about fears we had never said out loud, about the strange shape of our lives. By the time we looked up, the cafe was closing. The owner smiled at us like he had seen this before. I kept the paper cup. It is silly, I know. But it was the conversation that made me feel the least alone I have ever been, and I wanted to hold onto something from that afternoon.";
      moodTag = ?#love;
      contributorName = "Sara J.";
      submittedAt = 1_718_000_000_000_000_000;
    },
    {
      id = 4;
      imageId = "";
      objectName = "Faded Birthday Card";
      story = "My father was not a man of many words. He worked long hours and came home tired and quiet. But every birthday, without fail, there would be a card on the kitchen table before I woke up. This one is from my twelfth birthday. Inside, in his careful handwriting: For my daughter, who makes every ordinary day feel like a celebration. I did not understand those words when I was twelve. I understand them completely now that I am thirty-four and he is gone. I read it every year on my birthday, standing in the kitchen, like a small ceremony.";
      moodTag = ?#childhood;
      contributorName = "Leila N.";
      submittedAt = 1_720_000_000_000_000_000;
    },
    {
      id = 5;
      imageId = "";
      objectName = "Father's Old Watch";
      story = "The watch stopped working in 1998 and my father never got it repaired. He kept wearing it anyway, every single day, for twenty years. When I asked him why he wore a watch that did not work, he said: Because it reminds me to stop and notice the time I actually have. I was a teenager then and I thought it was just something old people say. Now I wear the watch. It still does not work. And every time I glance at it and see the frozen hands, I stop. I notice. I remember him.";
      moodTag = ?#love;
      contributorName = "David O.";
      submittedAt = 1_722_000_000_000_000_000;
    },
    {
      id = 6;
      imageId = "";
      objectName = "Cracked Marble";
      story = "I won this marble in the schoolyard when I was seven years old. It was the most beautiful thing I had ever owned — a deep blue swirl trapped inside glass. A week later I dropped it on the kitchen tiles and it cracked clean through the middle. I cried for an hour. My mother did not throw it away. She wrapped it in a piece of cloth and put it in my drawer. I found it again when I was clearing out my childhood bedroom at thirty years old. The crack runs right through the center of the blue swirl, and somehow that makes it more beautiful than it ever was when it was whole.";
      moodTag = ?#childhood;
      contributorName = "Tomás R.";
      submittedAt = 1_723_000_000_000_000_000;
    },
    {
      id = 7;
      imageId = "";
      objectName = "Handwritten Recipe Card";
      story = "This is my mother's handwriting, in the blue ink she always used. The recipe is for a lamb stew she made every winter. The card is stained at the corners from years of use. She wrote it out for me when I left home for university, folded inside a card that said: So you will not be hungry. I have made this stew dozens of times now. It never tastes exactly like hers. But every time I make it, I feel her close — in the kitchen, in the steam, in the smell of cumin and bay leaves filling the flat. Some things can only be passed down imperfectly, and that imperfection is its own kind of love.";
      moodTag = ?#nostalgic;
      contributorName = "Hana B.";
      submittedAt = 1_724_000_000_000_000_000;
    },
    {
      id = 8;
      imageId = "";
      objectName = "Airline Boarding Pass";
      story = "This is the boarding pass from the flight I took to meet the person I would marry. I did not know that then. I was just going to a conference, annoyed about the early departure time, hoping the seat next to me would be empty. It was not empty. The person in that seat talked to me for four hours and by the time we landed I knew something irreversible had happened to me. I have kept every boarding pass from every flight I have ever taken. But this one I keep separately. This one I keep in the drawer by my bed.";
      moodTag = ?#love;
      contributorName = "Anonymous";
      submittedAt = 1_725_000_000_000_000_000;
    },
    {
      id = 9;
      imageId = "";
      objectName = "Old Library Membership Card";
      story = "I got my first library card when I was six. The librarian wrote my name in careful block letters because I had not yet learned cursive. I was so proud of it that I carried it in my coat pocket for a year. This is not that first card — that one is long gone. This is the card from when I was twelve, the summer I read forty-seven books in three months because there was nothing else to do and nowhere to go. That summer made me who I am. The library was the only place that felt like mine.";
      moodTag = ?#childhood;
      contributorName = "Ingrid S.";
      submittedAt = 1_726_000_000_000_000_000;
    },
    {
      id = 10;
      imageId = "";
      objectName = "Dried Flower from a Funeral";
      story = "My best friend of twenty years died suddenly on a Tuesday in November. This flower is from the arrangement by his casket. I took it without thinking, standing there in the receiving line not knowing what to do with my hands. I brought it home and pressed it in a book — the same book he had lent me three weeks before and asked me to return when I was done. I have not been able to read past page forty. The dried flower sits between those pages. I don't know when I will be ready to finish it, but I am not ready to throw the flower away.";
      moodTag = ?#bittersweet;
      contributorName = "Marco F.";
      submittedAt = 1_727_000_000_000_000_000;
    },
    {
      id = 11;
      imageId = "";
      objectName = "Child's Drawing of a House";
      story = "My daughter made this drawing when she was four years old. She told me it was our house, but with a dragon on the roof to keep us safe. She drew the dragon very carefully, with small green scales and a worried expression. I asked her why the dragon looked worried. She thought about it and said: Because he loves us and he doesn't want anything bad to happen. She is sixteen now and mortified that I kept it. I have it framed in my office. Every morning it reminds me that love is a kind of watchfulness, and that it begins very young.";
      moodTag = ?#love;
      contributorName = "Yuki T.";
      submittedAt = 1_728_000_000_000_000_000;
    },
    {
      id = 12;
      imageId = "";
      objectName = "Foreign Coin";
      story = "I found this coin on the ground in Lisbon in 2003 during the worst week of my life. I had traveled there alone after a breakup, thinking the distance would help. It did not help. On the fourth day I walked until my feet hurt and sat down on the steps of a church I did not know and did not enter. The coin was at the edge of the step. I picked it up. I don't know why. I held it in my hand for a long time while people walked past and the city made its sounds. By the time I stood up again, something had shifted. I still don't know what. I only know I went home two days later and slowly began to be okay.";
      moodTag = ?#bittersweet;
      contributorName = "Clara V.";
      submittedAt = 1_729_000_000_000_000_000;
    },
    {
      id = 13;
      imageId = "";
      objectName = "Worn-Out Pair of Shoelaces";
      story = "These are the laces from my first pair of running shoes. I started running at forty-two after my doctor said I needed to, and I hated every single step of it for the first three months. Then one morning, very early, in the middle of a park, something changed and I did not stop running for an hour. I don't know what happened. The shoelaces eventually snapped from overuse. I replaced them, but I kept the old ones. They represent the person I was when I started — reluctant, a little afraid — and remind me that reluctant beginnings are still beginnings.";
      moodTag = ?#funny;
      contributorName = "Bashir A.";
      submittedAt = 1_730_000_000_000_000_000;
    },
    {
      id = 14;
      imageId = "";
      objectName = "Ink-Stained Notebook";
      story = "This is the notebook I was writing in when the ink cartridge in my pen exploded and covered my hands, my shirt, and half the table in a cafe in Edinburgh. The waitress brought me napkins without comment. The man at the next table looked up, laughed, and then went back to his newspaper. I had been in the middle of writing something important — a letter I was trying to compose to my estranged sister. The explosion of ink felt like the universe commenting on the situation. I finished the letter anyway. She replied three weeks later. We have been talking ever since.";
      moodTag = ?#funny;
      contributorName = "Saoirse M.";
      submittedAt = 1_731_000_000_000_000_000;
    },
    {
      id = 15;
      imageId = "";
      objectName = "Half-Used Candle";
      story = "We bought this candle for our first dinner in the new flat. We had no furniture except a mattress on the floor and two boxes we used as a table. We lit this candle and ate takeaway noodles and felt like we were in the most beautiful place in the world. The candle is still half-used because we never lit it again after that night. It seemed important to preserve that particular light. That flat is long gone now, and that early version of us — broke, hopeful, sitting on the floor with our noodles — feels very far away. But the candle is still here.";
      moodTag = ?#love;
      contributorName = "Elif K.";
      submittedAt = 1_732_000_000_000_000_000;
    },
    {
      id = 16;
      imageId = "";
      objectName = "Postcard Never Sent";
      story = "I wrote this postcard in a hotel room in Kyoto in the spring of 2017. It is addressed to my mother. On the back I wrote everything I had been meaning to say to her for years — about being sorry, about understanding things differently now that I was older, about gratitude. I wrote it, bought a stamp, and then carried it in my bag for the entire rest of the trip. And then I carried it home. I have carried it now for seven years. I don't know why I cannot send it. Perhaps some things need to be said in person. Perhaps I am still not ready. The postcard waits.";
      moodTag = ?#bittersweet;
      contributorName = "Jun W.";
      submittedAt = 1_733_000_000_000_000_000;
    },
    {
      id = 17;
      imageId = "";
      objectName = "Toy Car with No Wheels";
      story = "This was my son's favorite toy when he was three. He carried it everywhere, even to sleep. When the wheels fell off — one at a time, over several months — he refused to let us replace them or throw it away. He said the car was still the car. It didn't need wheels to be the car. He is twenty-five now, studying engineering. I think about that logic sometimes — the car is still the car — when I am worried about all the things in my own life that have lost their wheels. Maybe they are still what they are. Maybe they are still worth keeping.";
      moodTag = ?#childhood;
      contributorName = "Grace O.";
      submittedAt = 1_734_000_000_000_000_000;
    },
    {
      id = 18;
      imageId = "";
      objectName = "The Last Letter";
      story = "My grandfather wrote letters his whole life. He wrote to friends, to family, to strangers who had done him kindness. He wrote in a small neat hand on paper he kept in a box on his desk. This is the last letter he wrote, to me, two months before he died. He was ninety-one. In it he tells me about a bird he saw from his window that morning, how it sat on the sill for a very long time and then flew away. He thought this was worth telling me. He ends the letter the way he ended all his letters: Remember to look out the window sometimes. I do. I always do now.";
      moodTag = ?#nostalgic;
      contributorName = "Nadia A.";
      submittedAt = 1_735_000_000_000_000_000;
    },
    {
      id = 19;
      imageId = "";
      objectName = "Broken Compass";
      story = "I bought this compass at a market in Marrakech when I was twenty-three and thought I was the sort of person who needed a compass. I was not that person. I got lost anyway — twice on the same mountain trail, once in a city I had been visiting for four days, and once, memorably, in an airport I had flown through a dozen times. The compass needle has not pointed north in years. I keep it because it reminds me that the tools we carry do not always save us, and that getting lost, when it is survivable, is sometimes the point.";
      moodTag = ?#funny;
      contributorName = "Remi D.";
      submittedAt = 1_736_000_000_000_000_000;
    },
  ];

  // ---- Queries ----

  public query func getArtifacts() : async [Artifact] {
    artifacts.reverse()
  };

  public query func getArtifact(id : Nat) : async ?Artifact {
    artifacts.find(func(a : Artifact) : Bool { a.id == id })
  };

  public query func getArtifactsByMood(mood : Text) : async [Artifact] {
    let moodTag : ?MoodTag = switch mood {
      case "nostalgic" ?#nostalgic;
      case "funny" ?#funny;
      case "bittersweet" ?#bittersweet;
      case "love" ?#love;
      case "childhood" ?#childhood;
      case _ null;
    };
    switch moodTag {
      case null [];
      case (?tag) {
        artifacts.filter(
          func(a : Artifact) : Bool {
            switch (a.moodTag) {
              case (?t) t == tag;
              case null false;
            };
          },
        ).reverse()
      };
    }
  };

  public query func getArtifactOfTheDay() : async ?Artifact {
    let size = artifacts.size();
    if (size == 0) return null;
    let dayIndex : Nat = Int.abs(Time.now() / 86_400_000_000_000) % size;
    ?artifacts[dayIndex]
  };

  public query func getRandomArtifact() : async ?Artifact {
    let size = artifacts.size();
    if (size == 0) return null;
    let idx : Nat = Int.abs(Time.now() / 1_000_000) % size;
    ?artifacts[idx]
  };

  public query func getStats() : async { total : Nat; today : Nat } {
    let todayStart : Int = (Time.now() / 86_400_000_000_000) * 86_400_000_000_000;
    let todayCount = artifacts.filter(
      func(a : Artifact) : Bool { a.submittedAt >= todayStart },
    ).size();
    { total = artifacts.size(); today = todayCount }
  };

  // ---- Updates ----

  public shared func submitArtifact(
    imageId : Text,
    objectName : Text,
    story : Text,
    moodTagStr : ?Text,
    contributorName : ?Text,
  ) : async Nat {
    let moodTag : ?MoodTag = switch moodTagStr {
      case null null;
      case (?s) switch s {
        case "nostalgic" ?#nostalgic;
        case "funny" ?#funny;
        case "bittersweet" ?#bittersweet;
        case "love" ?#love;
        case "childhood" ?#childhood;
        case _ null;
      };
    };
    let contributor = contributorName.get("Anonymous");
    let id = nextId;
    let artifact : Artifact = {
      id;
      imageId;
      objectName;
      story;
      moodTag;
      contributorName = contributor;
      submittedAt = Time.now();
    };
    artifacts := artifacts.concat([artifact]);
    nextId += 1;
    id
  };

  include BlobStorageMixin();
};
