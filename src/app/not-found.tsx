import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Em, Eyebrow, Heading, Text } from "@/components/ui/Typography";
import { CoreFallback } from "@/components/visuals/CoreFallback";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden pt-28 pb-20">
      <div aria-hidden className="arch-grid absolute inset-0 -z-10" />
      <div aria-hidden className="absolute top-1/2 right-[-10%] -z-10 size-[44rem] -translate-y-1/2 opacity-40">
        <CoreFallback />
      </div>
      <Container>
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
      </Container>
    </section>
  );
}
