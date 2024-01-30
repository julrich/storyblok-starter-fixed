import type { NextPage } from "next";
import type { AppProps } from "next/app";
// @ts-expect-error
import IconSprite from "@kickstartds/ds-agency/icon-sprite";
import DsaProviders from "@kickstartds/ds-agency/providers";
import { Header } from "@kickstartds/ds-agency/header";
import { Footer } from "@kickstartds/ds-agency/footer";
import { initStoryblok } from "@/helpers/storyblok";
import Meta from "@/components/Meta";

import StoryblokProviders from "../components/Providers";

import palette from "@kickstartds/ds-agency/global.client.js";
import "@kickstartds/ds-agency/tokens/tokens.css";
import "@kickstartds/ds-agency/global.css";

initStoryblok(process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN);
if (typeof window !== "undefined") {
  console.log(palette);
}

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPage;
}) {
  const { settings, story } = pageProps;
  const headerProps = settings?.header[0];
  const footerProps = settings?.footer[0];

  return (
    <DsaProviders>
      <StoryblokProviders>
        <Meta
          globalSeo={settings?.seo[0]}
          pageSeo={story?.content.seo[0]}
          fallbackName={story?.name}
        />
        <IconSprite />
        {headerProps && <Header {...headerProps} />}
        <Component {...pageProps} />
        {footerProps && <Footer {...footerProps} />}
      </StoryblokProviders>
    </DsaProviders>
  );
}
