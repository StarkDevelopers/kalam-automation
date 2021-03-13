import 'package:flutter/material.dart';

import '../screens/Cart/Cart.dart';
import '../screens/Products/Products.dart';

class KalamAppBar extends StatelessWidget implements PreferredSizeWidget {
  @override
  Widget build(BuildContext context) {
    const productRoutes = ['/', ProductsScreen.routeName];

    var isProductsScreen =
        productRoutes.indexOf(ModalRoute.of(context).settings.name) != -1;
    var appBarActions = <Widget>[];

    if (isProductsScreen) {
      appBarActions.add(
        IconButton(
          icon: Icon(Icons.shopping_cart),
          onPressed: () =>
              Navigator.of(context).pushNamed(CartScreen.routeName),
        ),
      );
    }

    return AppBar(
      title: Text('Kalam Automation'),
      actions: appBarActions,
    );
  }

  // Returns default height, in case want to change AppBar height
  // introduce new property height and use it to contructor to set from outside
  // and, use it in here...
  @override
  Size get preferredSize => new Size.fromHeight(kToolbarHeight);
}
