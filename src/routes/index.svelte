<script context="module">
	export async function load({ page, fetch, session, stuff }) {
		const url = '/transactions.json';
		const response = await fetch(url);

		if (response.ok) {
			// NOTE If I destructure the data then I don't have to drill
			// down inside the HTML markup.
			const { transactions } = await response.json();

			return { props: { transactions } };
			/* transactions: await response.json() // {Transaction[]} */
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

<!-- <pre>{JSON.stringify(transactions, null, 2)}</pre> -->

<svelte:head>
	<title>NFT Tracker | WAGMI</title>
</svelte:head>

<h1 class="text-4xl mb-10 font-extrabold">Welcome to SvelteKit</h1>

<!-- NOTE Can also destructure the data from single transaction -->
{#each transactions as { id, amount, nft, transactionType, transactionCoin, coinPrice, total } (id)}
	<div class="card md:card-side bordered mb-10 shadow-xl">
		<figure class="px-10 py-10">
			<img src="https://picsum.photos/id/1005/400/250" class="rounded-xl" />
		</figure>
		<div class="card-body">
			<h2 class="card-title">
				{nft.collection} | {nft.nftId}
				<div class="badge mx-2">{transactionType}</div>
			</h2>
			<h3 class="text-center text-4xl">${total}</h3>
			<p class="text-center text-xs">{transactionCoin} @ {coinPrice} * {amount} = ${total}</p>
		</div>
	</div>
{/each}
