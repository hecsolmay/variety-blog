import { LabelProps } from '@/types/components'

interface FormItemProps extends Omit<LabelProps, 'className'> {
  className?: string
  label?: string
  labelClassName?: string
  children?: React.ReactNode
}

export function FormItem (
  {  className = '', label, children, labelClassName, ...props }: FormItemProps
) {
  return (
    <div className={`relative ${className}`}>
      <label {...props} className={`mb-2 block text-sm font-medium text-slate-700 ${labelClassName}`}>
        {label}
      </label>
      {children}
    </div>
  )
}
