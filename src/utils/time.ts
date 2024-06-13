const DATE_UNITS = {
  year: 31536000,
  month: 2592000,
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
}

const getSecondsDiff = (timestamp: number) => (Date.now() - timestamp) / 1000

function getUnitAndValueDate  (secondsElapsed: number)  {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === 'second') {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1
      return { value, unit }
    }
  }

  return { value: 0, unit: 'second' }
}

export function getTimeAgo (date: Date) {
  const rtf = new Intl.RelativeTimeFormat()

  const timestamp = date.getTime()

  const secondsElapsed = getSecondsDiff(timestamp)
  const { value, unit } = getUnitAndValueDate(secondsElapsed)
  return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}
