export const assignRandomProfilePicture = () => {
  const avatars = [
    '/avatars/avatar-frog-blue.svg',
    '/avatars/avatar-frog-yellow.svg',
    '/avatars/avatar-lion-blue.svg',
    '/avatars/avatar-lion-yellow.svg',
    '/avatars/avatar-panda-yellow.svg',
    '/avatars/avatar-sheep-blue.svg',
    '/avatars/avatar-sheep-yellow.svg',
    '/avatars/avatar-squirrel-blue.svg',
    '/avatars/avatar-squirrel-blue.svg',
  ]
  const randomIndex = Math.floor(Math.random() * avatars.length)
  return avatars[randomIndex]
}
