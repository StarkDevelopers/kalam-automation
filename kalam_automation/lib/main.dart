import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './screens/SplashScreen/SplashScreen.dart';
import './screens/Products/Products.dart';
import './screens/Cart/Cart.dart';
import './screens/Login/Login.dart';

import './providers/auth.provider.dart';
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
        ChangeNotifierProvider(create: (_) => Auth()),
        ChangeNotifierProvider(create: (_) => Products()),
        ChangeNotifierProvider(create: (_) => Cart()),
      ],
      child: Consumer<Auth>(
        builder: (ctx, auth, _) => MaterialApp(
          title: 'Kalam Automation',
          theme: ThemeData(
            primaryColor: Colors.black,
            accentColor: Colors.teal,
          ),
          home: auth.isLoggedIn ? ProductsScreen() : Login(),
          routes: {
            ProductsScreen.routeName: (_) => ProductsScreen(),
            CartScreen.routeName: (_) => CartScreen(),
            Login.routeName: (_) => Login(),
          },
        ),
      ),
    );
  }
}
