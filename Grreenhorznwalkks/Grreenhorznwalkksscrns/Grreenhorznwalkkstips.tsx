import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ListRenderItem,
} from 'react-native';

import Grreenhorznwalkkslay from '../Grreenhorznwalkkscpnt/Grreenhorznwalkkslay';
import {useFocusEffect} from '@react-navigation/native';

type GrreenhorznwalkksTipCategoryId =
  | 'all'
  | 'timing'
  | 'route'
  | 'comfort'
  | 'safety'
  | 'transport'
  | 'map';

type GrreenhorznwalkksTip = {
  id: string;
  title: string;
  body: string;
  categoryId: Exclude<GrreenhorznwalkksTipCategoryId, 'all'>;
  image: ImageSourcePropType;
};

const grreenhorznwalkksTipCategoryIcon: Record<
  GrreenhorznwalkksTipCategoryId,
  ImageSourcePropType
> = {
  all: require('../../assets/i/grreenhorzntips.png'),
  timing: require('../../assets/i/grreenhorzntiptim.png'),
  transport: require('../../assets/i/grreenhorznttrans.png'),
  route: require('../../assets/i/grreenhorznfocs.png'),
  comfort: require('../../assets/i/grreenhorznsmrt.png'),
  safety: require('../../assets/i/grreenhorznlsatt.png'),
  map: require('../../assets/i/grreenhorzntmap.png'),
};

