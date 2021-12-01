import axios from 'axios'
import { showAlert } from './alert'
const stripe = Stripe(
  'pk_test_51K1t4YKsrv8lDCbwg3WzfTGPIJW8WFriYlCI4ybvnIpWOUNEffAPaCGi8R04cPfeceyMfsy6NHmpcYAxAsuJBwKz00WK4SEgFT'
)

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `http://localhost:5914/api/v1/bookings/checkout-session/${tourId}`
    )
    console.log(session)

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    })
  } catch (err) {
    console.log(err)
    showAlert('error', err)
  }
}
