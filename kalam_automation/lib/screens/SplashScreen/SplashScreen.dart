import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../screens/Products/Products.dart';
import '../../screens/ServerError/ServerError.dart';
import '../../images/Images.dart';
import '../../services/products.service.dart';
import '../../providers/products.provider.dart';

class SplashScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    ProductService.getProducts().then((response) {
      final products = Provider.of<Products>(context, listen: false);
      products.setItems(response);
      Navigator.of(context).pushReplacementNamed(ProductsScreen.routeName);
    }).catchError((error) {
      Navigator.of(context).pushReplacementNamed(ServerError.routeName);
    });

    return Scaffold(
      body: Center(
        child: Image.asset(
          Images.LOGO,
          height: MediaQuery.of(context).size.height * 0.2,
          width: MediaQuery.of(context).size.height * 0.2,
        ),
      ),
    );
  }
}
