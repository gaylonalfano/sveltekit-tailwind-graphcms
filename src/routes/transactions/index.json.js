// Define GET request using GQL Client
import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export async function get() {
	try {
		// Define the query string
		const query = gql`
			query Transactions {
				transactions {
					id
					createdAt
					nft {
						nftId
						collection
					}
					transactionType
					transactionCoin
					coinPrice
					total
				}
			}
		`;

		// Make the request
		const { transactions } = await client.request(query);
		console.log('transactions:', transactions);

		// Return the response status and data in body
		return {
			status: 200,
			body: { transactions }
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'There was a server error'
			}
		};
	}
}
