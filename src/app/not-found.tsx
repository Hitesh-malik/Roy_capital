import Image from "next/image";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Em, Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { CoreFallback } from "@/components/visuals/CoreFallback";
import { Emblem } from "@/components/visuals/LogoMark";

export default function NotFound() {
  return (
    <section className="tone-dark relative isolate flex min-h-svh items-center overflow-hidden bg-navy pt-28 pb-20 text-fg">
      <Image src="/brand/office-dusk.jpg" alt="" aria-hidden fill sizes="100vw" className="-z-20 object-cover opacity-40" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/85 to-navy/40" />
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-40" />
      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>Error 404</Eyebrow>
          <Heading as="h1" size="h1" className="mt-8 max-w-2xl">
            This page has <Em>moved on.</Em>
          </Heading>
          <Text size="lead" className="mt-6 max-w-lg">
            The page you are looking for doesn&apos;t exist. Let&apos;s get you back to something useful.
          </Text>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/" size="lg">
              Back to Home
            </ButtonLink>
            <ButtonLink href="/sponsorships" size="lg" variant="secondary">
              Partner With Us
            </ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:col-span-5 lg:block">
          <div aria-hidden className="gold-glow absolute -inset-[10%]" />
          <CoreFallback className="absolute inset-0" />
          <div className="absolute top-1/2 left-1/2 w-[54%] -translate-x-1/2 -translate-y-1/2">
            <Emblem size={240} responsive alt={`${site.name} emblem`} className="ring-emblem h-auto w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
