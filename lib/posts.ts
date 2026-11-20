import * as whyYourAlarmFails from "@/content/blog/why-your-alarm-fails";
import * as wakeUpEarlyWithoutFeelingGroggy from "@/content/blog/wake-up-early-without-feeling-groggy";
import * as whyYouKeepHittingSnooze from "@/content/blog/why-you-keep-hitting-snooze";
import * as scienceOfSleepCycles from "@/content/blog/science-of-sleep-cycles";
import * as howMuchSleepYouNeedByAge from "@/content/blog/how-much-sleep-you-need-by-age";
import * as whatIsSleepInertia from "@/content/blog/what-is-sleep-inertia";
import * as is5amWakeupWorthIt from "@/content/blog/is-5am-wakeup-worth-it";
import { extractHeroImage, type HeroImage } from "@/lib/blog-content";

export type PostMeta = {
  title: string;
  description: string;
  date: string;
};

export type PostModule = {
  metadata: PostMeta;
  body: string;
};

export const POSTS: Record<string, PostModule> = {
  "why-your-alarm-fails": whyYourAlarmFails,
  "wake-up-early-without-feeling-groggy": wakeUpEarlyWithoutFeelingGroggy,
  "why-you-keep-hitting-snooze": whyYouKeepHittingSnooze,
  "science-of-sleep-cycles": scienceOfSleepCycles,
  "how-much-sleep-you-need-by-age": howMuchSleepYouNeedByAge,
  "what-is-sleep-inertia": whatIsSleepInertia,
  "is-5am-wakeup-worth-it": is5amWakeupWorthIt,
};

export function getAllPosts(): (PostMeta & { slug: string; heroImage: HeroImage | null })[] {
  return Object.entries(POSTS)
    .map(([slug, mod]) => ({ slug, ...mod.metadata, heroImage: extractHeroImage(mod.body) }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): PostModule | undefined {
  return POSTS[slug];
}
