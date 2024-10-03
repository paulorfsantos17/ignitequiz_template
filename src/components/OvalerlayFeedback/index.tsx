/* eslint-disable react-hooks/exhaustive-deps */
import { BlurMask, Canvas, Rect } from '@shopify/react-native-skia'
import { useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { THEME } from '../../styles/theme'
import { useEffect } from 'react'

interface Props {
  status: number
}

const STATUS = [
  'transparent',
  THEME.COLORS.BRAND_LIGHT,
  THEME.COLORS.DANGER_LIGHT,
]

export function OverLayFeedback({ status }: Props) {
  const opacity = useSharedValue(0)
  const color = STATUS[status]

  const { height, width } = useWindowDimensions()

  const styleAnimated = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    }
  })

  useEffect(() => {
    opacity.value = withSequence(
      withTiming(1, { duration: 400, easing: Easing.bounce }),
      withTiming(0),
    )
  }, [status])
  return (
    <Animated.View
      style={[{ height, width, position: 'absolute' }, styleAnimated]}
    >
      <Canvas style={{ flex: 1 }}>
        <Rect x={0} y={0} width={width} height={height} color={color}>
          <BlurMask blur={50} style="inner" />
        </Rect>
      </Canvas>
    </Animated.View>
  )
}
