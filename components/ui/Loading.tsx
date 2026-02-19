import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import Svg, {
  Rect,
  Path,
  Circle,
  G,
  Line,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

interface LoadingProps {
  loadingTime?: number;
  onLoadingComplete?: () => void;
  progressNum: number,
}

const AnimatedG = Animated.createAnimatedComponent(G);
const AnimatedLine = Animated.createAnimatedComponent(Line);

const Loading: React.FC<LoadingProps> = ({
  loadingTime = 2000,
  onLoadingComplete,
}) => {
  // Remove progress state
  const [messageIndex, setMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  
  // Scooter animations
  const scooterBob = useRef(new Animated.Value(0)).current;
  const wheelSpin = useRef(new Animated.Value(0)).current;
  const roadLines = useRef(new Animated.Value(0)).current;
  
  // Text fade for messages
  const textOpacity = useRef(new Animated.Value(1)).current;

  // Loading messages
  const messages = [
    "Firing up the grill...",
    "Packing the flavors...",
    "Revving the engine...",
    "Almost there..."
  ];

  // Quotes to display randomly
  const quotes = [
    "Good food is the foundation of genuine happiness. – Auguste Escoffier",
    "One cannot think well, love well, sleep well, if one has not dined well. – Virginia Woolf",
    "People who love to eat are always the best people. – Julia Child",
    "Food is symbolic of love when words are inadequate. – Alan D. Wolfelt",
    "The secret of success in life is to eat what you like. – Mark Twain",
    "There is no sincerer love than the love of food. – George Bernard Shaw",
    "Laughter is brightest where food is best. – Irish Proverb",
    "First we eat, then we do everything else. – M.F.K. Fisher",
  ];
  const [quote, setQuote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
        easing: Easing.out(Easing.cubic),
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous scooter bounce
    Animated.loop(
      Animated.sequence([
        Animated.timing(scooterBob, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
        Animated.timing(scooterBob, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ])
    ).start();

    // Continuous wheel spin (numeric degrees for rotation prop)
    Animated.loop(
      Animated.timing(wheelSpin, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // Continuous road lines movement
    Animated.loop(
      Animated.timing(roadLines, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    // Progress simulation
    const startTime = Date.now();
    let currentMessageIndex = 0;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= loadingTime) {
        clearInterval(interval);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [loadingTime, onLoadingComplete]);

  const updateMessage = (index: number) => {
    setMessageIndex(index);
    Animated.sequence([
      Animated.timing(textOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Interpolations
  const bobTranslateY = scooterBob.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -4],
  });

  // Numeric rotation for wheel (degrees) – use rotation prop on G
  const wheelRotate = wheelSpin.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 360],
  });

  const roadTranslateX = roadLines.interpolate({
    inputRange: [0, 1],
    outputRange: [100, -100],
  });

  const roadOpacity = roadLines.interpolate({
    inputRange: [0, 0.4, 0.6, 1],
    outputRange: [0, 1, 1, 0],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
        {/* Animated Scooter Scene */}
        <View style={styles.sceneContainer}>
          {/* Road Lines (behind) */}
          <Svg width="200" height="120" viewBox="0 0 200 120" style={styles.roadLines}>
            <AnimatedLine
              x1="20"
              y1="40"
              x2="80"
              y2="40"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={roadOpacity}
              transform={[{ translateX: roadTranslateX }]}
            />
            <AnimatedLine
              x1="0"
              y1="60"
              x2="60"
              y2="60"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={roadOpacity}
              transform={[{ translateX: roadTranslateX }]}
            />
            <AnimatedLine
              x1="40"
              y1="80"
              x2="100"
              y2="80"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity={roadOpacity}
              transform={[{ translateX: roadTranslateX }]}
            />
          </Svg>

          {/* Scooter */}
          <Animated.View style={{ transform: [{ translateY: bobTranslateY }] }}>
            <Svg width="120" height="120" viewBox="0 0 100 100">
              {/* Delivery Box */}
              <Rect x="15" y="35" width="25" height="20" rx="2" fill="#FFD166" />
              <Rect x="15" y="38" width="25" height="2" fill="#F4B942" />
              
              {/* Scooter Body */}
              <Path
                d="M40 60 L65 60 C70 60 72 55 70 50 L65 30"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <Path
                d="M40 60 L25 60 C20 60 20 55 25 50 L35 40"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              
              {/* Seat */}
              <Path
                d="M35 45 H55"
                stroke="#333"
                strokeWidth="4"
                strokeLinecap="round"
              />
              
              {/* Handlebars */}
              <Path
                d="M62 30 L58 28"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              />
              
              {/* Wheels - using rotation prop with numeric value */}
              <AnimatedG originX={25} originY={65} rotation={wheelRotate}>
                <Circle cx="25" cy="65" r="8" stroke="white" strokeWidth="3" fill="#333" />
                <Circle cx="25" cy="65" r="3" fill="#555" />
              </AnimatedG>
              <AnimatedG originX={70} originY={65} rotation={wheelRotate}>
                <Circle cx="70" cy="65" r="8" stroke="white" strokeWidth="3" fill="#333" />
                <Circle cx="70" cy="65" r="3" fill="#555" />
              </AnimatedG>
              
              {/* Headlight Beam */}
              <Line
                x1="72"
                y1="32"
                x2="90"
                y2="38"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>
          </Animated.View>

          {/* Road Shadow */}
          <View style={styles.roadShadow} />
        </View>

        {/* Loading Text with fade */}
        <Animated.Text style={[styles.title, { opacity: textOpacity }]}>
          {messages[Math.floor(Math.random() * 4)]}
        </Animated.Text>

        {/* Random Quote */}
        <Text style={styles.quote}>{quote}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  content: {
    width: width * 0.8,
    maxWidth: 320,
    alignItems: 'center',
    padding: 20,
  },
  sceneContainer: {
    width: 200,
    height: 140,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  roadLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0.3,
  },
  roadShadow: {
    position: 'absolute',
    bottom: 10,
    width: 80,
    height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 24,
    letterSpacing: 0.5,
    textAlign: 'center',
    minHeight: 28,
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 3,
  },
  quote: {
    fontSize: 15,
    fontStyle: 'italic',
    color: 'rgba(255,255,255,0.85)',
    marginTop: 8,
    textAlign: 'center',
    minHeight: 40,
  },
});

export default Loading;