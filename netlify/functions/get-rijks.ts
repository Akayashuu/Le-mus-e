import RijksMuseumApiWrapper, {
    WrapperParams,
} from '../../src/modules/RijksMuseumApi';

export default async (request: Request) => {
    const url = new URL(request.url);
    const params: Partial<WrapperParams> = {
        page: url.searchParams.get('page')
            ? parseInt(url.searchParams.get('page')!)
            : undefined,
        itemPerPage: url.searchParams.get('itemPerPage')
            ? parseInt(url.searchParams.get('itemPerPage')!)
            : undefined,
        search: url.searchParams.get('search') || undefined,
    };
    const args = {};
    if (params.page) args['page'] = params.page;
    if (params.itemPerPage) args['itemPerPage'] = params.itemPerPage;
    if (params.search) args['search'] = params.search;

    const api = await RijksMuseumApiWrapper.load(args);
    return new Response(
        JSON.stringify({
            data: api.getArtObjects(),
        }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
};
