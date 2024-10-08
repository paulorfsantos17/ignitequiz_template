/* eslint-disable react-hooks/exhaustive-deps */
import { Pressable, type PressableProps } from 'react-native'

import { THEME } from '../../styles/theme'
import { styles } from './styles'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useEffect } from 'react'

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string
  isChecked?: boolean
  type?: keyof typeof TYPE_COLORS
}

const PressableAnimated = Animated.createAnimatedComponent(Pressable)

export function Level({
  title,
  type = 'EASY',
  isChecked = false,
  ...rest
}: Props) {
  const scale = useSharedValue(1)
  const ckecked = useSharedValue(0)

  const COLOR = TYPE_COLORS[type]

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(
        ckecked.value,
        [0, 1],
        ['transparent', COLOR],
      ),
    }
  })

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        ckecked.value,
        [0, 1],
        [COLOR, THEME.COLORS.GREY_100],
      ),
    }
  })

  function onPressIn() {
    scale.value = withTiming(1.2)
  }

  function onPressOut() {
    scale.value = withTiming(1)
  }
  useEffect(() => {
    ckecked.value = withTiming(isChecked ? 1 : 0)
  }, [isChecked])
  return (
    <PressableAnimated
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[styles.container, animatedContainerStyle, { borderColor: COLOR }]}
      {...rest}
    >
      <Animated.View>
        <Animated.Text style={[styles.title, animatedTextStyle]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </PressableAnimated>
  )
}