const grreenhorznwalkksTipCategories: Array<{
  id: GrreenhorznwalkksTipCategoryId;
  label: string;
  image: ImageSourcePropType;
}> = [
  {
    id: 'all',
    label: 'All Tips',
    image: grreenhorznwalkksTipCategoryIcon.all,
  },
  {
    id: 'timing',
    label: 'Timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },

  {
    id: 'route',
    label: 'Routes',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'comfort',
    label: 'Comfort',
    image: grreenhorznwalkksTipCategoryIcon.comfort,
  },
  {
    id: 'safety',
    label: 'Safety',
    image: grreenhorznwalkksTipCategoryIcon.safety,
  },

  {
    id: 'map',
    label: 'Map',
    image: grreenhorznwalkksTipCategoryIcon.map,
  },
];

const grreenhorznwalkksTips: GrreenhorznwalkksTip[] = [
  {
    id: 'tip-01',
    title: 'Best Time to Walk',
    body: 'Early mornings and late afternoons offer softer light, fewer crowds, and a more relaxed pace.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-02',
    title: 'Avoid Midday Heat',
    body: 'Green areas can feel much hotter at midday, especially in summer months.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-03',
    title: 'Combine Routes',
    body: 'Link parks with nearby streets to create more interesting and varied walks.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-04',
    title: 'Stay Hydrated',
    body: 'Carry water, especially when walking through larger parks or open spaces.',
    categoryId: 'comfort',
    image: grreenhorznwalkksTipCategoryIcon.comfort,
  },
  {
    id: 'tip-05',
    title: 'Use Shade Wisely',
    body: 'Tree-lined paths provide noticeably cooler and more comfortable walking conditions.',
    categoryId: 'comfort',
    image: grreenhorznwalkksTipCategoryIcon.comfort,
  },
  {
    id: 'tip-06',
    title: 'Watch Your Timing',
    body: 'Some parks close earlier than expected, so plan your route accordingly.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-07',
    title: 'Walk Slower',
    body: 'Madrid is best experienced at a slower pace — details appear when you don’t rush.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-08',
    title: 'Explore Side Paths',
    body: 'Main paths are often crowded — smaller routes usually feel more relaxed.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-09',
    title: 'Look for Elevation',
    body: 'Higher points often offer better views and a more open atmosphere.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-10',
    title: 'Mix Nature and City',
    body: 'Switch between green zones and urban streets to keep the walk dynamic.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-11',
    title: 'Take Breaks',
    body: 'Short pauses on benches or open areas improve the overall experience.',
    categoryId: 'comfort',
    image: grreenhorznwalkksTipCategoryIcon.comfort,
  },
  {
    id: 'tip-12',
    title: 'Check Weather',
    body: 'Sunny days are ideal, but slightly cloudy weather can make walking more comfortable.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-13',
    title: 'Visit Weekdays',
    body: 'Parks and green spaces are noticeably quieter during weekdays.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-14',
    title: 'Start from the Edge',
    body: 'Entering a park from less popular sides often avoids crowds.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-15',
    title: 'Follow Natural Light',
    body: 'Golden hour creates the most visually appealing environment.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-16',
    title: 'Bring Light Snacks',
    body: 'A small snack helps maintain energy during longer walking routes.',
    categoryId: 'comfort',
    image: grreenhorznwalkksTipCategoryIcon.comfort,
  },
  {
    id: 'tip-17',
    title: 'Wear Comfortable Shoes',
    body: 'Surfaces vary from stone to gravel — proper footwear matters.',
    categoryId: 'comfort',
    image: grreenhorznwalkksTipCategoryIcon.comfort,
  },
  {
    id: 'tip-18',
    title: 'Stay Aware of Bikes',
    body: 'Some park routes are shared with cyclists.',
    categoryId: 'safety',
    image: grreenhorznwalkksTipCategoryIcon.safety,
  },
  {
    id: 'tip-19',
    title: 'Use the Map Before Walking',
    body: 'Preview nearby locations to create a smoother route.',
    categoryId: 'map',
    image: grreenhorznwalkksTipCategoryIcon.map,
  },
  {
    id: 'tip-20',
    title: 'Keep Your Route Flexible',
    body: 'Don’t over-plan — leave room for spontaneous stops.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-21',
    title: 'Explore Early Evenings',
    body: 'The city becomes calmer and more atmospheric after peak hours.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-22',
    title: 'Avoid Peak Entrances',
    body: 'Main park entrances tend to be the busiest areas.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-23',
    title: 'Watch for Events',
    body: 'Some parks host events that can affect the usual спокойний ритм.',
    categoryId: 'timing',
    image: grreenhorznwalkksTipCategoryIcon.timing,
  },
  {
    id: 'tip-24',
    title: 'Stay in Open Areas at Night',
    body: 'Well-lit and open spaces are more comfortable after sunset.',
    categoryId: 'safety',
    image: grreenhorznwalkksTipCategoryIcon.safety,
  },
  {
    id: 'tip-25',
    title: 'Look Around, Not Just Ahead',
    body: 'Interesting details are often to the sides, not directly in front.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-26',
    title: 'Use Landmarks as Anchors',
    body: 'Pick a visible point to guide your movement naturally.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
  {
    id: 'tip-27',
    title: 'Balance Movement and Pause',
    body: 'A good walk alternates between motion and stillness.',
    categoryId: 'comfort',
    image: grreenhorznwalkksTipCategoryIcon.comfort,
  },
  {
    id: 'tip-28',
    title: 'Respect Quiet Spaces',
    body: 'Some areas are meant for calm — keep noise low.',
    categoryId: 'safety',
    image: grreenhorznwalkksTipCategoryIcon.safety,
  },
  {
    id: 'tip-29',
    title: 'Keep Your Phone Ready',
    body: 'You may want quick access to the map or saved locations.',
    categoryId: 'map',
    image: grreenhorznwalkksTipCategoryIcon.map,
  },
  {
    id: 'tip-30',
    title: 'End with a View',
    body: 'Finish your walk at a scenic or open spot to close the experience properly.',
    categoryId: 'route',
    image: grreenhorznwalkksTipCategoryIcon.route,
  },
];

const Grreenhorznwalkkstips = () => {
  const [
    grreenhorznwalkksActiveCategoryId,
    setGrreenhorznwalkksActiveCategoryId,
  ] = useState<GrreenhorznwalkksTipCategoryId>('all');
  const [grreenhorznwalkksExpandedTipId, setGrreenhorznwalkksExpandedTipId] =
    useState<string | null>(null);
  const grreenhorznwalkksCategoryTabsRef = useRef<
    FlatList<(typeof grreenhorznwalkksTipCategories)[number]>
  >(null);

  const grreenhorznwalkksScrollCategoryTabsToStart = useCallback(
    (grreenhorznwalkksAnimated: boolean) => {
      grreenhorznwalkksCategoryTabsRef.current?.scrollToOffset({
        offset: 0,
        animated: grreenhorznwalkksAnimated,
      });
    },
    [],
  );

  useFocusEffect(
    useCallback(() => {
      setGrreenhorznwalkksActiveCategoryId('all');
      setGrreenhorznwalkksExpandedTipId(null);
      const grreenhorznwalkksRafId = requestAnimationFrame(() => {
        grreenhorznwalkksScrollCategoryTabsToStart(false);
      });
      return () => cancelAnimationFrame(grreenhorznwalkksRafId);
    }, [grreenhorznwalkksScrollCategoryTabsToStart]),
  );

  useEffect(() => {
    if (grreenhorznwalkksActiveCategoryId !== 'all') {
      return;
    }
    const grreenhorznwalkksRafId = requestAnimationFrame(() => {
      grreenhorznwalkksScrollCategoryTabsToStart(true);
    });
    return () => cancelAnimationFrame(grreenhorznwalkksRafId);
  }, [
    grreenhorznwalkksActiveCategoryId,
    grreenhorznwalkksScrollCategoryTabsToStart,
  ]);

  const grreenhorznwalkksFilteredTips = useMemo(() => {
    if (grreenhorznwalkksActiveCategoryId === 'all') {
      return grreenhorznwalkksTips;
    }
    return grreenhorznwalkksTips.filter(
      t => t.categoryId === grreenhorznwalkksActiveCategoryId,
    );
  }, [grreenhorznwalkksActiveCategoryId]);

  const grreenhorznwalkksRenderCategoryTab: ListRenderItem<
    (typeof grreenhorznwalkksTipCategories)[number]
  > = ({item: c}) => {
    const grreenhorznwalkksActive = c.id === grreenhorznwalkksActiveCategoryId;
    return (
      <Pressable
        onPress={() => {
          setGrreenhorznwalkksActiveCategoryId(c.id);
          setGrreenhorznwalkksExpandedTipId(null);
        }}
        style={[
          styles.grreenhorznwalkksTab,
          grreenhorznwalkksActive && styles.grreenhorznwalkksTabActive,
        ]}>
        <Image
          source={c.image}
          style={[
            styles.grreenhorznwalkksTabIcon,
            grreenhorznwalkksActive && styles.grreenhorznwalkksTabIconActive,
          ]}
        />
        <Text
          style={[
            styles.grreenhorznwalkksTabText,
            grreenhorznwalkksActive && styles.grreenhorznwalkksTabTextActive,
          ]}>
          {c.label}
        </Text>
      </Pressable>
    );
  };

  const grreenhorznwalkksRenderTip = (item: GrreenhorznwalkksTip) => {
    const grreenhorznwalkksExpanded =
      item.id === grreenhorznwalkksExpandedTipId;
    return (
      <Pressable
        key={item.id}
        onPress={() =>
          setGrreenhorznwalkksExpandedTipId(
            grreenhorznwalkksExpanded ? null : item.id,
          )
        }
        style={[
          styles.grreenhorznwalkksTipCard,
          grreenhorznwalkksExpanded && styles.grreenhorznwalkksTipCardExpanded,
        ]}>
        <View style={styles.grreenhorznwalkksTipIconWrap}>
          <Image source={item.image} style={styles.grreenhorznwalkksTipIcon} />
        </View>
        <View style={styles.grreenhorznwalkksTipBody}>
          <Text style={styles.grreenhorznwalkksTipTitle}>{item.title}</Text>
          {grreenhorznwalkksExpanded ? (
            <Text style={styles.grreenhorznwalkksTipText}>{item.body}</Text>
          ) : (
            <Text style={styles.grreenhorznwalkksTipHint}>
              Tap to read more
            </Text>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <Grreenhorznwalkkslay>
      <View style={styles.grreenhorznwalkksHeader}>
        <View style={styles.grreenhorznwalkksHeaderRow}>
          <Image source={require('../../assets/i/grreenhorzntips.png')} />
          <Text style={styles.grreenhorznwalkksH1}>Tips</Text>
        </View>
        <Text style={styles.grreenhorznwalkksH2}>
          Insider knowledge for Madrid visitors
        </Text>
      </View>

      <FlatList
        ref={grreenhorznwalkksCategoryTabsRef}
        horizontal
        nestedScrollEnabled
        style={styles.grreenhorznwalkksTabsList}
        data={grreenhorznwalkksTipCategories}
        keyExtractor={c => c.id}
        renderItem={grreenhorznwalkksRenderCategoryTab}
        extraData={grreenhorznwalkksActiveCategoryId}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.grreenhorznwalkksTabsRow}
      />

      <View style={styles.grreenhorznwalkksListWrap}>
        <View style={styles.grreenhorznwalkksListContent}>
          {grreenhorznwalkksFilteredTips.map(grreenhorznwalkksRenderTip)}
        </View>
      </View>
    </Grreenhorznwalkkslay>
  );
};

export default Grreenhorznwalkkstips;

const styles = StyleSheet.create({
  grreenhorznwalkksHeader: {
    paddingTop: 40,
    paddingHorizontal: 18,
    paddingBottom: 8,
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
    letterSpacing: 0.8,
  },
  grreenhorznwalkksH2: {
    marginTop: 6,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
  },
  grreenhorznwalkksTabsList: {
    marginTop: 18,
    marginBottom: 30,
    flexGrow: 0,
    height: 44,
  },
  grreenhorznwalkksTabsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 18,
    paddingRight: 24,
  },
  grreenhorznwalkksTab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 14,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: 'transparent',
  },
  grreenhorznwalkksTabActive: {
    borderColor: '#D4AF37',
  },
  grreenhorznwalkksTabIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    opacity: 0.72,
  },
  grreenhorznwalkksTabIconActive: {
    opacity: 1,
  },
  grreenhorznwalkksTabText: {
    color: '#E8E8E899',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
  grreenhorznwalkksTabTextActive: {
    color: '#fff',
  },
  grreenhorznwalkksListWrap: {
    paddingHorizontal: 18,
    marginTop: 14,
  },
  grreenhorznwalkksListContent: {
    gap: 14,
    paddingBottom: 120,
  },
  grreenhorznwalkksTipCard: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    padding: 14,
    gap: 14,
    alignItems: 'center',
  },
  grreenhorznwalkksTipCardExpanded: {},
  grreenhorznwalkksTipIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0A0A',
  },
  grreenhorznwalkksTipIcon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
  grreenhorznwalkksTipBody: {
    flex: 1,
  },
  grreenhorznwalkksTipTitle: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 18,
  },
  grreenhorznwalkksTipHint: {
    marginTop: 6,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
  },
  grreenhorznwalkksTipText: {
    marginTop: 10,
    color: '#E8E8E8CC',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: '88%',
  },
});
