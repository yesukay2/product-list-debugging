1. Components wrongly implemented the use of the @Component decorator. Decorator was implemented correctly by removing trailing ; and moved block on top of the class its decorating.

2. Add-to-cart component's decreaseProductIem method had a non-intuitive logic. Item counter had no lower bound making it produce negative values which is not ideal. A lower bound was added to make the lowest item count 0.

3. Dynamically rendered products with right metadata.

4. Used Pipes to modify the view state of the amount per item; thus rendering a two decimal place number as price, with a currency unit.

5. Extract the item card as a standalone component and use it to dynamically render the list of products in the app template.

6. Moved interfaces to new directory and utilised them with import/export

7. Implemented the AddtoCart function/logic

8.
