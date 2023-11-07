import axios from 'axios';
const sendbirdApiBaseUrl = `https://api-${process.env.SENDBIRD_APP_ID}.sendbird.com/v3/users`;
const sendbirdApiToken = process.env.SEC_API_KEY;

export const createSendbirdUser = async ( empId: any, username: any ) => {
  const requestBody = {
    user_id: empId as string,
    nickname: username,
    profile_url: 'https://sendbird.com/main/img/profiles/profile_05_512px.png',
    issue_access_token: true,
    metadata: {
      font_preference: 'times new roman',
      font_color: 'black',
    },
  };

  const headers = {
    'Api-Token': sendbirdApiToken,
    'Content-Type': 'application/json',
  };

  // Make a POST request to SendBird's API
  try {
    const response = await axios.post(sendbirdApiBaseUrl, requestBody, { headers });
    console.log('API call successful. Response:', response.data);
  } catch (error) {
    console.error('API call failed. Error:', error);
  }
};
