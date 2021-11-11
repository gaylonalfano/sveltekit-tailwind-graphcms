// Define GET request using GQL Client
import { client } from '$lib/graphql-client';
import { gql } from 'graphql-request';

export async function get(request) {
	console.log('request: ', request);
	const id = request.params.id;

	try {
		// Define the query string
		const query = gql`
			query Transaction($id: ID!) {
				transaction(where: { id: $id }) {
					id
					createdAt
					nft {
						nftId
						collection
					}
					transactionType
					transactionCoin
					coinPrice
					amount
					quantity
					total
					notes
				}
			}
		`;

		// Make the request
		// NOTE This GQL Query requires the ID variable
		const variables = { id };
		const { transaction } = await client.request(query, variables);
		console.log('transaction:', transaction);

		// Return the response status and data in body
		return {
			status: 200,
			body: { transaction }
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
