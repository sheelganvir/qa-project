# Manual Test Cases

| ID | Module | Title | Steps | Expected Result | Type |
|----|--------|-------|-------|-----------------|------|
| TC01 | Login | Valid login | 1. Open saucedemo.com 2. Enter standard_user / secret_sauce 3. Click Login | Products page opens | Sanity, Regression |
| TC02 | Login | Locked out user | 1. Enter locked_out_user / secret_sauce 2. Click Login | Error says user is locked out | Regression |
| TC03 | Login | Wrong password | 1. Enter standard_user / wrong123 2. Click Login | Error says username and password do not match | Regression |
| TC04 | Cart | Add item to cart | 1. Login 2. Click "Add to cart" on Backpack | Cart badge shows 1 | Sanity, Regression |
| TC05 | API | Health check | GET /ping | Status 201 | Sanity, Regression |
| TC06 | API | Get all bookings | GET /booking | Status 200, list not empty | Regression |
| TC07 | API | Create → Get → Delete booking | POST /booking, GET /booking/{id}, POST /auth, DELETE /booking/{id} | 200, 200, token received, 201 | Regression |