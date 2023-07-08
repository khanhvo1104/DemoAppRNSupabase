import React from 'react';
import {Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useTranslation} from 'react-i18next';

import {Text, Input, Title} from '../../components';
import {useAuth} from '../../contexts/AuthProvider';

export const LoginScreen = () => {
  const {t} = useTranslation();
  const {loginWithEmailAndPassword, registerWithEmailAndPassword} = useAuth();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const register = ({email, password}: {email: string; password: string}) =>
    registerWithEmailAndPassword(email, password);

  const login = ({email, password}: {email: string; password: string}) => {
    loginWithEmailAndPassword(email, password);
  };

  return (
    <>
      <Title>{t('common:login')}</Title>
      <Text>Please register or login</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="email"
      />
      {errors.email && <Text>{t('common:required')}</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="password"
      />
      {errors.password && <Text>{t('common:required')}</Text>}
      <Button
        title={t('common:login')}
        color={'red'}
        onPress={handleSubmit(login)}
      />
      <Button
        title={t('common:register')}
        color={'blue'}
        onPress={handleSubmit(register)}
      />
    </>
  );
};
