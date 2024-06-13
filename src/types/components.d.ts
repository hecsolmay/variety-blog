export interface IconProps extends React.HTMLAttributes<SVGElement> {}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface CommonInputProps extends InputProps {
  register?: any
  error?: string
  hasError?: boolean
}
export interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {}
export interface SpanProps extends React.HTMLAttributes<HTMLSpanElement> {}
export interface MainProps extends React.HTMLAttributes<HTMLMainElement> {}
