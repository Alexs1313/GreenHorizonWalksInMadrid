// loader

import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const Grreenhorznwalkksloadr = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const grreenhorznwalkksTimer = setTimeout(() => {
      navigation.navigate('Grreenhorznwalkksonb' as never);
    }, 6000);

    return () => clearTimeout(grreenhorznwalkksTimer);
  }, [navigation]);

  return (
    <View style={styles.grreenhorznwalkksImageBg}>
      <ScrollView
        contentContainerStyle={styles.grreenhorznwalkksScrollContent}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            height: 550,
          }}>
          <Image
            source={require('../../assets/i/grreenhorztragladr.png')}
            style={{width: 230, height: 230, borderRadius: 52}}
          />
        </View>

        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
          }}>
          <Text style={styles.grreenhorznwalkksTitle}>
            {`Madrid Horizon\nHran Walks`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Grreenhorznwalkksloadr;

const styles = StyleSheet.create({
  grreenhorznwalkksImageBg: {
    flex: 1,
    backgroundColor: '#000',
  },
  grreenhorznwalkksScrollContent: {
    flexGrow: 1,
  },

  grreenhorznwalkksWebview: {
    backgroundColor: 'transparent',
    width: 260,
    height: 150,
  },
  grreenhorznwalkksTitle: {
    fontSize: 24,
    fontFamily: 'CormorantGaramond-Medium',
    color: '#fff',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  grreenhorznwalkksSubtitle: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'CormorantGaramond-Regular',
    marginTop: 15,
  },
});
