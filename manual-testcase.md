# Manual Test Case

## Test Case ID
TC_001

## Test Title
Verify user can successfully purchase moisturizers when temperature is below 19 C

## Test Type
End-to-End Functional Test

## Preconditions
- User has internet access
- Application is accessible
- Supported browser installed

## Test URL
`http://weathershopper.pythonanywhere.com/`

## Test Steps

| Step | Action | Expected Result |
|---|---|---|
| 1 | Navigate to Weather Shopper homepage | Homepage loads successfully |
| 2 | Observe the displayed temperature | Temperature value is visible |
| 3 | If temperature is below 19 C, click Buy Moisturizers | Moisturizers page opens |
| 4 | Identify the least expensive moisturizer containing Aloe | Correct product identified |
| 5 | Click Add for the selected Aloe moisturizer | Item added to cart |
| 6 | Identify the least expensive moisturizer containing Almond | Correct product identified |
| 7 | Click Add for the selected Almond moisturizer | Item added to cart |
| 8 | Click Cart button | Cart page opens |
| 9 | Verify that 2 items appear in cart | Cart shows correct items |
| 10 | Verify total price is calculated correctly | Total matches sum of products |
| 11 | Click Pay with Card | Payment modal opens |
| 12 | Enter valid payment details (Stripe test card) | Payment fields accept input |
| 13 | Click Pay | Payment is processed |
| 14 | Verify confirmation page appears | Success message displayed |

## Test Data
- Email: `test@test.com`
- Stripe test card: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: `123`
- Postal/ZIP: `12345`

## Expected Result
The user should see a confirmation message:
`Your payment was successful.You should receive a follow-up call from our sales team.`
