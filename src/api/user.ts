import userResquest from '@/utils/http';

function followingUser(target: any) {
  return userResquest({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: { target },
  });
}
function unfollowUser(target: any) {
  return userResquest({
    url: `/app/v1_0/user/followings/${target}`,
    method: 'DELETE',
  });
}

function getUserInfo() {
  return userResquest({
    url: '/app/v1_0/user',
  });
}

function getUserProfile() {
  return userResquest({
    url: '/app/v1_0/user/profile',
  });
}

function editUserProfile(data: any) {
  return userResquest({
    url: '/app/v1_0/user/profile',
    method: 'PATCH',
    data,
  });
}

export {
  followingUser,
  unfollowUser,
  getUserInfo,
  getUserProfile,
  editUserProfile,
};
