import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {Alert, Button} from 'react-native';

import {Layout, Text, Switch, Input} from '../../components';
import {useAuth, useCurrentUser} from '../../contexts/AuthProvider';
import {useSupabaseMutation} from '../../hooks/use-supabase';
import {supabase} from '../../services/supabaseClient';

export const ProfileScreen: React.FC = () => {
  const {t} = useTranslation();
  const {logout, updateCurrentUser} = useAuth();
  const user = useCurrentUser();

  const {loading, execute} = useSupabaseMutation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm({
    defaultValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
    },
  });
  const watchFirstName = watch('first_name');
  const watchLastName = watch('last_name');

  const updateProfile = async ({
    first_name,
    last_name,
  }: {
    first_name: string;
    last_name: string;
  }) => {
    try {
      await execute(
        supabase
          .from('profiles')
          .update({first_name, last_name})
          .eq('id', user.id),
      );
      updateCurrentUser({first_name, last_name});
      Alert.alert(t('profileUpdated'));
    } catch (error) {
      console.log('Update profile failed: ', error);
    }
  };

  const username = user.first_name
    ? user.last_name
      ? `${user.first_name} ${user.last_name}`
      : user.first_name
    : user.email;

  return (
    <Layout>
      <Text>{username}</Text>
      <Switch />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="first_name"
        defaultValue={user.first_name}
      />
      {errors.first_name && <Text>{t('common:required')}</Text>}
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="last_name"
        defaultValue={user.last_name}
      />
      {errors.last_name && <Text>{t('common:required')}</Text>}
      <Button
        title={t('common:update')}
        color={'blue'}
        onPress={handleSubmit(updateProfile)}
        disabled={
          loading ||
          (watchFirstName === user.first_name &&
            watchLastName === user.last_name)
        }
      />
      <Button title={t('common:logout')} color={'red'} onPress={logout} />
    </Layout>
  );
};
