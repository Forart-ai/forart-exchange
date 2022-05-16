import { SpaceProps } from 'styled-system'
import { HTMLAttributes, ImgHTMLAttributes } from 'react'

export interface WrapperProps extends SpaceProps, HTMLAttributes<HTMLDivElement> {
  width: number | string;
  height: number | string;
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement>, SpaceProps {
  width: number | string;
  height: number | string;
  wrapperProps?: WrapperProps;
  variant?: 'rectangular' | 'circular',
  borderRadius?: number,
}
