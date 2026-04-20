import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useRef} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Grreenhorznwalkksexplr from './Grreenhorznwalkks/Grreenhorznwalkksscrns/Grreenhorznwalkksexplr';
import Grreenhorznwalkkssavd from './Grreenhorznwalkks/Grreenhorznwalkksscrns/Grreenhorznwalkkssavd';
import Grreenhorznwalkksmap from './Grreenhorznwalkks/Grreenhorznwalkksscrns/Grreenhorznwalkksmap';
import Grreenhorznwalkkstips from './Grreenhorznwalkks/Grreenhorznwalkksscrns/Grreenhorznwalkkstips';
import Grreenhorznwalkksquzz from './Grreenhorznwalkks/Grreenhorznwalkksscrns/Grreenhorznwalkksquzz';

import type {GrreenhorznwalkksTabParamList} from './Grreenhorznwalkks/Grreenhorznwalkksnav/Grreenhorznwalksstack';

const Tab = createBottomTabNavigator<GrreenhorznwalkksTabParamList>();

const av = new Animated.Value(0);
av.addListener(() => {
  return;
});

const GrreenhorznwalkkstabAnimatedButton = (props: Record<string, unknown>) => {
  const {children, style, onPress, onLongPress, ...rest} = props;
  const grreenhorznwalkkstabScale = useRef(new Animated.Value(1)).current;

  const grreenhorznwalkkstabHandlePressIn = () => {
    Animated.spring(grreenhorznwalkkstabScale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const grreenhorznwalkkstabHandlePressOut = () => {
    Animated.spring(grreenhorznwalkkstabScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress as () => void}
      onLongPress={onLongPress as (() => void) | undefined}
      onPressIn={grreenhorznwalkkstabHandlePressIn}
      onPressOut={grreenhorznwalkkstabHandlePressOut}
      style={[style as ViewStyle, styles.grreenhorznwalkkstabButton]}
      {...rest}>
      <Animated.View
        style={[
          styles.grreenhorznwalkkstabButtonInner,
          {transform: [{scale: grreenhorznwalkkstabScale}]},
        ]}>
        {children as React.ReactNode}
      </Animated.View>
    </Pressable>
  );
};

const GrreenhorznwalkkstabIcon = ({
  focused,
  source,
  label,
}: {
  focused: boolean;
  source: ImageSourcePropType;
  label: string;
}) => {
  return (
    <View style={styles.grreenhorznwalkkstabIconWrap}>
      <View style={styles.grreenhorznwalkkstabIconImageWrap}>
        <Image source={source} tintColor={focused ? undefined : '#F5F5F566'} />
      </View>
      <Text
        adjustsFontSizeToFit
        minimumFontScale={0.7}
        numberOfLines={1}
        style={[
          styles.grreenhorznwalkkstabLabel,
          focused
            ? styles.grreenhorznwalkkstabLabelFocused
            : styles.grreenhorznwalkkstabLabelIdle,
        ]}>
        {label}
      </Text>
    </View>
  );
};

const grreenhorznwalkkstabBarBackground = () => (
  <LinearGradient
    pointerEvents="none"
    colors={['#0A0A0A', '#0A0A0A']}
    style={StyleSheet.absoluteFill}
  />
);

const grreenhorznwalkkstabIconPlaces = ({focused}: {focused: boolean}) => (
  <GrreenhorznwalkkstabIcon
    focused={focused}
    label="Explore"
    source={require('./assets/i/grreenhorznwalktbs1.png')}
  />
);

const grreenhorznwalkkstabIconSaved = ({focused}: {focused: boolean}) => (
  <GrreenhorznwalkkstabIcon
    focused={focused}
    label="Saved"
    source={require('./assets/i/grreenhorznwalktbs2.png')}
  />
);

const grreenhorznwalkkstabIconMap = ({focused}: {focused: boolean}) => (
  <GrreenhorznwalkkstabIcon
    focused={focused}
    label="Map"
    source={require('./assets/i/grreenhorznwalktbs3.png')}
  />
);

const grreenhorznwalkkstabIconBlog = ({focused}: {focused: boolean}) => (
  <GrreenhorznwalkkstabIcon
    focused={focused}
    label="Tips"
    source={require('./assets/i/grreenhorznwalktbs4.png')}
  />
);

const grreenhorznwalkkstabIconFacts = ({focused}: {focused: boolean}) => (
  <GrreenhorznwalkkstabIcon
    focused={focused}
    label="Quiz"
    source={require('./assets/i/grreenhorznwalktbs5.png')}
  />
);

const grreenhorznwalkkstabButton = (props: Record<string, unknown>) => (
  <GrreenhorznwalkkstabAnimatedButton {...props} />
);

const Grreenhorznwalkkstab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: [styles.grreenhorznwalkkstabBar],
        tabBarActiveTintColor: '#FFFFFF',
        tabBarButton: grreenhorznwalkkstabButton,
        tabBarBackground: grreenhorznwalkkstabBarBackground,
      }}>
      <Tab.Screen
        name="Grreenhorznwalkksexplr"
        component={Grreenhorznwalkksexplr}
        options={{
          tabBarIcon: grreenhorznwalkkstabIconPlaces,
        }}
      />
      <Tab.Screen
        name="Grreenhorznwalkkssavd"
        component={Grreenhorznwalkkssavd}
        options={{
          tabBarIcon: grreenhorznwalkkstabIconSaved,
        }}
      />
      <Tab.Screen
        name="Grreenhorznwalkksmap"
        component={Grreenhorznwalkksmap}
        options={{
          tabBarIcon: grreenhorznwalkkstabIconMap,
        }}
      />
      <Tab.Screen
        name="Grreenhorznwalkkstips"
        component={Grreenhorznwalkkstips}
        options={{
          tabBarIcon: grreenhorznwalkkstabIconBlog,
        }}
      />
      <Tab.Screen
        name="Grreenhorznwalkksquzz"
        component={Grreenhorznwalkksquzz}
        options={{
          tabBarIcon: grreenhorznwalkkstabIconFacts,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  grreenhorznwalkkstabLabelFocused: {
    color: '#FFFF',
  },
  grreenhorznwalkkstabBar: {
    elevation: 0,
    paddingTop: 14,
    justifyContent: 'center',
    position: 'absolute',
    paddingHorizontal: 10,
    borderColor: '#D4AF3733',
    borderTopWidth: 1.1,
    borderTopColor: '#D4AF3733',
    backgroundColor: 'transparent',
    height: 85,
    paddingBottom: 20,
    overflow: 'hidden',
  },

  grreenhorznwalkkstabButton: {
    flex: 1,
  },
  grreenhorznwalkkstabButtonInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  grreenhorznwalkkstabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grreenhorznwalkkstabIconImageWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grreenhorznwalkkstabIconSel: {
    position: 'absolute',
    top: -14,
  },
  grreenhorznwalkkstabIconSelFocused: {
    zIndex: -1,
  },

  grreenhorznwalkkstabIconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grreenhorznwalkkstabIconCircleFocused: {
    borderWidth: 1,
    borderColor: '#805CB4',
  },
  grreenhorznwalkkstabLabel: {
    fontSize: 12,
    fontFamily: 'Manrope-Medium',
    marginTop: 4,
    textAlign: 'center',
  },
  grreenhorznwalkkstabLabelIdle: {
    color: '#F5F5F566',
  },
});

export default Grreenhorznwalkkstab;
