import LinearGradient from 'react-native-linear-gradient';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  type RouteProp,
} from '@react-navigation/native';

import Grreenhorznwalkkslay from '../Grreenhorznwalkkscpnt/Grreenhorznwalkkslay';
import {grreenhorznwalkksGetLocationById} from '../Grreenhorznwalkksdata/grreenhorznwalkksLocations';
import type {GrreenhorznwalksRootStackParamList} from '../Grreenhorznwalkksnav/Grreenhorznwalksstack';
import {
  grreenhorznwalkksIsLocationSaved,
  grreenhorznwalkksToggleSavedLocation,
} from '../Grreenhorznwalkksdata/grreenhorznwalkksSaved';

import type {StackNavigationProp} from '@react-navigation/stack';

const Grreenhorznwalkkslocdtl = () => {
  const grreenhorznwalkksNavigation =
    useNavigation<
      StackNavigationProp<
        GrreenhorznwalksRootStackParamList,
        'Grreenhorznwalkkslocdtl'
      >
    >();
  const grreenhorznwalkksRoute =
    useRoute<
      RouteProp<GrreenhorznwalksRootStackParamList, 'Grreenhorznwalkkslocdtl'>
    >();

  const grreenhorznwalkksLoc = useMemo(
    () => grreenhorznwalkksGetLocationById(grreenhorznwalkksRoute.params.locationId),
    [grreenhorznwalkksRoute.params.locationId],
  );

  const [grreenhorznwalkksIsSaved, setGrreenhorznwalkksIsSaved] = useState(false);
  const [grreenhorznwalkksSavingBusy, setGrreenhorznwalkksSavingBusy] = useState(false);

  useEffect(() => {
    let grreenhorznwalkksCancelled = false;
    (async () => {
      const saved = await grreenhorznwalkksIsLocationSaved(
        grreenhorznwalkksRoute.params.locationId,
      );
      if (!grreenhorznwalkksCancelled) {
        setGrreenhorznwalkksIsSaved(saved);
      }
    })();
    return () => {
      grreenhorznwalkksCancelled = true;
    };
  }, [grreenhorznwalkksRoute.params.locationId]);

  const grreenhorznwalkksToggleSaved = useCallback(async () => {
    if (!grreenhorznwalkksLoc) {
      return;
    }
    if (grreenhorznwalkksSavingBusy) {
      return;
    }
    setGrreenhorznwalkksSavingBusy(true);
    try {
      const res = await grreenhorznwalkksToggleSavedLocation(grreenhorznwalkksLoc.id);
      setGrreenhorznwalkksIsSaved(res.isSaved);
    } finally {
      setGrreenhorznwalkksSavingBusy(false);
    }
  }, [grreenhorznwalkksLoc, grreenhorznwalkksSavingBusy]);

  const grreenhorznwalkksDoShare = useCallback(async () => {
    if (!grreenhorznwalkksLoc) {
      return;
    }
    const grreenhorznwalkksMapsUrl = `https://www.google.com/maps?q=${grreenhorznwalkksLoc.coordinates.lat},${grreenhorznwalkksLoc.coordinates.lng}`;
    const grreenhorznwalkksMessage = `${grreenhorznwalkksLoc.title}\n\n${
      grreenhorznwalkksLoc.description
    }\n\nRating: ${grreenhorznwalkksLoc.rating.toFixed(
      1,
    )}\nCoordinates: ${grreenhorznwalkksLoc.coordinates.lat.toFixed(
      4,
    )}, ${grreenhorznwalkksLoc.coordinates.lng.toFixed(4)}\n${grreenhorznwalkksMapsUrl}`;

    try {
      await Share.share({
        message: grreenhorznwalkksMessage,
        title: grreenhorznwalkksLoc.title,
      });
    } catch {
      // ignore
    }
  }, [grreenhorznwalkksLoc]);

  const grreenhorznwalkksOpenMap = useCallback(() => {
    if (!grreenhorznwalkksLoc) {
      return;
    }
    grreenhorznwalkksNavigation.replace('Grreenhorznwalkkstab', {
      screen: 'Grreenhorznwalkksmap',
      params: {focusLocationId: grreenhorznwalkksLoc.id},
    });
  }, [grreenhorznwalkksLoc, grreenhorznwalkksNavigation]);

  if (!grreenhorznwalkksLoc) {
    return (
      <Grreenhorznwalkkslay>
        <View style={styles.grreenhorznwalkksEmptyWrap}>
          <Text style={styles.grreenhorznwalkksEmptyTitle}>
            Location not found
          </Text>
          <Pressable
            onPress={() => grreenhorznwalkksNavigation.goBack()}
            style={styles.grreenhorznwalkksBackOnlyButton}>
            <Text style={styles.grreenhorznwalkksBackOnlyText}>Go back</Text>
          </Pressable>
        </View>
      </Grreenhorznwalkkslay>
    );
  }

  const grreenhorznwalkksImageSource =
    grreenhorznwalkksLoc.image as ImageSourcePropType | undefined;

  return (
    <Grreenhorznwalkkslay bounces={false}>
      <View style={styles.grreenhorznwalkksContainer}>
        <View style={styles.grreenhorznwalkksHeroWrap}>
          {grreenhorznwalkksImageSource ? (
            <Image source={grreenhorznwalkksImageSource} style={styles.grreenhorznwalkksHeroImage} />
          ) : (
            <LinearGradient
              colors={['#1A1A1A', '#0A0A0A']}
              style={styles.grreenhorznwalkksHeroImage}
            />
          )}

          <Pressable
            onPress={() => grreenhorznwalkksNavigation.goBack()}
            hitSlop={12}
            style={styles.grreenhorznwalkksBackBtn}>
            <Image source={require('../../assets/i/grreenhorznbackk.png')} />
          </Pressable>

          <View style={styles.grreenhorznwalkksRatingPill}>
            <Image source={require('../../assets/i/grreenhorznsrat.png')} />
            <Text style={styles.grreenhorznwalkksRatingText}>
              {grreenhorznwalkksLoc.rating.toFixed(1)}
            </Text>
          </View>
        </View>

        <View style={styles.grreenhorznwalkksContent}>
          <Text style={styles.grreenhorznwalkksTitle}>{grreenhorznwalkksLoc.title}</Text>
          <Text style={styles.grreenhorznwalkksSubtitle}>
            {grreenhorznwalkksLoc.description}
          </Text>

          <View style={styles.grreenhorznwalkksInfoRow}>
            <View style={styles.grreenhorznwalkksInfoCard}>
              <Image source={require('../../assets/i/grreenhorznstime.png')} />
              <Text style={styles.grreenhorznwalkksInfoLabel}>DURATION</Text>
              <Text style={styles.grreenhorznwalkksInfoValue}>
                {grreenhorznwalkksLoc.durationLabel ?? '—'}
              </Text>
            </View>
            <View style={styles.grreenhorznwalkksInfoCard}>
              <Image source={require('../../assets/i/grreenhorzrtt.png')} />
              <Text style={styles.grreenhorznwalkksInfoLabel}>RATING</Text>
              <Text style={styles.grreenhorznwalkksInfoValue}>
                {grreenhorznwalkksLoc.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.grreenhorznwalkksCoordCard}>
            <Image source={require('../../assets/i/grreenhorznloc.png')} />
            <Text style={styles.grreenhorznwalkksInfoLabel}>COORDINATES</Text>
            <Text style={styles.grreenhorznwalkksCoordValue}>
              {grreenhorznwalkksLoc.coordinates.lat.toFixed(4)},{' '}
              {grreenhorznwalkksLoc.coordinates.lng.toFixed(4)}
            </Text>
          </View>

          <View style={styles.grreenhorznwalkksActionsRow}>
            <Pressable
              onPress={grreenhorznwalkksToggleSaved}
              disabled={grreenhorznwalkksSavingBusy}
              style={[
                styles.grreenhorznwalkksActionBtn,
                grreenhorznwalkksIsSaved && styles.grreenhorznwalkksActionBtnSaved,
                grreenhorznwalkksSavingBusy && styles.grreenhorznwalkksActionBtnDisabled,
              ]}>
              <Image
                source={
                  grreenhorznwalkksIsSaved
                    ? require('../../assets/i/grreenhorznlsavded.png')
                    : require('../../assets/i/grreenhorznlsavd.png')
                }
              />
              <Text
                style={[
                  styles.grreenhorznwalkksActionBtnText,
                  grreenhorznwalkksIsSaved && styles.grreenhorznwalkksActionBtnTextSaved,
                ]}>
                {grreenhorznwalkksIsSaved ? 'SAVED' : 'SAVE'}
              </Text>
            </Pressable>
            <Pressable
              onPress={grreenhorznwalkksDoShare}
              style={styles.grreenhorznwalkksActionBtn}>
              <Image source={require('../../assets/i/grreenhorznlshr.png')} />
              <Text style={styles.grreenhorznwalkksActionBtnText}>SHARE</Text>
            </Pressable>
            <Pressable
              onPress={grreenhorznwalkksOpenMap}
              style={[
                styles.grreenhorznwalkksActionBtn,
                styles.grreenhorznwalkksActionBtnPrimary,
              ]}>
              <Image source={require('../../assets/i/grreenhorznlmap.png')} />
              <Text
                style={[
                  styles.grreenhorznwalkksActionBtnText,
                  styles.grreenhorznwalkksActionBtnTextPrimary,
                ]}>
                MAP
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Grreenhorznwalkkslay>
  );
};

