const month = '2019-11'
const activeSubscription = {
  id: 1,
  customerId: 1,
  subscriptionRate: 20,
}
const users = [
  {
    id: 1,
    name: 'John',
    startActiveOn: '2018-11-1',
    stopActiveOn: null,
  },
  {
    id: 2,
    name: 'Daisy',
    startActiveOn: '2019-11-1',
    stopActiveOn: null,
  },
  {
    id: 3,
    name: 'Bob',
    startActiveOn: '2019-11-1',
    stopActiveOn: '2019-11-20',
  },
]

/*
Prorate Invoice Calculator
*/
function cl(data) {
  console.log(data)
}

function billFor(month, activeSubscription, users) {
  let totalBilling = 0
  let totalActiveUser = 0

  if (activeSubscription === '' || users.length === 0) return 0

  daysInMonth = Number(
    new Date(month.split('-')[0], month.split('-')[1], 31).getDate(),
  )
  dailyRate = Number(activeSubscription.subscriptionRate / daysInMonth)

  cl(`Subscription Fee :: ${activeSubscription.subscriptionRate}`)
  cl(`Days in Month :: ${daysInMonth}`)
  cl(`Daily Rate :: ${dailyRate}`)

  /* start iteration */
  users.forEach((user) => {
    const [activeYear, activeMonth, activeDate] = user['startActiveOn'].split(
      '-',
    )
    /* active in the month bill */
    if (`${activeYear}-${activeMonth}` === month) {
      totalActiveUser += 1
      let totalActiveDays = 0
      if (activeDate === daysInMonth) {
        totalActiveDays = daysInMonth
      } else {
        totalActiveDays = daysInMonth - activeDate + 1
      }

      /* if user stop active is not null */
      if (user.stopActiveOn !== null) {
        const [stopYear, stopMonth, stopDate] = user['stopActiveOn'].split('-')
        totalActiveDays = stopDate - activeDate + 1
      }

      //cl(`Total Active Days :: ${totalActiveDays}`)
      const billActiveDays = parseFloat(
        (dailyRate * totalActiveDays).toFixed(2),
      )
      const billActiveDaysLocale = Intl.NumberFormat('EN-US', {
        style: 'currency',
        currency: 'USD',
      }).format(dailyRate * totalActiveDays)

      cl(
        `User Name: ${user.name} -- Active Days: ${totalActiveDays} -- Bill: ${billActiveDaysLocale}`,
      )

      totalBilling = totalBilling + billActiveDays
    }
  })

  totalBilling = Intl.NumberFormat('EN-US', {
    style: 'currency',
    currency: 'USD',
  }).format(totalBilling)
  cl(`Total Active User :: ${totalActiveUser}`)
  cl(`Total Bill :: ${totalBilling}`)
}

billFor(month, activeSubscription, users)
