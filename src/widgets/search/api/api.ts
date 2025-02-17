import { httpService } from '&shared/services/http';
import { SearchResponseDTO, Params } from './types';

async function search(payload: Params): Promise<SearchResponseDTO> {
	return httpService.lib
		.get<SearchResponseDTO>(`/search?customerId=${payload.customerId}&query=${payload.query}`)
		.then((res) => {
			return res.data;
		});
}

export const searchApi = { search };
