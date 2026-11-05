/**
 * Community & impact. Only real media and verified activities belong here.
 * Add photos to `gallery` once approved — the gallery is hidden while empty.
 */
export type GalleryItem = { src: string; alt: string; caption?: string };

export const communityVideo = {
  src: "/media/roycapital-introduction.mp4",
  width: 720,
  height: 1280,
  eyebrow: "Roy Capital in the Community",
  title: "Giving Back. Making a Difference.",
  body: "A glimpse of our recent visit and a reminder that the greatest impact is often measured in the lives we touch.",
  label: "Community visit · Video",
};

export const impactPage = {
  hero: {
    eyebrow: "Our Impact",
    title: "Beyond Business. Into the Community.",
    lead: "Our commitment to meaningful growth extends beyond financial education.",
    body: "We believe that every positive action has the potential to create a lasting difference. Through community engagement and philanthropic initiatives, Roy Capital aims to support people and contribute to a better future.",
  },
  together: {
    eyebrow: "Making an Impact Together",
    title: "Our Community. Our Responsibility.",
    body: "We believe that meaningful change begins with involvement, compassion and a willingness to help.",
    focusLabel: "Areas of focus",
    focus: ["Community visits", "Philanthropic activities", "Educational support initiatives", "Volunteering and outreach"],
  },
  moments: {
    eyebrow: "Featured Community Moments",
    title: "Every Story Matters. Every Contribution Counts.",
    body: "A look into our community activities, experiences and initiatives.",
    upcoming: "More photos and updates will be shared here as our initiatives develop.",
  },
  gallery: [] as GalleryItem[],
};
