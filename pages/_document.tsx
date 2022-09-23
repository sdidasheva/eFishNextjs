import React from "react";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html>
			<Head>
				<title>Мониторинг водных животных</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<body>
				<div id="portal" />
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
