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

  var nextId : Nat = 6;

  var artifacts : [Artifact] = [
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
        )
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
