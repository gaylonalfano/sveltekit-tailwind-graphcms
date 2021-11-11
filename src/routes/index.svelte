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

<div class="overflow-x-auto">
	<table class="table w-full">
		<thead>
			<tr>
				<th>NFT</th>
				<th>Tx Type</th>
				<th>Tx Coin</th>
				<th>Coin Price</th>
				<th>Amount</th>
				<th>Total</th>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each transactions as { id, amount, nft, transactionType, transactionCoin, coinPrice, total } (id)}
				<tr class="hover">
					<td>
						<div class="flex items-center space-x-3">
							<div class="avatar">
								<div class="w-12 h-12 mask mask-squircle">
									<img
										src="/tailwind-css-component-profile-2@56w.png"
										alt="Avatar Tailwind CSS Component"
									/>
								</div>
							</div>
							<div>
								<div class="font-bold">{nft.nftId}</div>
								<div class="text-sm opacity-50">{nft.collection}</div>
							</div>
						</div>
					</td>
					<td>
						{#if transactionType == 'Buy'}
							<span class="badge badge-outline badge-sm badge-error">{transactionType}</span>
						{:else}
							<span class="badge badge-outline badge-sm badge-success">{transactionType}</span>
						{/if}
					</td>
					<td>{transactionCoin}</td>
					<td>{coinPrice}</td>
					<td>{amount}</td>
					<td>{total}</td>
					<th>
						<button class="btn btn-ghost btn-xs">details</button>
					</th>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th>NFT</th>
				<th>Tx Type</th>
				<th>Tx Coin</th>
				<th>Coin Price</th>
				<th>Amount</th>
				<th>Total</th>
				<th />
			</tr>
		</tfoot>
	</table>
</div>
