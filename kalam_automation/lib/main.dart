import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import './screens/SplashScreen/SplashScreen.dart';
import './screens/Products/Products.dart';
import './screens/Cart/Cart.dart';
import './screens/Login/Login.dart';
import './screens/OwnedProducts/OwnedProducts.dart';
import './screens/OwnedProductDetails/OwnedProductDetails.dart';
import './screens/MyProfile/MyProfile.dart';

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
          debugShowCheckedModeBanner: false,
          title: 'Kalam Automation',
          theme: ThemeData(
            primaryColor: Colors.black,
            accentColor: Colors.teal,
          ),
          home: auth.isLoggedIn
              ? SplashScreen(loggedIn: true)
              : SplashScreen(loggedIn: false),
          routes: {
            ProductsScreen.routeName: (_) => ProductsScreen(),
            CartScreen.routeName: (_) => CartScreen(),
            Login.routeName: (_) => Login(),
            SplashScreen.routeName: (_) => SplashScreen(),
            OwnedProducts.routeName: (_) => OwnedProducts(),
            OwnedProductDetails.routeName: (_) => OwnedProductDetails(),
            MyProfile.routeName: (_) => MyProfile(),
          },
        ),
      ),
    );
  }
}
