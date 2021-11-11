<script context="module">
	export async function load({ page, fetch, session, stuff }) {
		const id = page.params.id;
		const url = `/transactions/${id}.json`;
		const response = await fetch(url);

		if (response.ok) {
			// NOTE If I destructure the data then I don't have to drill
			// down inside the HTML markup.
			const { transaction } = await response.json();

			return { props: { transaction } };
			/* transactions: await response.json() // {Transaction[]} */
		}

		return {
			status: response.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	export let transaction;
</script>

<pre>{JSON.stringify(transaction, null, 2)}</pre>

<svelte:head>
	<title>NFT Tracker | WAGMI</title>
</svelte:head>
