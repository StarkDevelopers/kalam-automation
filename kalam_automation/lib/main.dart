import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './screens/SplashScreen/SplashScreen.dart';
import './screens/Products/Products.dart';
import './screens/Cart/Cart.dart';

import './providers/products.provider.dart';
import './providers/cart.provider.dart';

void main() {
  runApp(KalamAutomation());
}

class KalamAutomation extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => Products()),
        ChangeNotifierProvider(create: (_) => Cart()),
      ],
      child: MaterialApp(
        title: 'Kalam Automation',
        theme: ThemeData(
          primaryColor: Colors.black,
          accentColor: Colors.teal,
        ),
        home: SplashScreen(),
        routes: {
          ProductsScreen.routeName: (_) => ProductsScreen(),
          CartScreen.routeName: (_) => CartScreen(),
        },
      ),
    );
  }
}
