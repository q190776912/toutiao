import searchResquest from '@/utils/http';

function getSuggestion(q: string) {
  return searchResquest({
    url: `/app/v1_0/suggestion?q=${q}`,
  });
}

function getSearchResult(params: any) {
  return searchResquest({
    url: '/app/v1_0/search',
    params,
  });
}

export {
  getSuggestion,
  getSearchResult,
};
