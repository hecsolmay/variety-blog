export interface IconProps extends React.HTMLAttributes<SVGElement> {}
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface CommonInputProps extends InputProps {
  register?: any
  error?: string
}

