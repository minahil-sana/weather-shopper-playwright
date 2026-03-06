# Manual Test Case

## Test Case ID
TC_001

## Test Title
Verify end-to-end shopping flow based on temperature

## Test Type
End-to-End Functional Test

## Preconditions
- User has internet access
- Application is accessible
- Supported browser installed

## Test URL
`http://weathershopper.pythonanywhere.com/`

## Temperature Rules
- If temperature is below 19 C: buy moisturizers with `Aloe` and `Almond`.
- If temperature is above 34 C: buy sunscreens with `SPF-50` and `SPF-30`.
- If temperature is between 19 and 34 C: no shopping action is expected.

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to Weather Shopper homepage | Homepage loads successfully |
| 2 | Observe the displayed temperature | Temperature value is visible |
| 3 | If temperature is below 19 C, click Buy Moisturizers | Moisturizers page opens |
| 4 | Add least expensive products containing Aloe and Almond | Two moisturizers added to cart |
| 5 | If temperature is above 34 C, click Buy Sunscreens | Sunscreens page opens |
| 6 | Add least expensive products containing SPF-50 and SPF-30 | Two sunscreens added to cart |
| 7 | If temperature is between 19 and 34 C | No shopping action is performed |
| 8 | For purchase paths, click Cart | Cart page opens |
| 9 | Verify that 2 items appear in cart | Cart shows correct item count |
| 10 | Verify total price is calculated correctly | Total matches sum of products |
| 11 | Click Pay with Card | Payment modal opens |
| 12 | Enter valid payment details (Stripe test card) | Payment fields accept input |
| 13 | Click Pay | Payment is processed |
| 14 | Verify confirmation page appears | Success or failure message is shown |

## Test Data
- Email: `test@test.com`
- Stripe test card: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: `123`
- Postal/ZIP: `12345`

## Expected Result
- For temperature below 19 C or above 34 C:
	- User can add two correct category items.
	- Cart total is correct.
	- Checkout completes and confirmation page is displayed.
- For temperature between 19 and 34 C:
	- No purchase flow is triggered.
