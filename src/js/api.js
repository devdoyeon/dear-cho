import axios from 'axios'

export const getYoutubeList = async channel => {
  const options = 'part=snippet&maxResults=25'
  const chochochoChannelId = 'UC_OvuF5_Ce6LUi9ddd0ywAw'
  const cloudChoChannelId = 'UC-j9FGXub1mUfvhD3Qolhtg'
  try {
    return await axios.get(
      `https://www.googleapis.com/youtube/v3/search?${options}&channelId=${channel === 'chochocho' ? chochochoChannelId : cloudChoChannelId}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    )
  } catch (error) {
    return console.log(error)
  }
}
