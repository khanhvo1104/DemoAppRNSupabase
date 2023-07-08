import {Alert} from 'react-native';

import {supabase} from '../services/supabaseClient';

export type UserProfile = {
  id: string;
  email: string;
  first_name: string | undefined;
  last_name: string | undefined;
};

export const getUserProfile = async (id: string) => {
  try {
    const {data, error} = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id);
    if (error) throw new Error(`Error ${error.code}: ${error.message}`);
    if (data.length > 0) {
      return data[0] as UserProfile;
    }
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert('An error occured', error.message);
    }
    console.log(error);
  }
  return null;
};
