import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import Grreenhorznwalkkslay from '../Grreenhorznwalkkscpnt/Grreenhorznwalkkslay';
import {
  grreenhorznwalkksCategories,
  grreenhorznwalkksLocations,
  type GrreenhorznwalkksCategoryId,
  type GrreenhorznwalkksLocation,
} from '../Grreenhorznwalkksdata/grreenhorznwalkksLocations';
import type {GrreenhorznwalksRootStackParamList} from '../Grreenhorznwalkksnav/Grreenhorznwalksstack';
import {grreenhorznwalkksGetSavedLocationIds} from '../Grreenhorznwalkksdata/grreenhorznwalkksSaved';

const Grreenhorznwalkksexplr = () => {
  const grreenhorznwalkksNavigation =
    useNavigation<
      StackNavigationProp<
        GrreenhorznwalksRootStackParamList,
        'Grreenhorznwalkkstab'
      >
    >();
  const [grreenhorznwalkksActiveCategoryId, setGrreenhorznwalkksActiveCategoryId] =
    useState<GrreenhorznwalkksCategoryId | null>(null);
  const [grreenhorznwalkksSavedIds, setGrreenhorznwalkksSavedIds] = useState<string[]>([]);

  const grreenhorznwalkksRefreshSaved = useCallback(async () => {
    const grreenhorznwalkksIds = await grreenhorznwalkksGetSavedLocationIds();
    setGrreenhorznwalkksSavedIds(grreenhorznwalkksIds);
  }, []);

  useEffect(() => {
    grreenhorznwalkksRefreshSaved();
  }, [grreenhorznwalkksRefreshSaved]);

  const grreenhorznwalkksFilteredLocations = useMemo(() => {
    if (!grreenhorznwalkksActiveCategoryId) {
      return grreenhorznwalkksLocations;
    }
    return grreenhorznwalkksLocations.filter(
      l => l.categoryId === grreenhorznwalkksActiveCategoryId,
    );
  }, [grreenhorznwalkksActiveCategoryId]);

  const grreenhorznwalkksSectionTitle = useMemo(() => {
    if (!grreenhorznwalkksActiveCategoryId) {
      return 'All Locations';
    }
    return (
      grreenhorznwalkksCategories.find(
        c => c.id === grreenhorznwalkksActiveCategoryId,
      )?.title ?? 'All Locations'
    );
  }, [grreenhorznwalkksActiveCategoryId]);

  const grreenhorznwalkksRandomDiscovery = () => {
    const grreenhorznwalkksPool = grreenhorznwalkksFilteredLocations.length
      ? grreenhorznwalkksFilteredLocations
      : grreenhorznwalkksLocations;
    const grreenhorznwalkksPick =
      grreenhorznwalkksPool[
        Math.floor(Math.random() * grreenhorznwalkksPool.length)
      ];
    if (!grreenhorznwalkksPick) {
      return;
    }
    grreenhorznwalkksNavigation.navigate('Grreenhorznwalkkslocdtl', {
      locationId: grreenhorznwalkksPick.id,
    });
  };

  const renderLocation: ListRenderItem<GrreenhorznwalkksLocation> = ({
    item,
  }) => {
    const grreenhorznwalkksIsSaved = grreenhorznwalkksSavedIds.includes(item.id);
    return (
      <Pressable
        onPress={() => {
          grreenhorznwalkksNavigation.navigate('Grreenhorznwalkkslocdtl', {
            locationId: item.id,
          });
        }}
        style={[
          styles.grreenhorznwalkksLocCard,
          grreenhorznwalkksIsSaved && styles.grreenhorznwalkksLocCardSaved,
        ]}>
        <View style={styles.grreenhorznwalkksLocThumbWrap}>
          <Image source={item.image as never} style={styles.locThumb} />
        </View>

        <View style={styles.grreenhorznwalkksLocMeta}>
          <View style={styles.grreenhorznwalkksLocTitleRow}>
            <Text style={styles.grreenhorznwalkksLocTitle}>{item.title}</Text>
            <Image source={require('../../assets/i/grreenhorznnxt.png')} />
          </View>

          <Text numberOfLines={2} style={styles.grreenhorznwalkksLocDesc}>
            {item.description}
          </Text>

          <View style={styles.grreenhorznwalkksLocFooterRow}>
            <Image source={require('../../assets/i/grreenhorznstr.png')} />
            <Text style={styles.grreenhorznwalkksLocRating}>
              {item.rating.toFixed(1)}
            </Text>
            {!!item.durationLabel && (
              <Text style={styles.grreenhorznwalkksLocDuration}>
                · {item.durationLabel}
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <Grreenhorznwalkkslay>
      <View style={styles.grreenhorznwalkksHeader}>
        <Text style={styles.grreenhorznwalkksH1}>Explore</Text>
        <Text style={styles.grreenhorznwalkksH2}>
          Discover Madrid's finest green spaces
        </Text>

        <Pressable
          onPress={grreenhorznwalkksRandomDiscovery}
          style={styles.grreenhorznwalkksRandomBtn}>
          <Image
            source={require('../../assets/i/grreenhorznrand.png')}
            style={styles.grreenhorznwalkksRandomIcon}
          />
          <Text style={styles.grreenhorznwalkksRandomText}>
            RANDOM DISCOVERY
          </Text>
        </Pressable>
      </View>

      <View style={styles.grreenhorznwalkksSection}>
        <Text style={styles.grreenhorznwalkksSectionTitle}>Categories</Text>
        <View style={styles.grreenhorznwalkksCatGrid}>
          {grreenhorznwalkksCategories.map(c => {
            const grreenhorznwalkksActive = c.id === grreenhorznwalkksActiveCategoryId;
            return (
              <Pressable
                key={c.id}
                onPress={() =>
                  setGrreenhorznwalkksActiveCategoryId(
                    grreenhorznwalkksActive ? null : c.id,
                  )
                }
                style={[
                  styles.grreenhorznwalkksCatCard,
                  grreenhorznwalkksActive && styles.grreenhorznwalkksCatCardActive,
                ]}>
                <View style={styles.grreenhorznwalkksCatIconWrap}>
                  <Text style={styles.grreenhorznwalkksCatEmoji}>{c.emoji}</Text>
                </View>
                <Text style={styles.grreenhorznwalkksCatTitle}>{c.title}</Text>
              </Pressable>
            );
          })}
        </View>

        {grreenhorznwalkksActiveCategoryId && (
          <Pressable
            onPress={() => setGrreenhorznwalkksActiveCategoryId(null)}
            style={styles.grreenhorznwalkksClearWrap}>
            <Text style={styles.grreenhorznwalkksClearText}>
              ← CLEAR FILTER
            </Text>
          </Pressable>
        )}
      </View>

      <View style={styles.grreenhorznwalkksSection}>
        <Text
          style={[
            styles.grreenhorznwalkksSectionTitle,
            grreenhorznwalkksActiveCategoryId &&
              styles.grreenhorznwalkksSectionTitleActive,
          ]}>
          {grreenhorznwalkksSectionTitle}
        </Text>
        <FlatList
          data={grreenhorznwalkksFilteredLocations}
          keyExtractor={i => i.id}
          renderItem={renderLocation}
          scrollEnabled={false}
          contentContainerStyle={styles.grreenhorznwalkksListContent}
        />
      </View>
    </Grreenhorznwalkkslay>
  );
};

export default Grreenhorznwalkksexplr;

const styles = StyleSheet.create({
  grreenhorznwalkksHeader: {
    paddingTop: 40,
    paddingHorizontal: 18,
  },
  grreenhorznwalkksH1: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 44,
    letterSpacing: 0.8,
  },
  grreenhorznwalkksH2: {
    marginTop: 6,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
  },
  grreenhorznwalkksRandomBtn: {
    marginTop: 43,
    height: 44,
    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 40,
  },
  grreenhorznwalkksRandomIcon: {
    color: '#fff',
    fontSize: 16,
    marginTop: -1,
  },
  grreenhorznwalkksRandomText: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
  },
  grreenhorznwalkksSection: {
    paddingHorizontal: 18,
    marginTop: 18,
  },
  grreenhorznwalkksSectionTitle: {
    color: '#E8E8E8CC',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 20,
    marginBottom: 16,
  },
  grreenhorznwalkksSectionTitleActive: {
    color: '#D4AF37',
  },
  grreenhorznwalkksCatGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  grreenhorznwalkksCatCard: {
    width: '48%',
    minHeight: 110,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    padding: 12,
    justifyContent: 'center',
    gap: 7,
  },
  grreenhorznwalkksCatCardActive: {
    borderColor: '#D4AF37',
  },
  grreenhorznwalkksCatIconWrap: {
    width: 34,
    height: 34,
  },
  grreenhorznwalkksCatEmoji: {
    fontSize: 18,
  },
  grreenhorznwalkksCatTitle: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 15,
  },
  grreenhorznwalkksClearWrap: {
    marginTop: 28,
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  grreenhorznwalkksClearText: {
    color: '#F5F5F5',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
  grreenhorznwalkksListContent: {
    paddingBottom: 120,
    gap: 12,
  },
  grreenhorznwalkksLocCard: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
  },
  grreenhorznwalkksLocCardSaved: {
    borderColor: '#CFB53B',
  },
  grreenhorznwalkksLocThumbWrap: {
    width: 122,
    height: 112,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#111',
  },
  locThumb: {
    width: '100%',
    height: '100%',
  },
  grreenhorznwalkksLocMeta: {
    flex: 1,
    marginLeft: 6,
    padding: 6,
  },
  grreenhorznwalkksLocTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'space-between',
  },
  grreenhorznwalkksLocTitle: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 18,
    maxWidth: '90%',
  },
  grreenhorznwalkksLocDesc: {
    marginTop: 2,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  grreenhorznwalkksLocFooterRow: {
    flexDirection: 'row',
    marginTop: 6,
    alignItems: 'center',
  },
  grreenhorznwalkksLocRating: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    marginLeft: 6,
  },
  grreenhorznwalkksLocDuration: {
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    marginLeft: 6,
  },
});
