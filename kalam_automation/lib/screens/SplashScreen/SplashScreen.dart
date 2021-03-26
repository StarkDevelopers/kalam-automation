import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../../screens/Login/Login.dart';
import '../../images/Images.dart';
import '../../screens/Products/Products.dart';
import '../../helpers/SharedPreferenceHelper.dart';
import '../../models/user.model.dart';
import '../../providers/auth.provider.dart';
import '../../services/user.service.dart';

class SplashScreen extends StatelessWidget {
  static final String routeName = '/splash-screen';
  final bool loggedIn;

  const SplashScreen({Key key, this.loggedIn}) : super(key: key);

  Future<void> checkLogin(BuildContext context) async {
    String token = await SharedPreferenceHelper.getPreference('token');

    if (token == null) {
      Navigator.of(context).pushReplacementNamed(Login.routeName);
    } else {
      try {
        User user = await UserService.getUser(false);

        SharedPreferenceHelper.setPreference('token', user.token);

        Provider.of<Auth>(context, listen: false).login(user);
      } catch (error) {
        Navigator.of(context).pushReplacementNamed(Login.routeName);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (this.loggedIn) {
      Future.delayed(const Duration(milliseconds: 1000), () {
        Navigator.of(context).pushReplacementNamed(ProductsScreen.routeName);
      });
    } else {
      checkLogin(context);
    }

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
