import type { Metadata } from "next";
import { site } from "@/config/site";
import { ClosingCta } from "@/components/sections/ClosingCta";
import { ApproachTimeline } from "@/components/sections/home/ApproachTimeline";
import { BrandIntro } from "@/components/sections/home/BrandIntro";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { HomeCommunity, HomePhilanthropy, HomePhilosophy } from "@/components/sections/home/HomeStory";
import { LearningAreas } from "@/components/sections/home/LearningAreas";
import { SponsorshipInvite } from "@/components/sections/home/SponsorshipInvite";

export const metadata: Metadata = {
  title: { absolute: site.title },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <BrandIntro />
      <LearningAreas />
      <SponsorshipInvite />
      <ApproachTimeline />
      <HomePhilosophy />
      <HomePhilanthropy />
      <HomeCommunity />
      <ClosingCta />
    </>
  );
}
