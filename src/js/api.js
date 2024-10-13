import axios from 'axios';

export const sample = async () => {
  const options='part=snippet&maxResults=25'
  const channelId='UC_OvuF5_Ce6LUi9ddd0ywAw'
  try {
    return await axios.get(
      `/api/search?${options}&channelId=${channelId}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
    );
  } catch (error) {
    return console.log(error);
  }
};
