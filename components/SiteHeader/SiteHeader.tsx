import { useRouter } from 'next/router';
import { Logo } from '@ag.ds-next/react/ag-branding';
import { Stack } from '@ag.ds-next/react/box';
import { Header } from '@ag.ds-next/react/header';
import { MainNav } from '@ag.ds-next/react/main-nav';
import { css } from '@emotion/react';

const headerStyles = css`
  h1 {
    background: linear-gradient(120deg, #1a365d 0%, #4C51BF 25%, #7366BD 50%, #4C51BF 75%, #1a365d 100%) !important;
    background-size: 200% auto !important;
    -webkit-background-clip: text !important;
    -webkit-text-fill-color: transparent !important;
  }
`;

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Risk Assessment', href: '/assessment' }
];

export const SiteHeader = () => {
  const router = useRouter();
  return (
    <Stack palette="dark">
      <Header
        css={headerStyles}
        background="bodyAlt"
        logo={<Logo />}
        heading="AI Risk and Control Framework"
        subline="Navigate the journey of AI product development with a guided risk management tool"
        badgeLabel="Beta"
      />
      <MainNav
        id="main-nav"
        items={NAV_LINKS}
        activePath={router.asPath}
        secondaryItems={[]}
      />
    </Stack>
  );
};
