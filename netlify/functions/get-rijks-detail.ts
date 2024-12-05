import RijksMuseumDetailWrapper from "../wrappers/RijksMuseumDetailWrapper";

export default async (request: Request) => {
    const url = new URL(request.url);
    const params = {
        'object-number': url.searchParams.get('object-number')
    }
    const api = await RijksMuseumDetailWrapper.load(params['object-number']!)
    return new Response(
        JSON.stringify({
            data: api.getDetails(),
        }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
};
