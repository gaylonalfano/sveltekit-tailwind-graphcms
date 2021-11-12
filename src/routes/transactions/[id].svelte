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

<!-- <pre>{JSON.stringify(transaction, null, 2)}</pre> -->

<svelte:head>
	<title>NFT Tracker | WAGMI</title>
</svelte:head>

<div class="card text-center shadow-2xl max-w-xl mt-20 mx-auto">
	<figure class="px-10 pt-10">
		<img src="https://picsum.photos/id/1005/400/250" class="rounded-xl" />
	</figure>
	<div class="card-body">
		<h2 class="card-title">{transaction.nft.collection} #{transaction.nft.nftId}</h2>
		<p>{transaction.transactionType}</p>
		<p>${transaction.total}</p>
		<div class="justify-center card-actions">
			<a class="btn btn-outline btn-accent" href={'/'}>Back</a>
		</div>
	</div>
</div>
