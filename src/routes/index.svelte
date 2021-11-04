<script context="module">
	export async function load({ page, fetch, session, stuff }) {
		const url = '/transactions.json';
		const response = await fetch(url);

		if (response.ok) {
			return {
				props: {
					transactions: await response.json()
				}
			};
		}

		return {
			status: response.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script>
	export let transactions;
</script>

<pre>{JSON.stringify(transactions, null, 2)}</pre>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
