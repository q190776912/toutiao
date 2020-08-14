import commentResquest from '@/utils/http';

function getComment(params: any) {
  return commentResquest({
    url: '/app/v1_0/comments',
    params,
  });
}

function likingComment(target: number) {
  return commentResquest({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: { target },
  });
}

function unlikingComment(target: number) {
  return commentResquest({
    url: ` /app/v1_0/comment/likings/${target}`,
    method: 'DELETE',
  });
}

function addComment(data: any) {
  return commentResquest({
    url: '/app/v1_0/comments',
    method: 'post',
    data,
  });
}

export {
  getComment,
  likingComment,
  unlikingComment,
  addComment,
};