const styles = StyleSheet.create({
  grreenhorznwalkksContainer: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  grreenhorznwalkksHeroWrap: {
    height: 340,
    backgroundColor: '#0A0A0A',
  },
  grreenhorznwalkksHeroImage: {
    width: '100%',
    height: '100%',
  },
  grreenhorznwalkksBackBtn: {
    position: 'absolute',
    top: 45,
    left: 18,
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#D4AF3733',
  },
  grreenhorznwalkksBackBtnText: {
    color: '#fff',
    fontSize: 28,
    lineHeight: 28,
    marginTop: -2,
    fontFamily: 'Manrope-Medium',
  },
  grreenhorznwalkksRatingPill: {
    position: 'absolute',
    top: 45,
    right: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#D4AF3733',
    justifyContent: 'center',
  },
  grreenhorznwalkksRatingText: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
  grreenhorznwalkksContent: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 120,
  },
  grreenhorznwalkksTitle: {
    color: '#fff',
    fontSize: 36,
    fontFamily: 'CormorantGaramond-Medium',
  },
  grreenhorznwalkksSubtitle: {
    marginTop: 10,
    color: '#E8E8E8CC',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  grreenhorznwalkksInfoRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 23,
  },
  grreenhorznwalkksInfoCard: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#D4AF3726',
  },
  grreenhorznwalkksInfoLabel: {
    color: '#E8E8E899',
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    letterSpacing: 0.9,
    marginTop: 8,
  },
  grreenhorznwalkksInfoValue: {
    marginTop: 8,
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
  grreenhorznwalkksCoordCard: {
    gap: 6,
    marginTop: 23,
    padding: 14,
    borderRadius: 14,
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#D4AF3726',
  },
  grreenhorznwalkksCoordValue: {
    marginTop: 8,
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
  grreenhorznwalkksActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  grreenhorznwalkksActionBtn: {
    gap: 7,
    flex: 1,
    minHeight: 78,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F0F0F',
    borderWidth: 1,
    borderColor: '#D4AF3726',
  },
  grreenhorznwalkksActionBtnPrimary: {
    backgroundColor: '#CFB53B',
    borderColor: '#CFB53B',
  },
  grreenhorznwalkksActionBtnSaved: {
    backgroundColor: '#CFB53B',
    borderColor: '#CFB53B',
  },
  grreenhorznwalkksActionBtnDisabled: {
    opacity: 0.7,
  },
  grreenhorznwalkksActionBtnText: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    letterSpacing: 0.6,
  },
  grreenhorznwalkksActionBtnTextSaved: {
    color: '#000',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 12,
    letterSpacing: 0.8,
  },
  grreenhorznwalkksActionBtnTextPrimary: {
    color: '#000',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 12,
    letterSpacing: 0.8,
  },
  grreenhorznwalkksEmptyWrap: {
    padding: 18,
    flex: 1,
    justifyContent: 'center',
  },
  grreenhorznwalkksEmptyTitle: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 28,
    textAlign: 'center',
  },
  grreenhorznwalkksBackOnlyButton: {
    marginTop: 18,
    backgroundColor: '#CFB53B',
    borderRadius: 14,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grreenhorznwalkksBackOnlyText: {
    color: '#000',
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 14,
  },
});

export default Grreenhorznwalkkslocdtl;
