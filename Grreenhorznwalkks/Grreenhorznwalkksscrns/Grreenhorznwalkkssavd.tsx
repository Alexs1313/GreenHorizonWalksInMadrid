import React, {useCallback, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';

import Grreenhorznwalkkslay from '../Grreenhorznwalkkscpnt/Grreenhorznwalkkslay';
import {
  grreenhorznwalkksLocations,
  type GrreenhorznwalkksLocation,
} from '../Grreenhorznwalkksdata/grreenhorznwalkksLocations';
import type {GrreenhorznwalksRootStackParamList} from '../Grreenhorznwalkksnav/Grreenhorznwalksstack';
import {
  grreenhorznwalkksGetSavedLocationIds,
  grreenhorznwalkksRemoveSavedLocation,
} from '../Grreenhorznwalkksdata/grreenhorznwalkksSaved';

const Grreenhorznwalkkssavd = () => {
  const grreenhorznwalkksNavigation =
    useNavigation<
      StackNavigationProp<
        GrreenhorznwalksRootStackParamList,
        'Grreenhorznwalkkstab'
      >
    >();

  const [grreenhorznwalkksSavedIds, setGrreenhorznwalkksSavedIds] =
    useState<string[]>([]);

  const grreenhorznwalkksRefresh = useCallback(async () => {
    const grreenhorznwalkksIds = await grreenhorznwalkksGetSavedLocationIds();
    setGrreenhorznwalkksSavedIds(grreenhorznwalkksIds);
  }, []);

  useFocusEffect(
    useCallback(() => {
      grreenhorznwalkksRefresh();
    }, [grreenhorznwalkksRefresh]),
  );

  const grreenhorznwalkksSavedLocations = useMemo(() => {
    const grreenhorznwalkksSet = new Set(grreenhorznwalkksSavedIds);
    return grreenhorznwalkksLocations.filter(l => grreenhorznwalkksSet.has(l.id));
  }, [grreenhorznwalkksSavedIds]);

  const grreenhorznwalkksAvgRating = useMemo(() => {
    if (!grreenhorznwalkksSavedLocations.length) {
      return 0;
    }
    const grreenhorznwalkksSum = grreenhorznwalkksSavedLocations.reduce(
      (acc, l) => acc + l.rating,
      0,
    );
    return grreenhorznwalkksSum / grreenhorznwalkksSavedLocations.length;
  }, [grreenhorznwalkksSavedLocations]);

  const grreenhorznwalkksRemove = useCallback(async (locationId: string) => {
    const grreenhorznwalkksNext =
      await grreenhorznwalkksRemoveSavedLocation(locationId);
    setGrreenhorznwalkksSavedIds(grreenhorznwalkksNext);
  }, []);

  const renderItem: ListRenderItem<GrreenhorznwalkksLocation> = ({item}) => {
    const grreenhorznwalkksDistanceKm =
      grreenhorznwalkksDistanceKmFromCenter(item).toFixed(1);
    return (
      <Pressable
        onPress={() =>
          grreenhorznwalkksNavigation.navigate('Grreenhorznwalkkslocdtl', {
            locationId: item.id,
          })
        }
        style={styles.grreenhorznwalkksCard}>
        <View style={styles.grreenhorznwalkksThumbWrap}>
          <Image source={item.image as never} style={styles.grreenhorznwalkksThumb} />
        </View>

        <View style={styles.grreenhorznwalkksCardBody}>
          <View style={styles.grreenhorznwalkksCardHeaderRow}>
            <Text numberOfLines={2} style={styles.grreenhorznwalkksCardTitle}>
              {item.title}
            </Text>
            <Pressable
              hitSlop={10}
              onPress={() => grreenhorznwalkksRemove(item.id)}
              style={styles.grreenhorznwalkksTrashBtn}>
              <Image source={require('../../assets/i/grreenhorznlssdel.png')} />
            </Pressable>
          </View>

          <View style={styles.grreenhorznwalkksMetaRow}>
            <View style={styles.grreenhorznwalkksMetaItem}>
              <Image source={require('../../assets/i/grreenhorznstr.png')} />
              <Text style={styles.grreenhorznwalkksMetaText}>
                {item.rating.toFixed(1)}
              </Text>
            </View>
            <View style={styles.grreenhorznwalkksMetaItem}>
              <Image source={require('../../assets/i/grreenhorznlsvloc.png')} />
              <Text style={styles.grreenhorznwalkksMetaText}>
                {grreenhorznwalkksDistanceKm} km
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <Grreenhorznwalkkslay>
      <View style={styles.grreenhorznwalkksHeader}>
        <View style={styles.grreenhorznwalkksHeaderRow}>
          <Image source={require('../../assets/i/grreenhorznlssvttl.png')} />
          <Text style={styles.grreenhorznwalkksH1}>Saved</Text>
        </View>
        <Text style={styles.grreenhorznwalkksH2}>Your favorite green spaces</Text>
      </View>

      <View style={styles.grreenhorznwalkksStatsRow}>
        <View style={styles.grreenhorznwalkksStatCard}>
          <Text style={styles.grreenhorznwalkksStatValue}>
            {grreenhorznwalkksSavedLocations.length}
          </Text>
          <Text style={styles.grreenhorznwalkksStatLabel}>Saved Places</Text>
        </View>
        <View style={styles.grreenhorznwalkksStatCard}>
          <Text style={styles.grreenhorznwalkksStatValue}>
            {grreenhorznwalkksSavedLocations.length
              ? grreenhorznwalkksAvgRating.toFixed(1)
              : 0}
          </Text>
          <Text style={styles.grreenhorznwalkksStatLabel}>Avg. Rating</Text>
        </View>
      </View>

      {grreenhorznwalkksSavedLocations.length ? (
        <View style={styles.grreenhorznwalkksListWrap}>
          <FlatList
            data={grreenhorznwalkksSavedLocations}
            keyExtractor={i => i.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={styles.grreenhorznwalkksListContent}
          />
        </View>
      ) : (
        <View style={styles.grreenhorznwalkksEmptyWrap}>
          <Text style={styles.grreenhorznwalkksEmptyIcon}>♡</Text>
          <Text style={styles.grreenhorznwalkksEmptyTitle}>
            No Saved Locations
          </Text>
          <Text style={styles.grreenhorznwalkksEmptySub}>
            Start exploring and save your favorite green spaces to visit later
          </Text>
        </View>
      )}
    </Grreenhorznwalkkslay>
  );
};

export default Grreenhorznwalkkssavd;

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
  grreenhorznwalkksHeader: {
    paddingTop: 40,
    paddingHorizontal: 18,
  },
  grreenhorznwalkksHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  grreenhorznwalkksH1: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 44,
  },
  grreenhorznwalkksH1Icon: {
    color: '#fff',
    fontSize: 28,
    marginTop: 6,
  },
  grreenhorznwalkksH2: {
    marginTop: 6,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
  },
  grreenhorznwalkksStatsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 18,
    marginTop: 18,
  },
  grreenhorznwalkksStatCard: {
    flex: 1,
    minHeight: 102,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    padding: 18,
    justifyContent: 'center',
  },
  grreenhorznwalkksStatValue: {
    color: '#fff',
    fontFamily: 'Manrope-Regular',
    fontSize: 30,
  },
  grreenhorznwalkksStatLabel: {
    marginTop: 6,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
  },
  grreenhorznwalkksListWrap: {
    paddingHorizontal: 18,
    marginTop: 30,
  },
  grreenhorznwalkksListContent: {
    gap: 12,
    paddingBottom: 120,
  },
  grreenhorznwalkksCard: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    overflow: 'hidden',
  },
  grreenhorznwalkksThumbWrap: {
    width: 127,
    height: 127,
  },
  grreenhorznwalkksThumb: {
    width: '100%',
    height: '100%',
  },
  grreenhorznwalkksCardBody: {
    flex: 1,
    padding: 14,
  },
  grreenhorznwalkksCardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  grreenhorznwalkksCardTitle: {
    flex: 1,
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 20,
    maxWidth: '85%',
  },
  grreenhorznwalkksTrashBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -4,
  },

  grreenhorznwalkksMetaRow: {
    marginTop: 12,
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
  },
  grreenhorznwalkksMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  grreenhorznwalkksMetaText: {
    color: '#E8E8E8CC',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  grreenhorznwalkksPinIcon: {
    fontSize: 12,
    opacity: 0.9,
  },
  grreenhorznwalkksEmptyWrap: {
    paddingHorizontal: 18,
    paddingTop: 80,
    paddingBottom: 120,
    alignItems: 'center',
  },
  grreenhorznwalkksEmptyIcon: {
    color: '#fff',
    fontSize: 72,
    opacity: 0.95,
  },
  grreenhorznwalkksEmptyTitle: {
    marginTop: 18,
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 20,
  },
  grreenhorznwalkksEmptySub: {
    marginTop: 12,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
});
