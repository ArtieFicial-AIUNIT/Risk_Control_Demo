import { DecoratorFn } from '@storybook/react';
import { Core } from '@ag.ds-next/core';
import { Box } from '@ag.ds-next/box';
import { theme } from '@ag.ds-next/ag-branding';
import { RouterContext } from 'next/dist/shared/lib/router-context'; // next 12

export const parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	nextRouter: {
		Provider: RouterContext.Provider,
	},
};

const withBrandTheme: DecoratorFn = (Story, context) => {
	return (
		<Core theme={theme}>
			<Box width="100%" minHeight="100vh" padding={1} background="body">
				<Story />
			</Box>
		</Core>
	);
};

export const decorators = [withBrandTheme];