import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ hots: '192.168.0.198' })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
