import { Text, Dimensions } from 'react-native'

import { Option } from '../Option'
import { styles } from './styles'
import Animated, { Keyframe, runOnJS } from 'react-native-reanimated'

type QuestionProps = {
  title: string
  alternatives: string[]
}

type Props = {
  question: QuestionProps
  alternativeSelected?: number | null
  setAlternativeSelected?: (value: number) => void
  onUnMount: () => void
}

const SCREEN_WIDTH = Dimensions.get('window').width

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
  onUnMount,
}: Props) {
  const enteringKeyFrame = new Keyframe({
    0: {
      opacity: 0,
      transform: [{ translateX: -SCREEN_WIDTH }, { rotate: '90deg' }],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: '0deg' }],
    },
  })

  const exitingKeyFrame = new Keyframe({
    from: {
      opacity: 1,
      transform: [{ translateX: 0 }, { rotate: '0deg' }],
    },
    to: {
      opacity: 1,
      transform: [{ translateX: 2 * SCREEN_WIDTH }, { rotate: '90deg' }],
    },
  })

  return (
    <Animated.View
      entering={enteringKeyFrame.delay(300)}
      exiting={exitingKeyFrame.delay(200).withCallback((finished) => {
        'worklet'
        if (finished) {
          runOnJS(onUnMount)()
        }
      })}
      style={styles.container}
    >
      <Text style={styles.title}>{question.title}</Text>

      {question.alternatives.map((alternative, index) => (
        <Option
          key={index}
          title={alternative}
          checked={alternativeSelected === index}
          onPress={() =>
            setAlternativeSelected && setAlternativeSelected(index)
          }
        />
      ))}
    </Animated.View>
  )
}
