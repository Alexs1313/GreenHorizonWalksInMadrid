import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import MapView, {Marker, type MapType, type Region} from 'react-native-maps';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
  type CompositeNavigationProp,
  type RouteProp,
} from '@react-navigation/native';
import type {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import type {StackNavigationProp} from '@react-navigation/stack';

import {
  grreenhorznwalkksLocations,
  type GrreenhorznwalkksLocation,
} from '../Grreenhorznwalkksdata/grreenhorznwalkksLocations';
import type {
  GrreenhorznwalkksTabParamList,
  GrreenhorznwalksRootStackParamList,
} from '../Grreenhorznwalkksnav/Grreenhorznwalksstack';
import Orientation from 'react-native-orientation-locker';

type GrreenhorznwalkksMapNavigation = CompositeNavigationProp<
  BottomTabNavigationProp<
    GrreenhorznwalkksTabParamList,
    'Grreenhorznwalkksmap'
  >,
  StackNavigationProp<GrreenhorznwalksRootStackParamList>
>;

const Grreenhorznwalkksmap = () => {
  const grreenhorznwalkksNavigation =
    useNavigation<GrreenhorznwalkksMapNavigation>();
  const grreenhorznwalkksRoute =
    useRoute<
      RouteProp<GrreenhorznwalkksTabParamList, 'Grreenhorznwalkksmap'>
    >();

  const grreenhorznwalkksMapRef = useRef<MapView | null>(null);
  const [grreenhorznwalkksSelectedId, setGrreenhorznwalkksSelectedId] =
    useState<string | null>(null);
  const [grreenhorznwalkksMapType, setGrreenhorznwalkksMapType] =
    useState<MapType>('standard');
  const [, setGrreenhorznwalkksZoomDelta] = useState(0.09);

  const grreenhorznwalkksSelectedLocation = useMemo(() => {
    if (!grreenhorznwalkksSelectedId) {
      return null;
    }
    return (
      grreenhorznwalkksLocations.find(
        l => l.id === grreenhorznwalkksSelectedId,
      ) ?? null
    );
  }, [grreenhorznwalkksSelectedId]);

  const grreenhorznwalkksInitialRegion: Region = useMemo(
    () => ({
      latitude: 40.4168,
      longitude: -3.7038,
      latitudeDelta: 0.09,
      longitudeDelta: 0.09,
    }),
    [],
  );

  useFocusEffect(
    useCallback(() => {
      Orientation.lockToPortrait();
      return () => {
        Orientation.unlockAllOrientations();
        setGrreenhorznwalkksZoomDelta(0.09);
      };
    }, []),
  );

  const grreenhorznwalkksFocusLocation = useCallback(
    (l: GrreenhorznwalkksLocation) => {
      setGrreenhorznwalkksZoomDelta(0.03);
      grreenhorznwalkksMapRef.current?.animateToRegion(
        {
          latitude: l.coordinates.lat,
          longitude: l.coordinates.lng,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        },
        380,
      );
    },
    [],
  );

  useEffect(() => {
    const grreenhorznwalkksFocusId =
      grreenhorznwalkksRoute.params?.focusLocationId;
    if (!grreenhorznwalkksFocusId) {
      return;
    }
    const grreenhorznwalkksLoc = grreenhorznwalkksLocations.find(
      l => l.id === grreenhorznwalkksFocusId,
    );
    if (!grreenhorznwalkksLoc) {
      return;
    }
    setGrreenhorznwalkksSelectedId(grreenhorznwalkksLoc.id);
    grreenhorznwalkksFocusLocation(grreenhorznwalkksLoc);
  }, [
    grreenhorznwalkksFocusLocation,
    grreenhorznwalkksRoute.params?.focusLocationId,
  ]);

  const grreenhorznwalkksZoomBy = useCallback(
    (factor: number) => {
      const grreenhorznwalkksCenter = grreenhorznwalkksSelectedLocation
        ? {
            lat: grreenhorznwalkksSelectedLocation.coordinates.lat,
            lng: grreenhorznwalkksSelectedLocation.coordinates.lng,
          }
        : {
            lat: grreenhorznwalkksInitialRegion.latitude,
            lng: grreenhorznwalkksInitialRegion.longitude,
          };

      setGrreenhorznwalkksZoomDelta(prev => {
        const next = Math.max(0.01, Math.min(0.25, prev * factor));
        grreenhorznwalkksMapRef.current?.animateToRegion(
          {
            latitude: grreenhorznwalkksCenter.lat,
            longitude: grreenhorznwalkksCenter.lng,
            latitudeDelta: next,
            longitudeDelta: next,
          },
          220,
        );
        return next;
      });
    },
    [
      grreenhorznwalkksInitialRegion.latitude,
      grreenhorznwalkksInitialRegion.longitude,
      grreenhorznwalkksSelectedLocation,
    ],
  );

  const grreenhorznwalkksToggleMapType = useCallback(() => {
    setGrreenhorznwalkksMapType(prev =>
      prev === 'standard' ? 'satellite' : 'standard',
    );
  }, []);

  const grreenhorznwalkksGoToCenter = useCallback(() => {
    grreenhorznwalkksMapRef.current?.animateToRegion(
      grreenhorznwalkksInitialRegion,
      320,
    );
    setGrreenhorznwalkksSelectedId(null);
    setGrreenhorznwalkksZoomDelta(0.09);
  }, [grreenhorznwalkksInitialRegion]);

  return (
    <View style={styles.grreenhorznwalkksContainer}>
      <MapView
        ref={ref => {
          grreenhorznwalkksMapRef.current = ref;
        }}
        userInterfaceStyle="dark"
        style={StyleSheet.absoluteFill}
        initialRegion={grreenhorznwalkksInitialRegion}
        mapType={grreenhorznwalkksMapType}>
        {grreenhorznwalkksLocations.map(l => {
          const isSelected = l.id === grreenhorznwalkksSelectedId;
          return (
            <Marker
              key={l.id}
              coordinate={{
                latitude: l.coordinates.lat,
                longitude: l.coordinates.lng,
              }}
              onPress={() => {
                setGrreenhorznwalkksSelectedId(l.id);
                grreenhorznwalkksFocusLocation(l);
              }}>
              <View
                style={[
                  styles.grreenhorznwalkksMarkerWrap,
                  isSelected && styles.grreenhorznwalkksMarkerWrapSelected,
                ]}>
                <Image
                  source={require('../../assets/i/grreenhorznloc.png')}
                  style={styles.grreenhorznwalkksMarkerIcon}
                />
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.grreenhorznwalkksHeaderPill}>
        <Text style={styles.grreenhorznwalkksHeaderTitle}>Interactive Map</Text>
        <Text style={styles.grreenhorznwalkksHeaderSub}>
          {grreenhorznwalkksLocations.length} locations
        </Text>
      </View>

      <View style={styles.grreenhorznwalkksControls}>
        <Pressable
          onPress={() => grreenhorznwalkksZoomBy(0.7)}
          style={[
            styles.grreenhorznwalkksControlBtn,
            styles.grreenhorznwalkksControlBtnTop,
          ]}>
          <Image source={require('../../assets/i/grreenhorznlplus.png')} />
        </Pressable>
        <Pressable
          onPress={() => grreenhorznwalkksZoomBy(1.4)}
          style={[
            styles.grreenhorznwalkksControlBtn,
            styles.grreenhorznwalkksControlBtnMid,
          ]}>
          <Image source={require('../../assets/i/grreenhorznmin.png')} />
        </Pressable>
        {/* <Pressable
          onPress={grreenhorznwalkksToggleMapType}
          style={styles.grreenhorznwalkksControlBtn}>
          <Image source={require('../../assets/i/grreenhorznlsatt.png')} />
        </Pressable> */}
        <Pressable
          onPress={grreenhorznwalkksGoToCenter}
          style={styles.grreenhorznwalkksControlBtn}>
          <Image source={require('../../assets/i/grreenhorznfocs.png')} />
        </Pressable>
      </View>

      {grreenhorznwalkksSelectedLocation && (
        <View style={styles.grreenhorznwalkksCardWrap}>
          <View style={styles.grreenhorznwalkksCard}>
            <View style={styles.grreenhorznwalkksCardImageWrap}>
              <Image
                source={
                  grreenhorznwalkksSelectedLocation.image as ImageSourcePropType
                }
                style={styles.grreenhorznwalkksCardImage}
              />
            </View>

            <View style={styles.grreenhorznwalkksCardBody}>
              <View style={styles.grreenhorznwalkksCardTopRow}>
                <Text
                  numberOfLines={1}
                  style={styles.grreenhorznwalkksCardTitle}>
                  {grreenhorznwalkksSelectedLocation.title}
                </Text>
                <Pressable
                  hitSlop={10}
                  onPress={() => setGrreenhorznwalkksSelectedId(null)}
                  style={styles.grreenhorznwalkksCardClose}>
                  <Image
                    source={require('../../assets/i/grreenhorzncls.png')}
                  />
                </Pressable>
              </View>

              <View style={styles.grreenhorznwalkksCardMetaRow}>
                <View style={styles.grreenhorznwalkksCardMetaItem}>
                  <Image
                    source={require('../../assets/i/grreenhorznstr.png')}
                  />
                  <Text style={styles.grreenhorznwalkksCardMetaText}>
                    {grreenhorznwalkksSelectedLocation.rating.toFixed(1)}
                  </Text>
                </View>
                <View style={styles.grreenhorznwalkksCardMetaItem}>
                  <Image
                    source={require('../../assets/i/grreenhorznlsvloc.png')}
                  />
                  <Text style={styles.grreenhorznwalkksCardMetaText}>
                    {grreenhorznwalkksDistanceKmFromCenter(
                      grreenhorznwalkksSelectedLocation,
                    ).toFixed(1)}{' '}
                    km
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={() => {
                  grreenhorznwalkksNavigation.navigate(
                    'Grreenhorznwalkkslocdtl',
                    {
                      locationId: grreenhorznwalkksSelectedLocation.id,
                    },
                  );
                }}>
                <Text style={styles.grreenhorznwalkksCardOpen}>Open</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Grreenhorznwalkksmap;

const CITY_CENTER = {lat: 40.4168, lng: -3.7038};

function grreenhorznwalkksDistanceKmFromCenter(l: GrreenhorznwalkksLocation) {
  return haversineKm(
    CITY_CENTER.lat,
    CITY_CENTER.lng,
    l.coordinates.lat,
    l.coordinates.lng,
  );
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

const styles = StyleSheet.create({
  grreenhorznwalkksContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  grreenhorznwalkksHeaderPill: {
    position: 'absolute',
    top: 48,
    left: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0A0A0ACC',
    minWidth: 170,
  },
  grreenhorznwalkksHeaderTitle: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 20,
  },
  grreenhorznwalkksHeaderSub: {
    marginTop: 4,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
  },
  grreenhorznwalkksControls: {
    position: 'absolute',
    top: 48,
    right: 18,
  },
  grreenhorznwalkksControlBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0A0A0ACC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  grreenhorznwalkksControlBtnTop: {
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  grreenhorznwalkksControlBtnMid: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  grreenhorznwalkksControlText: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 18,
    marginTop: -1,
  },
  grreenhorznwalkksMarkerWrap: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0A0A0A',
  },
  grreenhorznwalkksMarkerWrapSelected: {
    borderColor: '#CFB53B',
  },
  grreenhorznwalkksMarkerIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  grreenhorznwalkksCardWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  grreenhorznwalkksCard: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    overflow: 'hidden',
  },
  grreenhorznwalkksCardImageWrap: {
    width: 127,
    height: 127,
    backgroundColor: '#111',
  },
  grreenhorznwalkksCardImage: {
    width: '100%',
    height: '100%',
  },
  grreenhorznwalkksCardImagePlaceholder: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  grreenhorznwalkksCardBody: {
    flex: 1,
    padding: 12,
  },
  grreenhorznwalkksCardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  grreenhorznwalkksCardTitle: {
    flex: 1,
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 18,
    maxWidth: '85%',
  },
  grreenhorznwalkksCardClose: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grreenhorznwalkksCardCloseText: {
    color: '#FF6B6B',
    fontFamily: 'Manrope-Medium',
    fontSize: 18,
    marginTop: -1,
  },
  grreenhorznwalkksCardMetaRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  grreenhorznwalkksCardMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  grreenhorznwalkksCardMetaText: {
    color: '#E8E8E8CC',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  grreenhorznwalkksCardOpen: {
    marginTop: 8,
    color: '#CFB53B',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
});
