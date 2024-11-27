import Head from 'next/head';

export const DocumentTitle = ({ title }: { title?: string }) => (
	<Head>
		<title>
			{[title, 'AI Risk and Control Framework'].filter(Boolean).join(' | ')}
		</title>
	</Head>
);
