export default function buildEventFilter ({ search, date, range }) {
  const filter = {}

  // Title search
  if (search) {
    filter.title = { $regex: search, $options: 'i' }
  }

  // Today's date filter
  if (date === 'today') {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)
    filter.date = { $gte: today, $lt: tomorrow }
  }

  // Date range filter
  if (range) {
    const now = new Date()
    let start, end

    if (range === 'currentWeek') {
      const dayOfWeek = now.getDay()
      start = new Date(now)
      start.setDate(now.getDate() - dayOfWeek)
      start.setHours(0, 0, 0, 0)
      end = new Date(start)
      end.setDate(start.getDate() + 7)
    } else if (range === 'lastWeek') {
      const dayOfWeek = now.getDay()
      end = new Date(now)
      end.setDate(now.getDate() - dayOfWeek)
      end.setHours(0, 0, 0, 0)
      start = new Date(end)
      start.setDate(end.getDate() - 7)
    } else if (range === 'currentMonth') {
      start = new Date(now.getFullYear(), now.getMonth(), 1)
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
    } else if (range === 'lastMonth') {
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      end = new Date(now.getFullYear(), now.getMonth(), 1)
    }

    if (start && end) {
      filter.date = { $gte: start, $lt: end }
    }
  }

  return filter
}