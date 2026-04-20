import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const grreenhorznwalkksonbData = [
  {
    title: "Discover Madrid's Green Spaces",
    subtitle:
      "Explore the most beautiful parks and natural areas in the heart of Spain's capital",
    image: require('../../assets/i/grreenhorznon1.png'),
  },

  {
    title: 'Curated Walks & Routes',
    subtitle:
      "Premium selection of walking routes through Madrid's most stunning green horizons",
    image: require('../../assets/i/grreenhorznon2.png'),
  },
  {
    title: 'Interactive Maps',
    subtitle:
      'Navigate with precision using our detailed interactive mapping system',
    image: require('../../assets/i/grreenhorznon3.png'),
  },
  {
    title: 'Save Your Favorites',
    subtitle:
      'Build your personal collection of cherished locations to visit again',
    image: require('../../assets/i/grreenhorznon4.png'),
  },
  {
    title: 'Expert Local Tips',
    subtitle:
      'Access insider knowledge and discover hidden gems known only to locals',
    image: require('../../assets/i/grreenhorznon5.png'),
  },
];

const Grreenhorznwalkksonb = () => {
  const navigation = useNavigation();
  const [grreenhorznwalkkIdx, setGrreenhorznwalkkIdx] = useState(0);

  const grreenhorznwalkksonbNext = () => {
    grreenhorznwalkkIdx < 4
      ? setGrreenhorznwalkkIdx(grreenhorznwalkkIdx + 1)
      : navigation.navigate('Grreenhorznwalkkstab' as never);
  };

  return (
    <ImageBackground
      source={grreenhorznwalkksonbData[grreenhorznwalkkIdx]?.image}
      style={{flex: 1}}>
      <TouchableOpacity
        style={styles.grreenhorznwalkksskipbutton}
        onPress={() => navigation.navigate('Grreenhorznwalkkstab' as never)}>
        <Text style={styles.grreenhorznwalkksskipbuttontext}>SKIP</Text>
      </TouchableOpacity>
      <View style={styles.grreenhorznwalkkscontainer}>
        <Text style={styles.grreenhorznwalkkstitle}>
          {grreenhorznwalkksonbData[grreenhorznwalkkIdx]?.title}
        </Text>
        <Text style={styles.grreenhorznwalkkssubtitle}>
          {grreenhorznwalkksonbData[grreenhorznwalkkIdx]?.subtitle}
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          paddingHorizontal: 23,
          paddingBottom: 100,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.grreenhorznwalkksbutton}
          onPress={grreenhorznwalkksonbNext}>
          <Text style={styles.grreenhorznwalkksbuttontext}>
            {grreenhorznwalkkIdx < 4 ? 'Next' : 'Get Started'}
          </Text>
          <Image source={require('../../assets/i/grreenhorznonxt.png')} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  grreenhorznwalkkscontainer: {
    flex: 1,
    paddingHorizontal: 23,
    justifyContent: 'center',
  },
  grreenhorznwalkkstitle: {
    fontSize: 46,
    fontFamily: 'CormorantGaramond-Medium',
    color: '#fff',
    letterSpacing: 1.5,
  },
  grreenhorznwalkkssubtitle: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Manrope-Regular',
    marginTop: 15,
    lineHeight: 30,
    width: '90%',
  },
  grreenhorznwalkksbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CFB53B',
    padding: 10,
    borderRadius: 360,
    minWidth: 138,
    height: 55,
    gap: 5,
  },
  grreenhorznwalkksbuttontext: {
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    color: '#000',
  },
  grreenhorznwalkksskipbutton: {
    position: 'absolute',
    top: 55,
    right: 23,
  },
  grreenhorznwalkksskipbuttontext: {
    fontSize: 16,
    fontFamily: 'Manrope-Medium',
    color: '#fff',
  },
});

export default Grreenhorznwalkksonb;
