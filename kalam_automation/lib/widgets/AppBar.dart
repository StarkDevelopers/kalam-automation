import 'package:flutter/material.dart';

import '../screens/Cart/Cart.dart';

class KalamAppBar extends StatelessWidget implements PreferredSizeWidget {
  @override
  Widget build(BuildContext context) {
    var isCartScreen = ModalRoute.of(context).settings.name == '/cart';
    var appBarActions = <Widget>[];

    if (!isCartScreen) {
      appBarActions.add(IconButton(icon: Icon(Icons.shopping_cart), onPressed: () => Navigator.of(context).pushNamed(CartScreen.routeName)));
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
