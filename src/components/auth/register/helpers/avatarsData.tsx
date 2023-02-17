const path = '/avatars'
const fileExtension = '.svg'

export const assignRandomProfilePicture = () => {
  const avatars = [
    'avatar-frog-blue',
    'avatar-frog-yellow',
    'avatar-lion-blue',
    'avatar-lion-yellow',
    'avatar-panda-yellow',
    'avatar-sheep-blue',
    'avatar-sheep-yellow',
    'avatar-squirrel-blue',
    'avatar-squirrel-yellow',
  ]
  const randomIndex = Math.floor(Math.random() * avatars.length)
  const constructedPath = (path + '/' + avatars[randomIndex] + fileExtension) as string
  return constructedPath
}
