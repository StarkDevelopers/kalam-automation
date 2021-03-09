import 'package:flutter/material.dart';

import '../screens/Products/Products.dart';
import '../screens/Cart/Cart.dart';
import '../images/Images.dart';

class KalamDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var currentScreen = ModalRoute.of(context).settings.name;

    return Drawer(
      child: ListView(
        padding: EdgeInsets.zero,
        children: <Widget>[
          DrawerHeader(
            child: Image.asset(Images.LOGO),
            decoration: BoxDecoration(
              color: Colors.black,
            ),
          ),
          ListTile(
            title: Text(
              'Products',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
            ),
            selected: currentScreen == ProductsScreen.routeName,
            selectedTileColor: Colors.grey[300],
            onTap: () => Navigator.of(context)
                .pushReplacementNamed(ProductsScreen.routeName),
          ),
          ListTile(
            title: Text(
              'Cart',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
            ),
            selected: currentScreen == CartScreen.routeName,
            selectedTileColor: Colors.grey[300],
            onTap: () => Navigator.of(context)
                .pushReplacementNamed(CartScreen.routeName),
          ),
          ListTile(
            title: Text(
              'My Products',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
            ),
            selected: false,
            selectedTileColor: Colors.grey[300],
            onTap: () {},
          ),
          ListTile(
            title: Text(
              'Logout',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16.0),
            ),
            selected: false,
            selectedTileColor: Colors.grey[300],
            onTap: () {},
          ),
        ],
      ),
    );
  }
}
