import articalResquest from '@/utils/http';

function getArtical(articleId: any) {
  return articalResquest({
    url: `/app/v1_0/articles/${articleId}`,
  });
}

function likingArtical(articleId: any) {
  return articalResquest({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data: { target: articleId },
  });
}

function dislikeArtical(articleId: any) {
  return articalResquest({
    url: '/app/v1_0/article/dislikes',
    method: 'post',
    data: { target: articleId },
  });
}

export {
  getArtical,
  likingArtical,
  dislikeArtical,
};
