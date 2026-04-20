import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Grreenhorznwalkkslay from '../Grreenhorznwalkkscpnt/Grreenhorznwalkkslay';
import {useFocusEffect} from '@react-navigation/native';

type GrreenhorznwalkksQuizId = 'quiz-1' | 'quiz-2' | 'quiz-3';

type GrreenhorznwalkksQuizQuestion = {
  id: string;
  quizId: GrreenhorznwalkksQuizId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

const grreenhorznwalkksQuizQuestions: GrreenhorznwalkksQuizQuestion[] = [
  {
    id: 'q1-1',
    quizId: 'quiz-1',
    question: 'What is the best time for a relaxed walk?',
    options: [
      'Midday',
      'Late night',
      'Early morning or late afternoon',
      'Noon',
    ],
    correctIndex: 2,
    explanation:
      'Early morning and late afternoon usually offer softer light, fewer crowds, and a calmer pace.',
  },
  {
    id: 'q1-2',
    quizId: 'quiz-1',
    question: 'Why should you avoid midday walks?',
    options: [
      'Streets are closed',
      'It can be too hot and uncomfortable',
      'Parks are empty',
      'No transport available',
    ],
    correctIndex: 1,
    explanation:
      'Midday heat can make green areas feel much hotter, especially in summer months.',
  },
  {
    id: 'q1-3',
    quizId: 'quiz-1',
    question: 'What improves a walking experience the most?',
    options: [
      'Walking faster',
      'Taking breaks when needed',
      'Using headphones all the time',
      'Avoiding stops',
    ],
    correctIndex: 1,
    explanation:
      'Short pauses on benches or open areas improve comfort and overall enjoyment.',
  },
  {
    id: 'q1-4',
    quizId: 'quiz-1',
    question: 'What type of paths are usually less crowded?',
    options: ['Main central paths', 'Roads', 'Smaller side paths', 'Entrances'],
    correctIndex: 2,
    explanation:
      'Main paths are often crowded—side paths usually feel more relaxed and quiet.',
  },
  {
    id: 'q1-5',
    quizId: 'quiz-1',
    question: 'What helps maintain energy during long walks?',
    options: [
      'Running',
      'Skipping breaks',
      'Light snacks and water',
      'Standing still',
    ],
    correctIndex: 2,
    explanation:
      'A small snack and water help maintain energy during longer routes.',
  },

  {
    id: 'q2-1',
    quizId: 'quiz-2',
    question: 'What should you do before starting a route?',
    options: [
      'Start walking immediately',
      'Check the map and nearby locations',
      'Avoid planning',
      'Follow random people',
    ],
    correctIndex: 1,
    explanation:
      'Previewing nearby locations helps you create a smoother route before you start.',
  },
  {
    id: 'q2-2',
    quizId: 'quiz-2',
    question: 'What is a good strategy for creating interesting walks?',
    options: [
      'Staying in one place',
      'Walking in circles only',
      'Combining parks and city streets',
      'Avoiding green areas',
    ],
    correctIndex: 2,
    explanation:
      'Switching between green zones and urban streets keeps the walk more dynamic.',
  },
  {
    id: 'q2-3',
    quizId: 'quiz-2',
    question: 'Where are crowds usually higher?',
    options: ['Hidden corners', 'Park edges', 'Main entrances', 'Side paths'],
    correctIndex: 2,
    explanation:
      'Main entrances tend to be the busiest areas—side paths and edges are often calmer.',
  },
  {
    id: 'q2-4',
    quizId: 'quiz-2',
    question: 'Why is it useful to keep your route flexible?',
    options: [
      'To get lost',
      'To avoid walking',
      'To allow spontaneous exploration',
      'To finish faster',
    ],
    correctIndex: 2,
    explanation:
      'A flexible route leaves room for spontaneous stops and discoveries.',
  },
  {
    id: 'q2-5',
    quizId: 'quiz-2',
    question: 'What helps guide movement naturally?',
    options: [
      'Random turns',
      'Landmarks in the distance',
      'Closed paths',
      'Traffic lights',
    ],
    correctIndex: 1,
    explanation:
      'Using visible landmarks helps you move naturally without over-planning.',
  },

  {
    id: 'q3-1',
    quizId: 'quiz-3',
    question: 'Why are tree-lined paths better?',
    options: [
      'They are longer',
      'They are more crowded',
      'They provide shade and comfort',
      'They are harder to walk',
    ],
    correctIndex: 2,
    explanation:
      'Shade makes walking cooler and more comfortable—especially in warmer months.',
  },
  {
    id: 'q3-2',
    quizId: 'quiz-3',
    question: 'What should you wear for city walking?',
    options: [
      'Formal shoes',
      'Heavy boots only',
      'Comfortable shoes',
      'Sandals only',
    ],
    correctIndex: 2,
    explanation:
      'Surfaces vary from stone to gravel—comfortable shoes make a big difference.',
  },
  {
    id: 'q3-3',
    quizId: 'quiz-3',
    question: 'What should you be aware of in shared park routes?',
    options: ['Cars', 'Cyclists', 'Buildings', 'Shops'],
    correctIndex: 1,
    explanation:
      'Some routes are shared with cyclists, so it helps to stay aware.',
  },
  {
    id: 'q3-4',
    quizId: 'quiz-3',
    question: 'Where is it better to walk at night?',
    options: [
      'Dark isolated areas',
      'Closed parks',
      'Well-lit open spaces',
      'Empty streets only',
    ],
    correctIndex: 2,
    explanation:
      'Well-lit, open areas feel safer and more comfortable after sunset.',
  },
  {
    id: 'q3-5',
    quizId: 'quiz-3',
    question: 'What makes the end of a walk more satisfying?',
    options: [
      'Ending quickly',
      'Stopping randomly',
      'Finishing at a scenic spot',
      'Avoiding views',
    ],
    correctIndex: 2,
    explanation:
      'Ending at a scenic or open spot gives the walk a stronger finish.',
  },
];

const Grreenhorznwalkksquzz = () => {
  const [grreenhorznwalkksQuizId, setGrreenhorznwalkksQuizId] =
    useState<GrreenhorznwalkksQuizId>('quiz-1');
  const [grreenhorznwalkksQuestionIndex, setGrreenhorznwalkksQuestionIndex] =
    useState(0);
  const [grreenhorznwalkksSelectedIndex, setGrreenhorznwalkksSelectedIndex] =
    useState<number | null>(null);
  const [grreenhorznwalkksSubmitted, setGrreenhorznwalkksSubmitted] =
    useState(false);
  const [grreenhorznwalkksScore, setGrreenhorznwalkksScore] = useState(0);
  const [grreenhorznwalkksFinished, setGrreenhorznwalkksFinished] =
    useState(false);

  const grreenhorznwalkksQuestions = useMemo(() => {
    return grreenhorznwalkksQuizQuestions.filter(
      q => q.quizId === grreenhorznwalkksQuizId,
    );
  }, [grreenhorznwalkksQuizId]);

  const grreenhorznwalkksCurrent =
    grreenhorznwalkksQuestions[grreenhorznwalkksQuestionIndex];
  const grreenhorznwalkksTotal = grreenhorznwalkksQuestions.length;
  const grreenhorznwalkksProgressPct = Math.round(
    ((grreenhorznwalkksQuestionIndex + 1) / grreenhorznwalkksTotal) * 100,
  );

  const grreenhorznwalkksReset = (nextQuizId?: GrreenhorznwalkksQuizId) => {
    if (nextQuizId) {
      setGrreenhorznwalkksQuizId(nextQuizId);
    }
    setGrreenhorznwalkksQuestionIndex(0);
    setGrreenhorznwalkksSelectedIndex(null);
    setGrreenhorznwalkksSubmitted(false);
    setGrreenhorznwalkksScore(0);
    setGrreenhorznwalkksFinished(false);
  };

  const grreenhorznwalkksSubmit = () => {
    if (grreenhorznwalkksSelectedIndex === null || grreenhorznwalkksSubmitted) {
      return;
    }
    setGrreenhorznwalkksSubmitted(true);
    if (
      grreenhorznwalkksSelectedIndex === grreenhorznwalkksCurrent.correctIndex
    ) {
      setGrreenhorznwalkksScore(s => s + 1);
    }
  };

  const grreenhorznwalkksNext = () => {
    if (!grreenhorznwalkksSubmitted) {
      return;
    }
    const nextIdx = grreenhorznwalkksQuestionIndex + 1;
    if (nextIdx >= grreenhorznwalkksTotal) {
      setGrreenhorznwalkksFinished(true);
      return;
    }
    setGrreenhorznwalkksQuestionIndex(nextIdx);
    setGrreenhorznwalkksSelectedIndex(null);
    setGrreenhorznwalkksSubmitted(false);
  };

  if (grreenhorznwalkksFinished) {
    const grreenhorznwalkksPct = Math.round(
      (grreenhorznwalkksScore / grreenhorznwalkksTotal) * 100,
    );
    return (
      <Grreenhorznwalkkslay bounces={false}>
        <View style={styles.grreenhorznwalkksResultWrap}>
          <Image source={require('../../assets/i/grreenhorznwn.png')} />
          <Text style={styles.grreenhorznwalkksResultTitle}>
            Quiz Complete!
          </Text>

          <View style={styles.grreenhorznwalkksResultCard}>
            <Text style={styles.grreenhorznwalkksResultScore}>
              {grreenhorznwalkksScore}/{grreenhorznwalkksTotal}
            </Text>
            <Text style={styles.grreenhorznwalkksResultSub}>
              Correct Answers
            </Text>
            <Text style={styles.grreenhorznwalkksResultPct}>
              {grreenhorznwalkksPct}%
            </Text>
          </View>

          <Text style={styles.grreenhorznwalkksResultHint}>
            Good effort! Keep exploring to learn more about Madrid!
          </Text>

          <Pressable
            onPress={() => grreenhorznwalkksReset()}
            style={styles.grreenhorznwalkksTryAgain}>
            <Image source={require('../../assets/i/grreenhorztrag.png')} />
            <Text style={styles.grreenhorznwalkksTryAgainText}>Try Again</Text>
          </Pressable>
        </View>
      </Grreenhorznwalkkslay>
    );
  }

  return (
    <Grreenhorznwalkkslay>
      <ScrollView
        contentContainerStyle={styles.grreenhorznwalkksContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.grreenhorznwalkksHeaderRow}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Image source={require('../../assets/i/grreenhorzntqz.png')} />
            <Text style={styles.grreenhorznwalkksH1}>Quiz</Text>
          </View>
          <View style={styles.grreenhorznwalkksScoreWrap}>
            <Text style={styles.grreenhorznwalkksScoreTop}>
              {grreenhorznwalkksScore}/{grreenhorznwalkksTotal}
            </Text>
            <Text style={styles.grreenhorznwalkksScoreLabel}>SCORE</Text>
          </View>
        </View>

        <Text style={styles.grreenhorznwalkksH2}>
          Test your Madrid knowledge
        </Text>

        <View style={styles.grreenhorznwalkksMetaRow}>
          <Text style={styles.grreenhorznwalkksMetaText}>
            Question {grreenhorznwalkksQuestionIndex + 1} of{' '}
            {grreenhorznwalkksTotal}
          </Text>
          <Text style={styles.grreenhorznwalkksMetaText}>
            {grreenhorznwalkksProgressPct}%
          </Text>
        </View>

        <View style={styles.grreenhorznwalkksQuestionCard}>
          <Text style={styles.grreenhorznwalkksQuestionText}>
            {grreenhorznwalkksCurrent.question}
          </Text>
        </View>

        <View style={styles.grreenhorznwalkksOptionsWrap}>
          {grreenhorznwalkksCurrent.options.map((opt, idx) => {
            const selected = idx === grreenhorznwalkksSelectedIndex;
            const isCorrect = idx === grreenhorznwalkksCurrent.correctIndex;
            const showCorrect = grreenhorznwalkksSubmitted && isCorrect;
            const showWrong =
              grreenhorznwalkksSubmitted && selected && !isCorrect;
            return (
              <Pressable
                key={`${grreenhorznwalkksCurrent.id}-${idx}`}
                onPress={() => {
                  if (grreenhorznwalkksSubmitted) {
                    return;
                  }
                  setGrreenhorznwalkksSelectedIndex(idx);
                }}
                style={[
                  styles.grreenhorznwalkksOption,
                  selected && styles.grreenhorznwalkksOptionSelected,
                  showCorrect && styles.grreenhorznwalkksOptionCorrect,
                  showWrong && styles.grreenhorznwalkksOptionWrong,
                ]}>
                <Text style={styles.grreenhorznwalkksOptionText}>{opt}</Text>
                {grreenhorznwalkksSubmitted && (showCorrect || showWrong) && (
                  <Image
                    source={
                      showCorrect
                        ? require('../../assets/i/grreenhorzncorr.png')
                        : require('../../assets/i/grreenhorznwrng.png')
                    }
                  />
                )}
              </Pressable>
            );
          })}
        </View>

        {!grreenhorznwalkksSubmitted ? (
          <Pressable
            onPress={grreenhorznwalkksSubmit}
            disabled={grreenhorznwalkksSelectedIndex === null}
            style={[
              styles.grreenhorznwalkksSubmitBtn,
              grreenhorznwalkksSelectedIndex === null &&
                styles.grreenhorznwalkksSubmitBtnDisabled,
            ]}>
            <Text
              style={[
                styles.grreenhorznwalkksSubmitText,
                grreenhorznwalkksSelectedIndex !== null && {
                  color: '#000',
                  opacity: 1,
                },
              ]}>
              SUBMIT ANSWER
            </Text>
          </Pressable>
        ) : (
          <>
            <View
              style={[
                styles.grreenhorznwalkksFeedbackCard,
                grreenhorznwalkksSelectedIndex ===
                grreenhorznwalkksCurrent.correctIndex
                  ? styles.grreenhorznwalkksFeedbackCorrect
                  : styles.grreenhorznwalkksFeedbackWrong,
              ]}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <Image
                  source={
                    grreenhorznwalkksSelectedIndex ===
                    grreenhorznwalkksCurrent.correctIndex
                      ? require('../../assets/i/grreenhorzncorr.png')
                      : require('../../assets/i/grreenhorznwrng.png')
                  }
                />
                <Text style={styles.grreenhorznwalkksFeedbackTitle}>
                  {grreenhorznwalkksSelectedIndex ===
                  grreenhorznwalkksCurrent.correctIndex
                    ? 'Correct!'
                    : 'Incorrect'}
                </Text>
              </View>
              <Text style={styles.grreenhorznwalkksFeedbackText}>
                {grreenhorznwalkksCurrent.explanation}
              </Text>
            </View>

            <Pressable
              onPress={grreenhorznwalkksNext}
              style={styles.grreenhorznwalkksNextBtn}>
              <Text style={styles.grreenhorznwalkksNextText}>
                NEXT QUESTION
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </Grreenhorznwalkkslay>
  );
};

export default Grreenhorznwalkksquzz;

const styles = StyleSheet.create({
  grreenhorznwalkksContainer: {
    paddingTop: 40,
    paddingHorizontal: 18,
    paddingBottom: 120,
  },
  grreenhorznwalkksHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  grreenhorznwalkksH1: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 44,
  },
  grreenhorznwalkksH2: {
    marginTop: 6,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
  },
  grreenhorznwalkksScoreWrap: {
    alignItems: 'flex-end',
  },
  grreenhorznwalkksScoreTop: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 24,
  },
  grreenhorznwalkksScoreLabel: {
    marginTop: 2,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 10,
    letterSpacing: 0.8,
  },
  grreenhorznwalkksMetaRow: {
    marginTop: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grreenhorznwalkksMetaText: {
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
  },
  grreenhorznwalkksQuestionCard: {
    marginTop: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    padding: 18,
    minHeight: 110,
    justifyContent: 'center',
  },
  grreenhorznwalkksQuestionText: {
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 24,
    lineHeight: 34,
    maxWidth: '88%',
  },
  grreenhorznwalkksOptionsWrap: {
    marginTop: 18,
    gap: 12,
  },
  grreenhorznwalkksOption: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 63,
  },
  grreenhorznwalkksOptionSelected: {
    borderColor: '#D4AF37',
  },
  grreenhorznwalkksOptionCorrect: {
    borderColor: '#00C950',
    backgroundColor: '#0E1E16',
  },
  grreenhorznwalkksOptionWrong: {
    borderColor: '#FB2C36',
    backgroundColor: '#1E1010',
  },
  grreenhorznwalkksOptionText: {
    color: '#fff',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
  },
  grreenhorznwalkksOptionMark: {
    fontFamily: 'Manrope-ExtraBold',
    fontSize: 16,
  },
  grreenhorznwalkksOptionMarkCorrect: {
    color: '#25C06D',
  },
  grreenhorznwalkksOptionMarkWrong: {
    color: '#E04646',
  },
  grreenhorznwalkksSubmitBtn: {
    marginTop: 18,
    height: 55,
    borderRadius: 999,
    backgroundColor: '#CFB53B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D4AF3733',
  },
  grreenhorznwalkksSubmitBtnDisabled: {
    backgroundColor: 'transparent',
    borderColor: '#D4AF3733',
  },
  grreenhorznwalkksSubmitText: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
    opacity: 0.52,
  },
  grreenhorznwalkksFeedbackCard: {
    marginTop: 18,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
  },
  grreenhorznwalkksFeedbackCorrect: {
    borderColor: '#25C06D',
    backgroundColor: '#0E1E16',
  },
  grreenhorznwalkksFeedbackWrong: {
    borderColor: '#E04646',
    backgroundColor: '#1E1010',
  },
  grreenhorznwalkksFeedbackTitle: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
  },
  grreenhorznwalkksFeedbackText: {
    marginTop: 8,
    color: '#E8E8E8CC',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 24,
  },
  grreenhorznwalkksNextBtn: {
    marginTop: 22,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  grreenhorznwalkksNextText: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    letterSpacing: 0.8,
  },
  grreenhorznwalkksQuizSwitchRow: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  grreenhorznwalkksQuizPill: {
    paddingHorizontal: 12,
    height: 38,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  grreenhorznwalkksQuizPillActive: {
    borderColor: '#D4AF37',
  },
  grreenhorznwalkksQuizPillText: {
    color: '#E8E8E899',
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
  },
  grreenhorznwalkksQuizPillTextActive: {
    color: '#fff',
  },

  grreenhorznwalkksResultWrap: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 110,
  },
  grreenhorznwalkksResultIcon: {
    fontSize: 54,
    color: '#fff',
  },
  grreenhorznwalkksResultTitle: {
    marginTop: 10,
    color: '#fff',
    fontFamily: 'CormorantGaramond-Medium',
    fontSize: 34,
  },
  grreenhorznwalkksResultCard: {
    marginTop: 22,
    width: '100%',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#D4AF3726',
    backgroundColor: '#0F0F0F',
    paddingVertical: 22,
    alignItems: 'center',
  },
  grreenhorznwalkksResultScore: {
    color: '#fff',
    fontFamily: 'Manrope-Regular',
    fontSize: 54,
  },
  grreenhorznwalkksResultSub: {
    marginTop: 6,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
  },
  grreenhorznwalkksResultPct: {
    marginTop: 12,
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 18,
  },
  grreenhorznwalkksResultHint: {
    marginTop: 32,
    color: '#E8E8E899',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 320,
  },
  grreenhorznwalkksTryAgain: {
    marginTop: 29,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,

    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  grreenhorznwalkksTryAgainText: {
    color: '#fff',
    fontFamily: 'Manrope-Medium',
    fontSize: 16,
  },
});
