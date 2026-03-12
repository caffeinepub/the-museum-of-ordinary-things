import type { ActorSubclass } from "@dfinity/agent";
import type { Principal } from "@dfinity/principal";

export type MoodTag =
  | { nostalgic: null }
  | { funny: null }
  | { bittersweet: null }
  | { love: null }
  | { childhood: null };

export interface Artifact {
  id: bigint;
  imageId: string;
  objectName: string;
  story: string;
  moodTag: [] | [MoodTag];
  contributorName: string;
  submittedAt: bigint;
}

export interface Stats {
  total: bigint;
  today: bigint;
}

export interface _SERVICE {
  getArtifacts: () => Promise<Artifact[]>;
  getArtifact: (id: bigint) => Promise<[] | [Artifact]>;
  getArtifactsByMood: (mood: string) => Promise<Artifact[]>;
  getArtifactOfTheDay: () => Promise<[] | [Artifact]>;
  getRandomArtifact: () => Promise<[] | [Artifact]>;
  getStats: () => Promise<Stats>;
  submitArtifact: (
    imageId: string,
    objectName: string,
    story: string,
    moodTag: [] | [string],
    contributorName: [] | [string]
  ) => Promise<bigint>;
}

export declare const createActor: (
  canisterId: string | Principal,
  options?: { agentOptions?: object }
) => ActorSubclass<_SERVICE>;
export declare const canisterId: string;
